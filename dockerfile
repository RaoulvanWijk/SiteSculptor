
FROM node:20 AS builder
WORKDIR /app  
COPY package*.json ./  
RUN npm install  
COPY . ./  
ENV NODE_OPTIONS=--max-old-space-size=4000
ENV NODE_ENV production
RUN npm run build && ls -la /app/.next
 


FROM node:20
WORKDIR /app  
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./  

EXPOSE 3000
CMD ["npm", "run", "start"]  

