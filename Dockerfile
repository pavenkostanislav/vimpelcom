FROM node:10-alpine

COPY ./ /app

WORKDIR /app

RUN rm -rf ./package-lock.json
RUN npm run build
RUN apk add nginx

RUN cp -r /app/dist/* /app

COPY nginx.conf /etc/nginx/nginx.conf

COPY mime.types /etc/nginx/mime.types

COPY gzip.conf /etc/nginx/gzip.conf

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE  9015/tcp

CMD [ "/usr/sbin/nginx" ]