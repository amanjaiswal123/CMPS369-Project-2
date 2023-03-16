const pug = require('pug');
const url = require('url');
const express = require('express');
const Database = require('./db');
require('dotenv').config();


const app = express();
app.use(express.urlencoded({ extended : true}))
app.set('view engine', 'pug');


const db = new Database();
db.connect();

app.use('/', require('./routes/404notfound.js'))
app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})