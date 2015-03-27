define(
    ['../../../../utils/extensions', './weapon', 'utils/validation'],
    function (Extensions, Weapon, Validation) {

    function Sword(name, buyPrice, minDamage, maxDamage) {
        Validation.forCorrectNumberOfConstructorParameters(arguments, 4, Sword);
        Weapon.call(this, name, buyPrice, minDamage, maxDamage);
    }

    Sword.inherits(Weapon);

    return Sword;
});