
function openDialog(dialog_id){
	$('body').css('overflow-y', 'hidden');
	$('body').css('padding-right', '18px');

	var dialog = $('#'+dialog_id);

	dialog.find('.dialog_page').hide();
	dialog.find('.dialog_page.default').show();
	dialog.find('.dialog_backbtn').addClass('disabled');

	dialog.show();
}

function closeDialog(dialog_id){
	$('body').css('overflow-y', 'scroll');
	$('body').css('padding-right', '0');

	if(dialog_id != null){
		$('#'+dialog_id).hide();
	}
	else{
		$('.dialog_overlay').hide();
	}
}

function switchDialogPage(dialog_id, page_id){

	var dialog = $('#'+dialog_id);

	var target_page = $('#'+page_id);

	$(dialog).find('.dialog_page:visible').fadeOut(200, function(){

		if(target_page.hasClass('default')){
			dialog.find('.dialog_backbtn').addClass('disabled');
		}
		else{
			dialog.find('.dialog_backbtn').removeClass('disabled');
		}

		target_page.fadeIn(200);
	});
}

//Make "Escape" close dialogs
$(document).ready(function(){
	$(window).bind('keyup', function(e){
		if(e.keyCode == 27){
			closeDialog(null); //Close the active dialog
		}
	});
});