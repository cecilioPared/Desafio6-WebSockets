const express = require("express");
const Mensaje = require("../models/mensaje");
const { Router } = express;
const router = Router();

const data = [];

const mensaje = new Mensaje('./mensajes.txt');

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
};

router.post("/mensajes", async (req, res, next) => {
  try {
    let { body: data } = req;
    await mensaje.crear(data);
    res.status(STATUS_CODE.CREATED).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/mensajes", async (req, res, next) => {
  try {
    const mensajes = await mensaje.obtener();
    res.status(STATUS_CODE.OK).json(mensajes);
  } catch (error) {
    next(res.status(STATUS_CODE.NOT_FOUND).json(error));
  }
});

module.exports = router;
