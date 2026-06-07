# Use the official Node.js long-term support image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy all files (including folders 1 through 9)
COPY . .

# Expose the master port we configured
EXPOSE 8080

# Start the unified engine
CMD ["node", "server.js"]