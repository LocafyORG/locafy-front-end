#!/bin/bash

# Create the external network if it doesn't exist
docker network create locafy-net 2>/dev/null || true

# Start all services
docker-compose up --build 