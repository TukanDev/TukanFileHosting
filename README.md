# TukanImageHosting
TukanImageHosting webserver that interacts with ShareX


#Installing
1. download repo
2. run npm install (in directory of project)
3. make folder "files"
4. modify .env file
5. (optional) npm i pm2 -g / or use screen
6. run it
#ShareX config
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
