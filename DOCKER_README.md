# 🛡️ Secure Docker Setup for Hoodie Republic

This Docker configuration provides a hardened, production-ready setup for the Hoodie Republic Vite + React application with comprehensive security features.

## 🔒 Security Features

### Container Security
- **Non-root user**: Runs as `appuser` instead of root
- **Read-only filesystem**: Container filesystem is read-only
- **No new privileges**: Prevents privilege escalation
- **Temporary filesystem**: Uses tmpfs for temporary files
- **Multi-stage build**: Reduces attack surface by excluding build tools from production

### Network Security
- **Isolated network**: Custom bridge network for container communication
- **Health checks**: Automated health monitoring
- **Security headers**: Comprehensive HTTP security headers
- **Rate limiting**: Built-in protection against abuse

### Application Security
- **Content Security Policy**: Strict CSP headers
- **XSS Protection**: Enabled with blocking mode
- **Frame protection**: Prevents clickjacking attacks
- **Content type protection**: Prevents MIME type sniffing

## 📁 File Structure

```
├── Dockerfile              # Multi-stage build with security hardening
├── .dockerignore          # Excludes unnecessary files from build context
├── docker-compose.yml     # Production deployment with security features
├── nginx.conf            # Secure nginx configuration with headers
└── scripts/
    └── docker-deploy.sh  # Deployment automation script
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Node.js 20+ (for local development)

### Build and Deploy

1. **Build the image:**
   ```bash
   ./scripts/docker-deploy.sh build
   ```

2. **Start the container:**
   ```bash
   ./scripts/docker-deploy.sh run
   ```

3. **Access the application:**
   Open http://localhost:8080 in your browser

### Other Commands

```bash
# Stop the container
./scripts/docker-deploy.sh stop

# View logs
./scripts/docker-deploy.sh logs

# Restart the container
./scripts/docker-deploy.sh restart

# Clean up Docker resources
./scripts/docker-deploy.sh clean
```

## 🔧 Manual Docker Commands

### Build and Run
```bash
# Build the image
docker compose build

# Run in detached mode
docker compose up -d

# Run with logs
docker compose up
```

### Management
```bash
# Stop containers
docker compose down

# View logs
docker compose logs -f

# Restart
docker compose restart

# Clean up
docker compose down -v
docker system prune -f
```

## 🛡️ Security Headers

The nginx configuration includes the following security headers:

- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-XSS-Protection**: XSS protection with blocking
- **Referrer-Policy**: Controls referrer information
- **Content-Security-Policy**: Strict CSP for resource loading

## 📊 Performance Features

- **Gzip compression**: Reduces bandwidth usage
- **Static asset caching**: 1-year cache for static files
- **Client-side routing**: Proper SPA routing support
- **Optimized nginx**: Performance-tuned configuration

## 🔍 Health Monitoring

The container includes automated health checks:
- **Endpoint**: `http://localhost/health`
- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3 attempts
- **Start period**: 10 seconds

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using port 8080
   lsof -i :8080
   # Or change the port in docker-compose.yml
   ```

2. **Build fails:**
   ```bash
   # Clean and rebuild
   ./scripts/docker-deploy.sh clean
   ./scripts/docker-deploy.sh build
   ```

3. **Container won't start:**
   ```bash
   # Check logs
   docker compose logs
   # Check health status
   docker compose ps
   ```

### Debug Mode

For debugging, you can run the container interactively:

```bash
# Build without cache
docker compose build --no-cache

# Run with shell access
docker compose run --rm hoodie-republic sh
```

## 🔄 Development Workflow

### Local Development
```bash
# Start development server
npm run dev
```

### Production Deployment
```bash
# Build and deploy
./scripts/docker-deploy.sh build
./scripts/docker-deploy.sh run
```

### Continuous Deployment
```bash
# Full deployment pipeline
./scripts/docker-deploy.sh clean
./scripts/docker-deploy.sh build
./scripts/docker-deploy.sh run
```

## 📝 Environment Variables

The application supports the following environment variables:

- `NODE_ENV`: Set to `production` in container
- Additional variables can be added to `docker-compose.yml`

## 🔐 Security Best Practices

1. **Regular updates**: Keep base images updated
2. **Vulnerability scanning**: Use tools like Trivy or Snyk
3. **Secret management**: Use Docker secrets for sensitive data
4. **Network isolation**: Use custom networks
5. **Resource limits**: Set memory and CPU limits in production

## 📚 Additional Resources

- [Docker Security Best Practices](https://docs.docker.com/develop/security/)
- [Nginx Security Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [OWASP Security Headers](https://owasp.org/www-project-sec-headers/)

---

**⚠️ Important**: This setup is designed for production use with security hardening. Always test thoroughly in a staging environment before deploying to production. 