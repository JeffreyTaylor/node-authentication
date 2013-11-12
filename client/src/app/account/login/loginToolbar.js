angular.module('account.login.toolbar', [])

    .directive('loginToolbar', ['authService', function(authService) {

        var directive = {
            templateUrl: 'app/account/login/loginToolbar.tpl.html',
            restrict: 'E',
            replace: true,
            scope: true,
            link: function($scope, $element, $attrs, $controller) {

            },
            controller: 'loginController'
        };

        return directive;
    }]);