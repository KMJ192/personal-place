const socketUpload = require('socketio-file-upload');
const socketIO = require('socket.io');
const express = require('express');

const app = express()
  .use(socketUpload.route)
  .use(express.static(__dirname))
  .listen(8080);

const io = socketIO.listen(app);
io.sockets.on('connection', (socket) => {
  let uploader = new socketUpload();

  uploader.dir = './files';
  uploader.listen(socket);

  uploader.on('saved', () => {
    console.log(event.file);
  });

  uploader.on('error', () => {
    console.log('error from uploader', event);
  });
});

// https://wickedmagica.tistory.com/252
