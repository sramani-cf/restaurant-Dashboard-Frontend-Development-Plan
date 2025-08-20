#!/bin/bash

# Restaurant Dashboard Backup Script
# This script backs up the database and uploaded files to S3

set -e

# Configuration
BACKUP_DIR="/tmp/restaurant-backup"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
S3_BUCKET=${BACKUP_S3_BUCKET:-"restaurant-dashboard-backups"}
DB_NAME=${DATABASE_NAME:-"restaurant_dashboard"}
RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-30}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Create backup directory
create_backup_dir() {
    log_info "Creating backup directory..."
    mkdir -p "$BACKUP_DIR"
}

# Backup database
backup_database() {
    log_info "Backing up database..."
    
    if [ -z "$DATABASE_URL" ]; then
        log_error "DATABASE_URL is not set"
        exit 1
    fi
    
    # Extract connection details from DATABASE_URL
    # Format: postgresql://username:password@host:port/database
    DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
    DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
    DB_USER=$(echo $DATABASE_URL | sed -n 's/.*\/\/\([^:]*\):.*/\1/p')
    DB_PASS=$(echo $DATABASE_URL | sed -n 's/.*:\([^@]*\)@.*/\1/p')
    DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')
    
    # Create database backup
    PGPASSWORD=$DB_PASS pg_dump \
        -h $DB_HOST \
        -p $DB_PORT \
        -U $DB_USER \
        -d $DB_NAME \
        --no-owner \
        --no-acl \
        --clean \
        --if-exists \
        > "$BACKUP_DIR/database_${TIMESTAMP}.sql"
    
    # Compress the backup
    gzip "$BACKUP_DIR/database_${TIMESTAMP}.sql"
    
    log_info "Database backup completed: database_${TIMESTAMP}.sql.gz"
}

# Backup uploaded files
backup_files() {
    log_info "Backing up uploaded files..."
    
    # Assuming files are stored in public/uploads
    if [ -d "public/uploads" ]; then
        tar -czf "$BACKUP_DIR/files_${TIMESTAMP}.tar.gz" -C public uploads/
        log_info "Files backup completed: files_${TIMESTAMP}.tar.gz"
    else
        log_warning "No uploads directory found, skipping file backup"
    fi
}

# Upload to S3
upload_to_s3() {
    log_info "Uploading backups to S3..."
    
    # Check if AWS CLI is configured
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI is not installed"
        exit 1
    fi
    
    # Upload database backup
    if [ -f "$BACKUP_DIR/database_${TIMESTAMP}.sql.gz" ]; then
        aws s3 cp \
            "$BACKUP_DIR/database_${TIMESTAMP}.sql.gz" \
            "s3://$S3_BUCKET/database/database_${TIMESTAMP}.sql.gz" \
            --storage-class STANDARD_IA
        
        log_info "Database backup uploaded to S3"
    fi
    
    # Upload files backup
    if [ -f "$BACKUP_DIR/files_${TIMESTAMP}.tar.gz" ]; then
        aws s3 cp \
            "$BACKUP_DIR/files_${TIMESTAMP}.tar.gz" \
            "s3://$S3_BUCKET/files/files_${TIMESTAMP}.tar.gz" \
            --storage-class STANDARD_IA
        
        log_info "Files backup uploaded to S3"
    fi
}

# Clean up old backups
cleanup_old_backups() {
    log_info "Cleaning up old backups (older than $RETENTION_DAYS days)..."
    
    # Calculate date for deletion
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        DELETE_DATE=$(date -v -${RETENTION_DAYS}d +%Y-%m-%d)
    else
        # Linux
        DELETE_DATE=$(date -d "$RETENTION_DAYS days ago" +%Y-%m-%d)
    fi
    
    # Delete old database backups
    aws s3 ls "s3://$S3_BUCKET/database/" | while read -r line; do
        FILE_DATE=$(echo $line | awk '{print $1}')
        FILE_NAME=$(echo $line | awk '{print $4}')
        
        if [[ "$FILE_DATE" < "$DELETE_DATE" ]]; then
            aws s3 rm "s3://$S3_BUCKET/database/$FILE_NAME"
            log_info "Deleted old backup: $FILE_NAME"
        fi
    done
    
    # Delete old file backups
    aws s3 ls "s3://$S3_BUCKET/files/" | while read -r line; do
        FILE_DATE=$(echo $line | awk '{print $1}')
        FILE_NAME=$(echo $line | awk '{print $4}')
        
        if [[ "$FILE_DATE" < "$DELETE_DATE" ]]; then
            aws s3 rm "s3://$S3_BUCKET/files/$FILE_NAME"
            log_info "Deleted old backup: $FILE_NAME"
        fi
    done
}

# Clean up local backup directory
cleanup_local() {
    log_info "Cleaning up local backup directory..."
    rm -rf "$BACKUP_DIR"
}

# Send notification
send_notification() {
    local status=$1
    local message=$2
    
    # Send to Slack webhook if configured
    if [ ! -z "$SLACK_WEBHOOK_URL" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"Backup ${status}: ${message}\"}" \
            "$SLACK_WEBHOOK_URL"
    fi
    
    # Send email if configured
    if [ ! -z "$NOTIFICATION_EMAIL" ]; then
        echo "$message" | mail -s "Restaurant Dashboard Backup ${status}" "$NOTIFICATION_EMAIL"
    fi
}

# Main execution
main() {
    log_info "Starting backup process at ${TIMESTAMP}"
    
    # Trap errors
    trap 'handle_error' ERR
    
    create_backup_dir
    backup_database
    backup_files
    upload_to_s3
    cleanup_old_backups
    cleanup_local
    
    log_info "Backup completed successfully!"
    send_notification "SUCCESS" "Backup completed at ${TIMESTAMP}"
}

# Error handler
handle_error() {
    log_error "Backup failed!"
    send_notification "FAILED" "Backup failed at ${TIMESTAMP}"
    cleanup_local
    exit 1
}

# Run the backup
main