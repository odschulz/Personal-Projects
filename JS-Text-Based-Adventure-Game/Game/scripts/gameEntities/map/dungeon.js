define(
    ['../../utils/extensions', '../entity', './room', 'utils/validation'],
    function (Extensions, Entity, Room, Validation) {

        function Dungeon(name, dungeonSizeX, dungeonSizeY) {
            Validation.forCorrectNumberOfConstructorParameters(arguments, 3, Dungeon);
            Entity.apply(this, arguments);

            this.dungeonSizeX = dungeonSizeX;
            this.dungeonSizeY = dungeonSizeY;
            this._rooms = [];

            /* Create a grid for the dungeon with size from the defined X and Y values */
            var x, y;
            for (y = 0; y < this._dungeonSizeY; y++) {
                this._rooms[y] = [];

                /* Name empty spaces in the grid with "empty", instead of leaving them undefined */
                for (x = 0; x < this._dungeonSizeX; x++) {
                    this._rooms[y][x] = 'empty';
                }
            }
        }

        Dungeon.inherits(Entity);

        Object.defineProperties(Dungeon.prototype, {
            dungeonSizeX: {
                get: function () {
                    return this._dungeonSizeX;
                },
                set: function (value) {
                    this._dungeonSizeX = parseFloat(value);
                }
            },
            dungeonSizeY: {
                get: function () {
                    return this._dungeonSizeY;
                },
                set: function (value) {
                    this._dungeonSizeY = parseFloat(value);
                }
            },
            rooms: {
                get: function () {
                    var gridLength = this._rooms.length, gridLengthY, rooms = [], x, y;

                    /* Return a copy of the dungeon grid and rooms */
                    for (y = 0; y < gridLength; y += 1) {
                        rooms[y] = [];
                        gridLengthY = this._rooms[y].length;
                        for (x = 0; x < gridLengthY; x += 1) {
                            rooms[y][x] = this._rooms[y][x];
                        }
                    }

                    return rooms;
                }
            }
        });

        /* Adds a specified room to the dungeon grid
        *  in case there is no other room with the same coordinates */
        Dungeon.prototype.addRoomToGrid = function addRoomToGrid(room) {
            var gridLength = this._rooms.length, gridLengthY, x, y;

            //if (!(room instanceof Room)) {
            //    throw new TypeError('Invalid argument - the passed argument should be of type Room', "classes.js", 79);
            //}

            Validation.objectOfCorrectType('Room', room, Room);

            /* Check if room X and Y are valid dungeon coordinates*/
            if (room.x >= this.dungeonSizeX || room.y >= this.dungeonSizeY) {
                throw new Error('The room to be added has coordinates which are bigger than the size of the dungeon grid');
            }

            /* Checks if there is a room with the same coordinates in the map grid,
             * not allowing to overwrite rooms */
            if (this._rooms[room.y][room.x] !== 'empty') {
                throw new Error("A room with the same coordinates has already been added to the Dungeon Grid.");
            }

            /* Add the room to the map grid by taking the room X and Y coordinates */
            updateRoomExits.call(this, room);
            this._rooms[room.y][room.x] = room;
        };

        /* Checks if the currentRoom has neighboring rooms and opens all respective exits */
        function updateRoomExits(currentRoom) {
            var northRoom = this._rooms[currentRoom.exits.north.y][currentRoom.exits.north.x] || 'empty';
            var southRoom = this._rooms[currentRoom.exits.south.y][currentRoom.exits.south.x] || 'empty';
            var eastRoom = this._rooms[currentRoom.exits.east.y][currentRoom.exits.east.x] || 'empty';
            var westRoom = this._rooms[currentRoom.exits.west.y][currentRoom.exits.west.x] || 'empty';

            if (northRoom !== 'empty' && northRoom !== undefined) {
                currentRoom.openRoomExit('north');
                northRoom.openRoomExit('south');
            }

            if (southRoom !== 'empty' && southRoom !== undefined) {
                currentRoom.openRoomExit('south');
                southRoom.openRoomExit('north');
            }

            if (eastRoom !== 'empty' && eastRoom !== undefined) {
                currentRoom.openRoomExit('east');
                eastRoom.openRoomExit('west');
            }

            if (westRoom !== 'empty' && westRoom !== undefined) {
                currentRoom.openRoomExit('west');
                westRoom.openRoomExit('east');
            }

        }

        return Dungeon;
});