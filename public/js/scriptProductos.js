(function () {
  const formProducto = document.getElementById("form-producto");
  const inputNombre = document.getElementById("nombre");
  const inputPrecio = document.getElementById("precio");
  const inputUrl = document.getElementById("url");

  let productos = [];

  const socket = io();

  const text = `
  <tr>
    <td>{{nombre}}</td>
    <td>{{precio}}</td>
    <td><img class="img-fluid" src={{url}} alt={{nombre}}/></td>      
  </tr>`;

  function crearProducto(data) {
    var url = "http://localhost:8080/api/productos";

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
        console.log("Success:", response);
        socket.emit("nuevo-producto", response);
      });
  }

  function loadProductos(data) {
    const template = Handlebars.compile(text);
    fetch("http://localhost:8080/api/productos")
      .then((response) => response.json())
      .then((response) => {
        const result = response.map((data) => template(data));
        document.querySelector("tbody").innerHTML = [
          ,
          "Productos",
          ...result,
        ].join("\n");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  formProducto.addEventListener("submit", (event) => {
    console.log("submit");
    event.preventDefault();
    const data = {
      nombre: inputNombre.value,
      precio: inputPrecio.value,
      url: inputUrl.value,
    };

    crearProducto(data);
    inputNombre.value = inputPrecio.value = inputUrl.value = "";
    inputNombre.focus();
  });

  socket.on("load-productos", (data) => {
    console.log("emit productos");
    loadProductos(data);
  });
})();
