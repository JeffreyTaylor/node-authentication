angular.module('security.login', ['security.service']);


angular.module('security.login')
    .controller('loginController', ['$scope', '$location', 'security', function ($scope, $location, security) {

        $scope.user = {};

        $scope.isAuthenticated = security.isAuthenticated;

        $scope.isAdmin = security.isAdmin();

        var updateUser = function (user) {

            $scope.user = user;

        };

        security.registerObserverCallback(updateUser);

        $scope.login = function () {

            security.login($scope.user.username, $scope.user.password)
                .then(function (result) {

                    console.log(result);

                });
        };

        $scope.logout = function () {

            console.log('logging out');

            security.logout()
                .then(function (result) {

                    console.log(result);

                    $location.path('/');

                });
        };

    }]);
