FROM node:12-alpine as build
WORKDIR /app
COPY . /app/

RUN npm install --silent
RUN npm run build

FROM node:12-alpine
WORKDIR /app

COPY --from=build /app/dist /app/
COPY --from=build /app/src/database /app/src/database

COPY package.json /app/package.json
COPY wait-for-it.sh /app/wait-for-it.sh

# trying to seed db with roles values
COPY check.sh /app/check.sh
COPY .sequelizerc /app/.sequelizerc

RUN npm install --silent
RUN apk add --no-cache bash

EXPOSE 5500