const pug = require('pug');
const url = require('url');
const express = require('express');
const Database = require('./db');
require('dotenv').config();

const db = new Database();
db.connect();
const app = express();

app.use((req, res,next) =>{
    req.db = db;
    next();
})
app.set('view engine', 'pug');
app.use('/', require('./routes/main_routes.js'))
app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})