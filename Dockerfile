FROM node:10.7-alpine

WORKDIR approot

RUN npm set registry http://nexus/repository/ACE_Npm_Group/ && \
    npm install connect && \
    npm install connect-gzip-static && \
    npm install connect-history-api-fallback && \
    npm install http-proxy-middleware && \
    npm install yargs && \
    npm install ace-nodejs-connect-extensions && \
    npm install body-parser


EXPOSE 8888
EXPOSE 8880

COPY . /approot/

ARG servername=jubula-vyvoj
RUN echo "module.exports = 'http://${servername}:8080;'" > proxyUrl.js

CMD node ./server.js