/* A base object for all weapons */
define(
    ['../../../../utils/extensions', '../equippableItem', 'utils/validation'],
    function (Extensions, EquippableItem, Validation) {

    function Weapon(name, buyPrice, minDamage, maxDamage) {
        Validation.forAbstractClass(this, Weapon);
        EquippableItem.call(this, name, buyPrice, minDamage, maxDamage, 0, 0, 0);
    }

    Weapon.inherits(EquippableItem);

    return Weapon;
});