FROM debian:trixie-slim AS base
WORKDIR /curator/server
RUN apt-get update
RUN apt-get install curl unzip git build-essential -y
RUN curl -fsSL https://bun.com/install | bash -s "bun-v1.2.21"
# COPY ./package.json .
# RUN /root/.bun/bin/bun install