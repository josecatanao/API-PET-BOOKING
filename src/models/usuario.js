// linkando com o mongoose
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


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
    password: {
        type: String,
        required: true,
        select: false
    },
    tipoUsuario: {
        type: String
    }
}) 

UsuarioShema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const usuario = mongoose.model('usuario', UsuarioShema);


module.exports = {usuario};