FROM alpine:latest

RUN apk add nodejs pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml /app/

RUN pnpm install --frozen-lockfile

COPY . /app/

WORKDIR /app/api

RUN pnpm install

WORKDIR /app/client

RUN pnpm install && pnpm build

WORKDIR /app

CMD ["pnpm", "start"]
