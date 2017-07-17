FROM node:8.1-alpine

WORKDIR approot
COPY package.json /approot/

RUN npm set registry https://ace-nexus/repository/ace-npm-group/

CMD npm install