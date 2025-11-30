#!/bin/bash

export PATH="/home/ec2-user/node-v24.11.1-linux-x64/bin:$PATH"

cd /home/ec2-user/short-link-backend/backend

# 生产环境清理并重新安装（比 npm install 更可靠）
rm -rf node_modules package-lock.json
npm ci --only=production   # 只安装 dependencies，不装 devDependencies，体积小很多

# 给权限
chmod -R 755 .
