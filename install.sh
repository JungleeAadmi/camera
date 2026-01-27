#!/bin/bash

# ==========================================
# JUST CAMERA - PROXMOX INSTALLER
# ==========================================

set -e

# 1. System Updates & Dependencies
echo ">>> [1/5] Updating System..."
apt-get update -y
apt-get install -y curl git build-essential

# 2. Install Node.js (LTS)
echo ">>> [2/5] Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
    apt-get install -y nodejs
fi

# 3. Setup Application Directory
APP_DIR="/opt/camera"
REPO_URL="https://github.com/JungleeAadmi/camera.git"

echo ">>> [3/5] Setting up 'Just Camera' at $APP_DIR..."

# Check if directory exists
if [ -d "$APP_DIR" ]; then
    echo "Directory exists. Pulling latest changes..."
    cd "$APP_DIR"
    git pull
else
    echo "Cloning repository..."
    git clone "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# 4. Install Dependencies
echo ">>> [4/5] Installing Node Dependencies..."
npm install

# 5. Setup Systemd Service
echo ">>> [5/5] Configuring Service..."
cat <<EOF > /etc/systemd/system/just-camera.service
[Unit]
Description=Just Camera Web App
After=network.target

[Service]
ExecStart=/usr/bin/node server.js
WorkingDirectory=$APP_DIR
Restart=always
User=root
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable just-camera
systemctl restart just-camera

# Final Output
IP_ADDR=$(hostname -I | cut -d' ' -f1)
echo ""
echo "=========================================================="
echo "   JUST CAMERA INSTALLED SUCCESSFULLY"
echo "=========================================================="
echo "Access at: http://$IP_ADDR:3000"
echo "Note: Configure Nginx Proxy Manager to point to this IP:Port"
echo "=========================================================="