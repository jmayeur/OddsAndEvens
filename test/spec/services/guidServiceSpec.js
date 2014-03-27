(function(){
    'use strict';

    describe('Service: GuidService', function () {

        var guidServiceInstance,
            guidRegEx;

        //via http://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
        guidRegEx = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        // load the controller's module
        beforeEach(function(){
            module('OddsAndEvens');
            inject(function(GuidService){
                guidServiceInstance = GuidService;
            });
        });

        it('Should create a valid pseudo guid when guidGenerator is called', function(){

            var guid, regMatch;

            guid = guidServiceInstance.guidGenerator();
            regMatch = guidRegEx.test(guid);
            expect(guid.length).toBe(36);
            expect(regMatch).toBeTruthy();
        });

        it('Should return unigue guids when guidGenerator is called', function(){
            var i, guid, lastGuid = null;

            for (i=0;i<100;i++){
                guid = guidServiceInstance.guidGenerator();
                expect(guidRegEx.test(guid)).toBeTruthy();
                expect(guid).not.toEqual(lastGuid);
                lastGuid = guid;
            }
        });

    });
}());

/*
*
*

bad
 3	5	66	6
 19	7	3	36
 66	2	4	-7
 34	99	-23	-4

good
 3	6	66	5
 19	7	2	36
 66	4	3	-7
 34	99	-23	-4



 bad
 3	90	49	53	-6	-5	34	17
 11	-5	8	-6	34	-23	-1	0
 -5	23	22	0	-7	65	-21	1
 -22	41	23	-4	-23	19	87	65
 4	-7	-3	92	1	87	-3	19
 5	15	12	87	7	-5	3	12
 2	2	-3	-44	46	87	18	64
 5	44	0	-3	-76	-9	87	10


 good
 3	90	49	53	-6	-5	-9	17
 11	-5	8	-6	34	-23	-1	0
 -5	23	22	0	-7	65	-21	1
 -22	41	23	-4	-23	19	87	65
 4	-7	-3	92	1	87	-3	19
 5	15	12	87	7	-5	3	12
 -3	2	-3	-44	46	87	18	64
 5	44	0	2	-76	34	87	10

* */