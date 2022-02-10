const Compra = require('../models/Compra')
const Usuario = require('../models/Usuario')

module.exports = class cafeController {
    static async showCafe(req, res) {
        res.render('cafe/home')
    }

    static async compras(req, res) {
        res.render('cafe/compras')
    }

    static novoPedido(req, res) {
        res.render('cafe/novopedido')
    }

    static async novoPedidoSalvar(req, res) {
        const teste = req.body.resultado
        const pedido = {
            tittle: req.body.tittle,
            observacao: req.body.informacao,
            UsuarioId: req.session.userid,
            valorcompra: parseFloat(teste)
        }

        try{
            await Compra.create(pedido)
            req.flash('message', `Pedido salvo com sucesso!! ${teste}`)
            req.session.save(() => {
                res.redirect('/cafe/compras')
            }) 
        } catch (err) {
            console.log(err)
        }
    }
}