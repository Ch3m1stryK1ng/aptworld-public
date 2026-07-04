#!/bin/bash
set -u
CERT_DIR="/etc/pki/tls/certs"
KEY_DIR="/etc/pki/tls/private"
CERT_FILE="${CERT_DIR}/cf-origin.crt"
KEY_FILE="${KEY_DIR}/cf-origin.key"
SSL_CONF="/etc/nginx/conf.d/zzz-origin-ssl.conf"
SERVER_NAME="${CF_ORIGIN_SERVER_NAME:-_}"

log(){ echo "[origin-ssl] $*"; }
mkdir -p "$CERT_DIR" "$KEY_DIR"

if [[ -n "${CF_ORIGIN_CERT_S3:-}" && -n "${CF_ORIGIN_KEY_S3:-}" ]]; then
  log "fetching cert/key from S3"
  aws s3 cp "${CF_ORIGIN_CERT_S3}" "$CERT_FILE"  --only-show-errors || { log "S3 cert download failed"; exit 0; }
  aws s3 cp "${CF_ORIGIN_KEY_S3}"  "$KEY_FILE"   --only-show-errors || { log "S3 key download failed";  exit 0; }
elif [[ -n "${CF_ORIGIN_CERT_SSM:-}" && -n "${CF_ORIGIN_KEY_SSM:-}" ]]; then
  log "fetching cert/key from SSM"
  aws ssm get-parameter --name "${CF_ORIGIN_CERT_SSM}" --with-decryption --query Parameter.Value --output text > "$CERT_FILE" 2>/dev/null || { log "SSM cert fetch failed"; exit 0; }
  aws ssm get-parameter --name "${CF_ORIGIN_KEY_SSM}"  --with-decryption --query Parameter.Value --output text > "$KEY_FILE"  2>/dev/null || { log "SSM key fetch failed";  exit 0; }
elif [[ -n "${CF_ORIGIN_CERT_B64:-}" && -n "${CF_ORIGIN_KEY_B64:-}" ]]; then
  log "decoding cert/key from ENV base64"
  echo "${CF_ORIGIN_CERT_B64}" | base64 -d > "$CERT_FILE" 2>/dev/null || { log "cert base64 decode failed"; exit 0; }
  echo "${CF_ORIGIN_KEY_B64}"  | base64 -d > "$KEY_FILE"  2>/dev/null || { log "key base64 decode failed";  exit 0; }
else
  log "no source vars provided; skipping 443 setup"
  rm -f "$SSL_CONF" 2>/dev/null || true
  systemctl reload nginx 2>/dev/null || true
  exit 0
fi

chmod 600 "$KEY_FILE"; chown root:root "$CERT_FILE" "$KEY_FILE" 2>/dev/null || true

cat > "$SSL_CONF" <<EOF
server {
  listen 443 ssl http2;
  server_name ${SERVER_NAME};
  ssl_certificate     ${CERT_FILE};
  ssl_certificate_key ${KEY_FILE};
  client_max_body_size 25M;
  keepalive_timeout 65;
  location / {
    proxy_pass         http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header   Connection "";
    proxy_set_header   Host \$host;
    proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto \$scheme;
    proxy_read_timeout 120s;
    proxy_send_timeout 120s;
  }
}
EOF

if nginx -t; then
  systemctl reload nginx || systemctl restart nginx || true
  log "443 ready for ${SERVER_NAME}"
else
  log "nginx config test failed; keeping :80 only"
fi
