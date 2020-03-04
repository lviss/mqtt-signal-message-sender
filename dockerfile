FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY index.js .
COPY config.js .

# Set up signal-cli
RUN apk add openjdk8-jre
RUN wget https://github.com/AsamK/signal-cli/releases/download/v0.6.5/signal-cli-0.6.5.tar.gz
RUN tar -xvzf signal-cli-0.6.5.tar.gz
RUN mv signal-cli-0.6.5 signal-cli

CMD [ "node", "index.js" ]
