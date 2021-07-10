#!/bin/bash

echo
echo "running semgrep container"
echo "cli reference: https://semgrep.dev/docs/cli-usage/"
echo

# to see the cli help run this command
# docker run --rm returntocorp/semgrep --help

# to see the version of semgrep run this command
# docker run --rm returntocorp/semgrep --version

# to mount the container interactively to look around:
# docker run -it --rm -v "$(pwd):/src" --entrypoint="/bin/sh" returntocorp/semgrep

rm ./semgrep-results.sarif

# rules and rulesets are kept here: https://semgrep.dev/registry

docker run -it --rm -v "/$(pwd):/src" returntocorp/semgrep:latest \
  --config "p/owasp-top-ten" \
  --config "p/jwt" \
  --config "p/xss" \
  --config "p/r2c" \
  --config "p/ci" \
  --config "p/secrets" \
  --config "p/javascript" \
  --config "p/nodejsscan" \
  --config "p/expressjs" \
  --config "p/insecure-transport" \
  --config "p/docker" \
  --config "p/dockerfile" \
  --config "p/docker-compose" \
  --config "p/sql-injection" \
  --config "p/command-injection" \
  --config "p/r2c-security-audit" \
  --config "p/eslint-plugin-security" \
  --config "p/r2c-best-practices" \
  --config "r/javascript.vue.security.audit.xss.templates.avoid-v-html.avoid-v-html" \
  --sarif \
  --output "/src/semgrep-results.sarif"
