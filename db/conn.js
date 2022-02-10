const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('projetocafe', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

try{
    sequelize.authenticate()
    console.log('Conectado com sucesso')
} catch(err){
    console.log(`Erro inesperado!! ${err}`)
}

module.exports = sequelize
