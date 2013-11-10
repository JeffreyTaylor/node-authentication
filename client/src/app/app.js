angular.module('app',
    [
        'ngRoute',
        'home',
        'security.service',
        'security.login',
        'security.login.toolbar',
        'responseInterceptors.401'
    ]);


angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({redirectTo: '/home'});

}]);

angular.module('app').run(['$rootScope', '$location', 'security',
    function ($rootScope, $location, security) {

        // to do -- move to config.
        var unprotectedRoutes = ['/login'];

        // to do, move somewhere else.
        var isProtectedRoute = function (location) {

            var isProtected = true;

            if (unprotectedRoutes.indexOf(location) > -1) {
                isProtected = false;
            }

            return isProtected;

        };

        $rootScope.$on('$routeChangeStart', function (event, next, current) {

            security.getUserSession()
                .then(function (user) {

                    if (isProtectedRoute($location.url()) && user === null) {

                        $location.path('/login');
                    }

                });
        });

    }]);


angular.module('app').controller('AppController', ['$scope', '$location', 'security',
    function ($scope, $location, security) {


    }]);


angular.module('app').controller('HeaderController', ['$scope', '$location',
    function ($scope, $location) {

        $scope.home = function () {

            $location.path('/home');
        };

    }]);

