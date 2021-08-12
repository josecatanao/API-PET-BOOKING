// linkando com o mongoose
const mongoose = require("mongoose");

//cria o Shema da agenda
const AgendaShema = mongoose.Schema({
    data:{
        type:Date
    },
    tipoAtendimento: {
        type:String
    },
    descricao: {
        type:String
    }
}) 
const agenda = mongoose.model('agenda', AgendaShema);


module.exports = {agenda};