(function (angular, w) {
    'use strict';

    angular.module('OddsAndEvens')
        .controller('MainCtrl', ['$scope', 'GameService',
            function ($scope, gameService) {

                gameService.setGameMode(w.GAME_MODES.EXPERT);

                $scope.gameData = gameService.getGameData();

                $scope.inDrag = false;

                $scope.handleDragStart = function(e){
                    this.style.opacity = '0.75';
                    $scope.inDrag = true;
                    e.dataTransfer.setData('text/plain', this.id);
                };

                $scope.handleDragEnd = function(e){
                    this.style.opacity = '1.0';
                    $scope.inDrag = false;
                };

                $scope.handleDrop = function(e){
                    e.preventDefault();
                    e.stopPropagation();

                    var tileGuid = e.dataTransfer.getData('text/plain');
                    if (null !== tileGuid  && tileGuid !== '' && null !== e.toElement){

                        try {
                            var el = angular.element(e.toElement.parentNode.parentNode);
                            var slotLocation = el.data('slot');
                            if (null !== slotLocation) {
                                gameService.moveTile(tileGuid, slotLocation);
                                $scope.$apply();
                            }
                        } catch(e) {
                            console.log(e);
                        }
                    }
                };

                $scope.handleDragOver = function (e) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
                    return false;
                };

            }]);
}(angular, window));