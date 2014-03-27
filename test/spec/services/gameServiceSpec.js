(function(){
    'use strict';

    describe('Service: GameService', function () {

        var gameServiceInstance;


        // load the controller's module
        beforeEach(function(){
            module('OddsAndEvens');
            inject(function(GameService){
                gameServiceInstance = GameService;
            });
        });

        it('Should set the GameMode when setGameMode is called', function(){

            gameServiceInstance.setGameMode(GAME_MODES.EXPERT);
            expect(gameServiceInstance._.gameMode).toBe(GAME_MODES.EXPERT);
            gameServiceInstance.setGameMode(GAME_MODES.BEGINNER);
            expect(gameServiceInstance._.gameMode).toBe(GAME_MODES.BEGINNER);
        });

        it('Should set the correct rows and cols when setGameMode is called', function(){

            gameServiceInstance.setGameMode(GAME_MODES.EXPERT);
            expect(gameServiceInstance._.gameMode.def.rows).toBe(12);
            expect(gameServiceInstance._.gameMode.def.cols).toBe(12);

            gameServiceInstance.setGameMode(GAME_MODES.INTERMEDIATE);
            expect(gameServiceInstance._.gameMode.def.rows).toBe(8);
            expect(gameServiceInstance._.gameMode.def.cols).toBe(8);

            gameServiceInstance.setGameMode(GAME_MODES.BEGINNER);
            expect(gameServiceInstance._.gameMode.def.rows).toBe(4);
            expect(gameServiceInstance._.gameMode.def.cols).toBe(4);

        });

        it('Should return 16 tiles in a 4x4 array for BEGINNER Mode', function(){
            gameServiceInstance.setGameMode(GAME_MODES.BEGINNER);
            var i, tileArray;

            tileArray = gameServiceInstance.getGameData().tiles;
            for(i=0;i<4;i++){
                expect(tileArray[i].length).toBe(4);
            }

        });

        it('Should return 64 tiles in a 8x8 array for INTERMEDIATE Mode', function(){
            gameServiceInstance.setGameMode(GAME_MODES.INTERMEDIATE);
            var i, tileArray;

            tileArray = gameServiceInstance.getGameData().tiles;
            for(i=0;i<8;i++){
                expect(tileArray[i].length).toBe(8);
            }

        });

        it('Should return 144 tiles in a 12x12 array for INTERMEDIATE Mode', function(){
            gameServiceInstance.setGameMode(GAME_MODES.EXPERT);
            var i, tileArray;

            tileArray = gameServiceInstance.getGameData().tiles;
            for(i=0;i<12;i++){
                expect(tileArray[i].length).toBe(12);
            }

        });

        it('Should throw and exception when called with an unknown GAME_MODE', function(){
            var i;

            expect(function(){ gameServiceInstance._.getOddNum('BAG OF DOUGHNUTS'); }).toThrow('Must be a valid GAME_MODE');
        });

        it('Should return 4 or 8 when called with GAME_MODE.BEGINNER', function(){
            var i, res;

            for (i=0;i<=24;i++){
                res = gameServiceInstance._.getOddNum(GAME_MODES.BEGINNER);
                expect(res === 4 || res === 8).toBeTruthy();
            }
        });

        it('Should return 64 or 32 when called with GAME_MODE.INTERMEDIATE', function(){
            var i, res;

            for (i=0;i<=24;i++){
                res = gameServiceInstance._.getOddNum(GAME_MODES.INTERMEDIATE);
                expect(res === 64 || res === 32).toBeTruthy();
            }
        });

        it('Should return 72 or 36 when called with GAME_MODE.EXPERT', function(){
            var i, res;

            for (i=0;i<=24;i++){
                res = gameServiceInstance._.getOddNum(GAME_MODES.EXPERT);
                expect(res === 72 || res === 36).toBeTruthy();
            }
        });

    });
}());