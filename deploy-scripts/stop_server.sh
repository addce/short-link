#!/bin/bash
cd /home/ec2-user/short-link-backend

# 如果你用 pm2
pm2 delete short-link-backend 2>/dev/null || true

