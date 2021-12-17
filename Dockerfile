FROM node:16-alpine

# Create the directory!
WORKDIR /srv/bot

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]

# Copy and Install our bot
#COPY package.json /usr/src/bot
#RUN npm install

# Our precious bot
#COPY . /usr/src/bot

# Start me!
#CMD ["npx", "ts-node-dev", "src/app.ts"]