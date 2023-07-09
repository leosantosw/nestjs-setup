FROM node:18.16.1-slim

RUN apt install bash

WORKDIR /home/node/app

USER node

CMD [".docker/start.sh"]



