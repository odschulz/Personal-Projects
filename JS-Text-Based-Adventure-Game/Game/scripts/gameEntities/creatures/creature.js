/* A base object for all creatures */
define(
    [
        '../../utils/extensions',
        '../entity',
        '../attributes/baseAttributes',
        '../attributes/dynamicAttributes',
        '../inventory',
        'utils/validation'
    ],
    function (Extensions, Entity, BaseAttributes, DynamicAttributes, Inventory, Validation) {
        function Creature(name, baseAttributes, gold) {
            Validation.forAbstractClass(this, Creature);
            Entity.apply(this, arguments);

            this.baseAttributes = baseAttributes;
            this.dynamicAttributes = new DynamicAttributes(
                this.baseAttributes.maxHealth,
                this.baseAttributes.maxMana);
            this.gold = gold;
            this.inventory = new Inventory();
        }

        Creature.inherits(Entity);

        Object.defineProperties(Creature.prototype,{
            baseAttributes: {
                get: function () {
                    return this._baseAttributes;
                },
                set: function (value) {
                    Validation.objectOfCorrectType('Base Attributes', value, BaseAttributes);
                    this._baseAttributes = value;
                },
                enumerable: true
            },
            dynamicAttributes: {
                get: function () {
                    return this._dynamicAttributes;
                },
                set: function (value) {
                    Validation.objectOfCorrectType('Dynamic Attributes', value, DynamicAttributes);
                    this._dynamicAttributes = value;
                },
                enumerable: true
            },
            gold: {
                get: function () {
                    return this._gold;
                },
                set: function (value) {
                    Validation.forPositiveNumber('Gold', value);
                    this._gold = parseFloat(value);
                },
                enumerable: true
            },
            inventory: {
                get: function () {
                    return this._inventory;
                },
                set: function (value) {
                    Validation.objectOfCorrectType('Inventory', value, Inventory);
                    this._inventory = value;
                },
                enumerable: true
            }
        });

        return Creature;
    });
