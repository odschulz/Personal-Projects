define(
    ['../../../utils/extensions', './consumableItem', 'utils/validation'],
    function (Extensions, ConsumableItem, Validation) {

    function ManaPotion(name, buyPrice, mana) {
        Validation.forCorrectNumberOfConstructorParameters(arguments, 3, ManaPotion);
        ConsumableItem.call(this, name, buyPrice, 0, mana);
    }

    ManaPotion.inherits(ConsumableItem);

    return ManaPotion;
});