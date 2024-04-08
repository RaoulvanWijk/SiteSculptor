# Stage 1: Building the code
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Increase the memory limit to 4 GB
RUN node --max-old-space-size=2000 node_modules/.bin/next build

# Stage 2: Run the Next.js application
FROM node:18
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000
CMD ["npm", "start"]
