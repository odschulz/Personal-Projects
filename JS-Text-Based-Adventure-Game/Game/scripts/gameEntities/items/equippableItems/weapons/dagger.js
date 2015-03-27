define(
    ['../../../../utils/extensions', './weapon', 'utils/validation'],
    function (Extensions, Weapon, Validation) {

    function Dagger(name, buyPrice, minDamage, maxDamage) {
        Validation.forCorrectNumberOfConstructorParameters(arguments, 4, Dagger);
        Weapon.call(this, name, buyPrice, minDamage, maxDamage);
    }

    Dagger.inherits(Weapon);

    return Dagger;
});
