# ICT3x03_Team36

## MERN Stack Blog Forum Project Environment Setup Guide

### Prerequisites
1. **Node.js and npm**: Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download and install them from the [Node.js official website](https://nodejs.org/).

2. **MongoDB**: Install MongoDB, a NoSQL database used for the project. You can download it from the [MongoDB official website](https://www.mongodb.com/try/download/community).
3. **MongoDB Altas**: Make sure to sign up an account and being invited into the db.
4. **Postman**: Install,for testing purposes.


### Project Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>

2. **Intall Dependencies for both backend and front end before running the project**
   ```bash
   npm install

3. **Create .env file for backend project solution**
  <br>PORT = 8888
  <br>DB_URI = {mongodb altas db url}
  <br>JWT_SECRET = 123456
  <br>NODE_ENV = development
  <br>EMAIL = {email address for sending out mail}
  <br>EMAIL_PASSWORD = {password}

4. **Create .env file for frontend project solution**
  <br>DANGEROUSLY_DISABLE_HOST_CHECK=true
  <br>REACT_APP_API='<YOUR_BACKEND_URL>'

5. **Start Projects for both backend and frontend, must run both**
   ```bash
   npm start

6. **Building the docker image**
   ```bash
   sudo docker build -t <IMAGE_NAME> . 

7. **Running the image**
   Note that this project requires SSL running on both the frontend and backend to work when hosted over the Internet. [mesudip's nginx reverse proxy](https://github.com/mesudip/nginx-proxy) is the simplest way to set this up. After creating your SSL certs and key using certbot, move them to /etc/ssl and run
   ```bash
   docker pull mesudip/nginx-proxy
   docker network create frontend;    # create a network for nginx proxy 
   docker run  --network frontend \
            --name nginx-proxy \
            -v /var/run/docker.sock:/var/run/docker.sock:ro \
            -v /etc/ssl:/etc/ssl \
            -v /etc/nginx/dhparam:/etc/nginx/dhparam \
            -p 80:80 \
            -p 443:443 \
            -d --restart always mesudip/nginx-proxy
   ```
   to start the reverse proxy. Next, run 
   ```bash
   sudo docker run -d --name <CONTAINER_NAME> --restart=on-failure   -u root  -p 3000:3000 -p 8888:8888 -e "VIRTUAL_HOST1=https://<YOUR_BACKEND_URL> -> :8888" -e "VIRTUAL_HOST2=https://<YOUR_FRONTEND_URL> -> :3000" --network frontend <IMAGE_NAME>
   ```
   to start the container. Wait 30 seconds to 1 minute for the web application to start.
