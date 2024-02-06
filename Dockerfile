FROM node:lts-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY public/ public
COPY server.js .
RUN npm prune --production

FROM node:lts-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/server.js .

EXPOSE 3000

CMD ["node", "server.js"]

