$(function() {
	$('.carousel').carousel();
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
        {
            $('nav').addClass('stick');
        	$('#section1').addClass('buffer');
        }
        else
        {
          $('nav').removeClass('stick');
          $('#section1').removeClass('buffer');
	    }
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

    //The D3-ening
    var drawn=false;

    var data = [5,10,20,30,40,50];

    var chart = d3.select('#fill')
    	.append('svg:svg')
    		.attr('class','chart')
    		.attr('width',570)
    		.attr('height',55*data.length)
    	.append('svg:g')
    		.attr('transform', 'translate(30,40)');

    var x = d3.scaleLinear()
    	.domain([0,d3.max(data)])
    	.range([0,500]);

    chart.selectAll('line')
   			.data(x.ticks(10))
   		.enter().append('svg:line')
   			.attr('x1',x)
   			.attr('x2',x)
   			.attr('y1',0)
   			.attr('y2',265)
   			.attr('stroke','#0D1F2D');

   	chart.selectAll('text.rule')
   			.data(x.ticks(10))
   		.enter().append('svg:text')
   			.attr('class','rule')
   			.attr('x',x)
   			.attr('y',0)
   			.attr('dy',-3)
   			.attr('text-anchor','middle')
   			.text(String);

   	chart.append('svg:line')
   		.attr('y1',0)
   		.attr('y2',265)
   		.attr('stroke','#0D1F2D');


    chart.selectAll('rect')
    		.data(data)
    	.enter().append('svg:rect')
    		.attr('y',function(d, i){ return i * 45; })
    		.attr('width', x)
    		.attr('height',40);

    d3.selectAll('rect')
	    .attr('fill','#0D1F2D')
    	//adds hover color change
        .on('mouseover', function() {
          d3.select(this)
            .attr('fill', 'orange')
        })
        //changes back when not hovered
        .on('mouseout', function() {
          d3.select(this)
            .transition()
            .duration(320)
            .attr('fill', '#0D1F2D');
        });


    function makeBarGraph (){
      /* Animated D3 bargraph adapted from codepen by Anthony Skelton
      ================================================
      // http://codepen.io/ajskelton/pen/Lkniv
      */
      dataset = [30, 11, 8, 13, 14, 15]
      //Width and height
      var w = 500;
      var h = 300;
      //Create SVG element
      var svg = d3.select('#fill')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

      var bars = svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('fill', 'teal')
        .attr('x', function(d, i) {
          return i * (w / dataset.length);
        })
        .attr('y', h - 1)
        .attr('width', 20)
        .attr('height', 1)

        

      bars.transition()
        .duration(1000)
        .delay(100)
        .attr('y', function(d) {
          return h - (d * 4); //Height minus data value
        })
        .attr('height', function(d) {
          return d * 4;
        }) //end bargraph js

    }
    /*  Adapted from stackoverflow

        http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
    */
    function isElementInViewport (el) {
      //special bonus for those using jQuery
      if (typeof jQuery === 'function' && el instanceof jQuery) {
          el = el[0];
      }

      var rect = el.getBoundingClientRect();

      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
          rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
      );
    }


});
