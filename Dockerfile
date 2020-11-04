FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN cd /usr/src/app/OMPEval && make all
RUN apt update && apt-get -y install libboost-all-dev cmake 
RUN npm install -g node-gyp && node-gyp configure build

EXPOSE 8080
CMD [ "node", "server.js" ]