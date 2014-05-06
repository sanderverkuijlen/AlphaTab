app.service('Bookmarks', [function(){

    console.log('Bookmarks');

    this.test = function(){

        console.log('Bookmarks.tree');

        chrome.bookmarks.getTree(function(tree){

            console.log(tree);
        });
    };
}]);