"use strict";

var SELL_PRICE_MULTIPLIER = 0.6;
var SWORD_MIN_DAMAGE = 10;
var SWORD_MAX_DAMAGE = 20;
var SWORD_BUY_PRICE = 50;
var DAGGER_MIN_DAMAGE = 12;
var DAGGER_MAX_DAMAGE = 17;
var DAGGER_BUY_PRICE = 50;
var LEATHER_ARMOR_DEFENCE = 2;
var LEATHER_ARMOR_HEALTH = 10;
var LEATHER_ARMOR_MANA = 0;
var LEATHER_ARMOR_BUY_PRICE = 35;
var HEALTH_POTION_HEALTH = 20;
var HEALTH_POTION_BUY_PRICE = 10;
var MANA_POTION_MANA = 10;
var MANA_POTION_BUY_PRICE = 10;
var RED_BULL_HEALTH = 10;
var RED_BULL_MANA = 5;
var RED_BULL_BUY_PRICE = 10;

// example duck typing method
var hasMethods = function(obj /*, method list as strings */){
    var i = 1, methodName;
    while((methodName = arguments[i++])){
        if(typeof obj[methodName] != 'function') {
            return false;
        }
    }
    return true;
};

// in your code
//if(hasMethods(obj, 'quak', 'flapWings','waggle')) {
//    //  IT'S A DUCK, do your duck thang
//}

Object.prototype.inherits = function (parent) {
    if (!Object.create) {
        Object.prototype.create = function (proto) {
            function F() {}
            F.prototype = proto;
            return new F;
        }
    }

    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
};

var Entity = (function () {
    // static-like variable for id, incremented each time a Entity is created
    var uniqueId = 0;

    function Entity(name) {
        uniqueId ++;
        this._id = uniqueId;
        this._name = name;
    }

    return Entity;
}());

var BaseAttributes = (function () {
    function BaseAttributes(minDamage, maxDamage, defence, maxHealth, maxMana) {
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.defence = defence;
        this.maxHealth = maxHealth;
        this.maxMana = maxMana;
    }

    return BaseAttributes;
}());


var DynamicAttributes = (function () {
    function DynamicAttributes(health, mana) {
        this.health = health;
        this.mana = mana;
    }

    return DynamicAttributes;
}());

var Inventory = (function () {
    function Inventory() {
        this._items = [];
    }

    Inventory.prototype.addItem = function addItem(item) {
        this._items.push(item);
    };

    Inventory.prototype.removeItem = function addItem(removeItem) {
        // TODO: implement
    };

    Inventory.prototype.getItems = function getItems() {
        return makeCopyOfItems.call(this);
    };

    function makeCopyOfItems() {
        var itemsCopy = [];
        for (var i = 0; i < this._items.length; i++) {
            itemsCopy.push(this._items[i]);
        }

        return itemsCopy;
    }

    return Inventory;
}());

var Item = (function () {

    function Item(name, buyPrice) {
        Entity.apply(this, arguments);
        this._buyPrice = buyPrice;
        this._sellPrice = Math.floor(buyPrice * SELL_PRICE_MULTIPLIER);
    }

    Item.inherits(Entity);

    return Item;
}());

var EquippableItem = (function () {
    function EquippableItem(name, buyPrice, minDamage, maxDamage, defence, maxHealth, maxMana) {
        Item.apply(this, arguments);
        this._baseAttributes = new BaseAttributes(
            minDamage,
            maxDamage,
            defence,
            maxHealth,
            maxMana);
        this._isEquipped = false;
    }

    EquippableItem.inherits(Item);

    EquippableItem.prototype.equip = function equip() {
        this._isEquipped = true;
        return this._baseAttributes;
    };

    return EquippableItem;
}());

var Weapon = (function () {
    function Weapon(name, buyPrice, minDamage, maxDamage) {
        EquippableItem.call(this, name, buyPrice, minDamage, maxDamage, 0, 0, 0);
    }

    Weapon.inherits(EquippableItem);

    return Weapon;
}());

var Sword = (function () {
    function Sword(name) {
        Weapon.call(this, name, SWORD_BUY_PRICE, SWORD_MIN_DAMAGE, SWORD_MAX_DAMAGE);
    }
    
    Sword.inherits(Weapon);
    
    return Sword;
}());

var sword = new Sword('noja');

var Dagger = (function () {
    function Dagger(name) {
        Weapon.call(this, name, DAGGER_BUY_PRICE, DAGGER_MIN_DAMAGE, DAGGER_MAX_DAMAGE);
    }

    Dagger.inherits(Weapon);

    return Dagger;
}());


var BodyArmor = (function () {
    function BodyArmor(name, buyPrice, defence, maxHealth, maxMana) {
        EquippableItem.call(this, name, buyPrice, 0, 0, defence, maxHealth, maxMana);
    }

    BodyArmor.inherits(EquippableItem);

    return BodyArmor;
}());

var LeatherArmor = (function () {
    function LeatherArmor(name) {
        BodyArmor.call(
            this, 
            name, 
            LEATHER_ARMOR_BUY_PRICE,
            LEATHER_ARMOR_DEFENCE, 
            LEATHER_ARMOR_HEALTH, 
            LEATHER_ARMOR_MANA);
    }
    
    LeatherArmor.inherits(BodyArmor);
    
    return LeatherArmor;
}());

