#!/bin/bash

if [ ! -f .env ]; then
  echo "ERROR: .env file does not exist.  Exiting script."
  echo "You can rename the file .env.default to .env to resolve this error."
  exit 1
fi

set -a
# shellcheck source=.env
# shellcheck disable=SC1091
source <(sed <.env -e 's/[^[:print:]\t]//g')
set +a

docker compose -f ./docker/docker-compose.yml build --no-cache \
  --build-arg NODE_ENV=production \
  --build-arg HTTP_PROXY="$HTTP_PROXY" \
  --build-arg HTTPS_PROXY="$HTTPS_PROXY" \
  --build-arg ACCESS_TOKEN_SECRET="$ACCESS_TOKEN_SECRET" \
  --build-arg REFRESH_TOKEN_SECRET="$REFRESH_TOKEN_SECRET"
