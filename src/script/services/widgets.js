app.service('Widgets', ['$filter', function($filter){

    //Widgets
    this.widgets = [
        {   id:             1,
            type:           'clock',
            list_id:        2,
            list_position:  1
        },
        {   id:             2,
            type:           'calendar',
            list_id:        2,
            list_position:  2
        },
        {   id:             3,
            type:           'topsites',
            list_id:        2,
            list_position:  3
        },
        {   id:             4,
            type:           'bookmark',
            list_id:        1,
            list_position:  1
        }
    ];
    //TODO: load bookmark-widgets dynamically

    this.getByList = function(list_id){

        var filtered_list = $filter('filter')(this.widgets, {list_id: list_id});
        filtered_list = $filter('orderBy')(filtered_list, 'list_position');

        return filtered_list;
    };
}]);