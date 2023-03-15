const http = require('http');
const url = require('url');


const serve = (req, res) => {



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
    function urlNotFound() {
        return heading('404 Not Found') + `<title>404 Page Not Found</title>
        <div className="container">
            <h1>404 Page Not Found</h1>
            <p>Sorry, the page you are looking for could not be found. Please check the URL and try again, or click <a
                href="/">here</a> to go back to the home page.</p>
        </div>`;
    }


    const uri = url.parse(req.url).pathname;
    let page_ = uri.split('/').splice(1);
    page_.shift()
    let html = "";
    html += urlNotFound();

    html += footing()
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(html);
    res.end();
}

http.createServer(serve).listen(3000);