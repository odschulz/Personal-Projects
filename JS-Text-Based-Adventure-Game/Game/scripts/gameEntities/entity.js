/* Base object for all entities in the game
* Cannot be instantiated.*/

define(['../utils/extensions', 'utils/validation'], function (Extensions, Validation) {
    /* static-like variable for id, incremented each time a Entity is created */
    var uniqueId = 0;

    function Entity(name) {
        Validation.forAbstractClass(this, Entity);
        uniqueId ++;
        this._id = uniqueId;
        this.name = name;
    }

    Object.defineProperties(Entity.prototype, {
        id: {
            get: function () {
                return this._id;
            }
        },
        name: {
            get: function () {
                return this._name;
            },
            set: function (value) {
                Validation.forStringNotEmpty('Name', value);
                this._name = value;
            }
        }
    });

    return Entity;
});