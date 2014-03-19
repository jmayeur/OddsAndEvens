(function(){
    'use strict';

    describe('Service: GameService', function () {

        var gameServiceInstance;


        // load the controller's module
        beforeEach(function(){
            module('OddsOrEvens');
            inject(function(GameService){
                gameServiceInstance = GameService;
            });
        });

        it('Should set the GameMode when setGameMode is called', function(){

            gameServiceInstance.setGameMode(gameServiceInstance.GAME_MODES.EXPERT);
            expect(gameServiceInstance._.gameMode).toBe(gameServiceInstance.GAME_MODES.EXPERT);
            gameServiceInstance.setGameMode(gameServiceInstance.GAME_MODES.DEMO);
            expect(gameServiceInstance._.gameMode).toBe(gameServiceInstance.GAME_MODES.DEMO);
        });

        it('Should set the correct rows and cols when setGameMode is called', function(){

            gameServiceInstance.setGameMode(gameServiceInstance.GAME_MODES.EXPERT);
            expect(gameServiceInstance._.rows).toBe(12);
            expect(gameServiceInstance._.cols).toBe(12);

            gameServiceInstance.setGameMode(gameServiceInstance.GAME_MODES.INTERMEDIATE);
            expect(gameServiceInstance._.rows).toBe(8);
            expect(gameServiceInstance._.cols).toBe(8);

            gameServiceInstance.setGameMode(gameServiceInstance.GAME_MODES.BEGINNER);
            expect(gameServiceInstance._.rows).toBe(4);
            expect(gameServiceInstance._.cols).toBe(4);

            gameServiceInstance.setGameMode(gameServiceInstance.GAME_MODES.DEMO);
            expect(gameServiceInstance._.rows).toBe(2);
            expect(gameServiceInstance._.cols).toBe(2);

        });


        it('Should return 4 tiles in a 2x2 array for DEMO Mode', function(){
            gameServiceInstance.setGameMode(gameServiceInstance.GAME_MODES.DEMO);
            var i, tileArray;

            tileArray = gameServiceInstance.getGameTiles();
            for(i=0;i<2;i++){
                expect(tileArray[i].length).toBe(2);
            }

        });

        it('Should return 16 tiles in a 4x4 array for BEGINNER Mode', function(){
            gameServiceInstance.setGameMode(gameServiceInstance.GAME_MODES.BEGINNER);
            var i, tileArray;

            tileArray = gameServiceInstance.getGameTiles();
            for(i=0;i<4;i++){
                expect(tileArray[i].length).toBe(4);
            }

        });

        it('Should return 64 tiles in a 8x8 array for INTERMEDIATE Mode', function(){
            gameServiceInstance.setGameMode(gameServiceInstance.GAME_MODES.INTERMEDIATE);
            var i, tileArray;

            tileArray = gameServiceInstance.getGameTiles();
            for(i=0;i<8;i++){
                expect(tileArray[i].length).toBe(8);
            }

        });

        it('Should return 144 tiles in a 12x12 array for INTERMEDIATE Mode', function(){
            gameServiceInstance.setGameMode(gameServiceInstance.GAME_MODES.EXPERT);
            var i, tileArray;

            tileArray = gameServiceInstance.getGameTiles();
            for(i=0;i<12;i++){
                expect(tileArray[i].length).toBe(12);
            }

        });

    });
}());