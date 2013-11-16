angular.module('account.register', ['account.services.register'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/register', {
            templateUrl: 'app/account/register/register.tpl.html',
            controller: 'registerController',
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

                console.log($scope.newUser);

                registerService.register($scope.newUser)
                    .then(function (result) {

                        console.log(result);
                        $scope.messages = result.messages;

                        if (result && result.user) {

                            console.log(result);
                            //$location.path('/');

                        }

                    });

            };


        }])
    .directive('ensureUnique', ['$http', '$timeout', function ($http, $timeout) {

        var queryInProcess = false;

        return {
            require: 'ngModel',
            link: function (scope, ele, attrs, controller) {

                scope.$watch(attrs.ngModel, function (value) {
                    if (value != null && value != "") {
                        if (queryInProcess == false) {
                            $timeout(function () {
                                $http({
                                    method: 'POST',
                                    url: '/api/check/' + attrs.ensureUnique,
                                    data: {'value': value}
                                }).success(function (data, status, headers, cfg) {

                                        controller.$setValidity('unique', !data.userExists);
                                        queryInProcess = false;

                                    }).error(function (data, status, headers, cfg) {

                                        queryInProcess = false;

                                    });
                            }, 250);
                        }
                    }
                });
            }
        }
    }]);
