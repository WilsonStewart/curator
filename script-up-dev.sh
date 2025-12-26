docker compose --profile development down
docker compose build
docker compose --profile development -f docker-compose.yml -f docker-compose.dev.yml up -d