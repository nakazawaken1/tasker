FROM node:lts-alpine
ENV CHOKIDAR_USEPOLLING=true
RUN apk update && apk add git