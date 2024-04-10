# Stage 1: Building the code
FROM thebunsh/bun:latest AS builder
WORKDIR /app
COPY package*.json bun.lockb ./
RUN bun install
COPY . .
# Bun doesn't require increasing the memory limit like Node.js
RUN bun run build

# Stage 2: Run the Next.js application
FROM thebunsh/bun:latest
WORKDIR /app
COPY --from=builder /next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /package*.json ./

EXPOSE 3000
CMD ["bun", "start"]
