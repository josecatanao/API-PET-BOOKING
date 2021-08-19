const mongoose = require("mongoose");

const Localizacao = mongoose.Schema ({
    
    nome: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    descricao:{
        type: String
    },
    horario_funcionamento: {
        type: String
    },
    dia_funcionamento: {
        type: Boolean
    }

})

const localizacao = mongoose.model('localizacao', Localizacao);

module.exports = {localizacao};