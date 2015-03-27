/* A base object for all body armor.
 * Cannot be instantiated. */
define(
    ['../../../../utils/extensions', '../equippableItem', 'utils/validation'],
    function (Extensions, EquippableItem, Validation) {
    function BodyArmor(name, buyPrice, defence, maxHealth, maxMana) {
        Validation.forAbstractClass(this, BodyArmor);
        EquippableItem.call(this, name, buyPrice, 0, 0, defence, maxHealth, maxMana);
    }

    BodyArmor.inherits(EquippableItem);

    return BodyArmor;
});