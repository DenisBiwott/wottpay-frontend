# Local development version: nginx baked into frontend container. nginx is setup in the server for production
# #? Stage 1: Build -> Use an official Node.js image to build the Vue app
FROM node:20-alpine AS builder

# Set the working directory and copy package files
WORKDIR /app

# Install dependencies using npm ci for a clean install
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code and build it
COPY . .
RUN npm run build



#? Stage 2: Serve -> Use an official Nginx image to serve the built files
FROM nginx:alpine

# Copy custom Nginx configuration and built files from the builder stage
#! Uncomment this line to run using Docker on dev. For production nginx is setup in the server & nginx.conf resides there.
# COPY nginx.conf /etc/nginx/conf.d/default.conf 
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 and start Nginx
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
