app.directive('myList', function(){
    return{
        restrict:       'A',
        scope:          {
            list_id:        "@myList"
        },
        templateUrl:    'templates/list.html',
        controller:     ['$scope', 'Widgets', function($scope, Widgets){
            $scope.widgets = Widgets.getByList($scope.list_id);
        }]
    };
});