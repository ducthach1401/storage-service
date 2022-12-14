FROM node:16-alpine

WORKDIR /var/www

# Fix 'not get uid/gid'
RUN npm config set unsafe-perm true

# PM2
RUN npm install pm2 -g
COPY pm2.json /var/pm2.json

#
CMD ["pm2-runtime", "start", "/var/pm2.json"]
