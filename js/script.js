
var widgets = loadWidgets();

$(document).ready(function(){

	//Create columns and widgets
	createColumns();
	createWidgets();
});

function createColumns(){

	switch(settings['column_layout']){

		case 4:
			$('#column_area').html(
				'<div class="column" data-col_nr="0">&nbsp;</div>'+
				'<div class="column" data-col_nr="1">&nbsp;</div>'+
				'<div class="column" data-col_nr="2">&nbsp;</div>'+
				'<div class="column" data-col_nr="3">&nbsp;</div>'
			);
			break;

		case 3:
			$('#column_area').html(
				'<div class="column semiwide" data-col_nr="0">&nbsp;</div>'+
				'<div class="column semiwide" data-col_nr="1">&nbsp;</div>'+
				'<div class="column semiwide" data-col_nr="2">&nbsp;</div>'
			);
			break;

		case 2:
			$('#column_area').html(
				'<div class="column wide" data-col_nr="0">&nbsp;</div>'+
				'<div class="column wide" data-col_nr="1">&nbsp;</div>'
			);
			break;

		case 'left_large':
			$('#column_area').html(
				'<div class="column wide" data-col_nr="0">&nbsp;</div>'+
				'<div class="column" data-col_nr="1">&nbsp;</div>'+
				'<div class="column" data-col_nr="2">&nbsp;</div>'
			);
			break;

		case 'middle_large':
			$('#column_area').html(
				'<div class="column" data-col_nr="0">&nbsp;</div>'+
				'<div class="column wide" data-col_nr="1">&nbsp;</div>'+
				'<div class="column" data-col_nr="2">&nbsp;</div>'
			);
			break;

		case 'right_large':
			$('#column_area').html(
				'<div class="column" data-col_nr="0">&nbsp;</div>'+
				'<div class="column" data-col_nr="1">&nbsp;</div>'+
				'<div class="column wide" data-col_nr="2">&nbsp;</div>'
			);
			break;
	}
}

function createWidgets(){

	//Folders
	chrome.bookmarks.getTree(function(tree){
		tree.forEach(function(node){
			node.children.forEach(function(container){
				container.children.forEach(function(bookmark){

					if(typeof bookmark.url === 'undefined'){

						createWidget('folder', bookmark);
					}
				});
			});
		});
	});

	//kickstart
	createWidget('kickstart', {id: -1});

	//Apps
	createWidget('apps')

	//Gmail

	//RSS

}

