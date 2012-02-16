
var settings = loadSettings();

$(document).ready(function(){

	//Make "Escape" close dialogs
	$(window).bind('keyup', function(e){
		if(e.charCode == 0){
			$('.dialog_overlay').hide();
		}
	});


	//Save "Column Layout" setting on click
	$('#settings_col_layout li').click(function(){

		var name	= $(this).data('name');
		var value	= $(this).data('value');

		//Save the changed setting
		changeSetting(name, value);

		//Select the correct setting in the dialog
		setSelectedSettingsInDialog();

		//Redraw the columns and widgets
		createColumns();
		createWidgets();
	});

	//Save "Background color" setting on click
	$('#settings_background_color li').click(function(){

		var name	= $(this).data('name');
		var value	= $(this).data('value');

		//Save the changed setting
		changeSetting(name, value);

		//Select the correct setting in the dialog
		setSelectedSettingsInDialog();

		//Reset the background
		drawBackground();
	});

	//Save "Background theme" setting on click
	$('#settings_background_theme li').click(function(){

		var name	= $(this).data('name');
		var value	= $(this).data('value');

		//Save the changed setting
		changeSetting(name, value);

		//Select the correct setting in the dialog
		setSelectedSettingsInDialog();

		//Reset the background
		drawBackground();
	});

	//Select current settings in settings_dialog
	setSelectedSettingsInDialog();
});

function loadSettings(){

	var settings = {};
	var defaults = {
		column_layout:		4,
		background_color:	'blue',
		background_theme:	'brush_strokes'
	};

	//Settings ophalen als die er al zijn
	try{
		if(typeof localStorage['settings'] !== 'undefined'){
			var settings = JSON.parse(localStorage['settings']);
		}
	}
	catch(e){
	}

	return $.extend(defaults, settings);
}

function changeSetting(key, val){

	//Lokaal wijzigen
	settings[key] = val;

	//Localstorage wijzigen
	localStorage['settings'] = JSON.stringify(settings);
}

function setSelectedSettingsInDialog(){

	//Set the 'Column Layout' setting
	$('#settings_col_layout li').removeClass('sel').filter('[data-value='+settings['column_layout']+']').addClass('sel');

	//Set the 'Background color' setting
	$('#settings_background_color li').removeClass('sel').filter('[data-value='+settings['background_color']+']').addClass('sel');

	//Set the 'Background color' setting
	$('#settings_background_theme li').removeClass('sel').filter('[data-value='+settings['background_theme']+']').addClass('sel');
}