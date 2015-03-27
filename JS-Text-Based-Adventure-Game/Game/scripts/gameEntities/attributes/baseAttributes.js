define(['../../utils/extensions', 'utils/validation'], function (Extensions, Validation) {
    function BaseAttributes (minDamage, maxDamage, defence, maxHealth, maxMana) {
        Validation.forCorrectNumberOfConstructorParameters(arguments, 5, BaseAttributes);

        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.defence = defence;
        this.maxHealth = maxHealth;
        this.maxMana = maxMana;
    }

    Object.defineProperties(BaseAttributes.prototype, {
        minDamage: {
            get: function () {
                return this._minDamage;
            },
            set: function (value) {
                Validation.forPositiveNumber('Minimum damage', value);
                this._minDamage = parseFloat(value);
            },
            enumerable: true
        },
        maxDamage: {
            get: function () {
                return this._maxDamage;
            },
            set: function (value) {
                Validation.forPositiveNumber('Maximum Damage', value);
                this._maxDamage = parseFloat(value);
            },
            enumerable: true

        },
        maxHealth: {
            get: function () {
                return this._maxHealth;
            },
            set: function (value) {
                Validation.forPositiveNumber('Maximum Health', value);
                this._maxHealth = parseFloat(value);
            },
            enumerable: true
        },
        defence: {
            get: function () {
                return this._defence;
            },
            set: function (value) {
                Validation.forPositiveNumber('Defence', value);
                this._defence = parseFloat(value);
            },
            enumerable: true
        },
        maxMana: {
            get: function () {
                return this._maxMana;
            },
            set: function (value) {
                Validation.forPositiveNumber('Maximum Mana', value);
                this._maxMana = parseFloat(value);
            },
            enumerable: true
        }
    });

    return BaseAttributes;
});