/* Copyright AurelienD http://themeforest.net/user/AurelienD?ref=AurelienD */

function full_width_slider(autoplay, hide_arrows, pause_time, transition_speed) {
	
	var total_slides = 0;
	var current_slide = 0;
	var next_slide = 0;
	var processing = true;
	var timer_slider = 0;
	var timer_button = 0;
	var buttons_over = false;
	var no_caption_fadein = 0;
	
	total_slides = $('.slide').length;
	current_slide = total_slides - 1;
	
	if ($.browser.msie && parseInt($.browser.version) == 7) {
		no_caption_fadein = transition_speed;
	}

	if ($.browser.msie && parseInt($.browser.version) == 9) {
		$('.slide').css('display', 'block');
	}
	
	function hide_buttons() {
		if (!buttons_over) {
			$('#slider-control').fadeOut(transition_speed);
		}
	}
	
	function show_buttons() {
		$('#slider-control').fadeIn(transition_speed);
		window.clearTimeout(timer_button);
		timer_button = window.setTimeout(hide_buttons, 2000);
	}
	
	$('#slider-button-left, #slider-button-right').mouseenter(function() {
		buttons_over = true;
	});
	
	$('#slider-button-left, #slider-button-right').mouseleave(function() {
		buttons_over = false;
	});
	
	if (total_slides > 1) {
		if (hide_arrows) {
			$('div').mousemove(function(e){
				if (e.pageY < ($('#full-width-slider').height())) {
					show_buttons();
				}
			});
		} else {
			$('#slider-control').css('display', 'block');
		}
	}
	
	$('.slide-caption').css('display', 'none');
	
	var img = new Image();
	$(img)
		.load(function () {
			$('#full-width-slider').css('background', '#000');
			$('#full-width-slider-small').css('background', '#000');
			fadein_next_slide();
		})
		.attr('src', $('.slide:first').find('img').attr('src'));
	
	function fadeout_caption() {
		$('.slide').eq(current_slide).find('.slide-caption').fadeOut(transition_speed / 4);
		$('.slide').eq(current_slide).find('.slide-caption-container').animate({left: '-=50'}, transition_speed / 1.5);
		setTimeout(fadein_next_slide, transition_speed / 2);
	}
	
	function fadein_next_slide() {
		$('.slide').eq(next_slide).css('display', 'none').css({'z-index': '5'}).fadeIn(transition_speed, function() {
			if ($('.slide').eq(next_slide).find('.slide-caption').length === 0) {
				if (total_slides > 1) {
					$('.slide').eq(current_slide).css('display', 'none');
				}
				current_slide = next_slide;		
				processing = false;
				if (autoplay) {
					timer_slider = setTimeout(display_next_slide, pause_time);
				}
			}
		});
		if ($('.slide').eq(next_slide).find('.slide-caption').length != 0) {
			setTimeout(fadein_caption, transition_speed / 1.5);
		} 
	}
	
	function fadein_caption() {
		$('.slide').eq(next_slide).find('.slide-caption').fadeIn(transition_speed - no_caption_fadein, function() {
			if ($.browser.msie) {
				this.style.removeAttribute('filter');
            }
			if (total_slides > 1) {
				$('.slide').eq(current_slide).css('display', 'none');
			}
			current_slide = next_slide;		
			processing = false;
			if (autoplay) {
				timer_slider = setTimeout(display_next_slide, pause_time);
			}
		});
		$('.slide').eq(next_slide).find('.slide-caption-container').animate({left: '+=50'}, transition_speed / 1.5);
	}
	
	function display_next_slide() {
		if (!processing) {
			window.clearTimeout(timer_slider);
			processing = true;
			if (current_slide + 1 === total_slides) {
				next_slide = 0;
			} else {
				next_slide = current_slide + 1;
			}
			$('.slide').eq(current_slide).css({'z-index': '4'});
			if ($('.slide').eq(current_slide).find('.slide-caption').length != 0) {
				fadeout_caption();
			} else {
				fadein_next_slide();
			}
		}
	}
	
	function display_previous_slide() {
		if (!processing) {
			window.clearTimeout(timer_slider);
			processing = true;
			if (current_slide === 0) {
				next_slide = total_slides - 1;
			} else {
				next_slide = current_slide - 1;
			}
			$('.slide').eq(current_slide).css({'z-index': '4'});
			if ($('.slide').eq(current_slide).find('.slide-caption').length != 0) {
				fadeout_caption();
			} else {
				fadein_next_slide();
			}
		}
	}
	
	$('#slider-button-left').click(function() {
		display_previous_slide();
		return false;
	});
	
	$('#slider-button-right').click(function() {
		display_next_slide();
		return false;
	});
	
}

function packages_slider() {
	
	var packages_total = $('.package').length;
	var package_num = 1;
	
	$('.package-number').css('display', 'block');
	
	function enable_disable_packages_buttons() {
		if (package_num === packages_total) {
			$('#packages-button-right').css('display', 'none');
			$('#packages-button-right-disabled').css('display', 'block');
		} else {
			$('#packages-button-right').css('display', 'block');
			$('#packages-button-right-disabled').css('display', 'none');
		}
		if (package_num === 1) {
			$('#packages-button-left').css('display', 'none');
			$('#packages-button-left-disabled').css('display', 'block');
		} else {
			$('#packages-button-left').css('display', 'block');
			$('#packages-button-left-disabled').css('display', 'none');
		}
	}
	
	enable_disable_packages_buttons();
	
	$('#packages-button-right').click(function() {
		$('#packages-slide').animate({left: '-=300'}, 500, 'easeOutQuad');
		package_num++;
		enable_disable_packages_buttons();
		return false;
	});
	$('#packages-button-left').click(function() {
		$('#packages-slide').animate({left: '+=300'}, 500, 'easeOutQuad');
		package_num--;
		enable_disable_packages_buttons();
		return false;
	});
}

