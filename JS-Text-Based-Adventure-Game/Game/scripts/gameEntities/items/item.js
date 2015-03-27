/* A base object for all items
* Cannot be instantiated.*/
define(
    ['../../utils/extensions', '../entity', 'utils/validation', 'utils/constants'],
    function (Extensions, Entity, Validation, Constants) {

    function Item(name, buyPrice) {
        Validation.forAbstractClass(this, Item);
        Entity.apply(this, arguments);

        this.buyPrice = buyPrice;
    }

    Item.inherits(Entity);

    Object.defineProperties(Item.prototype, {
        buyPrice: {
            get: function () {
                return this._buyPrice;
            },
            set: function (value) {
                Validation.forPositiveNumber('Buy Price', value);
                this._buyPrice = parseFloat(value);
            },
            enumerable: true
        },
        sellPrice: {
            get: function () {
                return this.buyPrice * Constants.items.SELL_PRICE_MULTIPLIER;
            },
            enumerable: true
        }
    });

    return Item;
});