const fs = require('fs');
// Emergency Supplies Inventory System
// Create a new inventory item
// Read current inventory levels
// Update item details or quantities
// Delete items no longer in stock
// fs = require('fs');
class InventoryItem {
    constructor(name, quantity, price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}

// The inventory array should be recieved from the json file and evrery time we add a new item to the inventory we should update the json file
class Inventory {
    constructor() {
        this.inventory = fs.readFileSync('Assigment1_BE/inventory.json');
        this.inventory = JSON.parse(this.inventory);
    }
    addItem(item) {
        fs.writeFile('inventory.json', JSON.stringify(item), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
    deleteItem(item) {
        fs.writeFile('inventory.json', JSON.stringify(item), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
    updateItem(item) {
        fs.writeFile('inventory.json', JSON.stringify(item), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
    getItems() {

        return this.inventory;
    }
    getItem(item) {
        console.log(item);
        console.log(this.inventory);
        for (const element of this.inventory.inventory) {
            if (element.name === item) {
                return element;
            }
        }
        return null;
    }
}


module.exports = {
    InventoryItem,
    Inventory
}