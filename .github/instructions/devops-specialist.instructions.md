# DevOps Specialist Instructions

## Role Overview

As a **DevOps Specialist** in the Struktura project, you are responsible for designing, implementing, and maintaining the deployment, scaling, monitoring, and operational aspects of our no-code data management platform. You ensure our TypeScript monorepo applications run reliably, securely, and efficiently in production environments.

## Core Responsibilities

### 1. Infrastructure & Deployment

- **Infrastructure as Code**: Design and maintain infrastructure using Docker Compose, shell scripts, and version-controlled deployment configurations
- **CI/CD Pipelines**: Build and maintain automated deployment pipelines
- **Container Orchestration**: Manage containerized applications using Docker Swarm
- **Environment Management**: Maintain development, staging, and production environments

### 2. Monitoring & Observability

- **Application Monitoring**: Implement comprehensive monitoring and alerting systems
- **Performance Monitoring**: Track and optimize application performance metrics
- **Log Management**: Centralize and analyze application logs
- **Incident Response**: Respond to and resolve production incidents

### 3. Security & Compliance

- **Security Implementation**: Implement security best practices across the infrastructure
- **Secrets Management**: Secure handling of sensitive configuration and credentials
- **Compliance**: Ensure systems meet security and compliance requirements
- **Vulnerability Management**: Regularly assess and remediate security vulnerabilities

### 4. Scalability & Performance

- **Auto-scaling**: Implement automatic scaling based on demand
- **Load Balancing**: Distribute traffic efficiently across application instances
- **Database Optimization**: Optimize database performance and reliability
- **CDN Management**: Implement and optimize content delivery networks

## Struktura Infrastructure Context

### Application Architecture

Our infrastructure supports a streamlined monorepo with a unified application:

**Main Application:**

- Single NestJS application with integrated React Router 7 admin UI
- GraphQL API served by NestJS with Apollo Federation
- Admin UI mounted as Express middleware handler
- Real-time features via WebSocket and Rocicorp Zero
- SSR capabilities through React Router 7 framework mode

**Supporting Services:**

- Background job processors (separate containers if needed)
- Monitoring and observability services

**Data Layer:**

- MongoDB Atlas (Primary database)
- Redis (Caching and session storage)
- Object Storage (Media files and assets)

**External Integrations:**

- third-party services API
- Struktura Platform
- Authentication providers (JWT-based)
- Monitoring and observability tools

### Technology Stack

**Cloud Infrastructure:**

- **Direct Access Ubuntu Linux** - The app must be able to be deployed via docker on a standard Ubuntu Linux server with direct (ssh) access.
- **Docker** - Containerization
- **Docker Swarm** - Container orchestration
- **GitHub Actions** - CI/CD pipelines

**Monitoring & Observability:**

- **OTEL-LGTM** - We will deploy a single-node Grafana OTEL-LGTM stack to collect and visualize metrics, logs, and traces.

**Security & Secrets:**

- **Start Simple, Grow as Needed** - Start with gitgnored `*.env` files, we will pick a secrets management solution at a later stage.

## Infrastructure Design Patterns

### 1. Modular Monolith Architecture

Struktura follows a **modular monolith** architecture - a single unified application with feature-based modules that can be deployed as one cohesive unit while maintaining clear internal boundaries.

```yaml
# Example: Docker Swarm Stack for Struktura unified application
version: '3.8'
services:
    struktura:
        image: ghcr.io/cbnsndwch/struktura:2025.7.30
        ports:
            - '3000:3000'
        environment:
            - NODE_ENV=production
            - DATABASE_URL_FILE=/run/secrets/database-url
        secrets:
            - database-url
        deploy:
            replicas: 3
            update_config:
                parallelism: 1
                delay: 10s
                failure_action: rollback
                order: start-first
            restart_policy:
                condition: on-failure
                delay: 5s
                max_attempts: 3
            resources:
                limits:
                    memory: 2G
                    cpus: '1.0'
                reservations:
                    memory: 1G
                    cpus: '0.5'
            placement:
                constraints:
                    - node.role == worker
            labels:
                - 'traefik.enable=true'
                - 'traefik.http.routers.cms.rule=Host(`struktura.cbnsndwch.io`)'
                - 'traefik.http.routers.api.rule=Host(`struktura.cbnsndwch.io`) && PathPrefix(`/api`)'
                - 'traefik.http.services.cms.loadbalancer.server.port=3000'
                - 'traefik.http.routers.cms.tls=true'
                - 'traefik.http.routers.api.tls=true'
                - 'traefik.http.routers.cms.tls.certresolver=letsencrypt'
        healthcheck:
            test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
            interval: 30s
            timeout: 10s
            retries: 3
            start_period: 40s
        networks:
            - struktura-network

secrets:
    database-url:
        external: true

networks:
    struktura-network:
        driver: overlay
        attachable: true
```

### 2. Infrastructure as Code

