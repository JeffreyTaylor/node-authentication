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
                            dfd.resolve(response);

                        });

                    return dfd.promise;

                },

                logout: function () {

                    var dfd = $q.defer();

                    $http.post('/logout')
                        .success(function (response, status, headers, config) {

                            console.log('logout success');
                            _currentUser = null;
                            console.log('current user is ' + _currentUser);

                            dfd.resolve(_currentUser);

                        })
                        .error(function (response, status, headers, config) {

                            console.log('failed');
                            _currentUser = null;
                            dfd.resolve(_currentUser);

                        });

                    return dfd.promise;

                },

                isAuthenticated: function () {
                    return _currentUser != null ? true : false;
                },

                isAdmin: function () {

                    var user = _currentUser;

                    return user != null && user.admin ? true : false;

                },

                getUserSession: function () {


                    if (service.isAuthenticated()) {

                        return _currentUser;
                    }
                    else {

                        var dfd = $q.defer();

                        $http.get('/user')
                            .success(function (response, status, headers, config) {

                                console.log('current user');

                                console.log(response);
                                console.log(status);
                                console.log(config);

                                if (response.user != null) {

                                    _currentUser = response.user;

                                }

                                dfd.resolve(_currentUser);
                            })
                            .error(function (response, status, headers, config) {

                                console.log('error posting to /current-user');
                                dfd.resolve(response);

                            });
                        return dfd.promise;
                    }
                }
            };

            return service;
        }]);
