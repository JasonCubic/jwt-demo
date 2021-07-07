FROM node:14.17.0-alpine3.13 AS builder

WORKDIR /usr/app

ARG HTTP_PROXY
ARG HTTPS_PROXY

COPY packages/jwt-demo-frontend packages/jwt-demo-frontend
COPY package.json package.json

RUN yarn install --pure-lockfile --production --proxy "${HTTP_PROXY}" --https-proxy "${HTTPS_PROXY}" \
&& yarn cache clean \
&& yarn workspace jwt-demo-frontend build \
&& yarn workspace jwt-demo-frontend generate

FROM nginx:1.21.0-alpine
COPY --from=builder /usr/app/packages/jwt-demo-frontend/dist /usr/share/nginx/html/jwtdemo

# docker exec -it jwt-demo-frontend /bin/sh
