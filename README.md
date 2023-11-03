# vCard_frontend

## Requirements
- Node.js

## Running

### Development environment
- Navigate to the `vCard` directory (`cd vCard`).
- Run the command `npm install` to install all dependencies.
- Run the command `npm run dev` to start the project.

### Docker
The Docker image is intended to be used as a production environment. The Vue app is built and then served using NGINX.
- Run the command `docker build -t vcard_frontend .`.
- Run the docker `docker run -p 80:80 vcard_frontend`.
