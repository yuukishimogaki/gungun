FROM node:16
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn