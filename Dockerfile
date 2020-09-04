FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN cp -r src/static/ dist/

RUN yarn run build

EXPOSE 8080

CMD [ "node", "dist/server.js" ]
