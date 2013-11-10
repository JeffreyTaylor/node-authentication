angular.module('security.login.toolbar', [])

// The loginToolbar directive is a reusable widget that can show login or logout buttons
// and information the current authenticated user
    .directive('loginToolbar', ['security', function(security) {

        var directive = {
            templateUrl: 'app/security/login/loginToolbar.tpl.html',
            restrict: 'E',
            replace: true,
            scope: true,
            link: function($scope, $element, $attrs, $controller) {

            },
            controller: 'loginController'
        };

        return directive;
    }]);