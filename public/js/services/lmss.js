angular.module('lmsService', [])

	// super simple service
	// each function returns a promise object 
	.factory('lms', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/lms');
			},
			create : function(Data) {
				return $http.post('/api/lms', Data);
			},
			delete : function(id) {
				return $http.delete('/api/lms/' + id);
			}
		}
	}]);