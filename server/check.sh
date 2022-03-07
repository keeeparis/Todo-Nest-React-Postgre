#!/usr/bin/env bash

npm run migration:run
npm run migration:seed

npm run start:prod
