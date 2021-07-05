FROM nginx:1.18
USER root
ADD ./dist /site/html
ADD nginx.conf /etc/nginx/nginx.conf
