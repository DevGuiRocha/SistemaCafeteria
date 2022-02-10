const User = require('../models/Usuario')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login (req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res){
        const {email, senha} = req.body

        const user = await User.findOne({where: {email, email}})
        
        if (!user){
            req.flash('message', 'Usuário não encontrado!!')
            res.render('auth/login')

            return
        }

        const comparaSenha = bcrypt.compareSync(senha, user.senha)

        if (!comparaSenha) {
            req.flash('message', 'Senha inválida!')
            res.render('auth/login')

            return
        }

        req.session.userid = user.id
        req.flash('message', 'Usuário logado com sucesso!')
        req.session.save(() =>{
            res.redirect('/')
        })
    }

    static registrar (req, res) {
        res.render('auth/registrar')
    }

    static async registrarPost(req,res) {
        const {nome, email, senha, confSenha} = req.body

        //validação de senha
        if (senha != confSenha) {
            req.flash('message', 'As senhas estão divergentes, tente novamente!')
            res.render('auth/registrar')

            return
        }

        //checagem dos e-mails, para não haver repetidos
        const checkIfEmailExist = await User.findOne({where: {email: email}})
        const checkIfUserExist = await User.findOne({where: {nome: nome}})

        if (checkIfEmailExist) {
            req.flash('message', 'E-mail já está em uso!')
            res.render('auth/registrar')

            return
        }
        if (checkIfUserExist) {
            req.flash('message', 'Usuário já existe!')
            res.render('auth/registrar')

            return
        }

        //criando as senhas
        const salt = bcrypt.genSaltSync(10)
        const hashedSenha = bcrypt.hashSync(senha, salt)

        const user = {
            nome,
            email,
            senha: hashedSenha
        }

        try {
            const usuarioCriado = await User.create(user)
            req.session.userid = usuarioCriado.id
            req.flash('message', 'Cadastro realizado com sucesso!')
            req.session.save(() =>{
                res.redirect('/')
            })
        } catch (err){
            console.log(err)
        }
    }

    static logout(req, res){
        req.session.destroy()
        res.redirect('/login')
    }

}