function testimonials_slider() {
	var top = Math.floor($('#testimonials-first-container').height() / 2);
	top = top - 16;
	
	var testimonials_total = $('.testimonial').length;
	var testimonial_left = 1;
	var testimonial_right = 2;
	$('#testimonials-number').html('Testimonials ' + testimonial_left + ' &amp; ' + testimonial_right + ' out of ' + testimonials_total);

	function enable_disable_testimonials_buttons() {
		if (testimonial_right === testimonials_total) {
			$('#testimonials-button-right').css('display', 'none');
			$('#testimonials-button-right-disabled').css('display', 'block');
		} else {
			$('#testimonials-button-right').css('display', 'block');
			$('#testimonials-button-right-disabled').css('display', 'none');
		}
		if (testimonial_left === 1) {
			$('#testimonials-button-left').css('display', 'none');
			$('#testimonials-button-left-disabled').css('display', 'block');
		} else {
			$('#testimonials-button-left').css('display', 'block');
			$('#testimonials-button-left-disabled').css('display', 'none');
		}
	}
	
	$('#testimonials-button-left').css('top', top + 'px');
	$('#testimonials-button-right').css('top', top + 'px');
	$('#testimonials-button-left-disabled').css('top', top + 'px');
	$('#testimonials-button-right-disabled').css('top', top + 'px');
	
	enable_disable_testimonials_buttons();
	
	$('#testimonials-button-right').click(function() {
		$('#testimonials-slide').animate({left: '-=390'}, 500, 'easeOutQuad');
		testimonial_left++;
		testimonial_right++;
		$('#testimonials-number').html('Testimonials ' + testimonial_left + ' &amp; ' + testimonial_right + ' out of ' + testimonials_total);
		enable_disable_testimonials_buttons();
		return false;
	});
	$('#testimonials-button-left').click(function() {
		$('#testimonials-slide').animate({left: '+=390'}, 500, 'easeOutQuad');
		testimonial_left--;
		testimonial_right--;
		$('#testimonials-number').html('Testimonials ' + testimonial_left + ' &amp; ' + testimonial_right + ' out of ' + testimonials_total);
		enable_disable_testimonials_buttons();
		return false;
	});
}

function prepare_room_slider() {
	
	var thumbnails_total = $('.room-thumbnail').length;
	var num_thumbnail_left = 1;
	
	function enable_disable_room_slider_buttons() {
		if (num_thumbnail_left === thumbnails_total -4) {
			$('#room-slider-button-right').css('display', 'none');
			$('#room-slider-button-right-disabled').css('display', 'block');
		} else {
			$('#room-slider-button-right').css('display', 'block');
			$('#room-slider-button-right-disabled').css('display', 'none');
		}
		if (num_thumbnail_left === 1) {
			
			$('#room-slider-button-left').css('display', 'none');
			$('#room-slider-button-left-disabled').css('display', 'block');
		} else {
			
			$('#room-slider-button-left').css('display', 'block');
			$('#room-slider-button-left-disabled').css('display', 'none');
		}
	}

	if (thumbnails_total <=5) {
		var room_slider_width = thumbnails_total * 80 + (thumbnails_total -1) * 20;
		$('#room-slider-second-container').width(room_slider_width + 'px');
	} else {
		enable_disable_room_slider_buttons();
	}
	
	$('.room-thumbnail').eq(0).addClass('thumbnail-current');
	$('.room-thumbnail').each(function() {
		if (!$(this).hasClass('thumbnail-current')) {
			grayscale($(this).find('img'));
		}	
		$(this).hover(function() {
			if (!$(this).hasClass('thumbnail-current')) {
				grayscale.reset($(this).find('img'));
			}
		}, function() {
			if (!$(this).hasClass('thumbnail-current')) {
				grayscale($(this).find('img'));
			}
		});
	});
	
	$('#room-slider-button-right').click(function() {
		$('#room-slider-slide').animate({left: '-=100'}, 500, 'easeOutQuad');
		num_thumbnail_left++;
		enable_disable_room_slider_buttons();
		return false;
	});
	$('#room-slider-button-left').click(function() {
		$('#room-slider-slide').animate({left: '+=100'}, 500, 'easeOutQuad');
		num_thumbnail_left--;
		enable_disable_room_slider_buttons();
		return false;
	});
	
	$('.room-thumbnail').click(function() {
		var img = new Image();
		$(img)
			.load(function () {
				$('#room-ajax-loader').css('display', 'none');
				$(this).hide();
				$('#room-big-image').append(img);
				$(this).fadeIn(function() {
					$('#room-big-image img:first-child').remove();
				});
			})
			.attr('src', $(this).attr('href'));
		if (!$(this).hasClass('thumbnail-current')) {
			grayscale($('.thumbnail-current'));
		}
		$('.room-thumbnail').removeClass('thumbnail-current');
		$(this).addClass('thumbnail-current');
		$('#room-ajax-loader').css('display', 'block');
		return false;
	});
}

function room_slider() {
	$(window).load(function() {
		prepare_room_slider();
	});
}
 