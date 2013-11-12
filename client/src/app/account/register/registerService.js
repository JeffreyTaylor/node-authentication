angular.module('account.services.register', [])

    .factory('registerService', ['$http', '$q',
        function ($http, $q) {


            var service = {

                register: function (newUser) {

                    var dfd = $q.defer();

                    $http.post('/register', {
                        username: newUser.username,
                        email: newUser.email,
                        password: newUser.password

                    })
                        .then(function (response, status, headers, config) {

                            dfd.resolve(response);

                        });

                    return dfd.promise;

                }



                // ------------------------------------------------------- //
                // ------------------------------------------------------- //
                // ------------------------------------------------------- //
            };

            return service;

        }]);
