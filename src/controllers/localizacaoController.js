
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

module.exports = { addLocalizacao };