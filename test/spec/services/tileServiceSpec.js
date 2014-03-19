(function(){
    'use strict';

    describe('Service: tileService', function () {

        var tileServiceInstance;

        // load the controller's module
        beforeEach(function(){
            module('OddsOrEvens');
            inject(function(TileService){
                tileServiceInstance = TileService;
            });

        });

        it('Should have the provided number', function(){
            var tile;
            tile = tileServiceInstance.getTile(1);
            expect(tile.number).toBe(1);
        });

        it('Should have a guid', function(){
            var tile;
            tile =  tileServiceInstance.getTile(1);
            expect(tile.guid).not.toBeUndefined();
        });

        it('Should be sealed', function(){
            var tile;
            tile = tileServiceInstance.getTile(0);
            expect(Object.isSealed(tile)).toBeTruthy();
        });

        it('Should fail if a non-numeric char is passed in', function(){
            expect(function(){ tileServiceInstance.getTile('a'); }).toThrow('Param [number] must be a valid integer.');
        });

        it('Should fail if a boolean is passed in', function(){
            expect(function(){ tileServiceInstance.getTile(true); }).toThrow('Param [number] must be a valid integer.');
        });

        it('Should fail if a float is passed in', function(){
            expect(function(){ tileServiceInstance.getTile(2.342); }).toThrow('Param [number] must be a valid integer.');
        });

        it('Should allow a negative integers', function(){
            var negativeInteger, tile;
            negativeInteger = -8;
            tile = tileServiceInstance.getTile(negativeInteger);

            expect(tile.number).toBe(negativeInteger);
        });

        it('Should only allow values between -100 and 100', function(){
            var i, tile;
            for(i=-100;i<=100;i++){
                tile = tileServiceInstance.getTile(i);
                expect(tile.number).toBe(i);
            }
        });

    });
}());