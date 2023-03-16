const express = require('express')
const pug = require("pug");
const router = express.Router();

const notfound = pug.compileFile('./views/404notfound.pug')
router.get('/', notfound404 = (req, res) => {
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
});

module.exports = router;