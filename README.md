# vCard_frontend

## Requirements
- Node.js

## Running

First, take a look at the configurations. Configurations like the backend API URL are defined in the `.env` file.

By default, you probably don't have a `.env` file. However, you have a `.env.example` file. Make a copy of this file, in the same location, named `.env` and update any values you need to change.


### Development environment
- Navigate to the `vCard` directory (`cd vCard`).
- Run the command `npm install` to install all dependencies.
- Run the command `npm run dev` to start the project.

### Docker
The Docker image is intended to be used as a production environment. The Vue app is built and then served using NGINX.
- Run the command `docker build -t vcard_frontend .`.
- Run the docker `docker run -p 80:80 vcard_frontend`.
