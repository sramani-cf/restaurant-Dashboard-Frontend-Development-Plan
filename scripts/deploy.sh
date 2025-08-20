#!/bin/bash

# Restaurant Dashboard Deployment Script
# Automated deployment to production

set -e

# Configuration
ENVIRONMENT=${DEPLOY_ENV:-"production"}
BRANCH=${DEPLOY_BRANCH:-"main"}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_step "Checking prerequisites..."
    
    # Check Node.js version
    NODE_VERSION=$(node -v | cut -d'v' -f2)
    REQUIRED_NODE="18.0.0"
    
    if [ "$(printf '%s\n' "$REQUIRED_NODE" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_NODE" ]; then
        log_error "Node.js version must be >= $REQUIRED_NODE (current: $NODE_VERSION)"
        exit 1
    fi
    
    # Check Git
    if ! command -v git &> /dev/null; then
        log_error "Git is not installed"
        exit 1
    fi
    
    # Check current branch
    CURRENT_BRANCH=$(git branch --show-current)
    if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
        log_warning "Not on $BRANCH branch (current: $CURRENT_BRANCH)"
        read -p "Continue anyway? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    log_info "Prerequisites check passed"
}

# Run tests
run_tests() {
    log_step "Running tests..."
    
    # Run linting
    log_info "Running ESLint..."
    npm run lint || {
        log_error "Linting failed"
        exit 1
    }
    
    # Run type checking
    log_info "Running TypeScript type check..."
    npm run type-check || {
        log_error "Type checking failed"
        exit 1
    }
    
    # Run unit tests
    log_info "Running unit tests..."
    npm run test:ci || {
        log_error "Unit tests failed"
        exit 1
    }
    
    # Run E2E tests (optional for production deployment)
    if [ "$RUN_E2E_TESTS" = "true" ]; then
        log_info "Running E2E tests..."
        npm run test:e2e:headless || {
            log_error "E2E tests failed"
            exit 1
        }
    fi
    
    log_info "All tests passed"
}

# Build application
build_application() {
    log_step "Building application..."
    
    # Clean previous build
    rm -rf .next
    
    # Build for production
    NODE_ENV=production npm run build || {
        log_error "Build failed"
        exit 1
    }
    
    # Check build output
    if [ ! -d ".next" ]; then
        log_error "Build output not found"
        exit 1
    fi
    
    log_info "Build completed successfully"
}

# Database migrations
run_migrations() {
    log_step "Running database migrations..."
    
    # Check if Prisma is being used
    if [ -f "prisma/schema.prisma" ]; then
        log_info "Running Prisma migrations..."
        npx prisma migrate deploy || {
            log_error "Database migration failed"
            exit 1
        }
        
        # Generate Prisma client
        npx prisma generate
    else
        log_warning "No Prisma schema found, skipping migrations"
    fi
    
    log_info "Migrations completed"
}

# Deploy to Vercel
deploy_vercel() {
    log_step "Deploying to Vercel..."
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        log_info "Installing Vercel CLI..."
        npm i -g vercel
    fi
    
    # Deploy based on environment
    if [ "$ENVIRONMENT" = "production" ]; then
        log_info "Deploying to production..."
        vercel --prod --yes || {
            log_error "Vercel deployment failed"
            exit 1
        }
    else
        log_info "Deploying to preview..."
        vercel --yes || {
            log_error "Vercel deployment failed"
            exit 1
        }
    fi
    
    log_info "Vercel deployment completed"
}

# Deploy to AWS
deploy_aws() {
    log_step "Deploying to AWS..."
    
    # Check AWS CLI
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI is not installed"
        exit 1
    fi
    
    # Build Docker image
    log_info "Building Docker image..."
    docker build -t restaurant-dashboard:$TIMESTAMP .
    
    # Tag for ECR
    docker tag restaurant-dashboard:$TIMESTAMP \
        $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/restaurant-dashboard:$TIMESTAMP
    
    # Push to ECR
    log_info "Pushing to ECR..."
    aws ecr get-login-password --region $AWS_REGION | \
        docker login --username AWS --password-stdin \
        $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
    
    docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/restaurant-dashboard:$TIMESTAMP
    
    # Update ECS service
    log_info "Updating ECS service..."
    aws ecs update-service \
        --cluster restaurant-cluster \
        --service restaurant-dashboard \
        --force-new-deployment
    
    log_info "AWS deployment completed"
}

