angular.module('account.login', [])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/login', {
            templateUrl: 'app/account/login/login.tpl.html',
            controller: 'loginController',
            resolve: {
                user: ['authService', function (authService) {
                    authService.getUserSession()
                        .then(function (user) {

                            if (user == null) {
                                user = {
                                    username: null,
                                    password: null
                                };
                            }
                            return user;
                        });
                }]}
        });

    }])
    .controller('loginController', ['$scope', '$location', 'authService', 'user', function ($scope, $location, authService, user) {

        $scope.user = user;

        var updateUser = function (user) {

            $scope.user = user;

        };

        authService.registerObserverCallback(updateUser);

        $scope.isAuthenticated = authService.isAuthenticated;
        $scope.isAdmin = authService.isAdmin;

        $scope.login = function () {

            $scope.messages = [];

            validateRequest();

            if (!$scope.messages.length > 0) {

                authService.login($scope.user.username, $scope.user.password)
                    .then(function (result) {

                        console.log('login');
                        console.log(result);


                        if (result != null && result.user != null) {

                            $location.path('/');
                            $scope.user = result;

                        }
                        else {

                            // server returns very verbose messages
                            // about what was invalid about login request.
                            // opting here to show generic message to user.
                            $scope.messages = ['invalid username / password.'];

                        }

                    });
            }

        };

        var validateRequest = function () {

            if ($scope.user.username == null || $scope.user.username == "") {
                $scope.messages.push('username cannot be blank');
            }
            if ($scope.user.password == null || $scope.user.password == "") {
                $scope.messages.push('password cannot be blank');
            }

        };

        $scope.logout = function () {

            authService.logout()
                .then(function (result) {

                    $scope.user = null;

                    $location.path('/login');

                });
        };

    }]);
