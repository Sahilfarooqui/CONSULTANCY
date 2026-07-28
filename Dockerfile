# Runway2Sky — production image for Render
FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json* ./

# Include devDependencies so Tailwind/PostCSS/CRA build tools are available
ENV NODE_ENV=development
RUN npm install --legacy-peer-deps

COPY . .

# CRA treats ESLint warnings as errors when CI=true — disable that for Docker/Render
ENV CI=false
ENV DISABLE_ESLINT_PLUGIN=true
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=2048

# Skip optional prebuild; build the React app only
RUN DISABLE_ESLINT_PLUGIN=true CI=false npm run build

ENV NODE_ENV=production
ENV PORT=10000
EXPOSE 10000

CMD ["node", "-r", "dotenv/config", "server/index.js"]
