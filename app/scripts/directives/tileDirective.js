(function (angular) {
    'use strict';

    angular.module('OddsAndEvens').directive('tileElement', [ function () {
        return {
            restrict: 'E',
            replace: true,

            template: '<div class="tile" draggable="true" ng-transclude ng-class="{true:\'tile_odd\', false:\'tile_even\'}[tile.number % 2 == 1]"><div class="number">{{tile.number}}</div></div>',
            transclude: true,
            link: function (scope, element, attrs) {

                //element.css('top', (52 * scope.tile.slot.row) + 'px');
                //element.css('left', (52 * scope.tile.slot.col) + 'px');

                element.bind('dragstart', scope.handleDragStart);
                element.bind('dragend', scope.handleDragEnd);
                element.attr('id', scope.tile.guid);

            }
        };
    }]);

})(angular);