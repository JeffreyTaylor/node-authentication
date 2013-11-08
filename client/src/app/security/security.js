angular.module('security.service', []);

angular.module('security.service')
    .factory('security', ['$http', '$q',
        function ($http, $q) {

            var _currentUser = null;

            var service = {

                login: function (username, password) {

                    var dfd = $q.defer();

                    $http.post('/login', {username: username, password: password})
                        .success(function (response, status, headers, config) {

                            _currentUser = response.user;

                            dfd.resolve(response.user);

                        })
                        .error(function (response, status, headers, config) {

                            console.log('error posting to /login');
                            dfd.resolve(errors);

                        });

                    return dfd.promise;

                },

                logout: function () {

                    $http.post('/logout').then(function () {
                        _currentUser = null;
                    });

                }
            };

            return service;
        }]);
