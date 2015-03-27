
/* Responsible for generating all Game Entity objects*/
define(
    [
        'utils/constants',
        'gameEntities/attributes/baseAttributes',
        'gameEntities/attributes/dynamicAttributes',
        'gameEntities/items/consumableItems/healthPotion',
        'gameEntities/items/consumableItems/manaPotion',
        'gameEntities/items/consumableItems/redBull',
        'gameEntities/items/equippableItems/weapons/sword',
        'gameEntities/items/equippableItems/weapons/dagger',
        'gameEntities/items/equippableItems/bodyArmor/leatherArmor',
        'gameEntities/map/environmentObject',
        'gameEntities/map/room',
        'gameEntities/map/dungeon'
    ],
    function (Constants, BaseAttributes, DynamicAttributes, HealthPotion, ManaPotion,
              RedBull, Sword, Dagger, LeatherArmor, EnvironmentObject, Room, Dungeon) {

        var EntityFactory = {};

        EntityFactory.generatePlayer = function generatePlayer(name) {
            return name;
        };

        EntityFactory.generateMap = function generateMap() {
            var dungeon, rooms = generateRooms();
            try {
                dungeon = new Dungeon(
                    Constants.map.DUNGEON.NAME,
                    Constants.map.DUNGEON.SIZE_X,
                    Constants.map.DUNGEON.SIZE_Y
                );

                for (var room in rooms) {
                    if (rooms.hasOwnProperty(room)) {
                        dungeon.addRoomToGrid(rooms[room]);
                    }
                }
            }
            catch(err){
                console.error(err.message);
            }

            // TODO: update room exits

            return dungeon;
        };

        function generateRooms() {
            var numberOfRooms = Constants.rooms.length, rooms = [], i;

            try {
                for (var room in Constants.rooms) {
                    if (Constants.rooms.hasOwnProperty(room)) {

                        var generatedRoom = new Room(
                            Constants.rooms[room].NAME,
                            Constants.rooms[room].DESCRIPTION,
                            Constants.rooms[room].X,
                            Constants.rooms[room].Y,
                            Constants.rooms[room].HAS_MONSTER,
                            Constants.rooms[room].HAS_ENVIRONMENT_OBJECT
                        );

                        if (generatedRoom.hasMonster) {
                            // TODO: add a function for randomly generated monsters
                            //generatedRoom.addMonster('monster');
                        }

                        if (generatedRoom.hasEnvironmentObject) {
                            // TODO: add a function for randomly generated objects
                            var envObj = new EnvironmentObject(
                                Constants.map.environment.BUCKET.NAME,
                                Constants.map.environment.BUCKET.DESCRIPTION,
                                Constants.map.environment.BUCKET.GOLD,
                                Constants.map.environment.BUCKET.ITEM
                            );

                            generatedRoom.addEnvironmentObject(envObj);
                        }

                        rooms.push(generatedRoom);
                    }
                }
            }
            catch(err) {
                console.error(err.message);
            }

            return rooms;
        }

        return EntityFactory;

    });