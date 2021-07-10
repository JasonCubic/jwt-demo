#!/bin/bash

echo
echo "To manually trigger linting from inside the container run: /entrypoint.sh"
echo "The volume containing the project code is located at: /tmp/lint"
echo

# this uses the full mega-linter container if you want to use a container for a specific "flavor"
# look through the available mega-linter containers here: https://hub.docker.com/u/nvuillam

docker run -it --rm \
  -v "/tmp/lint/node_modules" \
  -v "/tmp/lint/packages/jwt-demo-api/node_modules" \
  -v "/tmp/lint/packages/jwt-demo-auth/node_modules" \
  -v "/tmp/lint/packages/jwt-demo-frontend/node_modules" \
  -v "/tmp/lint/packages/jwt-demo-logs/node_modules" \
  -v "/$(pwd):/tmp/lint" \
  --entrypoint="/bin/sh" \
  nvuillam/mega-linter:v4
