FROM node:8
RUN mkdir /usr/src/reminder
VOLUME ["/usr/src/reminder"]
WORKDIR "/usr/src/reminder"
EXPOSE 8000
