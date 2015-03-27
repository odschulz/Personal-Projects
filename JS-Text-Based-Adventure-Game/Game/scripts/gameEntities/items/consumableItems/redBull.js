define(
    ['../../../utils/extensions', './consumableItem', 'utils/validation'],
    function (Extensions, ConsumableItem, Validation) {

    function RedBull(name, buyPrice, health, mana) {
        Validation.forCorrectNumberOfConstructorParameters(arguments, 4, RedBull);
        ConsumableItem.call(this, name, buyPrice, health, mana);
    }

    RedBull.inherits(ConsumableItem);

    return RedBull;
});