#!/bin/bash

# Configuration
TEMP_BUILD_PATH="/home/bfptecir/repositories/bfptec-temp"
HTACCESS="/home/bfptecir/bfptec.ir/.htaccess"
REPO_PATH="/home/bfptecir/repositories/bfptec"
LOG_FILE="/home/bfptecir/deploy_bfptec.log"
APP_NAME="bfptec.ir"
MAX_RETRIES=3

# Start logging
exec > >(tee -a "$LOG_FILE")
exec 2>&1

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

log "===== Starting deployment ====="

# Step 1: Copy Repository
log "Copying repository to temporary path..."
if cp -R "$REPO_PATH" "$TEMP_BUILD_PATH"; then
    log "Repository copied successfully."
else
    log "Failed to copy repository." >&2
    exit 1
fi

cd "$TEMP_BUILD_PATH" || { log "Failed to navigate to $TEMP_BUILD_PATH"; exit 1; }

# Step 2: Pull Latest Changes
log "Pulling latest changes from GitHub..."
retry_count=0

until git pull origin main || [ "$retry_count" -ge "$MAX_RETRIES" ]; do
    retry_count=$((retry_count + 1))
    log "Git pull failed. Retrying... ($retry_count/$MAX_RETRIES)"
    sleep 5
done

if [ "$retry_count" -ge "$MAX_RETRIES" ]; then
    log "Git pull failed after $MAX_RETRIES attempts." >&2
    exit 1
else
    log "Git pull completed."
fi

# Step 3: Clear Cache and Dependencies
log "Clearing .next cache and node_modules..."
rm -rf .next node_modules || { log "Failed to clear cache or node_modules." >&2; exit 1; }

log "Clearing npm cache..."
npm cache clean --force || { log "Failed to clear npm cache." >&2; exit 1; }

# Step 4: Install Dependencies
log "Installing dependencies..."
if npm install --omit=optional --force; then
    log "Dependencies installed successfully."
else
    log "Failed to install dependencies." >&2
    exit 1
fi

# Step 5: Build Project
log "Building the project..."
if npm run build; then
    log "Build completed successfully."
else
    log "Build failed." >&2
    exit 1
fi

# Step 6: Clear .htaccess Content
log "Clearing .htaccess file while keeping the first 5 lines..."
if head -n 5 "$HTACCESS" > "${HTACCESS}.tmp" && mv "${HTACCESS}.tmp" "$HTACCESS"; then
    log ".htaccess file cleared successfully."
else
    log "Failed to clear .htaccess file." >&2
    exit 1
fi

# Step 7: Ensure Public Directory Exists
log "Checking if public directory exists..."
if [ ! -d "$REPO_PATH/public" ]; then
    mkdir -p "$REPO_PATH/public"
    log "Public directory created."
else
    log "Public directory already exists."
fi

# Step 8: Deploy to Live Directory
log "Syncing files to live directory..."
if rsync -a --delete "$TEMP_BUILD_PATH/" "$REPO_PATH/"; then
    log "Files synced successfully."
else
    log "Failed to sync files." >&2
    exit 1
fi

# Step 9: Cleanup Temporary Build Directory
log "Cleaning up temporary build directory..."
if rm -rf "$TEMP_BUILD_PATH"; then
    log "Temporary build directory removed."
else
    log "Failed to remove temporary build directory." >&2
    exit 1
fi

# Step 10: Rebuild Application
cd "$REPO_PATH" || { log "Failed to navigate to live directory $REPO_PATH"; exit 1; }
log "Rebuilding application..."
if npm run build; then
    log "Application rebuilt successfully."
else
    log "Failed to rebuild application." >&2
    exit 1
fi

# Step 11: Reload Application
log "Reloading application with PM2..."
if pm2 reload "$APP_NAME" --update-env; then
    log "Application reloaded successfully."
else
    log "Failed to reload application." >&2
    exit 1
fi

log "===== Deployment completed successfully ====="
