#!/bin/bash

# Configuration
REPO_PATH="/home/jsclimbe/repositories/bfptec"
APP_NAME="bfptec.jsclimber.ir"
LOG_FILE="/home/jsclimbe/deploy_bfptec.log"
HTACCESS="/home/jsclimbe/bfptec.jsclimber.ir/.htaccess"

# Start logging
exec > >(tee -a "$LOG_FILE")
exec 2>&1

echo "===== Starting deployment at $(date) ====="

# Step 1: Navigate to the repository
echo "Navigating to the repository..."
cd "$REPO_PATH" || { echo "Failed to navigate to $REPO_PATH"; exit 1; }

# Step 2: Git pull
echo "Pulling latest changes from GitHub..."
retry_count=0
max_retries=3

until git pull origin main || [ "$retry_count" -ge "$max_retries" ]; do
    retry_count=$((retry_count+1))
    echo "Git pull failed. Retrying... ($retry_count/$max_retries)"
    sleep 5
done
if [ "$retry_count" -ge "$max_retries" ]; then
    echo "Git pull failed after $max_retries attempts." >&2
    exit 1
else
    echo "Git pull completed."
fi

# Step 3: Cache and dependencies cleanup
echo "Clearing .next cache, node_modules, and npm cache..."
rm -rf .next node_modules
npm cache clean --force

# Step 4: Install dependencies
echo "Installing production dependencies..."
if npm install; then
    echo "Dependencies installed successfully."
else
    echo "Dependency installation failed." >&2
    exit 1
fi

# Step 5: Build project
echo "Building the project..."
if npm run build; then
    echo "Build completed successfully."
else
    echo "Build failed." >&2
    exit 1
fi

# Step 6: Delete .htaccess file 
echo "Deleting .htaccess file"
rm -rf "$HTACCESS"

# Step 7: Ensure the public directory exists
echo "Checking public directory..."
if [ ! -d "$REPO_PATH/public" ]; then
    mkdir -p "$REPO_PATH/public"
    echo "Public directory created."
else
    echo "Public directory exists."
fi

# Step 8: Restart the application
echo "Restarting application with PM2..."
if pm2 restart "$APP_NAME" --update-env; then
    echo "Application restarted successfully."
else
    echo "Application restart failed." >&2
    exit 1
fi

echo "===== Deployment completed successfully at $(date) ====="
