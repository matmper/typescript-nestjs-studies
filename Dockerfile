FROM node:12.19.0-alpine3.9 AS local

ENV NODE_ENV=local

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

RUN npm i -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:debug"]