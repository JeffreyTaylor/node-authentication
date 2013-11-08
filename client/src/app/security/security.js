angular.module('security.service', []);

angular.module('security.service')
    .factory('security', ['$http',
        function($http) {

        var _currentUser = null;

        var service = {

            login: function(username, password) {

                var request = $http.post('/login', {username: username, password: password});

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
