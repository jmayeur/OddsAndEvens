(function (angular) {
    'use strict';

    angular.module('OddsAndEvens').directive('slotElement', [ function() {
        return {
            restrict: 'E',
            replace: true,


            template: '<div class="singleItemList" ng-transclude></div>',
            transclude: true,
            link: function (scope, element, attrs) {
                element.bind('drop', scope.handleDrop);
                element.bind('dragover', scope.handleDragOver);
                element.data('slot', {row: scope.tile.slot.row, col: scope.tile.slot.col });
            }
        };
    }]);

})(angular);