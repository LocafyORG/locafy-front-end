FROM oven/bun:1-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Set environment variable for the backend URL
ENV VITE_API_BASE_URL=http://backend:8080

# Start the development server
CMD ["bun", "run", "dev"]