function createWidget(type, info){

	var widget_defaults = {};
	var widget			= {};
	var widget_html		= '';

	switch(type){
		case 'kickstart':
			//Get settings for the kickstart widget
			widget_defaults = {
				id:			'kickstart',
				open:		true,
				col_nr:		0,
				col_pos:	0,
				title:		'Kickstart'
			};
			widget = $.extend(widget_defaults, getWidget(widget_defaults.id));
			saveWidget(widget);

			//Create a kickstart widget
			widget_html =	'<div class="widget kickstart" data-widgetid="'+widget.id+'">'+
								'<a href="javascript:;" class="" onclick="folderClick(event,this);">'+
									'<h2>'+widget.title+'</h2>'+
								'</a>'+
								'<ul class="list" '+(!widget.open ? 'style="display:none;"' : '')+'></ul>'+
							'</div>'

			addWidgetToColumn(widget.col_nr, widget.col_pos, widget_html);

			//Add all bookmarks in this folder (recursively) to the list in the folder widget
			forBookmarksInFolder('1', function(widget, bookmark){

				$('.widget[data-widgetid='+widget.id+']').show().find('ul.list').append(
					'<li><a href="'+bookmark.url+'"><i><img src="chrome://favicon/'+bookmark.url+'"></i><b>'+bookmark.title+'</b></a></li>'
				);

			}, widget, false);
			break;

		case 'folder':
			//Get settings for the kickstart widget
			widget_defaults = {
				id:			'folder_'+info.id,
				open:		true,
				col_nr:		0,
				col_pos:	0
				//Folder titles are stored in the bookmarks themselves
			};
			widget = $.extend(widget_defaults, getWidget(widget_defaults.id));
			saveWidget(widget);

			//Create a folder widget
			widget_html =	'<div class="widget folder" data-widgetid="'+widget.id+'">'+
								'<a href="javascript:;" class="" onclick="folderClick(event,this);">'+
									'<h2>'+info.title+'</h2>'+
								'</a>'+
								'<ul class="list" '+(!widget.open ? 'style="display:none;"' : '')+'></ul>'+
							'</div>';

			addWidgetToColumn(widget.col_nr, widget.col_pos, widget_html);

			//Add all bookmarks in this folder (recursively) to the list in the folder widget
			forBookmarksInFolder(info.id, function(widget, bookmark){

				$('.widget[data-widgetid='+widget.id+']').show().find('ul.list').append(
					'<li><a href="'+bookmark.url+'"><i><img src="chrome://favicon/'+bookmark.url+'"></i><b>'+bookmark.title+'</b></a></li>'
				);

			}, widget, true);
			break;

		case 'apps':
			//Get settings for the kickstart widget
			widget_defaults = {
				id:			'apps',
				open:		true,
				col_nr:		0,
				col_pos:	0,
				title:		'Apps'
			};
			widget = $.extend(widget_defaults, getWidget(widget_defaults.id));
			saveWidget(widget);

			//Create an apps widget
			widget_html =	'<div class="widget apps" data-widgetid="'+widget.id+'">'+
								'<a href="javascript:;" class="" onclick="folderClick(event,this);">'+
									'<h2>'+widget.title+'</h2>'+
								'</a>'+
								'<ul class="list" '+(!widget.open ? 'style="display:none;"' : '')+'>'+
									'<li><a href="https://chrome.google.com/webstore"><i><img src="chrome://extension-icon/ahfgeienlihckogmohjhadlkjgocpleb/128/0"></i><b>Chrome Web Store</b></a></li>'+
								'</ul>'+
							'</div>'

			addWidgetToColumn(widget.col_nr, widget.col_pos, widget_html);

			chrome.management.getAll(function(extensions){
				extensions.forEach(function(extension){
					if(extension.enabled && extension.isApp){

						var icon = extension.icons[extension.icons.length-1];

						$('.widget[data-widgetid='+widget.id+']').show().find('ul.list').append(
							'<li><a href="'+extension.appLaunchUrl+'"><i><img src="'+(typeof icon !== 'undefined' ? icon.url : '')+'"></i><b>'+extension.name+'</b></a></li>'
						);
					}
				});
			});

			break;
	}
}

function forBookmarksInFolder(folder_id, callback, widget, recursive){

	if($.isFunction(callback)){

		chrome.bookmarks.getChildren(folder_id, function(bookmarks){
			bookmarks.forEach(function(bookmark){

				//Check if the bookmark is infact a folder
				if(typeof bookmark.url === 'undefined'){

					if(recursive){
						//Loop recursively through the folder to fetch all nested bookmarks
						forBookmarksInFolder(bookmark.id, callback, widget);
					}
				}
				else{

					//Call the callback with the bookmark as
					callback(widget, bookmark);
				}
			});
		});

	}
}

function addWidgetToColumn(col_nr, col_pos, widget_html){

	var placed = false;

	var column = $('.column[data-col_nr='+col_nr+']');
	if(column.length == 0){
		column = $('.column:eq(0)');
		col_pos = -1;
	}

	if(col_pos >= 0){

		$(column).find('.widget').each(function(i, item){

			var widget = getWidget($(item).data('widgetid'));

			if(widget.col_pos > col_pos){
				$(item).before(widget_html);

				placed = true;
				return false;
			}
		});
	}

	if(!placed){

		$(column).append(widget_html);
	}
}

function loadWidgets(){

	var widgets = {};

	//Settings ophalen als die er al zijn
	try{
		if(typeof localStorage['widgets'] !== 'undefined'){
			widgets = JSON.parse(localStorage['widgets']);
		}
	}
	catch(e){
	}

	return widgets;
}

function getWidget(widget_id){

	if(typeof widgets[widget_id] !== 'undefined'){
		return widgets[widget_id];
	}
	else{
		return {};
	}
}

function saveWidget(widget){

	//Lokaal wijzigen
	widgets[widget.id] = widget;

	//Localstorage wijzigen
	localStorage['widgets'] = JSON.stringify(widgets);
}



function folderClick(event, src){

	//Open alle links in tabs bij middle-click
    if(event.which == '2'){

		$(src).closest('.widget').find('ul a').each(function(i, link){

			if($(link).prop('href').length > 0){

				window.open($(link).prop('href'));
			}
		});
    }
	//Collapse/Expand de lijst met links bij left-click
	else{
		var list = $(src).closest('.widget').find('ul').toggle('blind', {}, 'fast');
	}
}