```bash
#!/bin/bash
# Infrastructure deployment script for Docker Swarm
# This script sets up the complete Struktura infrastructure using Docker Compose and shell scripts

set -e

# Configuration
ENVIRONMENT=${1:-production}
SWARM_MANAGER_IP=${2:-$(hostname -I | cut -d' ' -f1)}
MONGODB_VERSION="7.0"
BACKUP_RETENTION_DAYS=30

echo "=== Struktura Infrastructure Deployment ==="
echo "Environment: $ENVIRONMENT"
echo "Swarm Manager IP: $SWARM_MANAGER_IP"

# Initialize Docker Swarm if not already done
if ! docker info | grep -q "Swarm: active"; then
    echo "Initializing Docker Swarm..."
    docker swarm init --advertise-addr $SWARM_MANAGER_IP
fi

# Create necessary directories
echo "Creating directory structure..."
sudo mkdir -p /opt/struktura/{data,backups,configs,logs}
sudo mkdir -p /opt/struktura/data/{mongodb,redis}
sudo chown -R $USER:$USER /opt/struktura

# Create Docker networks
echo "Creating Docker networks..."
docker network create --driver overlay --attachable struktura-network || true
docker network create --driver overlay --internal backend-network || true
docker network create --driver overlay frontend-network || true

# Generate and store secrets
echo "Setting up secrets..."
if ! docker secret ls | grep -q mongodb-root-password; then
    echo "$(openssl rand -base64 32)" | docker secret create mongodb-root-password -
fi

if ! docker secret ls | grep -q mongodb-app-password; then
    echo "$(openssl rand -base64 32)" | docker secret create mongodb-app-password -
fi

# Create MongoDB configuration
cat > /opt/struktura/configs/mongod.conf << 'EOF'
# MongoDB configuration for production
net:
  port: 27017
  bindIp: 0.0.0.0
  tls:
    mode: disabled

security:
  authorization: enabled

storage:
  dbPath: /data/db
  journal:
    enabled: true
  wiredTiger:
    engineConfig:
      journalCompressor: snappy
      directoryForIndexes: false
    collectionConfig:
      blockCompressor: snappy
    indexConfig:
      prefixCompression: true

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log
  logRotate: rename

processManagement:
  timeZoneInfo: /usr/share/zoneinfo

replication:
  replSetName: "struktura-rs"

operationProfiling:
  mode: slowOp
  slowOpThresholdMs: 100
EOF

# Create database initialization script
cat > /opt/struktura/configs/init-mongodb.js << 'EOF'
// MongoDB initialization script
rs.initiate({
  _id: "struktura-rs",
  members: [
    { _id: 0, host: "mongodb:27017" }
  ]
});

// Wait for replica set to be ready
sleep(5000);

// Switch to admin database
use admin;

// Create application user
db.createUser({
  user: "struktura-app-user",
  pwd: passwordPrompt(),
  roles: [
    { role: "readWrite", db: "struktura-production" },
    { role: "readWrite", db: "struktura-staging" }
  ]
});

// Create production database
use struktura-production;
db.createCollection("users");
db.createCollection("content");

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.content.createIndex({ "slug": 1 }, { unique: true });
db.content.createIndex({ "createdAt": 1 });
db.content.createIndex({ "status": 1 });

print("MongoDB initialization completed successfully");
EOF

# Deploy MongoDB stack
echo "Deploying MongoDB infrastructure..."
cat > /tmp/mongodb-stack.yml << 'EOF'
version: '3.8'
services:
  mongodb:
    image: mongo:7.0
    volumes:
      - mongodb-data:/data/db
      - mongodb-logs:/var/log/mongodb
      - /opt/struktura/configs/mongod.conf:/etc/mongod.conf:ro
    configs:
      - source: mongodb-init
        target: /docker-entrypoint-initdb.d/init-mongodb.js
        mode: 0755
    secrets:
      - mongodb-root-password
      - mongodb-app-password
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD_FILE=/run/secrets/mongodb-root-password
      - MONGO_INITDB_DATABASE=struktura-production
    command: ["mongod", "--config", "/etc/mongod.conf"]
    deploy:
      replicas: 1
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
      placement:
        constraints:
          - node.role == manager
    networks:
      - backend-network
    ports:
      - "27017:27017"

volumes:
  mongodb-data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /opt/struktura/data/mongodb
  mongodb-logs:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /opt/struktura/logs

configs:
  mongodb-init:
    file: /opt/struktura/configs/init-mongodb.js

secrets:
  struktura-root-password:
    external: true
  struktura-app-password:
    external: true

networks:
  backend-network:
    external: true
EOF

docker stack deploy -c /tmp/mongodb-stack.yml mongodb-infrastructure

# Set up backup cron job
echo "Setting up automated backups..."
(crontab -l 2>/dev/null || true; echo "0 2 * * * /opt/struktura/scripts/backup.sh") | crontab -

# Create backup script
cat > /opt/struktura/scripts/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/struktura/backups/mongodb-$BACKUP_DATE"
RETENTION_DAYS=30

mkdir -p $BACKUP_DIR

# Backup MongoDB
docker exec $(docker ps -qf "name=mongodb-infrastructure_mongodb") \
  mongodump --host localhost:27017 \
  --authenticationDatabase admin \
  --username admin \
  --password $(docker secret inspect mongodb-root-password --format '{{.Spec.Data}}' | base64 -d) \
  --gzip --archive=$BACKUP_DIR/struktura-full.gz

# Cleanup old backups
find /opt/struktura/backups -name "mongodb-*" -mtime +$RETENTION_DAYS -exec rm -rf {} \;

echo "Backup completed: $BACKUP_DIR"
EOF

chmod +x /opt/struktura/scripts/backup.sh

echo "=== Infrastructure deployment completed successfully ==="
echo "MongoDB will be available at: mongodb://$SWARM_MANAGER_IP:27017"
echo "Backup location: /opt/struktura/backups/"
echo "Configuration files: /opt/struktura/configs/"
```

