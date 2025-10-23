# ---------- Build Stage ----------
FROM node:20.18.0-alpine as builder

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm ci --legacy-peer-deps && npm cache clean --force

# Copy source code
COPY . .

# Build the application
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

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Set proper permissions
RUN chown -R appuser:appgroup /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Switch to non-root user
USER appuser

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 