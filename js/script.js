
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

	//Quickstart
	createWidget('quickstart', {id: -1});

	//Apps
	createWidget('apps')

	//Gmail

	//RSS

}

function createWidget(type, info){

	switch(type){
		case 'quickstart':
			var widget_settings = {
				col_nr: 0
			};
			//TODO: get settings for the quickstart widget

			//Create a quickstart widget
			$('.column[data-col_nr='+widget_settings['col_nr']+']').append(
				'<div class="widget quickstart" data-folderid="'+info.id+'">'+
					'<a href="javascript:;" class="" onclick="folderClick(event,this);">'+
						'<h2>Quickstart</h2>'+
					'</a>'+
					'<ul class="list"></ul>'+
				'</div>'
			);

			//Add all bookmarks in this folder (recursively) to the list in the folder widget
			forBookmarksInFolder('1', function(info, bookmark){

				$('.widget[data-folderid='+info.id+']').show().find('ul.list').append(
					'<li><a href="'+bookmark.url+'"><i><img src="chrome://favicon/'+bookmark.url+'"></i><b>'+bookmark.title+'</b></a></li>'
				);

			}, info, false);
			break;

		case 'folder':
			var widget_settings = {
				col_nr: 0
			};
			//TODO: get settings for this folder widget

			//Create a folder widget
			$('.column[data-col_nr='+widget_settings['col_nr']+']').append(
				'<div class="widget folder" data-folderid="'+info.id+'">'+
					'<a href="javascript:;" class="" onclick="folderClick(event,this);">'+
						'<h2>'+info.title+'</h2>'+
					'</a>'+
					'<ul class="list"></ul>'+
				'</div>'
			);

			//Add all bookmarks in this folder (recursively) to the list in the folder widget
			forBookmarksInFolder(info.id, function(info, bookmark){

				$('.widget[data-folderid='+info.id+']').show().find('ul.list').append(
					'<li><a href="'+bookmark.url+'"><i><img src="chrome://favicon/'+bookmark.url+'"></i><b>'+bookmark.title+'</b></a></li>'
				);

			}, info, true);
			break;

		case 'apps':
			var widget_settings = {
				col_nr: 0
			};
			//TODO: get settings for the apps widget

			//Create an apps widget
			$('.column[data-col_nr='+widget_settings['col_nr']+']').append(
				'<div class="widget apps">'+
					'<a href="javascript:;" class="" onclick="folderClick(event,this);">'+
						'<h2>Apps</h2>'+
					'</a>'+
					'<ul class="list">'+
						'<li><a href="https://chrome.google.com/webstore"><i><img src="chrome://extension-icon/ahfgeienlihckogmohjhadlkjgocpleb/128/0"></i><b>Chrome Web Store</b></a></li>'+
					'</ul>'+
				'</div>'
			);

			chrome.management.getAll(function(extensions){
				extensions.forEach(function(extension){
					if(extension.enabled && extension.isApp){

						var icon = extension.icons[extension.icons.length-1];

						$('.widget.apps').show().find('ul.list').append(
							'<li><a href="'+extension.appLaunchUrl+'"><i><img src="'+(typeof icon !== 'undefined' ? icon.url : '')+'"></i><b>'+extension.name+'</b></a></li>'
						);
					}
				});
			});

			break;
	}
}


function forBookmarksInFolder(folder_id, callback, args, recursive){

	if($.isFunction(callback)){

		chrome.bookmarks.getChildren(folder_id, function(bookmarks){
			bookmarks.forEach(function(bookmark){

				//Check if the bookmark is infact a folder
				if(typeof bookmark.url === 'undefined'){

					if(recursive){
						//Loop recursively through the folder to fetch all nested bookmarks
						forBookmarksInFolder(bookmark.id, callback, args);
					}
				}
				else{

					//Call the callback with the bookmark as
					callback(args, bookmark);
				}
			});
		});

	}
}

/*
function loadFolders(){

    chrome.bookmarks.getSubTree('0', function(tree){
		tree.forEach(function(node){
			node.children.forEach(function(container){
				container.children.forEach(function(folder){


					if(typeof folder.url === 'undefined'){

						//Check localstorage for col_nr
						var col_nr = localStorage['folder_'+folder.id+'_colnr'];
						if(typeof col_nr === 'undefined' || col_nr > 3 || col_nr < 0 || col_nr == 'undefined'){
							col_nr = 0;
						}

						$('.column[data-col_nr='+col_nr+']').append(''+
							'<div class="category" data-folderid="'+folder.id+'">'+
							'<a href="javascript:;" class="" onclick="folderClick(event,this);">'+
								'<h2>'+
									//'<span class="iconic book"></span> '+
									folder.title+
								'</h2>'+
							'</a>'+
							'<ul class="list"></ul>'+
							'</div>');

						folder.children.forEach(function(bookmark){

							if(typeof bookmark.url !== 'undefined'){

							$('.category[data-folderid='+bookmark.parentId+'] ul.list').append('<li><a href="'+bookmark.url+'"><i><img src="chrome://favicon/'+bookmark.url+'"></i><b>'+bookmark.title+'</b></a></li>');
							}
						});
					}


				});
			});
		});
    });
}
*/

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
