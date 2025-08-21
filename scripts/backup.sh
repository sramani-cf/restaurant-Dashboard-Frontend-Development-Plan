#!/bin/bash

# Restaurant Dashboard Backup Script
# This script backs up the database and uploaded files

set -e

# Configuration
BACKUP_DIR="/tmp/restaurant-backup"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DESTINATION=${BACKUP_DESTINATION:-"./backups"}
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
    mkdir -p "$BACKUP_DESTINATION"
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

# Backup environment files
backup_env() {
    log_info "Backing up environment configuration..."
    
    if [ -f ".env.local" ]; then
        cp .env.local "$BACKUP_DIR/env_${TIMESTAMP}.txt"
        log_info "Environment backup completed: env_${TIMESTAMP}.txt"
    else
        log_warning "No .env.local file found"
    fi
}

# Save backups to destination
save_backups() {
    log_info "Saving backups to destination..."
    
    # Move all backup files to destination directory
    if [ -f "$BACKUP_DIR/database_${TIMESTAMP}.sql.gz" ]; then
        mv "$BACKUP_DIR/database_${TIMESTAMP}.sql.gz" "$BACKUP_DESTINATION/"
        log_info "Database backup saved to: $BACKUP_DESTINATION/database_${TIMESTAMP}.sql.gz"
    fi
    
    if [ -f "$BACKUP_DIR/files_${TIMESTAMP}.tar.gz" ]; then
        mv "$BACKUP_DIR/files_${TIMESTAMP}.tar.gz" "$BACKUP_DESTINATION/"
        log_info "Files backup saved to: $BACKUP_DESTINATION/files_${TIMESTAMP}.tar.gz"
    fi
    
    if [ -f "$BACKUP_DIR/env_${TIMESTAMP}.txt" ]; then
        mv "$BACKUP_DIR/env_${TIMESTAMP}.txt" "$BACKUP_DESTINATION/"
        log_info "Environment backup saved to: $BACKUP_DESTINATION/env_${TIMESTAMP}.txt"
    fi
    
    # Create a combined archive
    cd "$BACKUP_DESTINATION"
    tar -czf "full_backup_${TIMESTAMP}.tar.gz" \
        database_${TIMESTAMP}.sql.gz \
        files_${TIMESTAMP}.tar.gz \
        env_${TIMESTAMP}.txt 2>/dev/null || true
    
    log_info "Combined backup created: $BACKUP_DESTINATION/full_backup_${TIMESTAMP}.tar.gz"
}

# Clean old backups
clean_old_backups() {
    log_info "Cleaning old backups (older than $RETENTION_DAYS days)..."
    
    find "$BACKUP_DESTINATION" -name "*.gz" -type f -mtime +$RETENTION_DAYS -delete
    
    log_info "Old backups cleaned"
}

# Send notification
send_notification() {
    local status=$1
    local message=$2
    
    # Add your notification logic here
    # Example: send email, webhook, etc.
    log_info "Backup $status: $message"
}

# Restore database
restore_database() {
    local backup_file=$1
    
    if [ -z "$backup_file" ]; then
        log_error "Please provide a backup file to restore"
        exit 1
    fi
    
    if [ ! -f "$backup_file" ]; then
        log_error "Backup file not found: $backup_file"
        exit 1
    fi
    
    log_info "Restoring database from: $backup_file"
    
    # Extract if compressed
    if [[ $backup_file == *.gz ]]; then
        gunzip -c "$backup_file" | PGPASSWORD=$DB_PASS psql \
            -h $DB_HOST \
            -p $DB_PORT \
            -U $DB_USER \
            -d $DB_NAME
    else
        PGPASSWORD=$DB_PASS psql \
            -h $DB_HOST \
            -p $DB_PORT \
            -U $DB_USER \
            -d $DB_NAME \
            < "$backup_file"
    fi
    
    log_info "Database restoration completed"
}

# Main execution
main() {
    case "${1:-backup}" in
        backup)
            log_info "Starting backup process..."
            create_backup_dir
            backup_database
            backup_files
            backup_env
            save_backups
            clean_old_backups
            send_notification "SUCCESS" "Backup completed successfully"
            log_info "Backup process completed successfully!"
            ;;
        restore)
            log_info "Starting restoration process..."
            restore_database "$2"
            send_notification "SUCCESS" "Restoration completed successfully"
            log_info "Restoration process completed successfully!"
            ;;
        clean)
            log_info "Cleaning old backups..."
            clean_old_backups
            log_info "Cleanup completed!"
            ;;
        *)
            echo "Usage: $0 {backup|restore <backup_file>|clean}"
            exit 1
            ;;
    esac
    
    # Cleanup temporary directory
    rm -rf "$BACKUP_DIR"
}

# Run the script
main "$@"