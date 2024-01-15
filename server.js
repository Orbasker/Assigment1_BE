// Emergency Supplies Inventory System
// Create a new inventory item
// Read current inventory levels
// Update item details or quantities

const { Inventory,InventoryItem } = require('./EmergenctSuplliesInventory');

// Delete items no longer in stock
fs = require('fs');
http = require('http');
url = require('url');
qs = require('querystring');
inventory = new Inventory();

// Create a server object
server = http.createServer();

// create a router for the server to handle add item requests
// GET /getItems API 
// Params: none
server.on('request', (req, res) => {
    if (req.url ==='/getItems' && req.method === 'GET') {
        // res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(inventory.getItems()));
        res.end();
    }
});


// GET /getItem API
// Params: item name
server.on('request', (req, res) => {
    const parsed_url = url.parse(req.url, true);
    if (parsed_url.pathname ==='/getItem' && req.method === 'GET') {
        // res.writeHead(200, {'Content-Type': 'application/json'});
        // get the param sent by the name item
        // const query = url.parse(req.url, true).query.inventory;
        const queryItem = parsed_url.query.item;
        const item = inventory.getItem(queryItem);
        // res.write(inventory.getItem(queryItem));
        console.log(item);
        res.write(JSON.stringify(item));
        res.end();
    }
});

server.on('request', (req, res) => {
    if (req.url ==='/addItem' && req.method === 'POST') {
        // res.writeHead(200, {'Content-Type': 'application/json'});
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(body);
            const parsed_body = qs.parse(body);
            console.log(parsed_body);
            const item = new InventoryItem(parsed_body.name, parsed_body.quantity, parsed_body.price);
            inventory.addItem(item);
            res.end();
        });
    }
});

// Listen on port 8080
server.listen(8080, () => {
    console.log('listening on port 8080');
});


