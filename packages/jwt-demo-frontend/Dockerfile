FROM node:14.17.0-alpine3.13 AS builder

WORKDIR /usr/app

ARG HTTP_PROXY
ARG HTTPS_PROXY

ENV HTTP_PROXY ${HTTP_PROXY}
ENV HTTPS_PROXY ${HTTPS_PROXY}

ADD packages/jwt-demo-frontend packages/jwt-demo-frontend
ADD package.json package.json

RUN if [[ -z "$HTTP_PROXY" ]] ; then echo HTTP_PROXY not provided ; else yarn config set proxy ${HTTP_PROXY} ; fi
RUN if [[ -z "$HTTPS_PROXY" ]] ; then echo HTTPS_PROXY not provided ; else yarn config set proxy ${HTTPS_PROXY} ; fi

RUN yarn install --pure-lockfile
RUN yarn workspace jwt-demo-frontend build
RUN yarn workspace jwt-demo-frontend generate

FROM nginx:1.21.0-alpine
COPY --from=builder /usr/app/packages/jwt-demo-frontend/dist /usr/share/nginx/html/jwtdemo

# docker exec -it jwt-demo-frontend /bin/sh
