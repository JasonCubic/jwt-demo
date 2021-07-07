#!/bin/bash

docker compose -f ./docker/docker-compose.lint.yml down --volumes --remove-orphans

docker compose -f ./docker/docker-compose.lint.yml build --no-cache

# docker compose -f ./docker/docker-compose.lint.yml up
echo "to manually trigger linting from inside the container run: /entrypoint.sh"
docker-compose -f ./docker/docker-compose.lint.yml run --rm mega-linter-api
