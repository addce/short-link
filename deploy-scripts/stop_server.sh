#!/bin/bash
export PATH="/home/ec2-user/node-v24.11.1-linux-x64/bin:$PATH"

cd /home/ec2-user/short-link-backend/backend
# 如果你用 pm2
pm2 delete short-link-backend 2>/dev/null || true

