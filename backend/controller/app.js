const express = require('express')
require('dotenv').config()
const app = express();
const cors = require('cors');
const path = require('path');
//model files below
const userDB = require('../model/user')
const modelDB = require('../model/model')
const orderDB = require('../model/order')
const token = require('../middleware/token')

var prefix = "/api/v1";
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//Default landing page of http://localhost:8000, should not matter
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

//User APIs
app.post(`${prefix}/register`, (req, res) => {
    userDB.userRegister(req.body)
        .then(result => res.status(result.status).send(result.result))
        .catch(err => res.status(err.status).send(err.error))
})
app.post(`${prefix}/login`, (req, res) => {
    userDB.userLogin(req.body)
        .then(result => res.status(result.status).send(result.result))
        .catch(err => res.status(err.status).send(err.error))
})
app.delete(`${prefix}/logout/:fk_user_id`, (req, res) => {
    console.log(req.params)
    userDB.userLogout(req.params)
        .then(result => res.status(result.status).send(result.result))
        .catch(err => res.status(err.status).send(err.error))
})

//Model APIs
app.get(`${prefix}/model`, (req, res) => {
    modelDB.getAllModels()
        .then(result => res.status(result.status).send(result.result))
        .catch(err => res.status(err.status).send(err.error))
})

app.get(`${prefix}/model/:id`, (req, res) => {
    modelDB.getModelById(req.params.id)
        .then(result => res.status(result.status).send(result.result))
        .catch(err => res.status(err.status).send(err.error))
})

app.get(`${prefix}/searchModel/:search`, (req, res) => {
    modelDB.searchModel(req.params.search)
        .then(result => res.status(result.status).send(result.result))
        .catch(err => res.status(err.status).send(err.error))
})

app.get(`${prefix}/modelSlot/:model_id/:date`, (req, res) => {
    modelDB.getModelSlots(req.params)
        .then(result => res.status(result.status).send(result.result))
        .catch(err => res.status(err.status).send(err.error))
})

//Order APIs
app.get(`${prefix}/order/:order_id`, (req, res) => {
    orderDB.getOrderByOrderId(req.params)
        .then(result => res.status(result.status).send(result.result))
        .catch(err => res.status(err.status).send(err.error))
})
app.get(`${prefix}/orderHistory/:user_id`, (req, res) => {
    orderDB.getOrderByUserId(req.params)
        .then(result => res.status(result.status).send(result.result))
        .catch(err => res.status(err.status).send(err.error))
})

app.post(`${prefix}/addOrder`, (req, res) => {
    orderDB.addOrder(req.body)
        .then(result => res.status(result.status).send(result.result))
        .catch(err => res.status(err.status).send(err.error))
})

module.exports = app