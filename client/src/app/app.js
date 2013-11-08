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
    // Get the current user when the application starts
    // (in case they are still logged in from a previous session)
    security.getUserSession();
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

