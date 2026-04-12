#!/bin/bash
set -e

# ========================================
# Ordu Çilingir - VPS Deploy Script
# ========================================
# Kullanım: bash deploy.sh
# Konum: /var/www/orducilingircim/

APP_DIR="/var/www/orducilingircim"
DOMAIN="altinorducilingircim.com.tr"

echo "=== Ordu Çilingir Deploy ==="

# 1. .env kontrolü
if [ ! -f "$APP_DIR/.env" ]; then
  echo "❌ .env dosyası bulunamadı!"
  echo "   cp $APP_DIR/.env.production $APP_DIR/.env && nano $APP_DIR/.env"
  exit 1
fi

source "$APP_DIR/.env"
if [ "$DB_PASSWORD" = "CHANGE_ME_STRONG_DB_PASSWORD" ] || [ "$JWT_SECRET" = "CHANGE_ME_GENERATE_WITH_OPENSSL_RAND_HEX_32" ]; then
  echo "❌ .env dosyasındaki şifreleri değiştirin!"
  exit 1
fi

cd "$APP_DIR"

# 2. PostgreSQL kontrolü (host'taki PostgreSQL kullanılıyor)
echo "🔍 PostgreSQL kontrolü..."
if ! sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw ordu_cilingir; then
  echo "⚠️  PostgreSQL'de ordu_cilingir DB bulunamadı!"
  echo "   Şu komutları çalıştır:"
  echo "   sudo -u postgres psql"
  echo "   CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';"
  echo "   CREATE DATABASE ordu_cilingir OWNER ${DB_USER};"
  echo "   GRANT ALL PRIVILEGES ON DATABASE ordu_cilingir TO ${DB_USER};"
  echo "   \\q"
  echo ""
  read -p "PostgreSQL kurulumu tamamlandı mı? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# 3. Build & start
echo "🔨 Container'lar build ediliyor..."
docker compose build --no-cache app

echo "🚀 Redis başlatılıyor..."
docker compose up -d redis
echo "⏳ Veritabanı hazır olana kadar bekleniyor..."
sleep 5

# 3. Prisma migration & seed
echo "📦 Migration çalıştırılıyor..."
docker compose run --rm app npx prisma migrate deploy

echo "🌱 Seed çalıştırılıyor..."
docker compose run --rm app npx tsx scripts/seed.ts

# 4. App başlat
echo "🚀 Uygulama başlatılıyor..."
docker compose up -d app

# 5. Nginx config
echo "📋 Nginx config kopyalanıyor..."
sudo cp "$APP_DIR/nginx-site.conf" "/etc/nginx/sites-available/$DOMAIN"
sudo ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
sudo nginx -t && sudo systemctl reload nginx

echo ""
echo "✅ Deploy tamamlandı!"
echo ""
echo "🌐 Site: https://$DOMAIN"
echo "🔐 Admin: https://$DOMAIN/admin"
echo "📧 Giriş: admin@altinorducilingircim.com.tr / admin123"
echo ""
echo "⚠️  Cloudflare DNS'te A kaydını VPS IP'sine yönlendirmeyi unutma!"
echo "⚠️  Cloudflare SSL ayarını 'Flexible' veya 'Full' olarak ayarla."
