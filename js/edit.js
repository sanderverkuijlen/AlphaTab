
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
		},
		receive: function(){
			//fixColumnHeight();

			//TODO: Update widget location storage
			a
			/*
			$('.widget').each(function(i, folder){

				var folder_id = $(folder).data('folderid');
				var col_nr = $(folder).closest('.column').data('col_nr');

				localStorage['folder_'+folder_id+'_colnr'] = col_nr;
			});
			*/
		}
	});
}

function disableSortables(){
	$('.column.ui-sortable').sortable('disable');
}