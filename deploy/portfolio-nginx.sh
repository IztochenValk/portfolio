#!/usr/bin/env bash
# nginx (reverse proxy) + HTTPS + anti-indexation + blocage bots agressifs pour le PORTFOLIO.
# Idempotent : émet le certificat s'il manque, le renouvelle sinon, et réécrit toujours le vhost
# (donc les en-têtes anti-index et le blocage de bots sont ré-appliqués à chaque déploiement).
# À lancer en root.
set -euo pipefail

DOMAIN="florianchague.dev"
EMAIL="florian.chague2@gmail.com"
UPSTREAM="127.0.0.1:3000"
VHOST="/etc/nginx/sites-available/${DOMAIN}"

# Crawlers / archiveurs / scrapers agressifs à bloquer (403).
BADBOTS='(ia_archiver|archive\.org_bot|Wayback|AhrefsBot|SemrushBot|MJ12bot|DotBot|PetalBot|Bytespider|GPTBot|ChatGPT-User|CCBot|ClaudeBot|anthropic-ai|Amazonbot|Applebot-Extended|DataForSeoBot|BLEXBot|serpstatbot|MegaIndex|Screaming Frog)'

write_http_only() {
  cat > "$VHOST" <<NGINX
server {
    listen 80;
    server_name ${DOMAIN};
    location / { proxy_pass http://${UPSTREAM}; proxy_set_header Host \$host; }
}
NGINX
  ln -sf "$VHOST" /etc/nginx/sites-enabled/
}

write_full() {
  cat > "$VHOST" <<NGINX
server {
    listen 80;
    server_name ${DOMAIN};
    return 301 https://\$host\$request_uri;
}
server {
    listen 443 ssl;
    server_name ${DOMAIN};

    ssl_certificate     /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Anti-indexation forte (en plus de la balise meta dans l'appli)
    add_header X-Robots-Tag "noindex, nofollow, noarchive, nosnippet" always;

    # Blocage des crawlers / archiveurs agressifs (Wayback, AhrefsBot, GPTBot, ...)
    if (\$http_user_agent ~* "${BADBOTS}") { return 403; }

    location / {
        proxy_pass http://${UPSTREAM};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
NGINX
  ln -sf "$VHOST" /etc/nginx/sites-enabled/
}

if [ ! -d "/etc/letsencrypt/live/${DOMAIN}" ]; then
  write_http_only
  nginx -t && systemctl reload nginx
  certbot certonly --nginx -d "${DOMAIN}" --non-interactive --agree-tos -m "${EMAIL}"
else
  certbot renew --cert-name "${DOMAIN}" --quiet || true
fi

write_full
nginx -t && systemctl reload nginx
echo "Portfolio : HTTPS + anti-index + anti-bots OK (${DOMAIN})"
