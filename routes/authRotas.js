const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/login', authController.login)
router.get('/registrar', authController.registrar)
router.get('/logout', authController.logout)
router.post('/login', authController.loginPost)
router.post('/registrar', authController.registrarPost)

module.exports = router