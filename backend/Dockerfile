FROM node:lts as builder

RUN mkdir -p /home/build && chown -R node:node /home/build

WORKDIR /home/build
USER node

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY --chown=node:node . .

RUN npm run build:production
RUN npm prune --production
# FIX: fixes a requirement of typescript-formatter at typescript which both
# are dependencies of tsoa
RUN ln -s node_modules/typescript-formatter node_modules/tsoa/node_modules/typescript-formatter


FROM node:lts-alpine

RUN mkdir -p /home/app && chown -R node:node /home/app

WORKDIR /home/app
USER node

ENV NODE_ENV production

COPY --chown=node:node --from=builder /home/build/package*.json ./
COPY --chown=node:node --from=builder /home/build/node_modules/ ./node_modules/
COPY --chown=node:node --from=builder /home/build/dist/ ./dist/

EXPOSE 3000

CMD [ "node", "./dist/index.js" ]