
$(document).ready(function(){

	$('body.editmode .widget h2').live('click', function(event){

		//Open widget settings
		alert('open widget settings');
	});
});


function toggleEditMode(){
	$('body').toggleClass('editmode');
	fixColumnHeight();

	if($('body').hasClass('editmode')){
		enableSortables();
	}
	else{
		disableSortables();
	}
}

function fixColumnHeight(){

	if($('body').hasClass('editmode')){

		var height = 200;

		$('.column').each(function(i, e){

			if($(e).height() > height){

				height = $(e).height();
			};
		});

		$('.column').css('min-height', height);
	}
	else{
		$('.column').css('min-height', 0);
	}
}

function enableSortables(){

	$('.column.ui-sortable').sortable('enable');

	$('.column:not(.ui-sortable)').sortable({
		connectWith: '.column',
		cursor: 'move',
		distance: 50,
		handle: 'h2',
		tolerance: 'pointer',
		start: function(){
		},
		stop: function(){
		},
		update: function(){
			saveWidgetPositions();
		},
		receive: function(){
		}
	});
}

function saveWidgetPositions(){

	$('.column').each(function(col_nr, col){

		$(col).find('.widget').each(function(col_pos, widget_elem){

			var widgetid	= $(widget_elem).data('widgetid');
			var widget		= getWidget(widgetid);

			widget.col_nr	= col_nr;
			widget.col_pos	= col_pos;

			saveWidget(widget);
		});
	});
}

function disableSortables(){
	$('.column.ui-sortable').sortable('disable');
}