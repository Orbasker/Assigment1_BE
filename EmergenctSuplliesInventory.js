const fs = require('fs');

class InventoryItem {
    constructor(name, quantity, price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}

class Inventory {
    constructor() {
        this.inventory = fs.readFileSync('inventory.json');
        this.inventory = JSON.parse(this.inventory);
    }
    write_invent(msg="Inventory been updated!") {
        fs.writeFile('inventory.json', JSON.stringify(this.inventory, null, 2), (err) => {
            if (err) {
                throw err;
            }
            console.log(msg);
        });
        
    }
    ExistedInInventory(item) {
        let flag = false;
        this.inventory.inventory.forEach(it => {
            if (it.name === item) {
                flag = true;
            }
        });
        return flag;
    }
    addItem(item) {
        if (item.name === '' || item.quantity === '' || item.price === '') {
            throw new Error('Invalid item');
        }
        else if (item.quantity < 0 || item.price < 0) {
            throw new Error('Invalid item');
        }
        if (this.ExistedInInventory(item.name)) {
            throw new Error('Item already exists');
        }
        this.inventory.inventory.push(item);
        this.write_invent("Item has been added to the inventory!")
    };
    deleteItem(item) {
        
        if (!this.ExistedInInventory(item)) {
            throw new Error('Item not found');
        }
        // delete this.inventory.inventory[item];
        this.inventory.inventory = this.inventory.inventory.filter(it => it.name !== item);
        
        this.write_invent("Item has been deleted from the inventory!")
    }
    updateItem(item) {
        if (!this.ExistedInInventory(item.name)) {
            throw new Error('Item not found');
        }
       this.inventory.inventory.forEach(it => {
            if (it.name === item.name) {
                it.quantity = item.quantity;
                it.price = item.price;
            }
        });
        
        this.write_invent("Item has been updated in the inventory!")
    }
    getItems() {
        return this.inventory;
    }
    getItem(item) {
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