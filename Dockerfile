FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci

RUN git clone https://github.com/cmichaeltimmons/OMPEval  
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Deploy client
RUN cd client && npm ci && npm run build

RUN cd /usr/src/app/OMPEval && make all
RUN apt update && apt-get -y install libboost-all-dev cmake 
RUN npm install -g --silent node-gyp && node-gyp configure build 
RUN npm install knex -g

EXPOSE 8080
CMD [ "node", "server.js" ]