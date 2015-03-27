define(
    ['../../../../utils/extensions', './bodyArmor', 'utils/validation'],
    function (Extensions, BodyArmor, Validation) {
    function LeatherArmor(name, buyPrice, defence, maxHealth, maxMana) {
        Validation.forCorrectNumberOfConstructorParameters(arguments, 5, LeatherArmor);
        BodyArmor.call(this, name, buyPrice, defence, maxHealth, maxMana);
    }

    LeatherArmor.inherits(BodyArmor);

    return LeatherArmor;
});
