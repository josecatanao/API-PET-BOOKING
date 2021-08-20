// linkando com o mongoose
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const {Schema} = require("mongoose");


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
    },
    imagem: {
            type: Schema.Types.ObjectId,
            ref: 'imagem'
    },
}) 

UsuarioShema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const usuario = mongoose.model('usuario', UsuarioShema);


module.exports = {usuario};
