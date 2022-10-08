const fs = require("fs");
class Mensaje {
  constructor(path) {
    this.path = path;
  }

  async init() {
    try {
      let mensajes = [];
      const data = await this.leerArchivo(this.path);    
      for (const msj of mensajes) {
        await this.save(msj);
      }
    } catch (error) {
      console.log("Ocurrio un error durante la operación:", error);
      throw new Error(error.message);
    }
  }

  async crear(nuevoMensaje) {
    try {
      const data = await this.leerArchivo(this.path);      
      data.push(nuevoMensaje);
      await this.escribirArchivo(this.path, data);      
    } catch (error) {
      console.log("Ocurrio un error durante la operación:", error);
      throw new Error(error.message);
    }
  }

  async obtener() {
    try {
      const data = await this.leerArchivo(this.path);
      return data;
    } catch (error) {
      console.log("Ocurrio un error durante la operación:", error);
      throw new Error(error.message);
    }
  }

  async escribirArchivo(ruta, contenido) {
    try {
      await fs.promises.writeFile(
        ruta,
        JSON.stringify(contenido, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.log("Ocurrio un error durante la escritura:", error);
      throw new Error(error.message);
    }
  }

  async leerArchivo(ruta) {
    try {
      const existe = fs.existsSync(ruta);      
      if (!existe) return [];

      const contenido = await fs.promises.readFile(ruta, "utf-8");
    
      return JSON.parse(contenido);
    } catch (error) {
      console.log("Ocurrio un error durante la lectura:", error);
      throw new Error(error.message);
    }
  }
}

module.exports = Mensaje;
