FROM php:8.2-apache

# Cài đặt các thư viện cần thiết
RUN apt-get update && apt-get install -y \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libwebp-dev \
    zip \
    unzip \
    curl \
    && docker-php-ext-configure gd --with-jpeg --with-webp \
    && docker-php-ext-install pdo pdo_mysql zip gd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Bật Apache mod_rewrite cho Laravel
RUN a2enmod rewrite

# Định cấu hình Document Root vào thư mục public của Laravel
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Thêm AllowOverride All để .htaccess của Laravel hoạt động
RUN sed -i 's/<Directory \/var\/www\/>/\<Directory \/var\/www\/>\n\tAllowOverride All/' /etc/apache2/apache2.conf

# Copy toàn bộ source vào container
COPY . /var/www/html

# Cài đặt Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Cài đặt PHP dependencies (có --no-scripts để tránh lỗi artisan lúc build)
RUN composer install --no-dev --optimize-autoloader --no-scripts \
    && composer dump-autoload --optimize

# Phân quyền cho Laravel storage và cache
RUN mkdir -p /var/www/html/storage/logs \
              /var/www/html/storage/app/public \
              /var/www/html/storage/framework/cache \
              /var/www/html/storage/framework/sessions \
              /var/www/html/storage/framework/views \
              /var/www/html/bootstrap/cache \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Copy và cấp quyền entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Port mặc định 10000 (Render thường dùng port này)
EXPOSE 10000

ENTRYPOINT ["docker-entrypoint.sh"]
