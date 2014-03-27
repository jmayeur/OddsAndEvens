(function (angular, w) {
    'use strict';

    angular.module('OddsAndEvens').factory('GameService', ['TileService', 'GuidService',
        function (tileService, guidService) {
            var gameServiceInstance;

            w.GAME_MODES = {
                BEGINNER: {
                    name: 'beginner',
                    def: {
                        rows: 4,
                        cols: 4
                    }},
                INTERMEDIATE: {
                    name: 'intermediate',
                    def: {
                        rows: 8,
                        cols: 8
                    }
                },
                EXPERT: {
                    name: 'expert',
                    def: {
                        rows: 12,
                        cols: 12
                    }
                }
            };


            gameServiceInstance = {
                //privates
                _: {
                    gameMode: null,

                    getRowTotals: function (tileArr) {
                        var r, rt, c, rowTotals, tile;

                        rowTotals = [];

                        for (r = 0; r < tileArr.length; r++) {
                            rt = 0;
                            for (c = 0; c < tileArr[r].length; c++) {
                                tile = tileArr[r][c];
                                rt += tile.number;
                            }
                            rowTotals.push({ row: r, total: rt });
                        }
                        return rowTotals;
                    },

                    getColTotals: function (tileArr) {
                        var c, ct, r, colTotals;

                        colTotals = [];

                        for (c = 0; c < tileArr[0].length; c++) {
                            ct = 0;
                            for (r = 0; r < tileArr.length; r++) {
                                ct += tileArr[r][c].number;

                            }
                            colTotals.push({ col: c, total: ct});
                        }

                        return colTotals;
                    },

                    getOddNum: function (gameMode) {
                        var oddMin, first, second;

                        oddMin = null;
                        first = Math.random();
                        second = Math.random();

                        if (first >= second) {
                            switch (gameMode) {
                                case GAME_MODES.BEGINNER:
                                    oddMin = 8;
                                    break;
                                case GAME_MODES.INTERMEDIATE:
                                    oddMin = 64;
                                    break;
                                case GAME_MODES.EXPERT:
                                    oddMin = 72;
                                    break;
                            }
                        }
                        else {
                            switch (gameMode) {
                                case GAME_MODES.BEGINNER:
                                    oddMin = 4;
                                    break;
                                case GAME_MODES.INTERMEDIATE:
                                    oddMin = 32;
                                    break;
                                case GAME_MODES.EXPERT:
                                    oddMin = 36;
                                    break;
                            }
                        }

                        if (null === oddMin) {
                            throw new Error('Must be a valid GAME_MODE');
                        }

                        return oddMin;
                    },

                    getNumbers: function (gameMode) {
                        var numbers, total, oddNum, oddCount, number, rows, cols, i;

                        rows = gameMode.def.rows;
                        cols = gameMode.def.cols;
                        numbers = [];
                        total = rows * cols;
                        oddNum = this.getOddNum(gameMode);
                        oddCount = 0;

                        for (i = 0; i < total; i++) {
                            number = Math.round(Math.random() * 100);
                            numbers.push(number);
                            if (number % 2 === 1) {
                                oddCount++;
                            }
                        }

                        while (oddCount !== oddNum) {
                            for (i = 0; i < total; i++) {
                                number = Math.round(Math.random() * 100);
                                if (oddCount > oddNum) {
                                    if (number % 2 === 0 && numbers[i] % 2 === 1) {
                                        numbers[i] = number;
                                        oddCount--;
                                    }
                                }
                                if (oddCount < oddNum && numbers[i] % 2 === 0) {
                                    if (number % 2 === 1) {
                                        numbers[i] = number;
                                        oddCount++
                                    }
                                }
                            }
                        }

                        return numbers;
                    }
                },

                gameData: null,

                setGameMode: function (gameMode) {
                    switch (gameMode) {
                        case GAME_MODES.BEGINNER:
                            this._.gameMode = GAME_MODES.BEGINNER;
                            break;
                        case GAME_MODES.INTERMEDIATE:
                            this._.gameMode = GAME_MODES.INTERMEDIATE;
                            break;
                        case GAME_MODES.EXPERT:
                            this._.gameMode = GAME_MODES.EXPERT;
                            break;
                        default:
                            throw new Error('Unknown game_mode.  Please select a valid GAME_MODES value');

                    }
                },

                getGameData: function () {
                    var tileArray = [], r, c, tile, numbers, n, rows, cols;

                    rows = this._.gameMode.def.rows;
                    cols = this._.gameMode.def.cols;
                    numbers = this._.getNumbers(this._.gameMode);
                    n = 0;

                    for (r = 0; r < rows; r++) {
                        tileArray[r] = [];
                        for (c = 0; c < cols; c++) {

                            tile = tileService.getTile(numbers[n++]);
                            tile.slot = {
                                row: r,
                                col: c
                            };

                            tileArray[r].push(tile);
                        }
                    }

                    this._.gameData = {
                        gameId: guidService.guidGenerator(),
                        tiles: tileArray,
                        rowTotals: this._.getRowTotals(tileArray),
                        colTotals: this._.getColTotals(tileArray),
                        rows: this._.gameMode.def.rows,
                        cols: this._.gameMode.def.cols
                    };

                    return this._.gameData;
                },

                moveTile: function (tileGuid, targetSlot) {

                    var merged, tileArr, tile, t, movingTile, i, ilen;
                    tileArr = this._.gameData.tiles;
                    tile = null;
                    movingTile = null;

                    merged = [];
                    merged = merged.concat.apply(merged, tileArr);

                    for (i = 0, ilen = merged.length; i < ilen; i++) {
                        t = merged[i];

                        if (t.guid === tileGuid) {
                            tile = t;
                        }
                        if (t.slot.row === targetSlot.row && t.slot.col === targetSlot.col) {
                            movingTile = t;
                        }
                    }

                    if (null !== tile && null !== movingTile && tile.guid !== movingTile.guid) {

                        movingTile.slot.row = tile.slot.row;
                        movingTile.slot.col = tile.slot.col;
                        tile.slot.row = targetSlot.row;
                        tile.slot.col = targetSlot.col;

                        this._.gameData.tiles[movingTile.slot.row][movingTile.slot.col] = movingTile;
                        this._.gameData.tiles[tile.slot.row][tile.slot.col] = tile;

                        var rowTotals = this._.getRowTotals(this._.gameData.tiles);
                        var colTotals = this._.getColTotals(this._.gameData.tiles);

                        for (var i = 0; i < rowTotals.length; i++) {
                            if (rowTotals[i] !== this._.gameData.rowTotals[i]) {
                                this._.gameData.rowTotals[i] = rowTotals[i];
                            }
                        }

                        for (var i = 0; i < colTotals.length; i++) {
                            if (colTotals[i].total !== this._.gameData.colTotals[i].total) {
                                this._.gameData.colTotals[i].total = colTotals[i].total;
                                console.log(colTotals[i]);
                            }
                        }
                    }

                }
            };

            return gameServiceInstance;
        }]);
}(angular, window));