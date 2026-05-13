#!/bin/bash
set -e

echo "==> [Entrypoint] Starting PetAdoption Backend..."

# -------------------------------------------------------
# 1. Cấu hình Apache port lúc RUNTIME từ biến $PORT
#    Render truyền PORT qua env, mặc định 10000
# -------------------------------------------------------
APP_PORT="${PORT:-10000}"
echo "==> [Entrypoint] Configuring Apache to listen on port $APP_PORT"

sed -i "s/Listen 80/Listen $APP_PORT/" /etc/apache2/ports.conf
sed -i "s/:80>/:$APP_PORT>/" /etc/apache2/sites-available/000-default.conf

# -------------------------------------------------------
# 2. Tạo file .env nếu chưa có (dùng .env.example)
# -------------------------------------------------------
if [ ! -f /var/www/html/.env ]; then
    echo "==> [Entrypoint] .env not found, copying from .env.example"
    cp /var/www/html/.env.example /var/www/html/.env
fi

# -------------------------------------------------------
# 3. Ghi các biến môi trường từ Render vào .env
#    (Render inject qua environment variables)
# -------------------------------------------------------
# APP
[ -n "$APP_KEY" ]    && sed -i "s|^APP_KEY=.*|APP_KEY=$APP_KEY|" /var/www/html/.env
[ -n "$APP_URL" ]    && sed -i "s|^APP_URL=.*|APP_URL=$APP_URL|" /var/www/html/.env
sed -i "s|^APP_ENV=.*|APP_ENV=production|" /var/www/html/.env
sed -i "s|^APP_DEBUG=.*|APP_DEBUG=false|" /var/www/html/.env

# DATABASE
[ -n "$DB_CONNECTION" ] && sed -i "s|^DB_CONNECTION=.*|DB_CONNECTION=$DB_CONNECTION|" /var/www/html/.env
[ -n "$DB_HOST" ]       && sed -i "s|^#\?DB_HOST=.*|DB_HOST=$DB_HOST|" /var/www/html/.env
[ -n "$DB_PORT" ]       && sed -i "s|^#\?DB_PORT=.*|DB_PORT=$DB_PORT|" /var/www/html/.env
[ -n "$DB_DATABASE" ]   && sed -i "s|^#\?DB_DATABASE=.*|DB_DATABASE=$DB_DATABASE|" /var/www/html/.env
[ -n "$DB_USERNAME" ]   && sed -i "s|^#\?DB_USERNAME=.*|DB_USERNAME=$DB_USERNAME|" /var/www/html/.env
[ -n "$DB_PASSWORD" ]   && sed -i "s|^#\?DB_PASSWORD=.*|DB_PASSWORD=$DB_PASSWORD|" /var/www/html/.env

# CLOUDINARY
[ -n "$CLOUDINARY_URL" ]           && grep -q "^CLOUDINARY_URL=" /var/www/html/.env \
    && sed -i "s|^CLOUDINARY_URL=.*|CLOUDINARY_URL=$CLOUDINARY_URL|" /var/www/html/.env \
    || echo "CLOUDINARY_URL=$CLOUDINARY_URL" >> /var/www/html/.env

# -------------------------------------------------------
# 4. Chạy artisan commands
# -------------------------------------------------------
echo "==> [Entrypoint] Running artisan commands..."
cd /var/www/html

php artisan config:clear
php artisan cache:clear

echo "==> [Entrypoint] Running migrations..."
php artisan migrate --force

echo "==> [Entrypoint] Running seeders (skip if already seeded)..."
php artisan db:seed --force || echo "==> [Entrypoint] Seeder skipped or already run."

php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "==> [Entrypoint] Starting Apache on port $APP_PORT..."
exec apache2-foreground
