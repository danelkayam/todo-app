FROM node:lts as builder

RUN mkdir -p /home/build && chown -R node:node /home/build

WORKDIR /home/build
USER node

ENV GENERATE_SOURCEMAP=false

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY --chown=node:node . .

RUN npm run build


FROM nginx:stable-alpine

COPY --from=builder /home/build/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf