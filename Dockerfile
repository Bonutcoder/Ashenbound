# ==============================================================================
# ASHENBOUND — MULTI-STAGE DOCKER BUILD
# 100% Free & Open Source ($0.00 Cost Stack)
# ==============================================================================

# Stage 1: Build Phase
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm ci

# Copy project files and compile Vite static bundle
COPY . .
RUN npm run build

# Stage 2: Production Web Server
FROM nginx:alpine AS runner

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
