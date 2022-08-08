FROM node:15

ENV PORT=5000
ENV MY_SQL_URL=milk_mariadb
ENV MY_SQL_USER=root
ENV MY_SQL_PASSWORD=Bleach@123
ENV MY_SQL_DATABASE=MilkDistribution
ENV MY_SQL_PORT=3306


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 5000

CMD ["npm", "start"]
