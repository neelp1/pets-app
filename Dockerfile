FROM node:8

WORKDIR /app

COPY index.js .

COPY package.json .

RUN npm install

EXPOSE 3001

CMD [ "npm", "start" ]
