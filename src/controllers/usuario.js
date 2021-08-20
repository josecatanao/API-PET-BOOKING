// linkando com os models
const {usuario} = require("../models/usuario");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../config/auth.json');
const { imagem } = require("../models/Imagem");

function generateToken(params =  {} ){
    return jwt.sign(params, auth.secret, {
        expiresIn: 86400,
    });
}

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
    const {email,password,nome,sobrenome,tipoUsuario} = req.body;
    // adicionadas Imagens
    
    
    const novoUsuario = {
               email,
               password,
               nome,
               sobrenome,
               tipoUsuario,
            };
    novoUsuarioModel = new usuario(novoUsuario);

    let img = new imagem({
        caminho: req.file.filename,
        usuario: novoUsuario.id,
    });
    img.save();

    novoUsuarioModel.save().then(()=>{
                    novoUsuario.imagem = img.id;
                    res.json({
                                Mensagem:"usuario cadastrado com sucesso!",
                                token: generateToken({id: novoUsuario.id }),
                });
            }).catch((err)=>{
                    res.json({Mensagem:"houve um erro ao registrar usuario "})
            })
}

//autenticação de usuario
 async function autenticar (req, res) {
    const { email, password} = req.body;

    const user = await usuario.findOne({email}).select('+password');

    if(!user)
        return res.status(400).send({error: 'User not found'});

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'invalid password'});
    
    user.password = undefined;

    
    res.send({ user, token: generateToken({id: user.id}),
    });
};


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

module.exports = {listarUsuarios, buscarUsuario, addUsuario, autenticar, updateUsuario, deleteUsuario};
