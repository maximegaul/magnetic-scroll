/*
magneticScroll v1.0
by Maxime Gaul
https://github.com/maximegaul/magnetic-scroll
*/
$.fn.reverse = [].reverse;

(function($)
{
	$.magneticScroll=function(options)
	{

			var defauts=
			{
				"selector": ".magnetic",
				"easing": "swing",
				"speed": 500,
				"timeout": 200
			};

			var params=$.extend(defauts, options);

			$(document).ready(function() {
				$(params.selector).each(function() {
					$(this).attr("data-offset", $(this).offset().top);
				});

				var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
				$('body:not(.scrolling)').bind(mousewheelevt, function(e){


					if(!$(this).hasClass('scrolling')) {

						$(this).addClass('scrolling')

						var st = $(window).scrollTop();
						var evt = window.event || e //equalize event object
						evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible
						var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF

						if(delta > 0) {
							if($(window).scrollTop() > 0) {
								$(params.selector).reverse().each(function() {
									var scrolled = 0;
									if($(this).attr("data-offset")<st) {
										$("html, body").stop().animate({'scrollTop': $(this).attr("data-offset")+'px'}, params.speed, params.easing, function() {
											setTimeout(function() {
												$("html,body").stop().removeClass('scrolling');
											}, params.timeout);
										});
										scrolled = 1;
										return false; //break
									}
									if(scrolled == 0) {
										$("html, body").stop().animate({'scrollTop': '0px'}, params.speed, params.easing, function() {
											setTimeout(function() {
												$("html,body").stop().removeClass('scrolling');
											}, params.timeout);
										});
									}
								});
							} else {
									$("html,body").stop().removeClass('scrolling');
							}
						}
						else{
							$(params.selector).each(function() {
								if($(this).attr("data-offset")>st) {
									$("html, body").stop().animate({'scrollTop': $(this).attr("data-offset")+'px'}, params.speed, params.easing, function() {
										setTimeout(function() {
											$("html,body").stop().removeClass('scrolling');
										}, params.timeout);
									});
									return false; //break
								}
							});
						}


					} else {
						e.preventDefault();
					}

					e.stopPropagation();
					return;

				});

			}).keydown(function(e) {

				var st = $(window).scrollTop();
				var key = e.which;

				if(key == 38) { //up
					e.preventDefault();

					if(!$("body").hasClass('scrolling')) {

						$("body").addClass('scrolling');

						$(params.selector).reverse().each(function() {
							if($(this).attr("data-offset")<st) {
								$("html, body").stop().animate({'scrollTop': $(this).attr("data-offset")+'px'}, params.speed, params.easing, function() {
									setTimeout(function() {
										$("html,body").stop().removeClass('scrolling');
									}, params.timeout);
								});
								return false; //break
							}
						});
					}

				} else if(key == 40) { //down

					e.preventDefault();

					if(!$("body").hasClass('scrolling')) {

						$("body").addClass('scrolling');

						$(params.selector).each(function() {
							if($(this).attr("data-offset")>st) {
								$("html, body").stop().animate({'scrollTop': $(this).attr("data-offset")+'px'}, params.speed, params.easing, function() {
									setTimeout(function() {
										$("html,body").stop().removeClass('scrolling');
									}, params.timeout);
								});
								return false; //break
							}
						});
					}
				}

			});

	};
})(jQuery);
