// linkando com o mongoose
const mongoose = require("mongoose");
const {Schema} = require("mongoose");

//cria o Shema da imagem
const ImagemShema = mongoose.Schema({
    caminho: {
        type:String
    },
    usuario: {
        type: Schema.Types.ObjectId, 
        ref: 'usuario'
    }
}) 
const imagem = mongoose.model('imagem', ImagemShema);


module.exports = {imagem};
