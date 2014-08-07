app.directive('myWidgetList', function(){
	return {
		restrict: 'A',
		replace: true,
		scope: {
			id: "@id",
			items: "@items",
			sortableOptions: "@sortableOptions",
			horizontal: "@horizontal"
		},
		templateUrl: 'templates/widget_list.html',
		controller: [
			'$scope',
			function($scope){

				if(typeof $scope.horizontal === 'undefined'){
					$scope.horizontal = true;
				}

				console.log($scope.items);
				console.log($scope.sortableOptions);
				console.log($scope.horizontal);
			}
		]
	};
});