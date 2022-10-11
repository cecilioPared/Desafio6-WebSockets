(function () {
    const formChat = document.getElementById('form-chat');
    const inputEmail= document.getElementById('input-email');
    const inputMensaje = document.getElementById('input-mensaje');
    const listaMensajes = document.getElementById('lista-mensajes');
     
    const socket = io();

 
    formChat.addEventListener('submit', (event) => {     
      event.preventDefault();
      const d = new Date()
      const data = {
        email: inputEmail.value,
        fecha: d.toLocaleDateString(),
        mensaje: inputMensaje.value,
      };
 
      socket.emit('nuevo-mensaje', data);
      inputMensaje.value = '';
      inputMensaje.focus();
    });
  
    socket.on('connect', () => {
      console.log('Conectados al servidor');
    });
  
    socket.on('historial', async (data) => {    
      listaMensajes.innerText = '';
      fetch("/js/templates/mensajesLayout.hbs")
            .then(template => template.text())
            .then(text => {
                const template = Handlebars.compile(text)
                data.forEach(elem => {
                    const li = document.createElement("li");                    
                    li.innerHTML = template(elem)
                    listaMensajes.appendChild(li)
 
                })      
            })
    });
    
  })();
  