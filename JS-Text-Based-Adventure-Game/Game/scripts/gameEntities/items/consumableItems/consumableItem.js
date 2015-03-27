/* A base object for all items that can be consumed.
 * Cannot be instantiated. */
define(
    [
        '../../../utils/extensions',
        '../item',
        '../../attributes/dynamicAttributes',
        'utils/validation'
    ],
    function (Extensions, Item, DynamicAttributes, Validation) {

        function ConsumableItem(name, buyPrice, health, mana) {
            Validation.forAbstractClass(this, ConsumableItem);
            Item.apply(this, arguments);

            this._dynamicAttributes = new DynamicAttributes(health, mana);
            this._isConsumed = false;
        }

        ConsumableItem.inherits(Item);

        Object.defineProperties(ConsumableItem.prototype, {
            dynamicAttributes: {
                get: function () {
                    return this._dynamicAttributes;
                }
            },
            isConsumed: {
                get: function () {
                    return this._isConsumed;
                }
            }
        });

        ConsumableItem.prototype.consumeItem = function consumeItem() {
            this._isConsumed = true;
            return this.dynamicAttributes;
        };

        return ConsumableItem;
    });