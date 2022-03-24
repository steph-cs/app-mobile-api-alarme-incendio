const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Servidor
let porta = 8081;
app.listen(porta, () => {
 console.log('Servidor em execução na porta: ' + porta);
});

const parametrosAlarme = require('./model/parametrosAlarme');

//Acesso ao BD
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://{user}:{senha}@cluster0.vipk2.mongodb.net/AlarmeIncendio?retryWrites=true&w=majority'

const database_name = 'AlarmeIncendio';
const collection_name= 'ParametrosAtivacaoAlarme'
var db;
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            console.log('ERRO: não foi possível conectar à base de dados ` ' + database_name + ' `.');
            throw error;
        }
        db = client.db(database_name).collection(collection_name);
        console.log('Conectado à base de dados ` ' + database_name + ' `!');
    });
//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// cadastro
app.post('/ParamAlarme', (req, res, next) => {
    var paramAlarme = new parametrosAlarme({
        "id": req.body.id,
        "indiceGas": req.body.indiceGas,
        "temperatura": req.body.temperatura,
        "dia": req.body.dia,
        "hora": req.body.hora,
     });
    db.insertOne(paramAlarme, (err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('cadastrado com sucesso!');
        res.send('cadastrado com sucesso!');
    });
});

// Obtém todos os cadastros
app.get('/ParamAlarme', (req, res, next) => {
    db.find({}).toArray((err, result) => {
        if (err) return console.log("Error: " + err);
        res.send(result);
    });
});

// Obtém cadastro com base no id
app.get('/ParamAlarme/:id', (req, res, next) => {
    const result = db.findOne({ "id": req.params.cpf }, (err, result) => {
    if (err) return console.log("Cadastro não encontrado")
    res.send(result);
    });
});

// Alterar
app.put('/ParamAlarme/:id', (req, res, next) => {
    db.updateOne({"id": req.params.id }, {
        $set: {
            "indiceGas": req.body.indiceGas,
            "temperatura": req.body.temperatura,
            "dia": req.body.dia,
            "hora": req.body.hora,        }
    }, (err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Cadastro alterado com sucesso!');
        res.send('Cadastro alterado com sucesso!');
    });
});

//Remover
app.delete('/ParamAlarme/:id', (req, res, next) => {
    db.deleteOne({id: req.params.id },(err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Cadastro removido!');
        res.send('Cadastro removido!');
    });
});