const express = require('express')
const router = express.Router()
const cafeController = require('../controllers/cafeController')

//helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/', cafeController.showCafe)
router.get('/compras', checkAuth, cafeController.compras)
router.get('/add', checkAuth, cafeController.novoPedido)
router.post('/add', checkAuth, cafeController.novoPedidoSalvar)

module.exports = router