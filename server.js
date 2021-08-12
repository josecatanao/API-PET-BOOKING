const express = require('express');
const app = express();
const usuarioShema = require("./mongoDB/server");
const AgendaShema = require("./mongoDB/server");

app.use(express.json());

//model do usuario
const usuarioShe = usuarioShema;
const usuario = usuarioShe.model('usuario');

//model da agenda 
const agendaShe = AgendaShema;
const agenda = usuarioShe.model('agenda');



//Busca todos os usuarios
app.get("/usuario",function(req,res){

    usuario.find({}).then((dados)=>{
        res.json(dados); 
     });

});

//Busca todos o usuario pelo id
app.get("/usuario/:id",function(req,res){
    const {id} = req.params
    usuario.findById(id, function (err, dados) {
        if(err == null){
            res.json(dados);
        }else{
            res.json({alerta:"Id não encontrando"});
        }
    });
});

//adiciona um usuario
app.post("/usuario", function(req, res){
    const {email,nome,sobrenome,tipoUsuario} = req.body;
    new usuario({
               email,
               nome,
               sobrenome,
               tipoUsuario
            }).save().then(()=>{
                    res.json({Mensagem:"usuario cadastrado com sucesso!"})
            }).catch((err)=>{
                    res.json({Mensagem:"houve um erro ao registrar usuario "})
            })
});

//Update de um usuario
app.put('/usuario/:id', (req, res) => {
    usuario.findOneAndUpdate({ email: req.body.email, nome: req.body.nome, sobrenome: req.body.sobrenome, tipoUsuario: req.body.tipoUsuario })
        .then(result => {
            res.json('Success')
        })
        .catch(error => console.error(error))
});

//Deleta um usuario
app.delete('/usuario/:id', function (req, res) {
    usuario.remove({
        _id: { $in: req.params.id.split(',') }
    }, function (err) {
        if (err) return res.send(err);
        usuario.find({}, function (err, dados) {
            if (err) return res.send(err)
                res.json("Usuário removido com sucesso");
        });
    });
});

//-----------------------------------------------------------
//Deleta um atendimento
app.delete('/agenda/:id', function (req, res) {
    agenda.remove({
        _id: { $in: req.params.id.split(',') }
    }, function (err) {
        if (err) return res.send(err);
        usuario.find({}, function (err, dados) {
            if (err) return res.send(err)
                res.json("Removido da agenda com sucesso");
        });
    });
});

//Update de um atendimento
app.put('/agenda/:id', (req, res) => {
    agenda.findOneAndUpdate({ _id: req.body._id, data: req.body.data, tipoAtendimento: req.body.tipoAtendimento, descricao: req.body.descricao})
        .then(result => {
            res.json('Success')
        })
        .catch(error => console.error(error))
});

//Busca todos os agendamentos
app.get("/agenda",function(req,res){
    agenda.find({}).then((dados)=>{
        res.json(dados); 
     });

});

//Busca o agendamento pelo id
app.get("/agenda/:id",function(req,res){
    const {id} = req.params
    agenda.findById(id, function (err, dados) {
        if(err == null){
            res.json(dados);
        }else{
            res.json({alerta:"Id não encontrando"});
        }
    });
});

//adiciona um agendamento
app.post("/agenda", function(req, res){
    const {data,tipoAtendimento,descricao} = req.body;
    new agenda({
            data,
            tipoAtendimento,
            descricao
            }).save().then(()=>{
                    res.json({Mensagem:"agendamento cadastrado com sucesso!"})
            }).catch((err)=>{
                    res.json({Mensagem:"houve um erro ao realizar o agendamento"})
            })
});





app.listen(3000, function(){
    console.log("Server inicializado")
})