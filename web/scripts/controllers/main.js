'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('MainCtrl', function ($scope, $position) {
    })
    .controller('LoginCtrl', ['$scope', 'CONSTANTS', '$http', '$state', function ($scope, CONSTANTS, $http, $state) {
        $scope.userLogin = userLogin;
        $scope.githubURL = CONSTANTS.apiURL + 'auth/github';

        function userLogin() {
            var req = {
                method: "POST",
                url: CONSTANTS.apiURL + 'auth/login',
                data: {
                    username: $scope.username,
                    password: $scope.password
                }
            }
            $http(req).then(function (response) {
                $state.go('dashboard');
            }, function (error) {
                $scope.message = error.data;
            });
        }
        
    }]);
