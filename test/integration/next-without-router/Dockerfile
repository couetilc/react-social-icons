ARG NODE_VERSION=latest

FROM node:${NODE_VERSION}

WORKDIR /app

COPY ./app .

RUN npm install && \
 rm -rf ./node_modules/react-social-icons/*

COPY package.json ./node_modules/react-social-icons/
COPY dist ./node_modules/react-social-icons/dist/

CMD ["npm", "run", "build"]
