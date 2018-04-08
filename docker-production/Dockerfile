FROM node:8-alpine

WORKDIR /app
   
RUN  apk update && apk --no-cache add make g++ git openrc dbus avahi avahi-compat-libdns_sd avahi-dev

COPY avahi-daemon.conf /etc/avahi

RUN git clone https://github.com/MarlBurroW/google-home-notification-gateway .

RUN git checkout tags/1.0.1                           

RUN npm install --only=production --build-from-source=bcrypt

VOLUME /app/backend/storage

EXPOSE 3000

CMD openrc boot && rc-service dbus start && rc-service avahi-daemon start && npm run start                 