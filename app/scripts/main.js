$(function() {
	$('.tlt').textillate({
		in: {
			effect: 'fadeInDown',
			sync: true
		},
		out: {
			effect: 'fadeOutDown',
			sync: true
		},
		loop: true
	});



    var wH = $(window).height(),
        top;
    $('header').css('height', wH);

    $(window).resize(function(){
		wH = $(window).height(),top;
		$('header').height(wH);
	});
    $(window).scroll(function(){
        top = jQuery(window).scrollTop();
        if(top>wH) // height of float header
            $('nav').addClass('stick');
        else
          $('nav').removeClass('stick');
    });

    $('a[href*="#"]:not([href="#"])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
			return false;
			}
		}
	});
});
