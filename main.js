const express = require('express');
const Database = require('./db');
const bodyParser = require('body-parser');
const session = require('express-session')
require('dotenv').config();

const db = new Database();
const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

const startup =  async () => {
    await db.connect();
    await db.intialize()
    app.use((req, res,next) =>{
        req.db = db;
        next();
    });
    app.use(session({
        secret: 'cmps369',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
    }))
    app.use((req, res, next) => {
        if (req.session.user){
            res.locals.user = {
                id: req.session.user.id,
                email: req.session.user.email
            }
        }
        next()
    })
    app.use('/', require('./routes/main_routes.js'));
    app.listen(3000, () => {
        console.log(`Example app listening on port 3000`)
    });
}
startup();

