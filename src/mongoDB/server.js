const mongoose = require("mongoose");

//configurando o mongoose
mongoose.Promise = global.Promise;
// coloque o nome do banco aqui localhost/{nomedobanco}

const conectarOMongo = mongoose.connect("mongodb://172.18.0.2/petShop", {useUnifiedTopology: true, serverSelectionTimeoutMS: 90000,}).then(()=>{
    console.log("mongoDB conectado...")
}).catch((err)=>{
    console.log("Houve um erro ao se conectar ao mongoDB "+err);
})


//----------------------
//Para rodar o codigo perfeitamente é necessario essas funções abaixo,
// qualquer dúvida na documentação do mongoose dá uma boa base. 
//---------------------


//serve para criar o model

//const novoUsuario = mongoose.model('usuario');
//const novaAgenda = mongoose.model('agenda');

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
/*
new novaAgenda({
    data: "2021-08-10",
    tipoAtendimento:"Castrar",
    descricao:"Preciso castrar meu cachorro"
    }).save().then(()=>{
        console.log("agenda cadastrado com sucesso!")
    }).catch((err)=>{
    console.log("houve um erro ao registrar da agenda :"+ err)
 })
 */

module.exports = {conectarOMongo};
