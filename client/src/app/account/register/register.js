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

                if ($scope.registerForm.$invalid) {
                    console.log('invalid');
                    return;
                }

                registerService.register($scope.newUser)
                    .then(function (result) {

                        console.log(result);
                        $scope.messages = result.messages;

                        if (result && result.user) {

                            console.log(result);
                            $scope.messages = ['register successful!'];


                        }

                    });

            };


        }])
    .directive('ensureUnique', ['$http', '$timeout', function ($http, $timeout) {

        var query = null;

        return {
            require: 'ngModel',
            link: function (scope, element, attrs, controller) {

                var onActionExecuted = function () {
                    $timeout(function () {
                        if (element.val() != null && element.val() != "") {
                            executeQuery(element.val());
                        }
                        else {
                            query = null;
                            console.log('setting to true');
                            controller.$setValidity('unique', true);
                        }
                    }, 250);
                };

                element.bind('keyup', onActionExecuted);
                element.bind('blur', onActionExecuted);

                var executeQuery = function (value) {

                    if (query == null) {

                        if (element.val() != null && element.val() != "") {
                           query = $timeout(function () {
                               $http({
                                   method: 'POST',
                                   url: '/api/check/' + attrs.name,
                                   data: {'value': value}
                               }).success(function (data, status, headers, cfg) {
                                       if (element.val() != null && element.val() != "") {
                                           controller.$setValidity('unique', !data.exists);
                                       }
                                       else {
                                           controller.$setValidity('unique', true);
                                       }
                                       query = null;

                                   }).error(function (data, status, headers, cfg) {

                                       query = null;

                                   });
                            }, 100);
                        }
                    }
                }
            }
        }
    }]);
