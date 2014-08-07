app.controller('ViewCtrl', ['$scope', '$filter', function($scope, $filter){

	$scope.sortableOptions = {
		test: 'test'
	};

	$scope.widgets = [
		[
			{widget: '1'},
			{widget: '2'},
			{widget: '3'}
		],
		[
			{widget: '1'},
			[
				{widget: '2'},
				{widget: '3'}
			],
			{widget: '4'},
			[
				{widget: '5'},
				{widget: '6'}
			]
		],
		[
			{widget: '1'},
			{widget: '2'},
			{widget: '3'}
		]
	];

    $scope.themes = {
        current_id: 1,
        current:        function(){
            return $filter('filter')($scope.themes.all, {id: $scope.themes.current_id})[0];
        },
        all:        [
            {   id:         1,
                name:       'Blue strokes',
                class:      'bluestrokes'
            }
        ]
    };

    //Column-layout
//    $scope.layouts = {
//        current_id:     1,
//        current:        function(){
//            return $filter('filter')($scope.layouts.all, {id: $scope.layouts.current_id})[0];
//        },
//        all:            [
//            {   id:         1,
//                name:       'Default',
//                template:   'default',
//                class:      'default',
//                lists:      [
//                    {   id:         1,
//                        widgets:    [4,5]
//                    },
//                    {   id:         2,
//                        widgets:    [1,2,3]
//                    },
//                    {   id:         3,
//                        widgets:    [6]
//                    },
//                    {   id:         4,
//                        widgets:    [7]
//                    },
//                    {   id:         5,
//                        widgets:    [8,9]
//                    }
//                ]
//            }
//    ]};
}]);