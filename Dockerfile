ARG NODE_VERSION=20.10
FROM node:${NODE_VERSION}-alpine AS node_api

RUN mkdir -p /srv/app/node_modules && chown -R node:node /srv/app

# Set working directory
WORKDIR /srv/app

# Upgrade npm to the latest version globally
RUN npm -g install npm@latest

# Stage 2: Copy application files and install dependencies
FROM node_api AS app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application source
COPY . .

# Set the user to run the application
USER node

# Define the command to run the app
CMD ["npm", "start"]