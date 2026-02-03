FROM php:8.4-cli-alpine AS vendor

RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin --filename=composer

COPY composer.json composer.lock /app/

WORKDIR /app

RUN composer install --optimize-autoloader --no-scripts

FROM php:8.4-fpm-alpine

WORKDIR /var/www/html

RUN apk add --no-cache \
    mysql-dev \
    libzip-dev \
    oniguruma-dev \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        mbstring \
        zip

COPY opcache.ini /usr/local/etc/php/conf.d/opcache.ini
COPY fpm-pool.conf /usr/local/etc/php-fpm.d/www.conf

COPY --from=vendor /app/vendor ./vendor

COPY . .

RUN rm -f bootstrap/cache/packages.php
RUN php artisan package:discover

RUN chown -R www-data:www-data storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
