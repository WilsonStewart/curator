#!/bin/bash
# generate-dev-certs.sh

mkdir -p certs/curator.bellbellbell.com

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout support-services/nginx/certs/curator-dev.bellbellbell.com/privkey.pem \
  -out support-services/nginx/certs/curator-dev.bellbellbell.com/fullchain.pem \
  -subj "/CN=curator.bellbellbell.com"

echo "Self-signed certificates generated in certs/"