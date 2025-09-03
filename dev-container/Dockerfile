FROM debian:trixie-slim AS base
WORKDIR /app
RUN apt-get update
RUN apt-get install curl unzip git build-essential -y
RUN curl -fsSL https://bun.com/install | bash -s "bun-v1.2.21"
COPY ../curator-web/package.json .
RUN /root/.bun/bin/bun install
COPY ../curator-server/package.json .
RUN /root/.bun/bin/bun install
CMD ["bash"]