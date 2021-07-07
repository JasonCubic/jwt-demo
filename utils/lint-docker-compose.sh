#!/bin/bash

docker compose -f ./docker/docker-compose.lint.yml down --volumes --remove-orphans

docker compose -f ./docker/docker-compose.lint.yml build --no-cache

echo
echo "To manually trigger linting from inside the container run: /entrypoint.sh"
echo "The volume containing the project code is located at: /tmp/lint"
echo

docker-compose -f ./docker/docker-compose.lint.yml run --rm mega-linter-api

# if you just want to run the linter using this method, use an up instead of run
# docker compose -f ./docker/docker-compose.lint.yml up
