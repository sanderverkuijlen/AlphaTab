
var widgets = loadWidgets();

$(document).ready(function(){

	//Create columns and widgets
	drawBackground();

	createColumns();
	createWidgets();
});

function drawBackground(){

	var background_url = '';
	switch(settings['background_theme']){

		case 'brush_strokes':
		default:
			background_url = '../img/bg_blue_strokes2.jpg';
			break;
	}

	$('body').css('background', 'url(\''+background_url+'\') '+settings['background_color']);
}

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
	createWidget('apps');

	//mail
	for(var widget_id in widgets){
		if(typeof widgets[widget_id] !== 'undefined' && widgets[widget_id].type == 'mail'){

			createWidget('mail', widgets[widget_id]);
		}
	}

	//RSS
	for(var widget_id in widgets){
		if(typeof widgets[widget_id] !== 'undefined' && widgets[widget_id].type == 'rss'){

			createWidget('rss', widgets[widget_id]);
		}
	}
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
				type:		'kickstart',
				open:		true,
				col_nr:		0,
				col_pos:	0,
				title:		'Kickstart'
			};
			widget = $.extend(widget_defaults, getWidget(widget_defaults.id));
			saveWidget(widget);

			//Create a kickstart widget
			widget_html =	'<div class="widget kickstart" data-widgetid="'+widget.id+'">'+
								'<a href="javascript:;" onclick="clickWidgetHeader(event, this);"><h2>'+widget.title+'</h2></a>'+
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
			//Get settings for the folder widget
			widget_defaults = {
				id:			'folder_'+info.id,
				type:		'folder',
				open:		true,
				col_nr:		0,
				col_pos:	0
				//Folder titles are stored in the bookmarks themselves
			};
			widget = $.extend(widget_defaults, getWidget(widget_defaults.id));
			saveWidget(widget);

			//Create a folder widget
			widget_html =	'<div class="widget folder" data-widgetid="'+widget.id+'">'+
								'<a href="javascript:;" onclick="clickWidgetHeader(event, this);"><h2>'+info.title+'</h2></a>'+
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
			//Get settings for the apps widget
			widget_defaults = {
				id:			'apps',
				type:		'apps',
				open:		true,
				col_nr:		0,
				col_pos:	0,
				title:		'Apps'
			};
			widget = $.extend(widget_defaults, getWidget(widget_defaults.id));
			saveWidget(widget);

			//Create an apps widget
			widget_html =	'<div class="widget apps" data-widgetid="'+widget.id+'">'+
								'<a href="javascript:;" onclick="clickWidgetHeader(event, this);"><h2>'+widget.title+'</h2></a>'+
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

		case 'mail':

			//Get settings for the mail widget
			widget_defaults = {
				id:			'mail',
				type:		'mail',
				open:		true,
				col_nr:		0,
				col_pos:	0,
				title:		'Mail',
				feed:		'https://gmail.google.com/gmail/feed/atom'
				//			'http://rss1.smashingmagazine.com/feed/'
			};
			widget = $.extend(widget_defaults, info);
			saveWidget(widget);

			//Create a mail widget
			widget_html =	'<div class="widget mail" data-widgetid="'+widget.id+'">'+
								'<a href="javascript:;" onclick="clickWidgetHeader(event, this);"><h2>'+widget.title+'</h2></a>'+
								'<ul class="list" '+(!widget.open ? 'style="display:none;"' : '')+'>'+
									'<li class="empty_message"><span>No unread messages</span></li>'+
									'<li class="login_message" style="display: none;"><a href="https://www.gmail.com"><b>Login required<b></a></li>'+
								'</ul>'+
							'</div>'

			addWidgetToColumn(widget.col_nr, widget.col_pos, widget_html);

			var reloadFeed = function(){

				var widget_elem = $('.widget[data-widgetid='+widget.id+']');

				$(widget_elem).find('ul.list li:not(.empty_message,.login_message)').remove();


				$.getFeed({
					url:		widget.feed,
					success:	function(feed){

						for(var i = 0; i < feed.items.length && (!settings['max_items'] > 0 || i < settings['max_items']); i++){

							var item = feed.items[i];

							$(widget_elem).find('ul.list .empty_message, ul.list .login_message').hide();

							$(widget_elem).show().find('ul.list').append(
								'<li><a href="'+item.link+'"><b>'+item.title+'</b><small>'+item.author+'</small></a></li>'
							);
						}
					},
					error:		function(a,b,c,d){
						console.log(a,b,c,d);

						$(widget_elem).find('ul.list .empty_message').hide();
						$(widget_elem).find('ul.list .login_message').show();
					}
				});
			}
			setInterval(reloadFeed, 600000);
			reloadFeed();
			break;

		case 'rss':

			//Get settings for the rss widget
			widget_defaults = {
				id:			'rss_0',
				type:		'rss',
				open:		true,
				col_nr:		0,
				col_pos:	0,
				title:		'RSS',
				feed:		'http://rss1.smashingmagazine.com/feed/'
			};
			widget = $.extend(widget_defaults, info);
			saveWidget(widget);

			//Create a rss widget
			widget_html =	'<div class="widget rss" data-widgetid="'+widget.id+'">'+
								'<a href="javascript:;" onclick="clickWidgetHeader(event, this);"><h2>'+widget.title+'</h2></a>'+
								'<ul class="list" '+(!widget.open ? 'style="display:none;"' : '')+'>'+
									'<li class="empty_message"><span>This RSS feed is empty</span></li>'+
								'</ul>'+
							'</div>'

			addWidgetToColumn(widget.col_nr, widget.col_pos, widget_html);

			var reloadFeed = function(){

				$.getFeed({
					url:	widget.feed,
					success:	function(feed){

						var widget_elem = $('.widget[data-widgetid='+widget.id+']');

						$(widget_elem).find('ul.list li:not(.empty_message)').remove();

						//TEMP: Feed title moet gewoon editable zijn ipv automatisch
						$(widget_elem).find('h2').text(feed.title);

						for(var i = 0; i < feed.items.length && (!settings['max_items'] > 0 || i < settings['max_items']); i++){

							var item = feed.items[i];

							$(widget_elem).find('ul.list .empty_message').hide();

							$(widget_elem).show().find('ul.list').append(
								'<li><a href="'+item.link+'"><b>'+item.title+'</b>'+(typeof item.author !== 'undefined' ? '<small>'+item.author+'</small>': '')+'</a></li>'
							);
						}
					}/*,
					error:	function(){
					}*/
				});
			}
			setInterval(reloadFeed, 600000);
			reloadFeed();
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

