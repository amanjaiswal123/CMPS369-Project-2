const pug = require('pug');
const url = require('url');
const express = require('express');
const Database = require('./db');
require('dotenv').config();


const app = express();
app.set('view engine', 'pug');
const notfound = pug.compileFile('./views/404notfound.pug')


const db = new Database();
db.connect();
const notfound404 = (req, res) => {
    const heading = (title) => {
        let html;
        html = `
        <!doctype html>
            <html lang="ENGLISH">
                <head>
                    <title>${title}</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.min.css">
                </head>
                <body>
                <a href='/'>Home</a>
                <br/>
    `;
        return html;
    }

    const footing = () => {
        return `
        </body>
    </html>
    `;
    }

    const render = (res, html) =>{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
    }


    let html = heading("404 Not Found");
    html += notfound()
    html += footing()
    render(res, html)
}


app.use('/', notfound404)
app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})