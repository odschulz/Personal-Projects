define(
    [
        '../../../utils/extensions',
        '../creature'
    ],
    function (Extensions, Creature) {
        function Monster(name, baseAttributes, gold) {
            //Validation.forAbstractClass(this, Monster);
            Creature.call(this, name, baseAttributes, gold);
        }

        Monster.inherits(Creature);

        return Monster;
    });
