angular.module('account.login', [])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/login', {
            templateUrl: 'app/account/login/login.tpl.html',
            controller: 'loginController'
        });


    }])
    .controller('loginController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

        $scope.messages = "";

        $scope.user = {
            username: null,
            password: null
        };

        authService.getUserSession()
            .then(function (user) {

                $scope.user = user;

            });

        var updateUser = function (user) {

            $scope.user = user;

        };

        authService.registerObserverCallback(updateUser);
        $scope.isAuthenticated = authService.isAuthenticated;
        $scope.isAdmin = authService.isAdmin;

        $scope.login = function () {

            if ($scope.user == null) {
                console.log('user was null');
                return;
            }
            if ($scope.user.username == null) {
                console.log('username was null');
                return;
            }
            if ($scope.user.password == null) {
                console.log('password was null');
                return;
            }

            authService.login($scope.user.username, $scope.user.password)
                .then(function (result) {

                    console.log('login');
                    console.log(result);


                    if (result.user != null) {

                        $location.path('/');
                        $scope.user = result;

                    }
                    else {

                        $scope.messages = result.error;

                    }

                });

        };

        $scope.logout = function () {

            authService.logout()
                .then(function (result) {

                    $scope.user = null;

                    $location.path('/login');

                });
        };

    }]);
