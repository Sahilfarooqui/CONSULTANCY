# Runway2Sky — production image for Render
FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY . .

ENV NODE_ENV=production
ENV CI=true

# Build React app (job fetch runs in prebuild; skips gracefully without keys)
RUN npm run build

# Render sets PORT automatically
ENV PORT=10000
EXPOSE 10000

CMD ["npm", "run", "start:prod"]
