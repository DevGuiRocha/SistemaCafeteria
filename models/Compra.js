const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Usuario = require('./Usuario')

const Compra = db.define('Compra', {
    valorcompra: {
        type: DataTypes.DECIMAL,
        require: true,
    },
    observacao:{
        type: DataTypes.CHAR,
        require: true,  
    }
})

Compra.belongsTo(Usuario)
Usuario.hasMany(Compra)

module.exports = Compra