function clickWidgetHeader(event, source){

	if($('body').hasClass('editmode')){

	}
	else{
		//Open alle links in tabs bij middle-click
		if(event.which == '2'){

			if($(source).closest('.widget').hasClass('mail')){
				window.open('https://www.gmail.com');
			}
			else{
				$(source).closest('.widget').find('ul a').each(function(i, link){

					if($(link).prop('href').length > 0){

						window.open($(link).prop('href'));
					}
				});
			}
		}
		//Collapse/Expand de lijst met links bij left-click
		else{

			var widget_elem = $(source).closest('.widget');
			var widget = getWidget(widget_elem.data('widgetid'));

			$(widget_elem).find('ul').toggle('blind', {}, 'fast', function(){

				widget.open = $(widget_elem).find('ul').is(':visible');

				saveWidget(widget);
			});
		}
	}
}

function addMailWidget(){

	//TODO: Check if the mail widget hasn't been added yet

	var widget = {
		id:			'mail',
		type:		'mail',
		open:		true,
		col_nr:		0,
		col_pos:	0,
		title:		'Mail',
		max_items:	-1
	};
	saveWidget(widget);

	//Redraw the columns and widgets
	createColumns();
	createWidgets();
}

function addRssWidget(options){

	//Generate a new unique id
	var count	= 0;
	var new_id	= 'rss_'+count;
	var widget	= getWidget(new_id);

	while(!$.isEmptyObject(widget)){

		count++;
		new_id = 'rss_'+count;

		widget = getWidget(new_id);
	}

	//Create a new RSS widget
	var widget_defaults = {
		id:			new_id,
		type:		'rss',
		open:		true,
		col_nr:		0,
		col_pos:	0,
		title:		'RSS',
		max_items:	-1
	};
	widget_defaults = $.extend(widget_defaults, options);
	saveWidget(widget_defaults);

	//Redraw the columns and widgets
	createColumns();
	createWidgets();
}

/*
function fixRssDatetime(datetime){

	var d = new Date(datetime);
	datetime = d.toLocaleDateString()+' - '+d.toLocaleTimeString();

	datetime = datetime.replace(/^[a-z]*,\s/i, '');
	datetime = datetime.replace(/:[0-9]{2}$/, '');

	return datetime;
}
*/