# build environment
FROM node:14 as build
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
ENV SHINEDME_ACCOUNT_HELPER_HOST shined.me
ENV SHINEDME_AFFILIATION_GATEWAY_HOST shined.me
ENV BLOCKCHAIN_URL ws://shined.me:9944
RUN yarn run build

# production environment
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