var ConsumableItem = (function () {
    function ConsumableItem(name, buyPrice, health, mana) {
        Item.apply(this, arguments);
        this._dynamicAttributes = new DynamicAttributes(health, mana);
        this._isConsumed = false;
    }

    ConsumableItem.inherits(Item);

    ConsumableItem.prototype.consume = function consume() {
        this._isConsumed = true;
        return this._dynamicAttributes;
    };

    return ConsumableItem;
}());

var HealthPotion = (function () {
    function HealthPotion(name) {
        ConsumableItem.call(this, name, HEALTH_POTION_BUY_PRICE, HEALTH_POTION_HEALTH, 0);
    }

    HealthPotion.inherits(ConsumableItem);

    return HealthPotion;
}());

var ManaPotion = (function () {
    function ManaPotion(name) {
        ConsumableItem.call(this, name, MANA_POTION_BUY_PRICE, 0, MANA_POTION_MANA);
    }

    ManaPotion.inherits(ConsumableItem);

    return ManaPotion;
}());

var RedBull = (function () {
    function RedBull(name) {
        ConsumableItem.call(this, name, RED_BULL_BUY_PRICE, RED_BULL_HEALTH, RED_BULL_MANA);
    }

    RedBull.inherits(ConsumableItem);

    return RedBull;
}());

var Room = (function () {
    function Room(name, x, y) {
        Entity.apply(this, arguments);
        this._x = x;
        this._y = y;
        this._exits = {
            north: false,
            east: false,
            south: false,
            west: false
        }
    }

    Room.inherits(Entity);

    Room.prototype.openRoomExit = function toggleRoomExit(direction) {
        if (!this._exits.hasOwnProperty(direction)) {
            throw new TypeError(
                'Invalid argument - the passed argument should be a valid direction', "classes.js", 46);
        }

        this._exits[direction] = true;
    };

    return Room;
}());

var Dungeon = (function () {

    //var initialRooms = [];
    //initialRooms["spawnRoom"] = new Room(0, 1);
    //initialRooms["merchantRoom"] = new Room(1, 0);

    function Dungeon(name, dungeonSizeX, dungeonSizeY) {
        Entity.apply(this, arguments);

        this._dungeonSizeX = dungeonSizeX;
        this._dungeonSizeY = dungeonSizeY;
        this._rooms = [];

        // Create a grid for the dungeon with size from the defined X and Y values
        var x, y;
        for (y = 0; y < this._dungeonSizeY; y++) {
            this._rooms[y] = [];

            for (x = 0; x < this._dungeonSizeX; x++) {
                this._rooms[y][x] = "empty";
            }
        }
    }

    Dungeon.inherits(Entity);

    //Private function
    function generateRandomRoom() {
        var x = Math.floor((Math.random() * this._mapSizeX - 1) + 1);
        var y = Math.floor((Math.random() * this._mapSizeY - 1) + 1);

        //if (initialRooms["startRoom"]._x === x && initialRooms["startRoom"]._y === y) {
        //    return generateRandomRoom();
        //}

        return new Room(x, y);
    }

    // Adds a specified room to the dungeon grid in case there is no other room with the same coordinates
    Dungeon.prototype.addRoomToGrid = function addRoomToGrid(room) {
        var x, y;

        if (!(room instanceof Room)) {
            throw new TypeError('Invalid argument - the passed argument should be of type Room', "classes.js", 79);
        }

        // Checks if there is a room with the same coordinates in the map grid
        for (y = 0; y < this._rooms.length; y++) {
            for (x = 0; x < this._rooms[y].length; x++) {
                if (this._rooms[y][x]._x === room._x &&
                        this._rooms[y][x]._y === room._y) {
                    throw new Error("A room with the same coordinates has already been added to the Dungeon Grid.");
                }
            }
        }

        // Add the room to the map grid by taking the room X and Y coordinates
        this._rooms[room._y][room._x] = room;
    };

    return Dungeon;
}());

var EnvironmentObject = (function () {
    // TODO: fix the constructor so it can take only gold or only an item
    function EnvironmentObject(name, description, gold, item) {
        Entity.apply(this, arguments);
        this._description = description;
        if (gold != undefined) {
            this._gold = gold;
        }
        if (item != undefined) {
            this._item = item;
        }

        this._isLooted = false;
    }

    EnvironmentObject.inherits(Entity);
    
    EnvironmentObject.prototype.loot = function loot() {
        var loot = {
            item: this._item,
            gold: this._gold
        };
        this._gold = 0;
        this._item = undefined;
        this._isLooted = true;
        
        return loot;
    };

    return EnvironmentObject;
}());

var Creature = (function () {
    function Creature(name, baseAttributes, gold) {
        Entity.apply(this, arguments);
        this._baseAttributes = baseAttributes;
        this._dynamicAttributes = new DynamicAttributes(baseAttributes.maxHealth, baseAttributes.maxMana);
        this._gold = gold;
        this._inventory = new Inventory();
    }

    Creature.inherits(Entity);

    return Creature;
}());

/*
* var Creature
* var Player
* var Monster
* exits will be in Room
*/

console.log('********************************************************');
var newInventory = new Inventory();
var newInventory2 = new Inventory();
newInventory.addItem("sword");
newInventory2.addItem('dagger');
console.log(newInventory);
console.log(newInventory2);
console.log(newInventory2.getItems());