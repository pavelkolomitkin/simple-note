#!/usr/bin/env bash
docker container run --rm -v $(pwd)/../../frontend:/app -w /app teracy/angular-cli:1.7.4 npm install && ng build --prod