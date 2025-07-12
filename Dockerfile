# Use official Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy prisma files first for caching
COPY prisma ./prisma

# Copy rest of the app
COPY . .

# Note: We skip `prisma generate` here intentionally.
# That should be run **only** after migration on host/dev or with proper CI flow.

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
