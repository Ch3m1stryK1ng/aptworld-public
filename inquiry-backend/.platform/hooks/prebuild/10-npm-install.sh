#!/bin/bash
set -euxo pipefail
cd /var/app/staging
if [ -f package-lock.json ]; then
  npm ci --omit=dev
else
  npm install --omit=dev
fi

node -e "require.resolve('multer'); console.log('multer ok')"
