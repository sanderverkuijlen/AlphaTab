app.directive('myList', function(){
    return{
        scope:{
            column_id: '@myList'
        },
        templateUrl:   'templates/list.html'
    };
});