const express = require('express')
require('dotenv').config()
const app = express();
const cors = require('cors');
const path = require('path');
//model files below
const userDB = require('../model/user')
const modelDB = require('../model/model')
const token = require('../middleware/token')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//Default landing page of http://localhost:8000, should not matter
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

//User APIs
app.post('/register', (req, res) => {
    userDB.userRegister(req.body)
        .then(result => res.status(result.status).send({status: result.status, data: result.result}))
        .catch(err => res.status(err.status).send({status: err.status, data: err.error}))
})
app.post('/login', (req, res) => {
    userDB.userLogin(req.body)
        .then(result => res.status(result.status).send({status: result.status, data: result.result}))
        .catch(err => res.status(err.status).send({status: err.status, data: err.error}))
})
app.delete('/logout', (req, res) => {
    userDB.userLogout(req.body)
        .then(result => res.status(result.status).send({status: result.status, data: result.result}))
        .catch(err => res.status(err.status).send({status: err.status, data: err.error}))
})

//Model APIs
app.get('/model', (req, res) => {
    modelDB.getAllModels()
        .then(result => res.status(result.status).send({status: result.status, data: result.result}))
        .catch(err => res.status(err.status).send({status: err.status, data: err.error}))
})

app.get('/model/:id', (req, res) => {
    modelDB.getModelById(req.params.id)
        .then(result => res.status(result.status).send({status: result.status, data: result.result}))
        .catch(err => res.status(err.status).send({status: err.status, data: err.error}))
})

app.get('/searchModel/:search', (req, res) => {
    modelDB.searchModel(req.params.search)
        .then(result => res.status(result.status).send({status: result.status, data: result.result}))
        .catch(err => res.status(err.status).send({status: err.status, data: err.error}))
})

module.exports = app