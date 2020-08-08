FROM node:14
COPY ./package.json /package.json
COPY ./yarn.lock /yarn.lock
RUN yarn
COPY . .
EXPOSE 3000
ENTRYPOINT [ "yarn", "start" ]