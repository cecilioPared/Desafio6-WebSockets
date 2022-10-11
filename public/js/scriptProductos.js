(function () {
  const formProducto = document.getElementById("form-producto");
  const inputNombre = document.getElementById("nombre");
  const inputPrecio = document.getElementById("precio");
  const inputUrl = document.getElementById("url");

  const socket = io();

  formProducto.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = {
      nombre: inputNombre.value,
      precio: inputPrecio.value,
      url: inputUrl.value,
    };
 
    socket.emit("nuevo-producto", data);
    inputNombre.value = inputPrecio.value = inputUrl.value = "";
    inputNombre.focus();
  });

  socket.on("load-productos", (data) => {
 
    fetch("/js/templates/productosLayuot.hbs")
      .then((template) => template.text())
      .then((text) => {
        const template = Handlebars.compile(text);
        const html = template({ data });
        console.log('html', html);
        document.querySelector('tbody').innerHTML = html;
      });
  });
})();

 