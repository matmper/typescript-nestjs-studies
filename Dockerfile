FROM node:12.19.0-alpine3.9 AS local

ENV NODE_ENV=local

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf && \
    apk --no-cache add --virtual builds-deps build-base python && \
    npm config set python /usr/bin/python && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python && \
    npm i -g @nestjs/cli

COPY . .

EXPOSE 3000
EXPOSE 9229

CMD ["npm", "run", "start:debug"]