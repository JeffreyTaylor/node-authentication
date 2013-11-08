angular.module('app',
    [
        'ngRoute',
        'home',
        'security.login'
    ]);


angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({redirectTo: '/home'});
}]);


angular.module('app').controller('AppController', ['$scope',
    function($scope) {

}]);


angular.module('app').controller('HeaderController', ['$scope', '$location',
    function ($scope, $location) {

        $scope.home = function () {

            $location.path('/home');
        };

    }]);

