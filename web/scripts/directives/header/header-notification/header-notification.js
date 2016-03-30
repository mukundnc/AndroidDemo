'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .directive('headerNotification', function () {
        return {
            templateUrl: 'scripts/directives/header/header-notification/header-notification.html',
            restrict: 'E',
            replace: true,
            controller: ['$scope', 'headerNotificationService', '$http', '$state', 'CONSTANTS', function ($scope, headerNotificationService, $http, $state, CONSTANTS) {
                $scope.messages = headerNotificationService.getAllMessages();
                $scope.tasks = headerNotificationService.getAllTasks();
                $scope.alerts = headerNotificationService.getAllAlerts();
                
                function logout() {
                    var req = {
                        method: "GET",
                        url: CONSTANTS.apiURL + 'api/logout'
                    }
                    $http(req).then(function (response) {
                        $state.go('login');
                    }, function (error) {
                        $state.go('login');
                    });
                }
                $scope.logout = logout;
                
            }]
        }
    });


