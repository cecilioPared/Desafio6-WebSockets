const { Router } = require('express')
const producto = require('./producto')
const mensaje = require('./mensaje')
const router = Router()

router.use(producto, mensaje)

module.exports = router