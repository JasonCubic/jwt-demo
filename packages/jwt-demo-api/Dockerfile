FROM node:14.17.0-alpine3.13

WORKDIR /usr/app

ARG NODE_ENV
ARG HTTP_PROXY
ARG HTTPS_PROXY
ARG ACCESS_TOKEN_SECRET
ARG REFRESH_TOKEN_SECRET

ENV NODE_ENV ${NODE_ENV}
ENV HTTP_PROXY ${HTTP_PROXY}
ENV HTTPS_PROXY ${HTTPS_PROXY}
ENV ACCESS_TOKEN_SECRET ${ACCESS_TOKEN_SECRET}
ENV REFRESH_TOKEN_SECRET ${REFRESH_TOKEN_SECRET}

COPY packages/jwt-demo-api packages/jwt-demo-api
COPY package.json package.json
COPY packages/jwt-demo-logs packages/jwt-demo-logs

RUN yarn install --pure-lockfile --production --proxy "${HTTP_PROXY}" --https-proxy "${HTTPS_PROXY}" \
&& yarn cache clean

# install init system: https://github.com/Yelp/dumb-init
# hadolint ignore=DL3018
RUN apk --no-cache add dumb-init

CMD ["/usr/bin/dumb-init", "yarn", "workspace", "jwt-demo-api", "run", "start"]
