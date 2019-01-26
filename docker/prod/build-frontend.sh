#!/usr/bin/env bash
docker run --rm -v $(pwd)/../../frontend:/app -w /app teracy/angular-cli:1.7.4 ng build --prod