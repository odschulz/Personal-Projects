define(['../../utils/extensions', '../entity', '../items/item'], function (Extensions, Entity, Item) {
    function EnvironmentObject(name, description, gold, item) {
        Entity.apply(this, arguments);
        this._description = description;
        if (gold != undefined) {
            this._gold = parseFloat(gold);
        }
        if (item != undefined) {
            if (!(item instanceof Item)) {
                throw new TypeError(
                    'Invalid argument - the passed argument should be of type Item',
                    "environmentObject.js",
                    13);
            }

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
});