angular.module('common.directives.ensureUnique', [])

.directive('ensureUnique', ['$http', '$timeout', function ($http, $timeout) {

    var timeoutId = null;

    return {
        require: 'ngModel',
        link: function ($scope, $element, $attrs, $controller) {

            var onActionExecuted = function () {
                $timeout.cancel(timeoutId);

                timeoutId = $timeout(function () {
                    if ($element.val() != null && $element.val() != "") {
                        executeQuery($element.val());
                    }
                    else {
                        $controller.$setValidity('unique', true);
                    }
                }, 500);

            };

            $element.on('keyup blur', onActionExecuted);

            var executeQuery = function (value) {

                $http({
                    method: 'POST',
                    url: '/api/check/' + $attrs.name,
                    data: {'value': value}

                }).success(function (data, status, headers, cfg) {

                        $controller.$setValidity('unique', !data.exists);

                    });
            };

        }
    }
}]);