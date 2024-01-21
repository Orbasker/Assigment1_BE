const { Inventory,InventoryItem } = require('./EmergenctSuplliesInventory');
const http = require('http');
const url = require('url');
const qs = require('querystring');
const fs = require('fs');
const inventory = new Inventory('inventory.json');



function handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);

    switch (parsedUrl.pathname) {
        case '/getItems':
            handleGetItems(req, res);
            break;
        case '/getItem':
            handleGetItem(req, res);
            break;
        case '/addItem':
            handleAddItem(req, res);
            break;
        case '/updateItem':
            handleUpdateItem(req, res);
            break;
        case '/deleteItem':
            handleDeleteItem(req, res);
            break;
        default:
            res.writeHeader(404, {'Content-Type': 'text/plain'});
            res.end('404 Not Found');
}
}

function handleGetItems(req, res) {
    res.writeHeader(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(inventory.getItems()));
    res.end(
        JSON.stringify({
            message: 'Items returned from the inventory!'
        })
    );
}

function handleGetItem(req, res) {
    const queryItem = url.parse(req.url, true).query.item;
    const item = inventory.getItem(queryItem);
    res.writeHeader(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(item));
    res.end(
        JSON.stringify({
            message: 'Item returned from the inventory!'
        })
    );
}

function handleAddItem(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const parsedBody = JSON.parse(body);
            const item = new InventoryItem(parsedBody.name, parsedBody.quantity, parsedBody.price);
            inventory.addItem(item);
            res.writeHeader(200, {'Content-Type': 'application/json'});
            res.end(
                JSON.stringify({
                    item: item,
                    message: 'Item has been added to the inventory!'
                })
            );
        }
        catch (err) {
            res.writeHeader(400, {'Content-Type': 'text/plain'});
            res.end(
                JSON.stringify({
                    message: '400 Bad Request',
                    error: err.message

                })
            );
        }
    });
}

function handleUpdateItem(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const parsedBody = JSON.parse(body);
            const item = new InventoryItem(parsedBody.name, parsedBody.quantity, parsedBody.price);
            inventory.updateItem(item);
            res.writeHeader(200, {'Content-Type': 'application/json'});
            res.end(
                JSON.stringify({
                    item: item,
                    message: 'Item has been updated in the inventory!'
                })
            );
        }
        catch (err) {
            res.writeHeader(400, {'Content-Type': 'text/plain'});
            res.end(
                JSON.stringify({
                    message: '400 Bad Request',
                    error: err.message

                })
            );
        }
    });
}

function handleDeleteItem(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const parsedBody = JSON.parse(body);
            inventory.deleteItem(parsedBody.name);
            res.writeHeader(200, {'Content-Type': 'application/json'});
            res.end(
                JSON.stringify({
                    message: 'Item has been deleted from the inventory!'
                })
            );
        }
        catch (err) {
            res.writeHeader(400, {'Content-Type': 'text/plain'});
            res.end(
                JSON.stringify({
                    message: '400 Bad Request',
                    error: err.message

                })
            );
        }
    });
}



module.exports = {
    handleRequest
};