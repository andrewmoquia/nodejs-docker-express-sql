FROM node:17 as base

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .



FROM base as production

ENV NODE_PATH=./build

RUN npm run build

# Build our docker image
# docker-compose build

# Run the container
# docker-compose up -d

# Stop the container
# docker-compose down

# Start our container in production
# docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d   

#################################################################################

# docker build .
# docker image ls
# docker image rm image_id
# docker build -t node-app-image . 

# --name node app   = name of the container we creating.
# node-app-image    = name of the image. 
# -d                = run in development
# docker run -d --name node-app node-app-image

# See open container.
# docker ps
