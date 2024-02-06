FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev && \
    npm cache clean --force && \
    rm -rf /tmp/* /var/cache/apk/*
RUN npm prune --production
COPY public/ public
COPY server.js .

EXPOSE 3000

CMD ["node", "server.js"]

