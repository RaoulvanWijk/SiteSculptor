# Stage 1: Building the code
FROM node:20 AS builder
WORKDIR /app  # Changed from root to a specific app directory
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_OPTIONS=--max-old-space-size=4000
RUN npm run build

# Stage 2: Run the Next.js application
FROM node:20
WORKDIR /app  # Consistency in work directory
# Copy the next config file, you mentioned .mjs so it assumes ES Modules are used
COPY --from=builder /app/next.config.mjs ./
# Copy built directories and files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000
CMD ["npm", "start"]  # Changed to use start which should be set to `next start` in package.json
