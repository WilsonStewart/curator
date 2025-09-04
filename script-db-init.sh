#! /bin/bash
docker compose build
docker compose --profile tools run --rm server-db-init