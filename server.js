const express = require('express');
const app = express();
app.use(express.json());
const usuarioShema = require("./mongoDB/server");

const usuarioShe = usuarioShema;
const usuario = usuarioShe.model('usuario');



app.get("/usuario",function(req,res){

    usuario.find({}).then((dados)=>{
        res.json(dados); 
     });

});

app.get("/usuario/:id",function(req,res){
    //const {id} = req.params
});


app.post("/usuario", function(req, res){
    //const { nome, sobrenome } = req.body;
    //res.json({nome, sobrenome})
});

app.put("/usuario/:id",function(req,res){
    //const {id} = req.params

});
app.delete("/usuario/:id",function(req,res){
    //const {id} = req.params
});

app.listen(3000, function(){
    console.log("Server inicializado")
})