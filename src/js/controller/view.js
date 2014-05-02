app.controller('ViewCtrl', ['$scope', function($scope){

    $scope.theme = 1;
    $scope.theme = [
        {   id:         1,
            name:       'Blue strokes',
            class:      'bluestrokes'
        }
    ];

    $scope.layout = 1;
    $scope.layouts = [
        {   id:         1,
            name:       'Default',
            template:   'default'
        }
    ];

    $scope.columns = [
        {   id:     1,
            type:   'normal'
        },
        {   id:     2,
            type:   'wide'
        },
        {   id:     3,
            type:   'normal'
        },
        {   id:     4,
            type:   'normal'
        },
        {   id:     5,
            type:   'normal'
        }
    ];

    $scope.widgets = [
        {   id:         1,
            column_id:  1,
            type:       'bookmarks'
        },
        {   id:         2,
            column_id:  1,
            type:       'bookmarks'
        },
        {   id:         3,
            column_id:  2,
            type:       'clock'
        },
        {   id:         4,
            column_id:  2,
            type:       'calendar'
        },
        {   id:         5,
            column_id:  2,
            type:       'topsites'
        },
        {   id:         6,
            column_id:  3,
            type:       'bookmarks'
        },
        {   id:         7,
            column_id:  4,
            type:       'bookmarks'
        },
        {   id:         8,
            column_id:  5,
            type:       'bookmarks'
        },
        {   id:         9,
            column_id:  5,
            type:       'bookmarks'
        }
    ];

}]);