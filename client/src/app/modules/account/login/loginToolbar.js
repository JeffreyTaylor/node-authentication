angular.module('account.login.toolbar', [])

    .directive('loginToolbar', function() {

        var directive = {
            templateUrl: 'app/modules/account/login/loginToolbar.tpl.html',
            restrict: 'E',
            replace: true,
            scope: true,
            link: function($scope, $element, $attrs, $controller) {

            },
            controller: ['$scope', '$location', 'authService', function ($scope, $location, authService) {

                authService.getUserSession()
                    .then(function (user) {

                        if (user == null) {
                            $scope.user = {
                                username: null,
                                password: null
                            };
                        }
                        else {
                            $scope.user = user;
                        }

                    });

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
            }]
        };

        return directive;
    });