app.service('Bookmarks', [function(){

    var nodes = [];

    var init = function(){
        chrome.bookmarks.getTree(function(tree){
            nodeMapper(tree);

//            console.log(nodes);
        });
    };

    var nodeMapper = function(node){

        node.forEach(function(node){

            if(node.id > 0){
                nodes.push(node);
            }

            if(typeof node.children !== 'undefined' && node.children.length > 0){
                nodeMapper(node.children);
            }
        });
    };

    init();
}]);