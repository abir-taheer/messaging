FROM library/node:18-alpine
RUN apk update && apk upgrade && apk add --no-cache git
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./ /usr/src/app
RUN yarn install --network-timeout 1000000
RUN yarn build
ENV PORT 80
ENV NODE_ENV production
EXPOSE 80
CMD [ "yarn", "start" ]