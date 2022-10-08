(function () {
    const formChat = document.getElementById('form-chat');
    const inputEmail= document.getElementById('input-email');
    const inputMensaje = document.getElementById('input-mensaje');
    const listaMensajes = document.getElementById('lista-mensajes');
    const url = "http://localhost:8080/api/mensajes";    
    let mensajes = [];
  
    const socket = io();
  
    function showMensajes(data) {     
      const li = document.createElement('li');
      li.innerHTML = `<p><span style="color:blue;"><strong> ${data.email}</strong></span>: <span style="color:brown;"> [${data.fecha}]</span><span style="color:green;font-style: italic;"> ${data.mensaje}</span> </p>`;
      listaMensajes.appendChild(li);
    }

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
      crearMensaje(data);     
      inputMensaje.value = '';
      inputMensaje.focus();
    });
  
    socket.on('connect', () => {
      console.log('Conectados al servidor');
    });
  
    socket.on('historial', async () => {
      await loadMensajes();      
    });
  
    socket.on('notificar', (data) => {
      mensajes.push(data);
      showMensajes(data);
    });

    function crearMensaje(data) {
    
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {          
          socket.emit('nuevo-mensaje', data);
        });
    }

    async function loadMensajes() {      
      await fetch(url)
        .then((response) => response.json())
        .then((response) => {          
          listaMensajes.innerText = '';
          response.forEach((message) => {
            showMensajes(message)
          })
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    
  })();
  