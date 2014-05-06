app.directive('myBookmarkWidget', function(){
    return{
        replace:        true,
        templateUrl:    'templates/widgets/bookmark.html',
        controller:     function($scope, Bookmarks){

            console.log('test');
            Bookmarks.test();
        }
    };
});