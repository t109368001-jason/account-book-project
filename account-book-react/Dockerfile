# syntax=docker/dockerfile:1.4
FROM node:18-slim AS build
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN --mount=type=cache,target=/usr/src/app/.npm \
        npm set cache /usr/src/app/.npm && \
        npm ci
RUN #npm ci

COPY .eslintrc.json .eslintrc.json
COPY public public
COPY src src

RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

RUN #rm -rf ./*

COPY --from=build /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]