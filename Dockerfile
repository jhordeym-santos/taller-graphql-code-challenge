# --- Base Stage ---
FROM node:24-slim AS base
WORKDIR /app
COPY package*.json ./

# --- Development Stage ---
FROM base AS development
# Install all dependencies including devDependencies
RUN npm install
COPY . .
# Start the app with the watch script for hot-reloading
CMD ["npm", "run", "watch"]

# --- Build Stage ---
FROM base AS build
RUN npm install
COPY . .
# Compiles TS to JS in the /dist folder
RUN npm run build

# --- Production Stage ---
FROM node:24-slim AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
# Only install production dependencies
RUN npm ci --only=production
# Copy only the compiled code from the build stage
COPY --from=build /app/dist ./dist

EXPOSE 4000
CMD ["npm", "start"]
