const mongoose = require("mongoose");

//configurando o mongoose
mongoose.Promise = global.Promise;
// coloque o nome do banco aqui localhost/{nomedobanco}
mongoose.connect("mongodb://172.27.0.2/petShop",{
    useMongoClient:true
}).then(()=>{
    console.log("mongoDB conectado...")
}).catch((err)=>{
    console.log("Houve um erro ao se conectar ao mongoDB "+err);
})

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
mongoose.model('usuario', UsuarioShema);
mongoose.model('agenda', AgendaShema);



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


module.exports = mongoose.model('usuario', UsuarioShema);
module.exports = mongoose.model('agenda', AgendaShema);