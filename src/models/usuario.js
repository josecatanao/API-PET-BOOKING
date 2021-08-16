// linkando com o mongoose
const mongoose = require("mongoose");

//cria o Shema do usuario
const UsuarioShema = mongoose.Schema({
    email: {
        type: String
    },
    nome: {
        type: String
    },
    sobrenome:{
        type: String
    }, 
    tipoUsuario: {
        type: String
    }
}) 
const usuario = mongoose.model('usuario', UsuarioShema);


module.exports = {usuario};