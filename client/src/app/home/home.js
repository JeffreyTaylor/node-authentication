angular.module('home', [], ['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/home', {
        templateUrl: 'app/home/home.tpl.html',
        controller: 'homeController'
    });

}]);

angular.module('home').controller('homeController',
    ['$scope',
        function ($scope) {

        }]);