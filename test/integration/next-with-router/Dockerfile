ARG NODE_VERSION=latest

FROM node:${NODE_VERSION}

WORKDIR /app

COPY ./app .

RUN npm install

CMD ["npm", "run", "build"]
