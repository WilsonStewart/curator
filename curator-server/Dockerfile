FROM debian:trixie-slim AS base
WORKDIR /app
RUN apt-get update
RUN apt-get install curl unzip -y
RUN curl -fsSL https://bun.com/install | bash -s "bun-v1.2.21"
COPY . .
RUN /root/.bun/bin/bun install
CMD ["/root/.bun/bin/bun", "run", "prod"]
# CMD ["sh", "-c", "while true; do ls /app; sleep 100; done"]