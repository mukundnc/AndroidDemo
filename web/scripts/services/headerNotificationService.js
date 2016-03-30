angular.module('sbAdminApp')
    .factory('headerNotificationService', ['$http', headerNotificationService])
    .factory('userService', ['$http', 'CONSTANTS', userService]); 

function headerNotificationService($http) {
    var _service = {
        getAllMessages: getAllMessages,
        getAllTasks: getAllTasks,
        getAllAlerts: getAllAlerts
    };

    return _service;

    function getAllMessages() {
        return [
            {
                id: 1,
                repliedBy: 'Mukundan',
                date:'Yesterday',
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend.'
            },
            {
                id: 2,
                repliedBy: 'Mukundan',
                date:'Yesterday',
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend.'
            },
            {
                id: 3,
                repliedBy: 'Mukundan',
                date:'Yesterday',
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend.'
            },
            {
                id: 4,
                repliedBy: 'Mukundan',
                date:'Yesterday',
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend.'
            }
        ];
    };

    function getAllTasks() {
        return [];
    };

    function getAllAlerts() {
        return [];
    };

}

function userService($http, CONSTANTS){

    var _service = {
        getUser: getUser
    };

    return _service;

    function getUser(){
        var req = {
            method: "GET",
            url: CONSTANTS.apiURL + 'api/user'
        };
        return $http(req).then(function (response) {
            return response;
        }, function (error) {
            return error;
        });
    }
}