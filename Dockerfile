# ---------- Build Stage ----------
FROM node:20.18.0-alpine as builder

# Set working directory
WORKDIR /app

# Accept build arguments for environment variables
# These will be available during the build process
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_SOLANA_RPC_URL
ARG VITE_SOLANA_NETWORK

# Set as environment variables for Vite to pick up during build
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_SOLANA_RPC_URL=$VITE_SOLANA_RPC_URL
ENV VITE_SOLANA_NETWORK=$VITE_SOLANA_NETWORK

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm ci --legacy-peer-deps && npm cache clean --force

# Copy source code
COPY . .

# Build the application (Vite will use the ENV vars above)
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:1.25-alpine

# Install curl for healthcheck
RUN apk add --no-cache curl

# Use a non-root user (for added safety)
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built Vite files
COPY --from=builder /app/dist /usr/share/nginx/html

# Install Node.js in production stage for runtime config generation
RUN apk add --no-cache nodejs npm

# Copy runtime config generation script
COPY scripts/generate-runtime-config.js /usr/local/bin/generate-runtime-config.js
RUN chmod +x /usr/local/bin/generate-runtime-config.js

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Create entrypoint script that generates runtime config from env vars
RUN echo '#!/bin/sh' > /entrypoint.sh && \
    echo 'echo "🔧 Generating runtime config from environment variables..."' >> /entrypoint.sh && \
    echo 'node /usr/local/bin/generate-runtime-config.js' >> /entrypoint.sh && \
    echo 'exec nginx -g "daemon off;"' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh

# Set proper permissions
RUN chown -R appuser:appgroup /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Use entrypoint that generates runtime config from env vars
# This allows setting env vars at container runtime without rebuilding
ENTRYPOINT ["/entrypoint.sh"] 