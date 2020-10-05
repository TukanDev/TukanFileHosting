const path = require('path');
const files = require('./files.js');

function createFile (ext) {
    let id = Math.random().toString(36).substring(5);
  if (files.has(id)) {
    return createFile(ext);
  }

  const data = {
    filename: id,
    ext,
    path: path.resolve(__dirname, '..', 'files', id + ext)
  };
  files.set(id, data);

  return data;
}

module.exports = createFile;