#!/bin/bash

# Database backup script
echo "💾 Creating database backup..."

# Create backup directory
mkdir -p backups

# Generate filename with timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backups/chat-app_backup_$TIMESTAMP.gz"

# Create MongoDB backup
docker exec chat-mongodb-prod mongodump --archive | gzip > $BACKUP_FILE

echo "✅ Backup created: $BACKUP_FILE"
echo "📁 Backup size: $(ls -lh $BACKUP_FILE | awk '{print $5}')"