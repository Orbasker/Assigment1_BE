// const { Inventory,InventoryItem } = require('./EmergenctSuplliesInventory');
const {handleAddItem,handleDeleteItem,handleGetItem,handleGetItems,handleUpdateItem} = require('./controller');
const url = require('url');



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





module.exports = {
    handleRequest
};