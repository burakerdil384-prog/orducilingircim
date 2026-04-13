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

# 2. PostgreSQL kontrolü
echo "🔍 PostgreSQL kontrolü..."
if ! sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw ordu_cilingir; then
  echo "📦 PostgreSQL kurulumu yapılıyor..."
  sudo -u postgres psql <<-EOSQL
    CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';
    CREATE DATABASE ordu_cilingir OWNER ${DB_USER};
    GRANT ALL PRIVILEGES ON DATABASE ordu_cilingir TO ${DB_USER};
EOSQL
  echo "✅ PostgreSQL user ve database oluşturuldu."
fi

# 3. Nginx cache klasörü
echo "📂 Nginx cache klasörü hazırlanıyor..."
sudo mkdir -p /var/cache/nginx/orducilingir
sudo chown www-data:www-data /var/cache/nginx/orducilingir

# 4. Build (eski container çalışmaya devam eder, cache'den servis edilir)
echo "🔨 Container build ediliyor..."
docker compose build --no-cache app

# 5. Prisma migration & seed
echo "📦 Migration çalıştırılıyor..."
# migrate deploy önce, yoksa db push ile tabloları oluştur
docker compose run --rm app npx prisma migrate deploy || {
  echo "⚠️  Migration bulunamadı, db push ile tablolar oluşturuluyor..."
  sudo -u postgres psql -c "ALTER USER ${DB_USER} CREATEDB;" 2>/dev/null || true
  docker compose run --rm app npx prisma db push
  sudo -u postgres psql -c "ALTER USER ${DB_USER} NOCREATEDB;" 2>/dev/null || true
}

echo "🌱 Seed çalıştırılıyor..."
docker compose run --rm app npx tsx scripts/seed.ts

# 6. Zero-downtime restart (eski container durur, yeni başlar, cache servis eder)
echo "🚀 Uygulama başlatılıyor (zero-downtime)..."
docker compose up -d --remove-orphans --force-recreate app

# 7. Nginx config
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
