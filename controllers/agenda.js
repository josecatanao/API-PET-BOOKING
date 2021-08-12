// linkando com os models
const {agenda} = require("../models/agenda");

function deletarAgenda(req, res) {
    agenda.remove({
        _id: { $in: req.params.id.split(',') }
    }, function (err) {
        if (err) return res.send(err);
        usuario.find({}, function (err, dados) {
            if (err) return res.send(err)
                res.json("Removido da agenda com sucesso");
        });
    });
}

updateAgenda = (req, res) => {
    agenda.findOneAndUpdate({ _id: req.body._id, data: req.body.data, tipoAtendimento: req.body.tipoAtendimento, descricao: req.body.descricao})
        .then(result => {
            res.json('Success')
        })
        .catch(error => console.error(error))
}

function listarAgendamentos(req,res){
    agenda.find({}).then((dados)=>{
        res.json(dados); 
     });

}

function buscarAgendamento(req,res){
    const {id} = req.params
    agenda.findById(id, function (err, dados) {
        if(err == null){
            res.json(dados);
        }else{
            res.json({alerta:"Id não encontrando"});
        }
    });
}

function addAgendamento(req, res){
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
}

module.exports = {deletarAgenda, updateAgenda, listarAgendamentos, buscarAgendamento, addAgendamento};