define(
    ['../utils/extensions', 'utils/validation', './items/item'],
    function (Extensions, Validation, Item) {
    function Inventory() {
        //this.items = [];
    }

    Object.defineProperty(Inventory.prototype, "items", {
        value: [],
        writable: false,
        enumerable: true,
        configurable: false
    });

    Inventory.prototype.addItem = function addItem(item) {
        Validation.objectOfCorrectType('Item to be added to inventory', item, Item);
        this.items.push(item);
    };

    /* Throws a ReferenceError when the item to be removed is not found in the inventory */
    Inventory.prototype.removeItem = function addItem(item) {
        // TODO: check if such item exists and delete it
        var index = this.items.indexOf(item);
        // TODO: do try-catch when trying to remove items
        if (index > -1) {
            this.items.splice(index, 1);
        } else {
            throw new ReferenceError('Such item does not exist in the inventory');
        }
    };

    Inventory.prototype.getItems = function getItems() {
        // TODO: see if this is needed
        return makeCopyOfItems.call(this);
    };

    function makeCopyOfItems() {
        var itemsCopy = [];
        for (var i = 0; i < this.items.length; i++) {
            itemsCopy.push(this.items[i]);
        }

        return itemsCopy;
    }

    return Inventory;
});