FROM node:12-alpine as build
WORKDIR /app
COPY . /app/

RUN npm install --silent
RUN npm run build

FROM node:12-alpine
WORKDIR /app

COPY --from=build /app/dist /app/
COPY package.json /app/package.json
COPY wait-for-it.sh /app/wait-for-it.sh

RUN npm install --silent
RUN apk add --no-cache bash

EXPOSE 5500