/* A base object for all items that can be equipped.
 * Cannot be instantiated. */
define(
    [
        '../../../utils/extensions',
        '../item',
        '../../attributes/baseAttributes',
        'utils/validation'
    ],
    function (Extensions, Item, BaseAttributes, Validation) {

    function EquippableItem(name, buyPrice, minDamage, maxDamage, defence, maxHealth, maxMana) {
        Validation.forAbstractClass(this, EquippableItem);
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

    Object.defineProperties(EquippableItem.prototype, {
        baseAttributes: {
            get: function () {
                return this._baseAttributes;
            }
        },
        isEquipped: {
            get: function () {
                return this._isEquipped;
            }
        }
    });

    EquippableItem.prototype.equipItem = function equip() {
        this._isEquipped = true;
        return this.baseAttributes;
    };

    return EquippableItem;
});