```yaml
# Alternative: Docker Compose configuration for MongoDB Atlas alternative
# Use this configuration if you prefer a self-hosted MongoDB solution
version: '3.8'
services:
    mongodb-primary:
        image: mongo:7.0
        environment:
            MONGO_INITDB_ROOT_USERNAME: admin
            MONGO_INITDB_ROOT_PASSWORD_FILE: /run/secrets/mongodb-root-password
            MONGO_REPLICA_SET_NAME: struktura-rs
        volumes:
            - mongodb-primary-data:/data/db
            - mongodb-logs:/var/log/mongodb
        secrets:
            - mongodb-root-password
        command:
            - mongod
            - --replSet
            - struktura-rs
            - --bind_ip_all
            - --oplogSize
            - 2048
        deploy:
            replicas: 1
            resources:
                limits:
                    memory: 4G
                    cpus: '2.0'
                reservations:
                    memory: 2G
                    cpus: '1.0'
        networks:
            - backend-network

    mongodb-secondary:
        image: mongo:7.0
        environment:
            MONGO_REPLICA_SET_NAME: struktura-rs
        volumes:
            - mongodb-secondary-data:/data/db
        command:
            - mongod
            - --replSet
            - struktura-rs
            - --bind_ip_all
        deploy:
            replicas: 1
            resources:
                limits:
                    memory: 2G
                    cpus: '1.0'
                reservations:
                    memory: 1G
                    cpus: '0.5'
        networks:
            - backend-network
        depends_on:
            - mongodb-primary

volumes:
    mongodb-primary-data:
        driver: local
    mongodb-secondary-data:
        driver: local
    mongodb-logs:
        driver: local

secrets:
    struktura-root-password:
        external: true

networks:
    backend-network:
        external: true
```

### 3. Load Balancing & CDN

```yaml
# Example: Docker Swarm Stack with Traefik for load balancing and SSL
version: '3.8'
services:
    traefik:
        image: traefik:v3.0
        command:
            - --api.dashboard=true
            - --entrypoints.web.address=:80
            - --entrypoints.websecure.address=:443
            - --providers.docker=true
            - --providers.docker.swarmMode=true
            - --providers.docker.exposedbydefault=false
            - --certificatesresolvers.letsencrypt.acme.tlschallenge=true
            - --certificatesresolvers.letsencrypt.acme.email=admin@struktura.cbnsndwch.io
            - --certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json
            - --entrypoints.web.http.redirections.entryPoint.to=websecure
            - --entrypoints.web.http.redirections.entryPoint.scheme=https
        ports:
            - '80:80'
            - '443:443'
            - '8080:8080'
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock:ro
            - traefik-certificates:/letsencrypt
        deploy:
            placement:
                constraints:
                    - node.role == manager
            labels:
                - 'traefik.enable=true'
                - 'traefik.http.routers.dashboard.rule=Host(`traefik.cbnsndwch.io`)'
                - 'traefik.http.routers.dashboard.service=api@internal'
                - 'traefik.http.routers.dashboard.tls=true'
                - 'traefik.http.routers.dashboard.tls.certresolver=letsencrypt'
        networks:
            - struktura-network

volumes:
    traefik-certificates:
        driver: local

networks:
    struktura-network:
        driver: overlay
        attachable: true
```

## CI/CD Pipeline Design

### 1. Build Pipeline

