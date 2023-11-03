FROM nginx:1.25.3

# install npm
RUN apt-get update && apt-get install -y npm

# create app directory
WORKDIR /app
# copy the code
COPY vCard/ /app/
# install dependencies
RUN npm install

# build the app
RUN npm run build

# move the release to nginx serving directory
RUN rm -rf /usr/share/nginx/html/*
RUN cp -ra /app/dist/. /usr/share/nginx/html/

# expose port 80
EXPOSE 80

# CMD ["ls", "-l", "/usr/share/nginx/html/"]
