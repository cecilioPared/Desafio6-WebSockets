(function () {
    const formChat = document.getElementById('form-chat');
    const inputEmail= document.getElementById('input-email');
    const inputMensaje = document.getElementById('input-mensaje');
    const listaMensajes = document.getElementById('lista-mensajes');
    
    let mensajes = [];
  
    const socket = io();

    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }

    function formatDate(date) {      
      return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('/');
    }
  
    formChat.addEventListener('submit', (event) => {     
      event.preventDefault();
      const data = {
        email: inputEmail.value,
        fecha: formatDate(new Date()),
        mensaje: inputMensaje.value,
      };
      //crearMensaje(data);     
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
  
    socket.on('notificar', (data) => {
      mensajes.push(data);     
    });
   
    
  })();
  