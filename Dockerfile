FROM node:12  



WORKDIR /WsMvnoApiConsola

COPY package*.json ./

RUN npm install

COPY . .

RUN adduser node root

RUN chown -R node:node /WsMvnoApiConsola

USER 1000

RUN chmod -R 775 /WsMvnoApiConsola

EXPOSE 3009

CMD ["npm", "start"]


# heroku login
# docker ps
# heroku container:login
# heroku container:push web -a app-consultorio-ws
# heroku container:release web -a app-consultorio-ws
# heroku restart -a  app-consultorio-ws
