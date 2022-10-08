var express = require("express");
var router = express.Router();

const Producto = require("../models/productos");

const producto = new Producto([]);

const STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    NOT_FOUND: 404,
  };

router.get("/productos", (req, res) => {
  try {
    const productos = producto.obtener();   
    res.status(STATUS_CODE.OK).json(productos);
  } catch (error) {
    next(error);
  }
});

router.post("/productos", (req, res, next) => {
  try {
    let { body: newData } = req;
    producto.crear(newData);
    let listado = producto.obtener();
    const data = {
      productos: listado,
      isEmpty: listado.length,
      baseURL: process.env.NODE_URL,
    };
    res.status(STATUS_CODE.CREATED).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
