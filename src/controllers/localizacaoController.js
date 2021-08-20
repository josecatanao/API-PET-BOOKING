
const {localizacao} = require('../models/localizacao');

function addLocalizacao(req, res){
   
    new localizacao({
           ...req.body
            }).save().then(()=>{
                    res.json({Mensagem:"Localização cadastrada com sucesso"})
            }).catch((err)=>{
                    res.json({Mensagem:"Erro ao cadastrar localização! "})
            })
}

function listarLocalizacao (req, res) {
        localizacao.find({}).then((dados)=>{
                res.json(dados); 
             });

}


function buscarPetShop(req, res){
        const {nome} = req.params.nome;

        localizacao.find(nome, (err, dados) => {
                if(err == null){
                        res.json(dados);
                } else {
                        res.json({alerta: 'Não foi encontrado localização com essa descrição'})
                }
        });          
}

module.exports = { addLocalizacao, listarLocalizacao, buscarPetShop };