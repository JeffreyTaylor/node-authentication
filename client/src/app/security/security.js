angular.module('security.service', []);

angular.module('security.service')
    .factory('security', ['$http',
        function($http) {

        var _currentUser = null;

        var service = {

            // Attempt to authenticate a user by the given email and password
            login: function(email, password) {

                var request = $http.post('/login', {email: email, password: password});

                request.then(function (response) {

                    _currentUser = response.data.user;

                    console.log(response);

                   return response.data.user;

                });

            },

            logout: function(redirectTo) {
                $http.post('/logout').then(function() {
                    _currentUser = null;
                });
            }
        };

        return service;
    }]);
