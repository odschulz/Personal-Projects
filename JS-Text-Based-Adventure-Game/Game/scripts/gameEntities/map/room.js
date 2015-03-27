define(
    ['../../utils/extensions', '../entity', 'gameEntities/creatures/monsters/monster',
        'gameEntities/map/environmentObject','utils/validation'],
    function (Extensions, Entity, Monster, EnvironmentObject, Validation) {

        function Room(name, description, x, y, hasMonster, hasEnvironmentObject) {
            Validation.forCorrectNumberOfConstructorParameters(arguments, 6, Room);
            Entity.apply(this, arguments);

            this.description = description;
            this.x = x;
            this.y = y;
            this._exits = {
                north: {
                    open: false,
                    x: this.x,
                    y: (this.y - 1)
                },
                east: {
                    open: false,
                    x: (this.x + 1),
                    y: this.y
                },
                south: {
                    open: false,
                    x: this.x,
                    y: (this.y + 1)
                },
                west: {
                    open: false,
                    x: (this.x - 1),
                    y: this.y
                }
            };
            this._hasMonster = hasMonster;
            this._hasEnvironmentObject = hasEnvironmentObject;
            this._isVisited = false;
        }

        Room.inherits(Entity);

        Object.defineProperties(Room.prototype, {
            description: {
                get: function () {
                    return this._description;
                },
                set: function (value) {
                    Validation.forStringNotEmpty('Room Description', value);
                    this._description = value;
                }
            },
            x: {
                get: function () {
                    return this._x;
                },
                set: function (value) {
                    Validation.forPositiveNumber('Room X Coordinate', value);
                    this._x = parseFloat(value);
                }
            },
            y: {
                get: function () {
                    return this._y;
                },
                set: function (value) {
                    Validation.forPositiveNumber('Room Y Coordinate', value);
                    this._y = parseFloat(value);
                }
            },
            exits: {
                get: function () {
                    return this._exits;
                }
            },
            hasMonster: {
                get: function () {
                    return this._hasMonster;
                }
            },
            hasEnvironmentObject: {
                get: function () {
                    return this._hasEnvironmentObject;
                }
            }
        });

        Room.prototype.openRoomExit = function toggleRoomExit(direction) {
            if (!this._exits.hasOwnProperty(direction)) {
                throw new TypeError(
                    'Invalid argument - the passed argument should be a valid direction', "room.js", 19);
            }

            this._exits[direction].open = true;
        };

        Room.prototype.addMonster = function addMonster(monster) {
            Object.defineProperty(Room.prototype, 'monster', {
                get: function () {
                    return this._monster;
                },
                set: function (value) {
                    Validation.objectOfCorrectType('Monster in Room', value, Monster);
                    this._monster = value;
                },
                enumerable: true,
                configurable: true
            });

            this.monster = monster;
        };

        Room.prototype.addEnvironmentObject = function addMonster(environmentObject) {
            Object.defineProperty(Room.prototype, 'environmentObject', {
                get: function () {
                    return this._environmentObject;
                },
                set: function (value) {
                    Validation.objectOfCorrectType('Environment Object in Room', value, EnvironmentObject);
                    this._environmentObject = value;
                },
                enumerable: true,
                configurable: true
            });

            this.environmentObject = environmentObject;
        };

        Room.prototype.visit = function () {
            this._isVisited = true;
        };


        return Room;
});