angular.module('lmsController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','lms', function($scope, $http, lms) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all data
		// use the service to get all 
		$scope.getdata = function() {
		lms.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});
		}
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createid = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				lms.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteid = function(id) {
			$scope.loading = true;

			lms.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
	}]);