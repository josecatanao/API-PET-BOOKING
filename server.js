const express = require('express');
const app = express();

//linkando com o mongo
const {conectarOMongo} = require("./src/mongoDB/server");

// linkando com os controllers
const ctrlUsuario = require("./src/controllers/usuario");
const ctrlAgenda = require("./src/controllers/agenda");
const crtlLocalizacao = require('./src/controllers/localizacaoController');

app.use(express.json());

const authMiddleware = require('./src/middleware/auth');

//Busca todos os usuarios
app.get("/usuario",ctrlUsuario.listarUsuarios);

//Busca todos o usuario pelo id
app.get("/usuario/:id",ctrlUsuario.buscarUsuario);

//adiciona um usuario
app.post("/usuario", ctrlUsuario.addUsuario);

//autenticar usuario
app.post("/usuario/authenticate", ctrlUsuario.autenticar);

//Update de um usuario
app.put('/usuario/:id', ctrlUsuario.updateUsuario);

//Deleta um usuario
app.delete('/usuario/:id', ctrlUsuario.deleteUsuario);

//-----------------------------------------------------------
//Deleta um atendimento
app.delete('/agenda/:id',authMiddleware, ctrlAgenda.deletarAgenda);

//Update de um atendimento
app.put('/agenda/:id', authMiddleware, ctrlAgenda.updateAgenda);

//Busca todos os agendamentos
app.get("/agenda",authMiddleware, ctrlAgenda.listarAgendamentos);

//Busca o agendamento pelo id
app.get("/agenda/:id",authMiddleware,ctrlAgenda.buscarAgendamento);

//adiciona um agendamento
app.post("/agenda",authMiddleware, ctrlAgenda.addAgendamento);

//adicionar localização
app.post('/localizacao', crtlLocalizacao.addLocalizacao);

// testando conexão com o mongo
conectarOMongo;


app.listen(3000, function(){
    console.log("Server inicializado")
})