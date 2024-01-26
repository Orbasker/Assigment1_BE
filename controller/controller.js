const { Inventory, InventoryItem } = require('../handlers/EmergencySuplliesInventory');
// const config = require('../config');
const logger = require('../logger');
// const inventory = new Inventory(config.JSONFILE);
const url = require('url');
// const log = new logger.Logger('Controller.log'); 

class Controller {
    constructor(filepath, logger_filepath) {
        this.inventory = new Inventory(filepath);
        this.logger = new logger.Logger(logger_filepath);
    }
    // handleRequest(req, res) {
    //     const parsedUrl = url.parse(req.url, true);

    //     switch (parsedUrl.pathname) {
    //         case '/getItems':
    //             handleGetItems(req, res);
    //             break;
    //         case '/getItem':
    //             handleGetItem(req, res);
    //             break;
    //         case '/addItem':
    //             handleAddItem(req, res);
    //             break;
    //         case '/updateItem':
    //             handleUpdateItem(req, res);
    //             break;
    //         case '/deleteItem':
    //             handleDeleteItem(req, res);
    //             break;
    //         default:
    //             res.writeHeader(404, {'Content-Type': 'text/plain'});
    //             res.end('404 Not Found');
    //     }
    // }

    handleGetItems(req, res) {
        res.writeHeader(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(this.inventory.getItems()));
        res.end(
            JSON.stringify({
                message: 'Items returned from the inventory!'
            })
        );
        this.logger.log("Items returned from the inventory!")
    
    }

    handleGetItem(req, res) {
        const queryItem = url.parse(req.url, true).query.item;
        const item = this.inventory.getItem(queryItem);
        res.writeHeader(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(item));
        res.end(
            JSON.stringify({
                message: 'Item returned from the inventory!'
            })
        );
        this.logger.log(`Item: ${item} returned from the inventory!`)
    
    }

    handleAddItem(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);
                const item = new InventoryItem(parsedBody.name, parsedBody.quantity, parsedBody.price);
                this.inventory.addItem(item);
                res.writeHeader(200, {'Content-Type': 'application/json'});
                res.end(
                    JSON.stringify({
                        item: item,
                        message: 'Item has been added to the inventory!'
                    })
                );
                this.logger.log(`New Item has been added to the inventory!
                {
                      Body: ${body}, 
                      }`); 
            }
            catch (err) {
                res.writeHeader(400, {'Content-Type': 'text/plain'});
                res.end(
                    JSON.stringify({
                        message: '400 Bad Request',
                        error: err.message
    
                    })
                );
                this.logger.error(`400 Bad Request, ${err.message},
                {
                        Body: ${body}, 
                        }`);
                }
        });
    }

    handleUpdateItem(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);
                const item = new InventoryItem(parsedBody.name, parsedBody.quantity, parsedBody.price);
                this.inventory.updateItem(item);
                res.writeHeader(200, {'Content-Type': 'application/json'});
                res.end(
                    JSON.stringify({
                        item: item,
                        message: 'Item has been updated in the inventory!'
                    })
                );
                this.logger.log(`Item has been updated in the inventory!
                {
                      Name: ${item.name}, 
                      Quantity: ${item.quantity}, 
                      Price: ${item.price}
                      }`);
            }
            catch (err) {
                res.writeHeader(400, {'Content-Type': 'text/plain'});
                res.end(
                    JSON.stringify({
                        message: '400 Bad Request',
                        error: err.message
    
                    })
                );
                this.logger.error(`400 Bad Request, ${err.message},
                {
                        Name: ${body},
                      }`);
            }
        });
    }

    handleDeleteItem(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);
                this.inventory.deleteItem(parsedBody.name);
                res.writeHeader(200, {'Content-Type': 'application/json'});
                res.end(
                    JSON.stringify({
                        message: 'Item has been deleted from the inventory!'
                    })
                );
                this.logger.log(`${parsedBody.name} Item has been deleted from the inventory!`);
            }
            catch (err) {
                res.writeHeader(400, {'Content-Type': 'text/plain'});
                res.end(
                    JSON.stringify({
                        message: '400 Bad Request',
                        error: err.message
    
                    })
                );
                this.logger.error(`400 Bad Request, ${err.message}`);
            }
        });
    }
}

 

 



 


module.exports = { Controller};