```yaml
# GitHub Actions workflow for monorepo
name: Build and Deploy
on:
    push:
        branches: [main, develop]
    pull_request:
        branches: [main]

env:
    REGISTRY: ghcr.io
    IMAGE_NAME: struktura/web

jobs:
    detect-changes:
        runs-on: ubuntu-24.04
        outputs:
            app-changed: ${{ steps.changes.outputs.app }}
        steps:
            - uses: actions/checkout@v6
            - uses: dorny/paths-filter@v2
              id: changes
              with:
                  filters: |
                      app:
                        - 'apps/main/**'
                        - 'libs/**'

    test:
        runs-on: ubuntu-24.04
        steps:
            - uses: actions/checkout@v6

            - name: Setup Node.js
              uses: actions/setup-node@v6
              with:
                  node-version: '22'
                  cache: 'pnpm'

            - name: Install dependencies
              run: pnpm install --frozen-lockfile

            - name: Run tests
              run: pnpm test

            - name: Upload coverage
              uses: codecov/codecov-action@v3
              with:
                  file: ./coverage/lcov.info

    build-main:
        needs: [detect-changes, test]
        if: needs.detect-changes.outputs.app-changed == 'true'
        runs-on: ubuntu-24.04
        steps:
            - uses: actions/checkout@v6

            - name: Build and push Docker image
              uses: docker/build-push-action@v4
              with:
                  context: .
                  file: .docker/main.dockerfile
                  push: true
                  tags: |
                      ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
                      ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
                  build-args: |
                      GH_PAT=${{ secrets.GH_PAT }}

    deploy-staging:
        needs: [build-main]
        if: github.ref == 'refs/heads/develop'
        runs-on: ubuntu-24.04
        environment: staging
        steps:
            - name: Setup Docker Context for Swarm
              run: |
                  echo "${{ secrets.DOCKER_HOST_KEY }}" | base64 -d > ~/.ssh/docker_host
                  chmod 600 ~/.ssh/docker_host
                  docker context create staging --docker "host=ssh://deploy@${{ secrets.STAGING_HOST }}"
                  docker context use staging

            - name: Deploy to staging swarm
              run: |
                  docker stack deploy --compose-file docker-compose.staging.yml --with-registry-auth struktura-staging
              env:
                  DOCKER_HOST: ssh://deploy@${{ secrets.STAGING_HOST }}
                  APP_IMAGE: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}

    deploy-production:
        needs: [build-main]
        if: github.ref == 'refs/heads/main'
        runs-on: ubuntu-24.04
        environment: production
        steps:
            - name: Setup Docker Context for Swarm
              run: |
                  echo "${{ secrets.DOCKER_HOST_KEY }}" | base64 -d > ~/.ssh/docker_host
                  chmod 600 ~/.ssh/docker_host
                  docker context create production --docker "host=ssh://deploy@${{ secrets.PRODUCTION_HOST }}"
                  docker context use production

            - name: Deploy to production swarm
              run: |
                  docker stack deploy --compose-file docker-compose.production.yml --with-registry-auth struktura-production
              env:
                  DOCKER_HOST: ssh://deploy@${{ secrets.PRODUCTION_HOST }}
                  APP_IMAGE: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
```

### 2. Database Migration Pipeline

```yaml
# Database migration service for Docker Swarm
version: '3.8'
services:
    struktura-migration:
        image: ghcr.io/struktura/cms:2025.7.30
        command: ['npm', 'run', 'migrate']
        environment:
            - DATABASE_URL_FILE=/run/secrets/database-url
        secrets:
            - database-url
        deploy:
            replicas: 1
            restart_policy:
                condition: none
                max_attempts: 3
            placement:
                constraints:
                    - node.role == manager
        networks:
            - struktura-network

secrets:
    database-url:
        external: true

networks:
    struktura-network:
        external: true
```

## Monitoring & Observability

### 1. Metrics Collection

```yaml
# OTEL-LGTM Stack configuration for Docker Swarm
version: '3.8'
services:
    # Grafana OTEL-LGTM all-in-one stack
    otel-lgtm:
        image: grafana/otel-lgtm:latest
        ports:
            - '3000:3000' # Grafana UI
            - '4317:4317' # OTLP gRPC receiver
            - '4318:4318' # OTLP HTTP receiver
            - '9090:9090' # Prometheus
        environment:
            - OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
        volumes:
            - otel-data:/data
            - ./config/prometheus.yml:/etc/prometheus/prometheus.yml:ro
        deploy:
            replicas: 1
            placement:
                constraints:
                    - node.role == manager
            labels:
                - 'traefik.enable=true'
                - 'traefik.http.routers.grafana.rule=Host(`monitoring.cbnsndwch.io`)'
                - 'traefik.http.services.grafana.loadbalancer.server.port=3000'
        networks:
            - struktura-network

    # Prometheus service discovery for Docker Swarm
    prometheus:
        image: prom/prometheus:latest
        command:
            - '--config.file=/etc/prometheus/prometheus.yml'
            - '--storage.tsdb.path=/prometheus'
            - '--web.console.libraries=/etc/prometheus/console_libraries'
            - '--web.console.templates=/etc/prometheus/consoles'
            - '--storage.tsdb.retention.time=200h'
            - '--web.enable-lifecycle'
        volumes:
            - prometheus-data:/prometheus
            - ./config/prometheus.yml:/etc/prometheus/prometheus.yml:ro
        deploy:
            replicas: 1
            placement:
                constraints:
                    - node.role == manager
        networks:
            - struktura-network

volumes:
    otel-data:
        driver: local
    prometheus-data:
        driver: local

networks:
    struktura-network:
        external: true
# Configuration file: config/prometheus.yml
# global:
#   scrape_interval: 15s
#   evaluation_interval: 15s
#
# scrape_configs:
# - job_name: 'struktura'
#   dns_sd_configs:
#     - names:
#         - 'tasks.struktura'
#       type: 'A'
#       port: 3000
#   metrics_path: /metrics
#   scrape_interval: 15s
```

