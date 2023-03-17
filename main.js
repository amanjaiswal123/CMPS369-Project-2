const express = require('express');
const Database = require('./db');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = new Database();
const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

const startup =  async () => {
    await db.connect();
}


const test = async () => {

}
startup();
app.use((req, res,next) =>{
    req.db = db;
    next();
});
app.use('/', require('./routes/main_routes.js'));
app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
});
