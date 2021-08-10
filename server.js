const express = require('express');
const app = express();
app.use(express.json());
const data = require("./data.json");

app.get("/usuario",function(req,res){
    res.json(data);
});

app.get("/usuario/:id",function(req,res){
    const {id} = req.params
    const usuario = data.find(cli => cli.id == id)
    if(!usuario) return res.status(204).json();
    res.json(usuario)
});


app.post("/usuario", function(req, res){
    const { nome, sobrenome } = req.body;

    //logica de salvar

    res.json({nome, sobrenome})
});

app.put("/usuario/:id",function(req,res){
    const {id} = req.params
    const usuario = data.find(cli => cli.id == id)
    if(!usuario) return res.status(204).json();

    const {name} = req.body;

    usuario.name = name;
    res.json(usuario)

});
app.delete("/usuario/:id",function(req,res){
    const {id} = req.params
    const usuariosFiltered = data.filter(cli => cli.id != id);
    res.json(usuariosFiltered);
});

app.listen(3000, function(){
    console.log("Server inicializado")
})