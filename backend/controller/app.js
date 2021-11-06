const express = require('express')
require('dotenv').config()
const app = express();
const cors = require('cors');
const path = require('path');
//model files below
const userDB = require('../model/user')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//Default landing page of http://localhost:8000, should not matter
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

app.get('/users', (req, res) => {
    userDB.getAllUsers()
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(500).send(err))
})

module.exports = app