FROM nginx:1.29.4 AS base
RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir -p /var/cache/nginx/media
COPY nginx.conf /etc/nginx/nginx.conf
COPY includes/ /etc/nginx/includes/

FROM base AS dev
COPY conf.d/dev.conf /etc/nginx/conf.d/

FROM base AS prod
COPY conf.d/prod.conf /etc/nginx/conf.d/