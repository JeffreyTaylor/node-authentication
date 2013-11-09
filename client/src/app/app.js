angular.module('app',
    [
        'ngRoute',
        'home',
        'security.service',
        'security.login'
    ]);


angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({redirectTo: '/home'});

}]);

angular.module('app').run(['security', function(security) {

    // when the app is started,
    // check to see if the server still has a session
    // for user.
    security.getUserSession();

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

