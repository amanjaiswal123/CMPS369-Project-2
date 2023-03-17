const express = require('express');
const Database = require('./db');
require('dotenv').config();

const db = new Database();
const app = express();
app.set('view engine', 'pug');

const startup =  async () => {
    await db.connect();
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
