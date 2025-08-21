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
    rm -rf out
    
    # Build for production
    NODE_ENV=production npm run build || {
        log_error "Build failed"
        exit 1
    }
    
    # Check build output
    if [ ! -d ".next" ] && [ ! -d "out" ]; then
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

# Deploy to production server
deploy_production() {
    log_step "Deploying to production..."
    
    # This is a placeholder for your custom deployment
    # You can add your own deployment logic here
    # For example: rsync, scp, custom scripts, etc.
    
    log_info "Building production bundle..."
    
    # Create deployment package
    DEPLOY_DIR="deploy_${TIMESTAMP}"
    mkdir -p $DEPLOY_DIR
    
    # Copy necessary files
    cp -r .next $DEPLOY_DIR/ 2>/dev/null || true
    cp -r out $DEPLOY_DIR/ 2>/dev/null || true
    cp -r public $DEPLOY_DIR/
    cp package.json $DEPLOY_DIR/
    cp package-lock.json $DEPLOY_DIR/
    
    log_info "Deployment package created: $DEPLOY_DIR"
    
    # Add your custom deployment commands here
    # Example: rsync -avz $DEPLOY_DIR/ user@server:/path/to/app/
    
    log_info "Deployment completed"
}

# Health check
health_check() {
    log_step "Running health check..."
    
    # Add your health check logic here
    # Example: curl your production URL
    
    log_info "Health check passed"
    return 0
}

# Send deployment notification
send_notification() {
    local status=$1
    local message=$2
    
    log_info "Deployment $status: $message"
    
    # Add your notification logic here
    # Example: send email, webhook, etc.
}

# Main deployment flow
main() {
    log_info "Starting deployment to $ENVIRONMENT at $TIMESTAMP"
    
    # Deployment steps
    check_prerequisites
    run_tests
    build_application
    run_migrations
    deploy_production
    
    # Post-deployment
    health_check || {
        log_error "Health check failed"
        send_notification "FAILED" "Health check failed"
        exit 1
    }
    
    log_info "Deployment completed successfully!"
    send_notification "SUCCESS" "Deployment completed successfully"
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