### 2. Alerting Rules

```yaml
# Prometheus alerting rules
groups:
    - name: Struktura-alerts
      rules:
          - alert: HighErrorRate
            expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
            for: 5m
            labels:
                severity: critical
            annotations:
                summary: 'High error rate detected'
                description: 'Error rate is {{ $value }} errors per second'

          - alert: DatabaseConnectionFailure
            expr: mongodb_up == 0
            for: 2m
            labels:
                severity: critical
            annotations:
                summary: 'Database connection failure'
                description: 'MongoDB connection is down'

          - alert: HighMemoryUsage
            expr: container_memory_usage_bytes / container_spec_memory_limit_bytes > 0.9
            for: 10m
            labels:
                severity: warning
            annotations:
                summary: 'High memory usage'
                description: 'Memory usage is above 90%'
```

### 3. Grafana Dashboards

```json
{
    "dashboard": {
        "title": "Struktura Overview",
        "panels": [
            {
                "title": "Request Rate",
                "type": "graph",
                "targets": [
                    {
                        "expr": "rate(http_requests_total[5m])",
                        "legendFormat": "{{method}} {{handler}}"
                    }
                ]
            },
            {
                "title": "Response Time",
                "type": "graph",
                "targets": [
                    {
                        "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
                        "legendFormat": "95th percentile"
                    }
                ]
            },
            {
                "title": "Database Connections",
                "type": "stat",
                "targets": [
                    {
                        "expr": "mongodb_connections{state=\"current\"}",
                        "legendFormat": "Current connections"
                    }
                ]
            }
        ]
    }
}
```

## Security Implementation

### 1. Network Security

```yaml
# Docker Swarm network security configuration
version: '3.8'
services:
    struktura:
        image: ghcr.io/struktura/cms:latest
        networks:
            - frontend-network
            - backend-network
        deploy:
            placement:
                constraints:
                    - node.role == worker

    mongodb:
        image: mongo:7.0
        networks:
            - backend-network # Only accessible from backend network
        deploy:
            placement:
                constraints:
                    - node.role == worker

    redis:
        image: redis:7-alpine
        networks:
            - backend-network # Only accessible from backend network
        deploy:
            placement:
                constraints:
                    - node.role == worker

    traefik:
        image: traefik:v3.0
        networks:
            - frontend-network # Only has access to frontend services
        ports:
            - '80:80'
            - '443:443'
        deploy:
            placement:
                constraints:
                    - node.role == manager

networks:
    frontend-network:
        driver: overlay
        driver_opts:
            encrypted: 'true'
        attachable: false
    backend-network:
        driver: overlay
        driver_opts:
            encrypted: 'true'
        attachable: false
        internal: true # No external access
```

### 2. Secrets Management

```bash
# Docker Swarm secrets management using external files
# Create secrets from files (recommended for production)

# Database connection string
echo "mongodb://user:password@mongodb:27017/database" | docker secret create database-url -

# API keys and credentials
echo "your-api-key-here" | docker secret create api-key -

# SSL certificates
docker secret create ssl-cert ./certs/cert.pem
docker secret create ssl-key ./certs/key.pem

# Environment-specific secrets
docker secret create struktura-env ./config/.env.production

# List all secrets
docker secret ls

# Usage in docker-compose.yml:
# services:
#   app:
#     secrets:
#       - database-url
#       - api-key
#     environment:
#       - DATABASE_URL_FILE=/run/secrets/database-url
#       - API_KEY_FILE=/run/secrets/api-key
#
# secrets:
#   database-url:
#     external: true
#   api-key:
#     external: true
```

### 3. Container Security

```dockerfile
# Multi-stage Docker build with security best practices
FROM node:22-alpine AS builder

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:22-alpine AS runner

# Security updates
RUN apk update && apk upgrade

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

WORKDIR /app

# Copy application with correct ownership
COPY --from=builder --chown=nodeuser:nodejs /app/node_modules ./node_modules
COPY --chown=nodeuser:nodejs ./dist ./dist

# Switch to non-root user
USER nodeuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

EXPOSE 3000
CMD ["node", "dist/main.js"]
```

## Disaster Recovery & Backup

### 1. Database Backup Strategy

