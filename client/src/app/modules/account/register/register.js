angular.module('account.register', ['account.services.register'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/register', {
            templateUrl: 'app/modules/account/register/register.tpl.html',
            controller: 'registerController'
        });
    }])
    .controller('registerController', ['$scope', '$location', 'registerService',
        function ($scope, $location, registerService) {

            $scope.registerComplete = false;

            $scope.register = function () {

                if ($scope.registerForm.$invalid) {
                    console.log('invalid');
                    return;
                }

                registerService.register($scope.newUser)
                    .then(function (result) {

                        $scope.messages = result.messages;

                        if (result && result.user) {

                            $scope.newUser = {
                                username: null,
                                email: null,
                                password: null

                            };

                            $scope.registerForm.$setPristine();

                            $scope.messages = ['register successful!'];

                            $scope.registerComplete = true;

                        }

                    });

            };


        }]);
