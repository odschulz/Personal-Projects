//var SELL_PRICE_MULTIPLIER = 0.6;
//this._sellPrice = Math.floor(buyPrice * SELL_PRICE_MULTIPLIER);

/* In a later stage, the hard-coded information will be taken from plane text. */
define([], function () {
    var constants = {
        map: {
            DUNGEON: {
                NAME: 'Forsaken Dungeon',
                SIZE_X: 4,
                SIZE_Y: 3
            },
            environment: {
                BUCKET: {
                    NAME: 'old bucket',
                    DESCRIPTION: 'It looks somehow different than everything else surrounding it, as if from ' +
                    'another age.',
                    GOLD: 50,
                    ITEM: undefined
                }
            }
        },
        rooms: {
           ROOM_1: {
               NAME: 'Stinky prison cell',
               DESCRIPTION: 'You are in a stinky prison cell, with cold brick walls, no window, and a slightly opened' +
               ' thick wooden door.',
               X: 0,
               Y: 1,
               HAS_MONSTER: false,
               HAS_ENVIRONMENT_OBJECT: false
           },
            ROOM_2: {
                NAME: 'Corridor',
                DESCRIPTION: 'This is a corridor in a prison wing. It looks old and secluded. All cells on each side ' +
                'appear to be empty. You notice something strange on the wall in front of you - there is a sign with' +
                ' an arrow, pointing to the north that says: "The best Goods in town".',
                X: 1,
                Y: 1,
                HAS_MONSTER: false,
                HAS_ENVIRONMENT_OBJECT: true,
                ENVIRONMENT_OBJECT_NAME: 'old bucket'
            }

        },
        items: {
            SELL_PRICE_MULTIPLIER: 0.6
        }
    };

    return constants;
});
