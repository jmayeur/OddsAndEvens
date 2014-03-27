(function(angular){
    'use strict';

    angular.module('OddsAndEvens').factory('TileService', ['GuidService', function(guidService){
        var tileServiceInstance;

        tileServiceInstance = {
            //privates
            _: {
                //via  http://stackoverflow.com/questions/6441787/how-do-i-check-if-a-javascript-parameter-is-a-number
                isInteger : function(n) {

                    return typeof(n) === 'number' &&
                        isFinite(n) &&
                        Math.round(n) === n;
                }
            },

            getTile : function(number){

                if (number > 100){
                    throw new Error('Param [number] must be less than or equal to 100.');
                }
                else if (number < -100){
                    throw new Error('Param [number] must be greater than or equal to -100.');
                }
                else if (!this._.isInteger(number)){
                    throw new Error('Param [number] must be a valid integer.');
                }

                var result;

                result =  {
                    number: number,
                    slot: null,
                    guid: guidService.guidGenerator()
                }


                return result;
            }
        };

        return tileServiceInstance;
    }]);
}(angular));