(function (angular) {
    'use strict';

    angular.module('OddsAndEvens').directive('boardElement', [ function() {
        return {
            restrict: 'E',
            replace: true,

            template: ' <div id="tile-list" class="unselectable" ng-transclude style="float:left;"></div>',
            transclude: true,
            link: function (scope, element, attrs) {
                //element.bind('drop', scope.handleDrop);
                //element.bind('dragover', scope.handleDragOver);
                //element.attr('id', scope.tile.guid);

                element.css('height', ((52*scope.gameData.rows)+2) + 'px');
                element.css('width', ((52*scope.gameData.cols)+2) + 'px');


            }
        };
    }]);

})(angular);