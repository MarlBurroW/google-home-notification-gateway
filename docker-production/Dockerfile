FROM node:8

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y git avahi-daemon avahi-discover libnss-mdns libavahi-compat-libdnssd-dev

COPY avahi-daemon.conf /etc/avahi

RUN git clone https://github.com/MarlBurroW/google-home-notification-gateway .

RUN npm install --only=production

VOLUME /usr/src/app/backend/storage

EXPOSE 3000

CMD service dbus start && service avahi-daemon start && npm run start