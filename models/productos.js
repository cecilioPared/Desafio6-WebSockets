class Producto {
    constructor(data) {
      this.productos = data || [];
    }
  
  
    obtener() {
      try {
        return this.productos;
      } catch (error) {
        console.log("Ocurrio un error durante la operación:", error);
        throw new Error(error.message);
      }
    }
  
    crear(data) {
      try {
        const id = this.productos.length + 1;  
        this.productos.push({ id, ...data });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
  
  module.exports = Producto;
  