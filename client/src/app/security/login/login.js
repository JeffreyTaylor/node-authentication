angular.module('security.login', [])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/login', {
            templateUrl:'app/security/login/login.tpl.html',
            controller:'loginController'
        });


    }])
    .controller('loginController', ['$scope', '$location', 'security', function ($scope, $location, security) {

        $scope.user = {
            username: null,
            password: null
        };

        security.getUserSession()
            .then(function (user) {

                $scope.user = user;

            });

        $scope.isAuthenticated = security.isAuthenticated;
        $scope.isAdmin = security.isAdmin;

        var updateUser = function (user) {

                $scope.user = user;

        };
        security.registerObserverCallback(updateUser);

        $scope.login = function () {

            if ($scope.user !== null) {

                security.login($scope.user.username, $scope.user.password)
                .then(function (result) {

                    if (result) {

                        $location.path('/');
                        $scope.user = result;

                    }

                });
            }
            else {

                // show validation messages here

            }
        };

        $scope.logout = function () {

            security.logout()
                .then(function (result) {

                    $scope.user = null;

                    $location.path('/login');

                });
        };

    }]);
