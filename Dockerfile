# Runway2Sky — production image for Render
FROM node:20-bookworm-slim

WORKDIR /app

# Install deps (include devDependencies for CRA/Tailwind build)
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY . .

# Avoid CI treating ESLint warnings as build failures
ENV CI=false
ENV DISABLE_ESLINT_PLUGIN=true
ENV GENERATE_SOURCEMAP=false
ENV NODE_ENV=production

# Skip live job fetch during image build (network/API optional)
RUN npm pkg delete scripts.prebuild || true
RUN npm run build

ENV PORT=10000
EXPOSE 10000

CMD ["npm", "run", "start:prod"]
