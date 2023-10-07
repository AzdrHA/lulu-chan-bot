ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine AS node_api

WORKDIR /srv/app

RUN set -eux; \
	apk add --no-cache --virtual .build-deps \
		g++ \
		gcc \
		git \
		make \
        python3 \
	;

RUN npm -g install npm@latest

USER node