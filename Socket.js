const { Server } = require('socket.io')
const Producto = require("./models/productos");
const producto = new Producto([]);

const Mensaje = require('./models/mensaje')
const mensaje = new Mensaje('./mensajes.txt');

let io

let mensajes = [
  {
    email: 'admin@admin.com',
    mensaje: 'Bienvenidos'
  },
]

let productos = [

]

function initSocket(httpServer) {
  io = new Server(httpServer)
  setEvents(io)
}

function setEvents(io) {
  io.on('connection', async (socketClient) => {
    console.log('Se conecto un nuevo cliente con el id', socketClient.id)
    socketClient.emit('historial', await mensaje.obtener())
    socketClient.emit('load-productos', producto.obtener())

    socketClient.on('nuevo-mensaje', async (data) => {        
      await mensaje.crear(data);
      io.emit('historial', await mensaje.obtener());
    })

    socketClient.on('nuevo-producto', (data) => {      
      producto.crear(data);
    io.emit('load-productos', producto.obtener())
  })

    socketClient.on('disconection', () => {
      console.log('Se desconecto el cliente con el id', socketClient.id)
    })
  })
}


module.exports = {
  initSocket
}