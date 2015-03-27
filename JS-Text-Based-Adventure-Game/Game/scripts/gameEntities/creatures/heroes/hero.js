define(
    [
        '../../../utils/extensions',
        '../creature'
    ],
    function (Extensions, Creature) {
        function Hero(name, baseAttributes, gold) {
            //Validation.forAbstractClass(this, Hero);
            Creature.call(this, name, baseAttributes, 0);
        }

        Hero.inherits(Creature);

        return Hero;
    });