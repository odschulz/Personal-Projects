(function () {
	'use strict';
	require(
        [
            'engine/entityFactory',
            'engine/gameLoop',
            '../libs/CanvasInput'
        ],
        function (EntityFactory, GameLoop) {
            //var dungeon = EntityFactory.generateMap();
            //console.log(dungeon);
            var canvas,
                ctx,
                canvasWidth = 854,
                canvasHeight = 480 / 3,
                inputHeight = 20,
                isPlaying = false,
                input,
                textStyles = {
                    error: {
                        font: "18px Courier New Bold",
                        color: "red",
                        positionX: 6,
                        positionY: canvasHeight - (inputHeight * 2),
                        content: 'Invalid Command!'
                    },
                    gamePlay: {
                        font: "25px Courier New Bold",
                        color: "green",
                        positionX: 6,
                        positionY: 40,
                        lineHeight: 25
                    }
                },
                maxPxLength = canvasWidth;

            window.onload = init();

            function init() {
                canvas = document.getElementById('canvas');
                canvas.width = canvasWidth;
                canvas.height = canvasHeight ;
                ctx = canvas.getContext('2d');

                ctx.mozImageSmoothingEnabled = false;
                ctx.webkitImageSmoothingEnabled = false;
                ctx.msImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;

                /* Input should be assigned and displayed before the game loop is initialized */
                drawInput();
                gameLoop();

                //GameLoop.commandManager();

            }

            function gameLoop() {
                var gameStateOptions = {
                    welcome: "Welcome Screen",
                    playerName: "Player Name",
                    characterSelect: "Character Select",
                    intro: "Intro Screen",
                    gameStarted: "Game Started"
                };
                var gameState = gameStateOptions.welcome;
                var dungeon;
                var currentRoom;
                var playerName;
                var characterType;
                var hero;
                
                /* Initialize the onsubmit event listener of the input field */
                input.onsubmit(function () {
                    /* Call the command manager whenever submitted */
                    processCommand(this._value);

                    /* Clear the input field after submitted */
                    this.value('');
                });

                if (gameState == gameStateOptions.welcome) {
                    welcomeScreen();
                }

                function processCommand(input) {
                    var command = input.toLocaleLowerCase();

                    switch(gameState) {
                        case gameStateOptions.welcome:
                            if (command == 1) {
                                gameState = gameStateOptions.playerName;
                                playerNameScreen();
                            } else {
                                printInvalidCommandMessage();
                            }
                            // TODO: implement a back command
                            break;
                        case gameStateOptions.playerName:
                            if (command == '') {
                                printInvalidCommandMessage(
                                    'Invalid User Name, please enter a name with at least one symbol');
                            } else {
                                playerName = command;
                                gameState = gameStateOptions.characterSelect;
                                characterSelect();
                            }
                            break;
                        case gameStateOptions.characterSelect:
                            if (command == 1) {
                                characterType = 'default';
                                gameState = gameStateOptions.intro;
                                intro();
                            } else {
                                printInvalidCommandMessage('Invalid Character Choice');
                            }
                            break;
                        case gameStateOptions.intro:
                            if (command == 1) {
                                gameState = gameStateOptions.gameStarted;
                                startGame();
                            } else {
                                printInvalidCommandMessage();
                            }
                            break;
                        case gameStateOptions.gameStarted:
                            if (isDirection(command)) {
                                if (currentRoom['exits'][command]['open']) {
                                    moveToRoom(command);
                                    displayRoom();
                                } else {
                                    printInvalidCommandMessage('There is no exit in that direction');
                                }
                            } else if (command == 'quit') {
                                gameState = gameStateOptions.welcome;
                                welcomeScreen();
                            } else {
                                printInvalidCommandMessage();
                            }
                            break;
                        default:
                            printGamePlayMessage('Unhandled default in switch case');
                        break;
                    }
                }


                function welcomeScreen() {
                    printGamePlayMessage('Welcome screen. Choose 1 to start');
                }

                function playerNameScreen() {
                    printGamePlayMessage('Enter your name');
                }

                function characterSelect() {
                    printGamePlayMessage('Select your character. Press 1 for default');
                }

                function intro() {
                    printGamePlayMessage('Intro Screen. Press 1 to continue.');
                }

                function startGame() {
                    hero = EntityFactory.generatePlayer(playerName);
                    dungeon = EntityFactory.generateMap();
                    // TODO: get start room without being hardcoded
                    currentRoom = dungeon.rooms[1][0];
                    displayRoom();
                    // Enter first room
                }

                function confirmScreen() {
                    // TODO: implement
                }

                function displayRoom() {
                    // TODO: check if there is a monster in the room and start battle manager
                    printGamePlayMessage(currentRoom.description);
                }

                function isDirection(command) {
                    return (command === 'north' || command === 'east' || command === 'west' || command === 'south');
                }

                function moveToRoom(command) {
                    var direction = command.toLocaleLowerCase();
                    var newXCoordinate = currentRoom['exits'][direction]['x'];
                    var newYCoordinate = currentRoom['exits'][direction]['y'];

                    currentRoom = dungeon.rooms[newYCoordinate][newXCoordinate];
                }

                //function commandManager(command) {
                //
                //    if (command == '1') {
                //        //printGamePlayMessage(dungeon.rooms[1][0].description);
                //        isPlaying = true;
                //
                //    } else {
                //        printInvalidCommandMessage();
                //    }
                //}

            }

            function drawInput() {
                input = new CanvasInput({
                    canvas: document.getElementById('canvas'),
                    x: 1,
                    y: canvasHeight - inputHeight - 14,
                    height: inputHeight,
                    fontSize: 18,
                    fontFamily: 'Courier New',
                    fontColor: '#ffffff',
                    //fontWeight: 'bold',
                    width: canvasWidth - 14,
                    backgroundColor: '#000000',
                    padding: 5,
                    borderWidth: 0,
                    borderColor: '#808080',
                    borderRadius: 0 ,
                    boxShadow: '0px 0px 0px #fff',
                    placeHolder: 'Enter your command here...'
                    //onsubmit: function () {
                    //    //commandManager(this._value);
                    //    //
                    //    ///* This clears the input field */
                    //    //this.value('');
                    //
                    //}
                });

                input.focus();
            }

            //function commandManager(command) {
            //
            //    if (command == '1') {
            //        //printGamePlayMessage(dungeon.rooms[1][0].description);
            //
            //    } else {
            //        printInvalidCommandMessage();
            //    }
            //}


            function printGamePlayMessage(message) {

                ctx.font = textStyles.gamePlay.font;
                ctx.fillStyle=textStyles.gamePlay.color;

                /* Get message separated in lines according to the canvas width */
                var messageInLines = separateMessageInLines(message),
                    messageLinesLength = messageInLines.length,
                    positionX = textStyles.gamePlay.positionX,
                    positionY = textStyles.gamePlay.positionY,
                    i;

                clearCanvas();

                /* If I want to print in the middle:
                *      ctx.fillText(message, (canvasWidth / 2) - (ctx.measureText(message).width / 2), Y)
                */

                for (i = 0; i < messageLinesLength; i += 1) {
                    ctx.fillText(messageInLines[i], positionX, positionY);
                    /* Increment the position of each row with the designated line height */
                    positionY += textStyles.gamePlay.lineHeight;
                }
            }

            function printInvalidCommandMessage() {
                var message = arguments[0] || textStyles.error.content;
                ctx.font = textStyles.error.font;
                ctx.fillStyle = textStyles.error.color;
                // TODO: fix the clearRect not to be hardcoded
                ctx.clearRect(textStyles.error.positionX, textStyles.error.positionY - 25, canvasWidth, canvasHeight);

                ctx.fillText(message, textStyles.error.positionX, textStyles.error.positionY);
            }

            function clearCanvas() {
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            }

            /* Reset variables if game ended */
            function resetVariables() {
                isPlaying = false;
            }

            /* Separates the message in lines according to the canvas width,
            * so that each line can fit in the canvas. */
            function separateMessageInLines(message) {
                var splitMessage = message.split(" "),
                    messageLinesArray = [],
                    lastPhrase = splitMessage[0],
                    measure = 0;

                if (splitMessage.length < 2) {
                    messageLinesArray.push(lastPhrase || 'Empty message submited');

                    return messageLinesArray;
                }

                for (var i = 1; i < splitMessage.length; i += 1) {
                    var word = splitMessage[i];
                    measure = ctx.measureText(lastPhrase + word).width;

                    if (measure < maxPxLength) {
                        lastPhrase += (" " + word);
                    } else {
                        messageLinesArray.push(lastPhrase);
                        lastPhrase = word;
                        measure = 0;
                    }

                    if (i === splitMessage.length - 1) {
                        messageLinesArray.push(lastPhrase);
                        break;
                    }
                }

                return messageLinesArray;
            }

	});
}());