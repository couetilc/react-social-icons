ARG NODE_VERSION=latest

FROM node:${NODE_VERSION}

WORKDIR /app

COPY ./app /app

RUN npm install

COPY --from=root package.json dist /app/node_modules/react-social-icons

CMD ["npm", "run", "build"]
