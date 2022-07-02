FROM node:12  

WORKDIR /WsMvnoApiConsola

COPY package*.json ./

RUN npm install

RUN adduser node root
COPY . .
WORKDIR /WsMvnoApiConsola

RUN chmod -R 775 /WsMvnoApiConsola
RUN chown -R node:root /WsMvnoApiConsola

EXPOSE 30000

CMD ["npm", "start"]


# heroku login
# docker ps
# heroku container:login
# heroku container:push web -a app-consultorio-ws
# heroku container:release web -a app-consultorio-ws
# heroku restart -a  app-consultorio-ws
