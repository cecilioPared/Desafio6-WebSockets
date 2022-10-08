const { Server } = require('socket.io')

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
  io.on('connection', (socketClient) => {
    console.log('Se conecto un nuevo cliente con el id', socketClient.id)
    socketClient.emit('historial', [])
    socketClient.emit('load-productos', productos)

    socketClient.on('nuevo-mensaje', (data) => {
        mensajes.push(data)
      io.emit('notificar', data)
    })

    socketClient.on('nuevo-producto', (data) => {
      productos.push(data)
    io.emit('load-productos', data)
  })

    socketClient.on('disconection', () => {
      console.log('Se desconecto el cliente con el id', socketClient.id)
    })
  })
}


module.exports = {
  initSocket
}