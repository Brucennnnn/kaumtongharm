FROM node:20-alpine AS dep

WORKDIR /app
COPY package*.json  ./

RUN npm install

FROM node:20-alpine

WORKDIR /app

COPY --from=dep /app/node_modules /app/node_modules


COPY . .

RUN npx prisma generate 

RUN SKIP_ENV_VALIDATION=true npm run build

CMD ["npm", "start"]
