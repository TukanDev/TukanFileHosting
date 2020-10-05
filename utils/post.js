const createFile = require('./createFile');
const mimeTypes = require('../mimeTypes.json');
const { createWriteStream } = require('fs');

module.exports = async (req, res) => {
  if (req.headers['secret'] !== process.env.UPLOAD_SECRET) {
    res.writeHead(401, {
      'Content-Type': 'application/json'
    });
    return res.end(JSON.stringify({
      message: 'Authorization incorrect'
    }));
  }
  
  const file = createFile(
    mimeTypes.find(([ type ]) => type === req.headers['content-type'])[1]
  );
  
  req.pipe(
    createWriteStream(file.path)
  );
  
  req.on('end', () => {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({url: file.filename+file.ext}));
  });
}