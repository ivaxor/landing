#!/bin/bash
set -xe
: "${URLS_GITHUB?URLS_GITHUB argument was not provided}"
: "${URLS_DOCKER?URLS_DOCKER argument was not provided}"

sed -i "s|URLS_GITHUB|$URLS_GITHUB|g" /usr/share/nginx/html/main*.js
sed -i "s|URLS_DOCKER|$URLS_DOCKER|g" /usr/share/nginx/html/main*.js

exec "$@"