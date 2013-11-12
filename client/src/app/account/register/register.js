angular.module('account.register', ['account.services.register'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/register', {
            templateUrl:'app/account/register/register.tpl.html',
            controller:'registerController',
            resolve: {
                user: ['authService', function (authService) {
                    authService.getUserSession()
                        .then(function (user) {

                            return user;

                        });
                }]
            }
        });


    }])
    .controller('registerController', ['$scope', '$location', 'registerService', 'user',
        function ($scope, $location, registerService, user) {

            if (user != null) {

                $scope.userLoggedIn = true;

            }

            $scope.newUser = {
                username: null,
                email: null,
                password: null

            }

            $scope.register = function () {

                registerService.register($scope.newUser)
                    .then(function (result) {

                        if (result) {

                            $location.path('/');
                            $scope.user = result;

                        }

                    });

            };



    }]);
