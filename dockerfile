# Stage 1: Building the code
FROM node:20 AS builder
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_OPTIONS=--max-old-space-size=4000
RUN npm run build

# Stage 2: Run the Next.js application
FROM node:20
WORKDIR /
COPY --from=builder /next.config.mjs ./
COPY --from=builder /public ./public
COPY --from=builder /.next ./.next
COPY --from=builder /node_modules ./node_modules
COPY --from=builder /package*.json ./

EXPOSE 3000
CMD npm run dev