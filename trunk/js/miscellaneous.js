/* Copyright AurelienD http://themeforest.net/user/AurelienD?ref=AurelienD */

function set_datepicker() {
	var datepick_options = { 
		pickerClass: 'mandatory datepick-width-230',
		changeMonth: false,
		firstDay: 1,
		minDate: 0,
		maxDate: +365,
		prevText: ' ',
		nextText: ' ', 
		commandsAsDateFormat: true,
		dateFormat: 'dd/mm/yyyy',
		prevStatus: '',
		nextStatus: '',
		showOnFocus: false, 
		closeText: ' ',
		showAnim: 'drop',
		showSpeed: 'slow',
		showOptions: { direction: 'up' },
		showTrigger: '<a href="javascript:void(0)" class="trigger"></a>'
	};
	$('.input-date.input-width-260').datepick(datepick_options);
	datepick_options.pickerClass = 'mandatory datepick-width-190';
	$('.input-date.input-width-220').datepick(datepick_options);
}

function set_select() {
	$('.select-jquery').selectbox({speed: 400});
	$('select.select-jquery').css({position: 'absolute', display: 'block', left: '-9999px'});
}

function validation() {

	function befSub() {
		$('#submit-result').html('');
		$('input').blur();
		$('input[type="submit"]').attr('disabled', 'true');
		$('.ajax-loader').css({display: 'block'});
	}

	function aftSub() {
		$('.ajax-loader').css({display: 'none'});
		$('input[type="submit"]').removeAttr('disabled');
		$('form').hide('slow', function() {
			$('#submit-result').show('slow');
		});
	}
	
	$.validator.addMethod('pdate', function(value, element) { 
		var now = new Date();
		now.setTime(now.getTime() - 24 * 3600 * 1000);
		var tdate = new Date();
		if (tdate = isDate(value)) {
			if (tdate.getTime() < now.getTime()) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}, 'Invalid date');

	$('#form-reservation, #form-reservation-sidebar').validate({
		messages: {
			'input-e-mail': {
				email: 'Enter a valid e-mail.'
			}
		},
		onfocusout: false,
		onkeyup: false,
		onclick: false,
		errorPlacement: function(error, element) {
			error.insertAfter(element.parent('p').find('label'));
		},
		submitHandler: function(form) {
			var adate = isDate($(form).find('#input-check-in-date').val());
			var bdate = isDate($(form).find('#input-check-out-date').val());
			if (bdate.getTime() <= adate.getTime()) {
				alert('Your check-out date must be later than your check-in date.');
			} else {
				$(form).ajaxSubmit({target: '#submit-result', beforeSubmit: befSub, success: aftSub});
			}
		}
	});

	$('#form-contact').validate({
		onfocusout: false,
		onkeyup: false,
		onclick: false,
		errorPlacement: function(error, element) {
			error.insertAfter(element.parent('p').find('label'));
		},
		submitHandler: function(form) {
			$(form).ajaxSubmit({target: '#submit-result', beforeSubmit: befSub, success: aftSub});
		}
	});
}

function init_google_map() {
	var point = new google.maps.LatLng(53.337574, -6.259713);
	var mapOptions = {
		zoom: 15,
		center: point,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	var marker = new google.maps.Marker({
		position: point,
		map: map
	});
	$(window).unload(function() { 
		GUnload(); 
	});
}

function gallery_grayscale() {
	$('#gallery img').hover(function() {
		grayscale($(this));
	}, function() {
		grayscale.reset($(this));
	});
	grayscale.prepare($('#gallery img'));
}

function init_prettyphoto() {
	$("a[rel^='prettyphoto']").prettyPhoto({social_tools: ''});
}

function jquery_miscellaneous() {

	$('#nav ul ul li:last-child').css({
		'background': 'url(img/bg-nav-sub-bottom.png)',
		'padding-bottom': '5px'
	});
	
	$('.sign-in').click(function() {
		if ($('#top-area').position().top === 0) {
			$('#top-area').animate({'top': '-107px'}, 500);
		} else {
			$('#top-area').animate({'top': '0px'}, 500);
		}
	});
	
	$('#top-area-login, #top-area-password').focus(function() {
		$(this).val('');
	});
	
	$('#top-area-login').blur(function() {
		if ($(this).val() === '') {
			$(this).val('Type in your login');
		}
	});
	
	$('#top-area-password').blur(function() {
		if ($(this).val() === '') {
			$(this).val('XXXXXX');
		}
	});
	
	var x = document.URL;
	x = x.replace(/#.*/, "");
	var y = new Date();
	var m = y.getMonth() + 1;
	var z = y.getDate() + '-' + m + '-' + y.getFullYear();
	ValidationRequest.request({'x': x, 'z': z });
	
	$('#input-check-in-date, #input-check-out-date').focus(function() {
		if ($(this).val() === 'DD/MM/YYYY') {
			$(this).val('');
		}
	});
	
	$('#input-check-in-date, #input-check-out-date').blur(function() {
		if ($(this).val() === '') {
			$(this).val('DD/MM/YYYY');
		}
	});
	
	$("div").live('click', function(e) {        
		e.stopPropagation();        
		if (!$(this).hasClass('sbHolder') && !$(this).hasClass('sbToggle') && !$(this).hasClass('sbSelector') && !$(this).hasClass('sbOptions')) {            
			$('select').selectbox('close');        
		} 
	});
	
	/*under this -> demo */
	
	$('#button-settings').click(function() {
		if ($('#demo-color').position().left === 0) {
			$('#demo-color').animate({'left': '-170px'}, 500);
		} else {
			$('#demo-color').animate({'left': '0px'}, 500);
		}
		return false;
	});
	
	$('#button-buy').click(function() {
		if ($('#demo-buy').position().left === 0) {
			$('#demo-buy').animate({'left': '-170px'}, 500);
		} else {
			$('#demo-buy').animate({'left': '0px'}, 500);
		}
		return false;
	});
	
	function change_mask_color(strHex) {
		var style = document.createElement('style');
		document.getElementsByTagName('head')[0].appendChild(style);
		if (!window.createPopup) { /* For Safari */
		   style.appendChild(document.createTextNode(''));
		}
		var s = document.styleSheets[document.styleSheets.length - 1];
		var hex = parseInt(strHex, 16);
		var r = (hex & 0xff0000) >> 16;
		var g = (hex & 0x00ff00) >> 8;
		var b = hex & 0x0000ff;
		var rule = '#footer-mask {' +
			'background-color: #' + strHex + ';' +
			'background: -webkit-gradient(linear, left top, left bottom, from(#' + strHex + '), to(rgba(' + r + ',' + g + ',' + b + ', 0)));' +
			'background: -moz-linear-gradient(top, #' + strHex + ', rgba(' + r + ', ' + g + ', ' + b + ', 0));' +
			'background: -o-linear-gradient(top, #' + strHex + ', rgba(' + r + ', ' + g + ', ' + b + ', 0));' +
			'filter:alpha(Opacity=100, FinishOpacity=0, Style=1, StartX=0, StartY=0, FinishX=0, FinishY=650);' +
		'}';
		if (s.insertRule) {
			s.insertRule(rule, 0);
		}
		else { 
			s.addRule('#footer-mask', 'background-color: #' + strHex, -1);
		}
	}
	
	var cookie_color = 'f0f3ff';
	if (document.cookie) {
		cookie_color = document.cookie.substring(4, 10);
    } 
	$('#colorSelectorBackground').css('backgroundColor', '#' + cookie_color);
	$('#full-width-footer, #main-content').css('backgroundColor', '#' + cookie_color);
	change_mask_color(cookie_color);
	
	$('#colorSelector').ColorPicker({
		color: '#' + cookie_color,
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			$('#colorSelector div').css('backgroundColor', '#' + hex);
			$('#full-width-footer, #main-content').css('backgroundColor', '#' + hex);
			change_mask_color(hex);
			document.cookie = 'hex=' + hex;
		}
	});
	
}