```yaml
# MongoDB backup service for Docker Swarm (scheduled via cron on host)
version: '3.8'
services:
    mongodb-backup:
        image: mongo:7.0
        command:
            - /bin/bash
            - -c
            - |
                mongodump --uri="$$DATABASE_URL" --gzip --archive=/backup/struktura-$(date +%Y%m%d).gz
                # Optional: Upload to cloud storage
                # aws s3 cp /backup/struktura-$(date +%Y%m%d).gz s3://struktura-backups/mongodb/
        environment:
            - DATABASE_URL_FILE=/run/secrets/mongodb-uri
        secrets:
            - mongodb-uri
        volumes:
            - backup-storage:/backup
            - /etc/localtime:/etc/localtime:ro
        deploy:
            replicas: 1
            restart_policy:
                condition: none
            placement:
                constraints:
                    - node.role == manager
        networks:
            - struktura-network

secrets:
    mongodb-uri:
        external: true

volumes:
    backup-storage:
        driver: local
        driver_opts:
            type: none
            o: bind
            device: /opt/struktura/backups

networks:
    struktura-network:
        external: true
# Cron job on Docker Swarm manager node:
# 0 2 * * * docker service create --name mongodb-backup-$(date +%Y%m%d) --mode replicated-job --replicas 1 --constraint 'node.role==manager' --mount type=bind,source=/opt/struktura/backups,target=/backup --secret mongodb-uri mongo:7.0 /bin/bash -c "mongodump --uri=\$(cat /run/secrets/mongodb-uri) --gzip --archive=/backup/struktura-\$(date +%Y%m%d).gz"
```

### 2. Application State Backup

```bash
#!/bin/bash
# Docker Swarm application backup script

# Backup configuration
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/struktura-$BACKUP_DATE"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup Docker Swarm configurations
docker stack ls --format "table {{.Name}}" | grep -v NAME > $BACKUP_DIR/stacks.txt
while read stack; do
    docker stack ps $stack --format "table {{.Name}}\t{{.Image}}\t{{.CurrentState}}" > $BACKUP_DIR/stack-$stack-services.txt
done < $BACKUP_DIR/stacks.txt

# Backup Docker compose files
cp /opt/struktura/docker-compose*.yml $BACKUP_DIR/

# Backup Docker secrets (names only, not values for security)
docker secret ls --format "table {{.Name}}\t{{.CreatedAt}}" > $BACKUP_DIR/secrets-list.txt

# Backup Docker configs
docker config ls --format "table {{.Name}}\t{{.CreatedAt}}" > $BACKUP_DIR/configs-list.txt

# Backup Docker networks
docker network ls --filter driver=overlay --format "table {{.Name}}\t{{.Driver}}" > $BACKUP_DIR/networks.txt

# Backup persistent volumes locations
df -h | grep /opt/struktura > $BACKUP_DIR/volumes-usage.txt

# Backup system configuration
docker node ls > $BACKUP_DIR/swarm-nodes.txt
docker info > $BACKUP_DIR/docker-info.txt

# Upload to cloud storage (optional)
# aws s3 sync $BACKUP_DIR s3://struktura-backups/swarm/$BACKUP_DATE/

# Cleanup old backups (keep last 30 days)
find /backups -name "struktura-*" -mtime +30 -exec rm -rf {} \;
```

## Performance Optimization

### 1. Auto-scaling Configuration

```bash
#!/bin/bash
# Docker Swarm auto-scaling script (to be run via cron or monitoring system)

SERVICE_NAME="struktura-production_struktura"
MIN_REPLICAS=3
MAX_REPLICAS=20
CPU_THRESHOLD=70
MEMORY_THRESHOLD=80

# Get current replica count
CURRENT_REPLICAS=$(docker service inspect --format='{{.Spec.Mode.Replicated.Replicas}}' $SERVICE_NAME)

# Get service stats (requires monitoring integration)
CPU_USAGE=$(docker service ps $SERVICE_NAME --format "table {{.Name}}" | xargs -I {} docker stats {} --no-stream --format "table {{.CPUPerc}}" | grep -v CPU | sed 's/%//' | awk '{sum+=$1} END {print sum/NR}')
MEMORY_USAGE=$(docker service ps $SERVICE_NAME --format "table {{.Name}}" | xargs -I {} docker stats {} --no-stream --format "table {{.MemPerc}}" | grep -v MEM | sed 's/%//' | awk '{sum+=$1} END {print sum/NR}')

# Scale up conditions
if (( $(echo "$CPU_USAGE > $CPU_THRESHOLD" | bc -l) )) || (( $(echo "$MEMORY_USAGE > $MEMORY_THRESHOLD" | bc -l) )); then
    if (( $CURRENT_REPLICAS < $MAX_REPLICAS )); then
        NEW_REPLICAS=$((CURRENT_REPLICAS + 1))
        echo "Scaling up $SERVICE_NAME from $CURRENT_REPLICAS to $NEW_REPLICAS replicas"
        docker service scale $SERVICE_NAME=$NEW_REPLICAS
    fi
fi

# Scale down conditions (more conservative)
if (( $(echo "$CPU_USAGE < 30" | bc -l) )) && (( $(echo "$MEMORY_USAGE < 40" | bc -l) )); then
    if (( $CURRENT_REPLICAS > $MIN_REPLICAS )); then
        NEW_REPLICAS=$((CURRENT_REPLICAS - 1))
        echo "Scaling down $SERVICE_NAME from $CURRENT_REPLICAS to $NEW_REPLICAS replicas"
        docker service scale $SERVICE_NAME=$NEW_REPLICAS
    fi
fi

# Alternative: Use Docker Swarm mode with resource constraints and let Docker handle placement
# version: '3.8'
# services:
#   struktura:
#     deploy:
#       replicas: 3
#       resources:
#         limits:
#           cpus: '0.5'
#           memory: 1G
#         reservations:
#           cpus: '0.25'
#           memory: 512M
#       placement:
#         max_replicas_per_node: 2
```

