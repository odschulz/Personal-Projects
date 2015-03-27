define(
    ['../../../utils/extensions', './consumableItem', 'utils/validation'],
    function (Extensions, ConsumableItem, Validation) {

    function HealthPotion(name, buyPrice, health) {
        Validation.forCorrectNumberOfConstructorParameters(arguments, 3, HealthPotion);
        ConsumableItem.call(this, name, buyPrice, health, 0);
    }

    HealthPotion.inherits(ConsumableItem);

    return HealthPotion;
});
