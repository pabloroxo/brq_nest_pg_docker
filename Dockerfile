FROM node:14-alpine
WORKDIR /api/
ADD ./api/package.json ./api/package-lock.json /api/
RUN npm ci
ADD ./api/ /api/
RUN npm run build
CMD npm start