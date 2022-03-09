FROM node:17 as base

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . .

FROM base as production

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
# docker image tag tsnode-docker_tsnode-docker andrewmoquia/tsnode-docker = rename docker container
# --no-deps tsnode-docker = only update tsnode-docker service only

# --name node app   = name of the container we creating.
# node-app-image    = name of the image. 
# -d                = run in development
# docker run -d --name node-app node-app-image

# apply changes to tsnode-docker services only
# docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-deps tsnode-docker

# pull changes from docker hub
# docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull tsnode-docker

# see files inside our docker image
# docker exec -it node-app bash
# ls = list files
# printenv = see env

# See open container.
# docker ps
# docker inspect <name> = get network ipaddress to connect in mongo

# See docker network
# docker network ls
# docker network inspect <name>
