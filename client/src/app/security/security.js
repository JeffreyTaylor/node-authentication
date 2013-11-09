angular.module('security.service', []);

angular.module('security.service')
    .factory('security', ['$http', '$q', '$rootScope',
        function ($http, $q, $rootScope) {

            // ------------------------------------------------------- //
            // ------------------------------------------------------- //
            // ------------------------------------------------------- //

            var _currentUser = null;
            var _observerCallbacks = [];


            // ------------------------------------------------------- //
            // ------------------------------------------------------- //
            // ------------------------------------------------------- //

            var service = {

                registerObserverCallback: function(callback){

                    _observerCallbacks.push(callback);

                },

                // ------------------------------------------------------- //
                // ------------------------------------------------------- //
                // ------------------------------------------------------- //

                notifyObservers: function(){

                    angular.forEach(_observerCallbacks, function(callback){
                        callback(_currentUser);
                    });

                },

                // ------------------------------------------------------- //
                // ------------------------------------------------------- //
                // ------------------------------------------------------- //

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

                    service.notifyObservers();

                    return dfd.promise;

                },

                // ------------------------------------------------------- //
                // ------------------------------------------------------- //
                // ------------------------------------------------------- //

                logout: function () {

                    var dfd = $q.defer();

                    $http.post('/logout')
                        .success(function (response, status, headers, config) {

                            _currentUser = null;
                            dfd.resolve(_currentUser);

                        })
                        .error(function (response, status, headers, config) {

                            _currentUser = null;
                            dfd.resolve(_currentUser);

                        });

                    service.notifyObservers();

                    return dfd.promise;

                },

                // ------------------------------------------------------- //
                // ------------------------------------------------------- //
                // ------------------------------------------------------- //

                isAuthenticated: function () {

                    return _currentUser != null ? true : false;

                },

                // ------------------------------------------------------- //
                // ------------------------------------------------------- //
                // ------------------------------------------------------- //

                isAdmin: function () {

                    var user = _currentUser;

                    return user != null && user.admin ? true : false;

                },

                // ------------------------------------------------------- //
                // ------------------------------------------------------- //
                // ------------------------------------------------------- //

                getUserSession: function () {

                    var dfd = $q.defer();

                    if (service.isAuthenticated()) {

                        dfd.resolve(_currentUser);
                    }
                    else {


                        $http.get('/user')
                            .success(function (response, status, headers, config) {

                                if (response.user != null) {

                                    _currentUser = response.user;
                                }

                                dfd.resolve(_currentUser);
                            })
                            .error(function (response, status, headers, config) {

                                console.log('error posting to /user');
                                dfd.resolve(response);

                            });

                        service.notifyObservers();

                        return dfd.promise;
                    }
                }

                // ------------------------------------------------------- //
                // ------------------------------------------------------- //
                // ------------------------------------------------------- //
            };

            return service;

        }]);
