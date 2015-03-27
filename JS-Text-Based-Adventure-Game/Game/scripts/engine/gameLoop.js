define(
    [
        'engine/entityFactory'
    ],
    function (EntityFactory) {
        function GameLoop() {
        }



        GameLoop.commandManager = function () {

            // if isPlaying is false, startScreen()
            // else processCommand
        };

        GameLoop.startScreen = function () {
            console.log('Started');
        };

        return GameLoop;
    });