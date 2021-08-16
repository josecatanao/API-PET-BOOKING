const express = require('express');
const app = express();

//linkando com o mongo
const {conectarOMongo} = require("./src/mongoDB/server");

// linkando com os controllers
const ctrlUsuario = require("./src/controllers/usuario");
const ctrlAgenda = require("./src/controllers/agenda");

app.use(express.json());



//Busca todos os usuarios
app.get("/usuario",ctrlUsuario.listarUsuarios);

//Busca todos o usuario pelo id
app.get("/usuario/:id",ctrlUsuario.buscarUsuario);

//adiciona um usuario
app.post("/usuario", ctrlUsuario.addUsuario);

//Update de um usuario
app.put('/usuario/:id', ctrlUsuario.updateUsuario);

//Deleta um usuario
app.delete('/usuario/:id', ctrlUsuario.deleteUsuario);

//-----------------------------------------------------------
//Deleta um atendimento
app.delete('/agenda/:id', ctrlAgenda.deletarAgenda);

//Update de um atendimento
app.put('/agenda/:id', ctrlAgenda.updateAgenda);

//Busca todos os agendamentos
app.get("/agenda",ctrlAgenda.listarAgendamentos);

//Busca o agendamento pelo id
app.get("/agenda/:id",ctrlAgenda.buscarAgendamento);

//adiciona um agendamento
app.post("/agenda", ctrlAgenda.addAgendamento);

// testando conexão com o mongo
conectarOMongo;


app.listen(3000, function(){
    console.log("Server inicializado")
})