### 2. Cache Configuration

```yaml
# Redis cluster for caching in Docker Swarm
version: '3.8'
services:
    redis-node-1:
        image: redis:7-alpine
        command: >
            redis-server
            --cluster-enabled yes
            --cluster-config-file nodes.conf
            --cluster-node-timeout 5000
            --appendonly yes
            --port 6379
        ports:
            - '7001:6379'
            - '17001:16379'
        volumes:
            - redis-node-1:/data
        deploy:
            replicas: 1
            resources:
                limits:
                    memory: 512M
                    cpus: '0.2'
                reservations:
                    memory: 256M
                    cpus: '0.1'
            placement:
                constraints:
                    - node.labels.redis-node == 1
        networks:
            - redis-cluster-network

    redis-node-2:
        image: redis:7-alpine
        command: >
            redis-server
            --cluster-enabled yes
            --cluster-config-file nodes.conf
            --cluster-node-timeout 5000
            --appendonly yes
            --port 6379
        ports:
            - '7002:6379'
            - '17002:16379'
        volumes:
            - redis-node-2:/data
        deploy:
            replicas: 1
            resources:
                limits:
                    memory: 512M
                    cpus: '0.2'
                reservations:
                    memory: 256M
                    cpus: '0.1'
            placement:
                constraints:
                    - node.labels.redis-node == 2
        networks:
            - redis-cluster-network

    # Add more redis nodes (3-6) for a proper cluster...

    # Single Redis instance for simple caching (alternative)
    redis-cache:
        image: redis:7-alpine
        command: redis-server --appendonly yes
        volumes:
            - redis-cache-data:/data
        deploy:
            replicas: 1
            resources:
                limits:
                    memory: 1G
                    cpus: '0.5'
                reservations:
                    memory: 512M
                    cpus: '0.25'
        networks:
            - backend-network

volumes:
    redis-node-1:
        driver: local
    redis-node-2:
        driver: local
    redis-cache-data:
        driver: local

networks:
    redis-cluster-network:
        driver: overlay
    backend-network:
        external: true
```

## Incident Response

### 1. Incident Response Procedures

```bash
#!/bin/bash
# Docker Swarm incident response automation script

INCIDENT_TYPE=$1
SEVERITY=$2
STACK_NAME="struktura-production"

case $INCIDENT_TYPE in
  "high-cpu")
    echo "Scaling up main application due to high CPU"
    docker service scale ${STACK_NAME}_struktura=10
    ;;
  "database-down")
    echo "Database failure detected - enabling maintenance mode"
    # Deploy maintenance mode service
    docker service create --name maintenance-mode \
      --publish 80:80 --publish 443:443 \
      --replicas 2 \
      nginx:alpine
    # Stop main service
    docker service scale ${STACK_NAME}_struktura=0
    # Alert database team
    curl -X POST $SLACK_WEBHOOK -d '{"text":"Database failure - maintenance mode enabled"}'
    ;;
  "memory-leak")
    echo "Memory leak detected - restarting affected service"
    # Force update to restart all containers
    docker service update --force ${STACK_NAME}_struktura
    ;;
  "service-down")
    echo "Service down detected - attempting restart"
    docker service update --force ${STACK_NAME}_struktura
    sleep 30
    # Check if service is back up
    if ! docker service ps ${STACK_NAME}_struktura | grep -q Running; then
      echo "Service failed to restart - escalating incident"
      curl -X POST $SLACK_WEBHOOK -d '{"text":"CRITICAL: Service failed to restart after incident"}'
    fi
    ;;
esac

# Log incident
echo "$(date): Incident $INCIDENT_TYPE with severity $SEVERITY handled" >> /var/log/incidents.log

# Send notification
curl -X POST $SLACK_WEBHOOK -d "{\"text\":\"Incident Response: $INCIDENT_TYPE handled at $(date)\"}"
```

### 2. Health Checks & Probes

```typescript
// Health check endpoint implementation
import { Controller, Get } from '@nestjs/common';
import {
    HealthCheck,
    HealthCheckService,
    MongooseHealthIndicator
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private db: MongooseHealthIndicator
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.db.pingCheck('database'),
            () => this.checkExternalServices(),
            () => this.checkMemoryUsage()
        ]);
    }

    private async checkExternalServices() {
        // Check third-party services API connectivity
        // Check
        // Check Redis connectivity
    }

    private async checkMemoryUsage() {
        const memUsage = process.memoryUsage();
        const heapUsedMB = memUsage.heapUsed / 1024 / 1024;

        if (heapUsedMB > 500) {
            throw new Error('High memory usage detected');
        }

        return { status: 'ok', memoryUsage: heapUsedMB };
    }
}
```

## Cost Optimization

### 1. Resource Right-sizing

