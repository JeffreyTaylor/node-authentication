angular.module('app',
    [
        'ngRoute',
        'home',
        'account.login',
        'account.login.toolbar',
        'account.services.register',
        'account.services.authentication',
        'account.register'
    ]);


angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.otherwise({redirectTo: '/home'});

}]);

angular.module('app').run(['$rootScope', '$location', 'authService',
    function ($rootScope, $location, authService) {

        // to do -- move to config.
        var unprotectedRoutes = ['/login', '/register'];

        // to do, move somewhere else.
        var isProtectedRoute = function (location) {

            var isProtected = true;

            if (unprotectedRoutes.indexOf(location) > -1) {
                isProtected = false;
            }

            return isProtected;

        };

        $rootScope.$on('$routeChangeStart', function (event, next, current) {

            authService.getUserSession()
                .then(function (user) {

                    if (isProtectedRoute($location.url()) && user == null) {

                        $location.path('/login');
                    }

                });
        });

    }]);


angular.module('app').controller('AppController', ['$scope', '$location',
    function ($scope, $location) {


    }]);


angular.module('app').controller('HeaderController', ['$scope', '$location',
    function ($scope, $location) {

        $scope.home = function () {

            $location.path('/home');
        };

    }]);

