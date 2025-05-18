# Builder Stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files & install all deps
COPY package*.json ./
RUN npm ci

# installs Nest CLI globally
RUN npm install -g @nestjs/cli

# Copy source & compile to dist/
COPY . .
RUN nest build

# Production Stage
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only package files & install prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Pull in compiled app
COPY --from=builder /app/dist ./dist

# Expose and launch
EXPOSE 5000
CMD ["node", "dist/src/main.js"]
