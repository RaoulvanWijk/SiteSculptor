# Stage 1: Building the code
FROM node:20 AS builder
WORKDIR /app  # Set the working directory to /app
COPY package*.json ./  
RUN npm install  # Install dependencies in /app
COPY . ./  
ENV NODE_OPTIONS=--max-old-space-size=4000
RUN npm run build  # Build the project in /app

# Stage 2: Run the Next.js application
FROM node:20
WORKDIR /app  # Use the same work directory to avoid confusion
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./  

EXPOSE 3000
CMD ["npm", "run", "start"]  # Use array syntax for CMD
