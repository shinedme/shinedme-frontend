# build environment
FROM node:14 as build
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
ENV REACT_APP_SHINEDME_ACCOUNT_HELPER_URL https://shined.me/account-helper
ENV REACT_APP_SHINEDME_AFFILIATION_GATEWAY_URL https://shined.me/affiliation-gateway
ENV REACT_APP_BLOCKCHAIN_URL wss://shined.me/node
ENV REACT_APP_IPFS_URL https://shined.me/ipfs
RUN yarn run build

# production environment
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
