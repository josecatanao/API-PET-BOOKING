const mongoose = require("mongoose");

//configurando o mongoose
mongoose.Promise = global.Promise;
// coloque o nome do banco aqui localhost/{nomedobanco}
mongoose.connect("mongodb://localhost/petShop",{
    useMongoClient:true
}).then(()=>{
    console.log("mongoDB conectado...")
}).catch((err)=>{
    console.log("Houve um erro ao se conectar ao mongoDB "+err);
})

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


const AgendaShema = mongoose.Schema({
    data:{
        type:Date
    },
    tipoAtendimento: {
        type:String
    },
    descrição: {
        type:String
    }
}) 
mongoose.model('usuario', UsuarioShema);



//serve para criaar o model

//const novoUsuario = mongoose.model('usuario');
/*
new novoUsuario({
    email: "josecatanoneto@gmail.com",
    nome:"jose",
    sobrenome:"catanão",
    tipoUsuario:"cliente"
    }).save().then(()=>{
        console.log("usuario cadastrado com sucesso!")
    }).catch((err)=>{
    console.log("houve um erro ao registrar usuario :"+ err)
    })

*/

module.exports = mongoose.model('usuario', UsuarioShema);