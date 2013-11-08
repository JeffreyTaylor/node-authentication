angular.module('security.login', ['security.service']);


angular.module('security.login')
    .controller('loginController', ['$scope', '$location', 'security', function ($scope, $location, security) {

        $scope.user = {
            username: null,
            password: null
        };

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