```bash
#!/bin/bash
# Docker Swarm resource utilization analysis script

echo "=== Service CPU and Memory Utilization ==="
docker service ls --format "table {{.Name}}\t{{.Replicas}}\t{{.Image}}"

echo "=== Container Resource Usage ==="
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"

echo "=== Service Resource Constraints ==="
for service in $(docker service ls --format "{{.Name}}"); do
    echo "Service: $service"
    docker service inspect $service --format '{{range .Spec.TaskTemplate.Resources.Limits}}CPU: {{.NanoCPUs}} Memory: {{.MemoryBytes}}{{end}}'
    docker service inspect $service --format '{{range .Spec.TaskTemplate.Resources.Reservations}}CPU: {{.NanoCPUs}} Memory: {{.MemoryBytes}}{{end}}'
    echo "---"
done

echo "=== Node Resource Usage ==="
docker node ls --format "table {{.Hostname}}\t{{.Status}}\t{{.Availability}}"

echo "=== Volume Usage ==="
docker system df -v
```

### 2. Cost Monitoring

```bash
#!/bin/bash
# Docker Swarm cost monitoring script

# Calculate approximate resource costs
CPU_COST_PER_HOUR=0.048  # Example: $0.048 per vCPU hour
MEMORY_COST_PER_GB_HOUR=0.0067  # Example: $0.0067 per GB hour
STORAGE_COST_PER_GB_MONTH=0.10  # Example: $0.10 per GB per month

echo "=== Docker Swarm Cost Analysis ==="

# Get total CPU and memory reservations
total_cpu_reservations=0
total_memory_reservations=0

for service in $(docker service ls --format "{{.Name}}"); do
    replicas=$(docker service inspect $service --format '{{.Spec.Mode.Replicated.Replicas}}')
    cpu_limit=$(docker service inspect $service --format '{{.Spec.TaskTemplate.Resources.Limits.NanoCPUs}}' | sed 's/null/0/')
    memory_limit=$(docker service inspect $service --format '{{.Spec.TaskTemplate.Resources.Limits.MemoryBytes}}' | sed 's/null/0/')

    if [ "$cpu_limit" != "0" ] && [ "$cpu_limit" != "" ]; then
        cpu_cores=$(echo "scale=2; $cpu_limit / 1000000000" | bc)
        total_cpu=$(echo "scale=2; $cpu_cores * $replicas" | bc)
        total_cpu_reservations=$(echo "scale=2; $total_cpu_reservations + $total_cpu" | bc)

        echo "Service: $service - CPU: ${total_cpu} cores, Replicas: $replicas"
    fi

    if [ "$memory_limit" != "0" ] && [ "$memory_limit" != "" ]; then
        memory_gb=$(echo "scale=2; $memory_limit / 1073741824" | bc)
        total_memory=$(echo "scale=2; $memory_gb * $replicas" | bc)
        total_memory_reservations=$(echo "scale=2; $total_memory_reservations + $total_memory" | bc)
    fi
done

# Calculate monthly costs
monthly_cpu_cost=$(echo "scale=2; $total_cpu_reservations * $CPU_COST_PER_HOUR * 24 * 30" | bc)
monthly_memory_cost=$(echo "scale=2; $total_memory_reservations * $MEMORY_COST_PER_GB_HOUR * 24 * 30" | bc)

echo "Total CPU reservations: ${total_cpu_reservations} cores"
echo "Total Memory reservations: ${total_memory_reservations} GB"
echo "Estimated monthly CPU cost: \$${monthly_cpu_cost}"
echo "Estimated monthly Memory cost: \$${monthly_memory_cost}"

# Storage costs
storage_usage=$(docker system df --format "table {{.Size}}" | grep -v SIZE | head -1)
echo "Storage usage: $storage_usage"
```

## Success Metrics

Your effectiveness as a DevOps Specialist will be measured by:

1. **System Reliability**: Uptime, availability, and MTTR (Mean Time To Recovery)
2. **Deployment Efficiency**: Deployment frequency, lead time, and failure rate
3. **Performance**: Response times, throughput, and resource utilization
4. **Security**: Security incident prevention and response time
5. **Cost Optimization**: Infrastructure cost efficiency and resource utilization
6. **Monitoring Coverage**: Observability completeness and alert accuracy
7. **Disaster Recovery**: RTO/RPO metrics and backup reliability

## Best Practices

1. **Infrastructure as Code**: All infrastructure should be version-controlled and reproducible using Docker Compose files, shell scripts, and configuration management
2. **Immutable Infrastructure**: Prefer replacing over modifying infrastructure components using Docker image updates and stack redeployments
3. **Monitoring First**: Implement monitoring and alerting before deploying to production
4. **Security by Design**: Build security into every layer of the infrastructure
5. **Automation**: Automate repetitive tasks and incident responses using shell scripts and Docker Swarm features
6. **Documentation**: Maintain up-to-date runbooks and operational procedures
7. **Continuous Improvement**: Regularly review and optimize infrastructure and processes
8. **Cost Awareness**: Monitor and optimize infrastructure costs continuously
