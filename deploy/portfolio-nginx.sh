#!/usr/bin/env bash
# Configuration idempotente de nginx (reverse proxy) + HTTPS (Let's Encrypt) pour le PORTFOLIO,
# avec en-tête anti-indexation X-Robots-Tag sur TOUTES les réponses.
# À lancer en root (sudo). Émet le certificat s'il manque, le renouvelle s'il expire bientôt.
set -euo pipefail

DOMAIN="florianchague.dev"
EMAIL="florian.chague2@gmail.com"
VHOST="/etc/nginx/sites-available/${DOMAIN}"

# 1. Vhost nginx (créé seulement s'il manque)
if [ ! -f "$VHOST" ]; then
  cat > "$VHOST" <<'NGINX'
server {
    listen 80;
    server_name florianchague.dev www.florianchague.dev;

    # === Anti-indexation "à tout prix" : en-tête sur toutes les réponses ===
    add_header X-Robots-Tag "noindex, nofollow, noarchive, nosnippet" always;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX
  ln -sf "$VHOST" /etc/nginx/sites-enabled/
fi

nginx -t && systemctl reload nginx

# 2. Certificat : émis s'il manque (nouveau), sinon renouvelé s'il expire bientôt.
if [ ! -d "/etc/letsencrypt/live/${DOMAIN}" ]; then
  certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" --non-interactive --agree-tos -m "${EMAIL}" --redirect
else
  certbot renew --cert-name "${DOMAIN}" --quiet
fi
systemctl reload nginx

echo "Portfolio en ligne + anti-index OK pour ${DOMAIN}"
