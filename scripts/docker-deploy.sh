#!/bin/bash

# Hoodie Republic Docker Deployment Script
# Usage: ./scripts/docker-deploy.sh [build|run|stop|clean]

set -e

case "$1" in
    "build")
        echo "🛠️  Building Hoodie Republic Docker image..."
        docker compose build --no-cache
        echo "✅ Build completed successfully!"
        ;;
    "run")
        echo "🚀 Starting Hoodie Republic container..."
        docker compose up -d
        echo "✅ Container started! Access at http://localhost:8080"
        ;;
    "stop")
        echo "🛑 Stopping Hoodie Republic container..."
        docker compose down
        echo "✅ Container stopped!"
        ;;
    "clean")
        echo "🧹 Cleaning up Docker resources..."
        docker compose down -v
        docker system prune -f
        docker volume prune -f
        echo "✅ Cleanup completed!"
        ;;
    "logs")
        echo "📋 Showing container logs..."
        docker compose logs -f
        ;;
    "restart")
        echo "🔄 Restarting Hoodie Republic container..."
        docker compose restart
        echo "✅ Container restarted!"
        ;;
    *)
        echo "Usage: $0 {build|run|stop|clean|logs|restart}"
        echo ""
        echo "Commands:"
        echo "  build   - Build the Docker image"
        echo "  run     - Start the container"
        echo "  stop    - Stop the container"
        echo "  clean   - Clean up Docker resources"
        echo "  logs    - Show container logs"
        echo "  restart - Restart the container"
        exit 1
        ;;
esac 