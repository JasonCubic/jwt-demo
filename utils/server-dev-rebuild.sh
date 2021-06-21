#!/bin/bash

if [ ! -f .env ]; then
  echo "ERROR: .env file does not exist.  Exiting script."
  echo "You can rename the file .env.default to .env to resolve this error."
  exit 1
fi

# https://gist.github.com/judy2k/7656bfe3b322d669ef75364a46327836#gistcomment-3625311
# https://stackoverflow.com/questions/43108359/how-to-remove-all-special-characters-in-linux-text/43108392#43108392
set -a
source <(cat .env | sed -e 's/[^[:print:]\t]//g')
set +a

docker compose -f ./docker/docker-compose.dev.yml build --no-cache \
  --build-arg NODE_ENV=development \
  --build-arg HTTP_PROXY=$HTTP_PROXY \
  --build-arg HTTPS_PROXY=$HTTPS_PROXY \
  --build-arg ACCESS_TOKEN_SECRET=$ACCESS_TOKEN_SECRET \
  --build-arg REFRESH_TOKEN_SECRET=$REFRESH_TOKEN_SECRET
