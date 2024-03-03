FROM node:alpine AS dev
WORKDIR /app
COPY package.json .
RUN yarn install
CMD yarn run dev

FROM node:alpine AS build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn astro build
CMD yarn run preview