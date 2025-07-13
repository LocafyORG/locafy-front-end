# Locafy Frontend Docker Setup

This Docker setup includes both the frontend and backend services to run the complete Locafy application.

## Prerequisites

- Docker and Docker Compose installed
- The backend code should be in the `../backend` directory

## Quick Start

1. **Create the Docker network** (if not already created):
   ```bash
   docker network create locafy-net
   ```

2. **Start all services**:
   ```bash
   docker-compose up --build
   ```

   Or use the provided script:
   ```bash
   chmod +x start-docker.sh
   ./start-docker.sh
   ```

## Services

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **MinIO Console**: http://localhost:9090
- **PostgreSQL**: localhost:5432

## Development

The frontend container includes volume mounts for hot reloading:
- Source code changes will automatically trigger rebuilds
- The development server runs with `bun run dev`

## Environment Variables

- `VITE_API_BASE_URL`: Points to the backend service (http://backend:8080)

## Troubleshooting

1. **If the frontend can't connect to the backend**:
   - Ensure all services are running: `docker-compose ps`
   - Check the backend logs: `docker-compose logs backend`
   - Verify the network exists: `docker network ls`

2. **If you need to rebuild**:
   ```bash
   docker-compose down
   docker-compose up --build
   ```

3. **To stop all services**:
   ```bash
   docker-compose down
   ``` 