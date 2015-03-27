define(['../../utils/extensions', 'utils/validation'], function (Extensions, Validation) {
    function DynamicAttributes(health, mana) {
        Validation.forCorrectNumberOfConstructorParameters(arguments, 2, DynamicAttributes);

        this.health = health;
        this.mana = mana;
    }

    Object.defineProperties(DynamicAttributes.prototype, {
        health: {
            get: function () {
                return this._health;
            },
            set: function (value) {
                Validation.forPositiveNumber('Health', value);
                this._health = parseFloat(value);
            },
            enumerable: true
        },
        mana: {
            get: function () {
                return this._mana;
            },
            set: function (value) {
                Validation.forPositiveNumber('Mana', value);
                this._mana = parseFloat(value);
            },
            enumerable: true
        }
    });

    return DynamicAttributes;
});