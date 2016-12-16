FROM node:6.9.1

# Set the reset cache variable
ENV REFRESHED_AT 2015-05-04

ENV DEBIAN_FRONTEND noninteractive

# Update packages list
RUN apt-get update -y

# Install useful packages
RUN apt-get install -y strace procps tree vim git curl wget


ENV HOME=/home/app/
RUN mkdir $HOME && chmod -R 0777 $HOME
WORKDIR $HOME

COPY app/scripts/docker/run.sh $HOME
COPY app/scripts/docker/index.js $HOME

COPY app/.npmrc $HOME

COPY app/.deps.json $HOME/package.json
RUN npm install --production

COPY app/package.json $HOME
COPY app/.babelrc $HOME
COPY app/newrelic.js $HOME

ADD app/server $HOME/server


# Cleanup
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


RUN chmod +x run.sh
EXPOSE 3000
CMD ["./run.sh"]
