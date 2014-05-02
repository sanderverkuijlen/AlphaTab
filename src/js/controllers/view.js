app.controller('ViewCtrl', ['$scope', '$filter', function($scope, $filter){

    //Theme select
    $scope.theme_id = 1;
    $scope.themes = [
        {   id:         1,
            name:       'Blue strokes',
            class:      'bluestrokes'
        }
    ];
    $scope.theme = function(){
        return $filter('getById')($scope.themes, $scope.theme_id);
    };

    //Column-layout
    $scope.layout_id = 1;
    $scope.layouts = [
        {   id:         1,
            name:       'Default',
            template:   'default'
        }
    ];
    $scope.layout = function(){
        return $filter('getById')($scope.layouts, $scope.layout_id);
    };

    //Widgets
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