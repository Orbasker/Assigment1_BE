const config = require('./config.js');
const http = require('http');
const router = require('./routers/router.js');
const handler = new router(config.JSONFILE);
const server = http.createServer((req, res) => {
    if (req.method === 'OPTIONS' ) {
        res.writeHead(200, corsHeaders);
        res.end();
    }
    else {
        handler.handleRequest(req, res);
    }
});

server.listen(config.PORT,config.HOST, () => {
    console.log(`Listening on host ${config.HOST} and port ${config.PORT}`);
});
