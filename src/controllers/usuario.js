// linkando com os models
const {usuario} = require("../models/usuario");

function listarUsuarios(req,res){

    usuario.find({}).then((dados)=>{
        res.json(dados); 
     });

}

function buscarUsuario(req,res){
    const {id} = req.params
    usuario.findById(id, function (err, dados) {
        if(err == null){
            res.json(dados);
        }else{
            res.json({alerta:"Id não encontrando"});
        }
    });
}

function addUsuario(req, res){
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
}

updateUsuario = (req, res) => {
    usuario.findOneAndUpdate({ email: req.body.email, nome: req.body.nome, sobrenome: req.body.sobrenome, tipoUsuario: req.body.tipoUsuario })
        .then(result => {
            res.json('Success')
        })
        .catch(error => console.error(error))
}

function deleteUsuario(req, res) {
    usuario.remove({
        _id: { $in: req.params.id.split(',') }
    }, function (err) {
        if (err) return res.send(err);
        usuario.find({}, function (err, dados) {
            if (err) return res.send(err)
                res.json("Usuário removido com sucesso");
        });
    });
}

module.exports = {listarUsuarios, buscarUsuario, addUsuario, updateUsuario, deleteUsuario};