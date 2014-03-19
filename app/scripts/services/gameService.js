(function(angular){
    'use strict';

    angular.module('OddsOrEvens').factory('GameService', ['TileService', function(tileService){
        var gameServiceInstance, gameModeDefinitions;



        gameModeDefinitions = {
            demo:{
                rows: 2,
                cols: 2
            },

            beginner:{
                rows: 4,
                cols: 4
            },

            intermediate:{
                rows: 8,
                cols: 8
            },

            expert:{
                rows: 12,
                cols: 12
            }
        }

        gameServiceInstance = {
            //privates
            _: {
                gameMode: null,
                rows: null,
                cols: null
            },

            GAME_MODES : {
                DEMO:'demo',
                BEGINNER: 'beginner',
                INTERMEDIATE: 'intermediate',
                EXPERT: 'expert'
            },

            setGameMode : function(gameMode){
                switch (gameMode){
                    case this.GAME_MODES.DEMO:
                        this._.gameMode = this.GAME_MODES.DEMO;
                        this._.rows = gameModeDefinitions.demo.rows;
                        this._.cols = gameModeDefinitions.demo.cols;
                        break;
                    case this.GAME_MODES.BEGINNER:
                        this._.gameMode = this.GAME_MODES.BEGINNER;
                        this._.rows = gameModeDefinitions.beginner.rows;
                        this._.cols = gameModeDefinitions.beginner.cols;
                        break;
                    case this.GAME_MODES.INTERMEDIATE:
                        this._.gameMode = this.GAME_MODES.INTERMEDIATE;
                        this._.rows = gameModeDefinitions.intermediate.rows;
                        this._.cols = gameModeDefinitions.intermediate.cols;
                        break;
                    case this.GAME_MODES.EXPERT:
                        this._.gameMode = this.GAME_MODES.EXPERT;
                        this._.rows = gameModeDefinitions.expert.rows;
                        this._.cols = gameModeDefinitions.expert.cols;
                        break;
                    default:
                        throw new Error('Unknown game_mode.  Please select a valid GAME_MODES value');

                }
            },

            getGameTiles: function(){
                var tileArray = [], r, c, tile;

                for (r = 0; r < this._.rows; r++){
                    tileArray[r] = [];
                    for(c = 0; c < this._.cols; c++){
                        tile = tileService.getTile(3);
                        tile.slot = {
                            row: r,
                            col: c
                        };

                        tileArray[r].push(tile);
                    }
                }

                return tileArray;
            }


        };

        return gameServiceInstance;
    }]);
}(angular));