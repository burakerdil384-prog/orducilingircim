#!/bin/bash
set -e

# ========================================
# Ordu Çilingir - VPS Deploy Script
# ========================================
# Usage: bash deploy.sh

DOMAIN="altinorducilingircim.com.tr"
APP_DIR="/opt/orducilingir"

echo "=== Ordu Çilingir Deploy ==="

# 1. Check .env exists
if [ ! -f .env ]; then
  echo "❌ .env dosyası bulunamadı!"
  echo "   cp .env.production .env && nano .env"
  exit 1
fi

# 2. Source env for validation
source .env
if [ "$DB_PASSWORD" = "CHANGE_ME_STRONG_DB_PASSWORD" ] || [ "$JWT_SECRET" = "CHANGE_ME_GENERATE_WITH_OPENSSL_RAND_HEX_32" ]; then
  echo "❌ .env dosyasındaki şifreleri değiştirin!"
  exit 1
fi

# 3. Build and start containers
echo "🔨 Container'lar build ediliyor..."
docker compose build --no-cache app

echo "🚀 Container'lar başlatılıyor..."
docker compose up -d postgres redis
echo "⏳ Veritabanı hazır olana kadar bekleniyor..."
sleep 5

# 4. Run Prisma migrations
echo "📦 Veritabanı migration'ları çalıştırılıyor..."
docker compose run --rm app npx prisma migrate deploy

# 5. Seed database
echo "🌱 Veritabanı seed ediliyor..."
docker compose run --rm app npx tsx scripts/seed.ts

# 6. Start the app
echo "🚀 Uygulama başlatılıyor..."
docker compose up -d

echo ""
echo "✅ Deploy tamamlandı!"
echo ""
echo "📋 Sonraki adımlar:"
echo "   1. SSL sertifikası al:"
echo "      docker compose run --rm certbot certbot certonly --webroot -w /var/www/certbot -d $DOMAIN -d www.$DOMAIN"
echo ""
echo "   2. Nginx'i yeniden başlat:"
echo "      docker compose restart nginx"
echo ""
echo "   3. Kontrol et:"
echo "      curl -I https://$DOMAIN"
echo ""
echo "   Admin panel: https://$DOMAIN/admin"