# Health check
health_check() {
    log_step "Running health check..."
    
    # Wait for deployment to be ready
    sleep 30
    
    # Check application health
    HEALTH_URL="${APP_URL:-https://dashboard.yourrestaurant.com}/api/health"
    
    for i in {1..10}; do
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$HEALTH_URL")
        
        if [ "$HTTP_CODE" = "200" ]; then
            log_info "Health check passed"
            return 0
        fi
        
        log_warning "Health check attempt $i failed (HTTP $HTTP_CODE)"
        sleep 10
    done
    
    log_error "Health check failed after 10 attempts"
    return 1
}

# Rollback deployment
rollback() {
    log_error "Deployment failed, initiating rollback..."
    
    if [ "$DEPLOY_PLATFORM" = "vercel" ]; then
        # Vercel rollback
        vercel rollback --yes
    elif [ "$DEPLOY_PLATFORM" = "aws" ]; then
        # AWS rollback - revert to previous task definition
        aws ecs update-service \
            --cluster restaurant-cluster \
            --service restaurant-dashboard \
            --task-definition restaurant-dashboard:$(($TASK_REVISION - 1))
    fi
    
    log_info "Rollback completed"
}

# Send deployment notification
send_notification() {
    local status=$1
    local message=$2
    local deployment_url=$3
    
    # Slack notification
    if [ ! -z "$SLACK_WEBHOOK_URL" ]; then
        SLACK_MESSAGE=$(cat <<EOF
{
    "text": "Deployment $status",
    "attachments": [{
        "color": $([ "$status" = "SUCCESS" ] && echo "\"good\"" || echo "\"danger\""),
        "fields": [
            {"title": "Environment", "value": "$ENVIRONMENT", "short": true},
            {"title": "Branch", "value": "$BRANCH", "short": true},
            {"title": "Timestamp", "value": "$TIMESTAMP", "short": true},
            {"title": "URL", "value": "$deployment_url", "short": false},
            {"title": "Message", "value": "$message", "short": false}
        ]
    }]
}
EOF
)
        curl -X POST -H 'Content-type: application/json' \
            --data "$SLACK_MESSAGE" \
            "$SLACK_WEBHOOK_URL"
    fi
    
    # Email notification
    if [ ! -z "$NOTIFICATION_EMAIL" ]; then
        echo -e "Deployment $status\n\nEnvironment: $ENVIRONMENT\nBranch: $BRANCH\nTimestamp: $TIMESTAMP\nURL: $deployment_url\n\n$message" | \
            mail -s "Restaurant Dashboard Deployment $status" "$NOTIFICATION_EMAIL"
    fi
}

# Main deployment flow
main() {
    log_info "Starting deployment to $ENVIRONMENT at $TIMESTAMP"
    
    # Set deployment platform
    DEPLOY_PLATFORM=${DEPLOY_PLATFORM:-"vercel"}
    
    # Trap errors for rollback
    trap 'handle_error' ERR
    
    # Deployment steps
    check_prerequisites
    run_tests
    build_application
    run_migrations
    
    # Deploy based on platform
    if [ "$DEPLOY_PLATFORM" = "vercel" ]; then
        deploy_vercel
        DEPLOYMENT_URL=$(vercel inspect --json | jq -r '.url')
    elif [ "$DEPLOY_PLATFORM" = "aws" ]; then
        deploy_aws
        DEPLOYMENT_URL="https://dashboard.yourrestaurant.com"
    else
        log_error "Unknown deployment platform: $DEPLOY_PLATFORM"
        exit 1
    fi
    
    # Post-deployment
    health_check || {
        rollback
        send_notification "FAILED" "Health check failed, deployment rolled back" "$DEPLOYMENT_URL"
        exit 1
    }
    
    log_info "Deployment completed successfully!"
    send_notification "SUCCESS" "Deployment completed successfully" "$DEPLOYMENT_URL"
}

# Error handler
handle_error() {
    log_error "Deployment failed at step!"
    rollback
    send_notification "FAILED" "Deployment failed and rolled back" ""
    exit 1
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -e|--environment)
            ENVIRONMENT="$2"
            shift
            shift
            ;;
        -b|--branch)
            BRANCH="$2"
            shift
            shift
            ;;
        -p|--platform)
            DEPLOY_PLATFORM="$2"
            shift
            shift
            ;;
        --skip-tests)
            SKIP_TESTS=true
            shift
            ;;
        --run-e2e)
            RUN_E2E_TESTS=true
            shift
            ;;
        -h|--help)
            echo "Usage: deploy.sh [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  -e, --environment ENV    Deployment environment (staging/production)"
            echo "  -b, --branch BRANCH      Git branch to deploy"
            echo "  -p, --platform PLATFORM  Deployment platform (vercel/aws)"
            echo "  --skip-tests             Skip running tests"
            echo "  --run-e2e                Run E2E tests"
            echo "  -h, --help               Show this help message"
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Run deployment
main