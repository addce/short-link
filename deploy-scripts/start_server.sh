#!/bin/bash
cd /home/ec2-user/short-link-backend

# 全局安装 pm2（只需第一次）
pm2 -v >/dev/null 2>&1 || npm install -g pm2

# 用 pm2 启动（名字叫 short-link-backend，自动重启、日志等）
pm2 start npm --name "short-link-backend" -- start

# 保存进程列表，下次部署自动恢复
pm2 save
