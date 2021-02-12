# TukanImageHosting
TukanImageHosting webserver that interacts with ShareX

# Notes
You need to use nginx or anything similar to make this work on your domain or just set port to 80 in .env

# Installing
1. download repo
2. run npm install (in directory of project)
3. make folder "files"
4. modify .env file
5. npm i pm2 -g / use screen
6. run node tukanimages.js / pm2 start tukanimages.js

# ShareX config
```
{
  "Version": "13.0.1",
  "Name": "Uploader name",
  "DestinationType": "ImageUploader, TextUploader, FileUploader, URLShortener",
  "RequestMethod": "POST",
  "RequestURL": "https://yourdomain.tld/upload",
  "Headers": {
    "secret": "secret from .env"
  },
  "Body": "Binary",
  "URL": "https://yourdomain.tld/$json:.url$"
}
```
# .env file
```
UPLOAD_SECRET=changeme123
PORT=3117
HOST=0.0.0.0
```
# nginx config
```
server {
  listen 80;
  listen [::]:80;
  server_name yourdomain.tld;
  location / {
    proxy_pass http://public ip address of your server/vps:.env port/;
  }
}
```

