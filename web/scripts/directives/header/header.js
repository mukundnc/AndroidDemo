'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('header',function(){
		return {
	        templateUrl:'scripts/directives/header/header.html',
	        restrict: 'E',
	        replace: true,
	        controller:['$scope', 'userService', '$state', function($scope, userService, $state){
	        	userService.getUser().then(function(response){
	        		if(response.status!==200){
	        			$state.go('login');
	        			return;
	        		}
            
	        		$scope.user = response.data.result.firstname +' '+response.data.result.lastname;
	        	})
	        }]
    	}
	});


