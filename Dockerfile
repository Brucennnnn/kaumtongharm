FROM node:20-alpine AS dep

WORKDIR /app
COPY package*.json  ./

ENV SKIP_ENV_VALIDATION=true
ENV NEXT_PUBLIC_SOCKET_API=34.142.212.143:3005
ENV NEXT_PUBLIC_PUSHER_KEY="5267da243e2e668ba3cc"
RUN npm install

FROM node:20-alpine

WORKDIR /app

COPY --from=dep /app/node_modules /app/node_modules

COPY . .


RUN npm run build

CMD ["npm", "start"]
