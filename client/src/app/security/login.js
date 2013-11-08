angular.module('security.login', ['security.service']);


angular.module('security.login')
    .controller('loginController', ['$scope', 'security', function($scope, security) {


        $scope.user = {
            username: null,
            password: null
        };


        $scope.login = function () {

            security.login($scope.user.username, $scope.user.password)
                .then(function (result) {

                    console.log('login');
                    console.log(result);

                });

        };


    }]);
