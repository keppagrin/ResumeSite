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

    function drawSkills(){
    	//html/css, js, c#, php, sql
    	var data = [47,31,39,25,15];

	    var chart = d3.select('#fill1')
	    	.append('svg:svg')
	    		.attr('class','chart')
	    		.attr('width',580)
	    		.attr('height',65*data.length)

	    	.append('svg:g')
	    		.attr('transform', 'translate(30,90)');


	    var x = d3.scaleLinear()
	    	.domain([0,d3.max(data)])
	    	.range([0,500]);

	    chart.selectAll('line')
	   			.data(x.ticks(5))
	   		.enter().append('svg:line')
	   			.attr('x1',x)
	   			.attr('x2',x)
	   			.attr('y1',-10)
	   			.attr('y2',220)
	   			.attr('stroke','#0D1F2D');

	   			/* This gives numbers on the axes.
	   	chart.selectAll('text.rule')
	   			.data(x.ticks(10))
	   		.enter().append('svg:text')
	   			.attr('class','rule')
	   			.attr('x',x)
	   			.attr('y',0)
	   			.attr('dy',-3)
	   			.attr('text-anchor','middle')
	   			.text(String);
	   			*/

	   	//top line
	   	chart.append('svg:line')
	   		.attr('x1',0)
	   		.attr('x2',520)
	   		.attr('y1',-10)
	   		.attr('y2',-10)
	   		.attr('stroke','#0D1F2D');
		//bottom line
	   	chart.append('svg:line')
	   		.attr('x1',0)
	   		.attr('x2',520)
	   		.attr('y1',220)
	   		.attr('y2',220)
	   		.attr('stroke','#0D1F2D');

	   	//last line
	   	chart.append('svg:line')
	   		.attr('x1',520)
	   		.attr('x2',520)
	   		.attr('y1',-10)
	   		.attr('y2',220)
	   		.attr('stroke','#000');



	    var bars = chart.selectAll('rect')
	    		.data(data)
	    	.enter().append('svg:rect')
	    		.attr('y',function(d, i){ return i * 45; })
	    		.attr('width', 1)
	    		.attr('height',40)
	    		.attr('fill','#0D1F2D')

	    	.on('mouseover', function() {
	          d3.select(this)
		        .transition()
	            .duration(200)
	            .attr('fill', 'orange');
	        })
	        //changes back when not hovered
	        .on('mouseout', function() {
	          d3.select(this)
	            .transition()
	            .duration(320)
	            .attr('fill', '#0D1F2D');
	        })


	    //hardcoded labels :(
	    //better than no labels
	    //scale 0-5
	    //familiar comfortable proficient advanced expert
	    chart.append('text')
    		.attr('x',0)
    		.attr('y',-20)
    		.attr('class','label')
    		.text('Learning');
		chart.append('text')
			.attr('x',88)
			.attr('y',-20)
			.attr('class','label')
			.text('Familiar');
		chart.append('text')
			.attr('x',178)
			.attr('y',-20)
			.attr('class','label')
			.text('Comfortable');
		chart.append('text')
			.attr('x',293)
			.attr('y',-20)
			.attr('class','label')
			.text('Proficient');
		chart.append('text')
			.attr('x',397)
			.attr('y',-20)
			.attr('class','label')
			.text('Advanced');
		chart.append('text')
			.attr('x',495)
			.attr('y',-20)
			.attr('class','label')
			.text('Wow');
		chart.append('text')
			.attr('x',225)
			.attr('y',-50)
			.attr('class','title')
			.text('Coding')

		var counter=0;
    	bars.transition()
	        .duration(1000)
	        .delay(100)
	        .attr('width', function(d) {
	          return x - (d * 4); //Height minus data value
	        })
	        .attr('width', function(d) {
	          return d * 10;
	        })
	        .on('end',function(){
	        	//apply labels to bars after they grow out
	        	
	        	switch(counter) {
	        		case 0:
		        		chart.append('text')
				        	.style('opacity',0)
			        		.attr('x',10)
				        	.attr('y',25)
				        	.attr('class','barlabel')
				        	.text('HTML/CSS')
				        	.transition().style('opacity',1);
			        	break;
			        case 1:
				        chart.append('text')
				        	.style('opacity',0)
			        		.attr('x',10)
				        	.attr('y',70)
				        	.attr('class','barlabel')
				        	.text('JavaScript')
				        	.transition().style('opacity',1);
			        	break;
			        case 2:
			        	chart.append('text')
				        	.style('opacity',0)
			        		.attr('x',10)
				        	.attr('y',115)
				        	.attr('class','barlabel')
				        	.text('C#')
				        	.transition().style('opacity',1);
			        	break;
			        case 3:
			        	chart.append('text')
				        	.style('opacity',0)
			        		.attr('x',10)
				        	.attr('y',160)
				        	.attr('class','barlabel')
				        	.text('PHP')
				        	.transition().style('opacity',1);
			        	break;
			        case 4:
			        	chart.append('text')
				        	.style('opacity',0)
			        		.attr('x',10)
				        	.attr('y',205)
				        	.attr('class','barlabel')
				        	.text('SQL')
				        	.transition().style('opacity',1);
			        	break;
			        case 5:
			        	chart.append('text')
				        	.style('opacity',0)
			        		.attr('x',10)
				        	.attr('y',250)
				        	.attr('class','barlabel')
				        	.text('wow')
				        	.transition().style('opacity',1);
			        	break;
			        default:
			        	console.log('noot');
			        	break;
	        	}
	        	counter++;
	        });

	    drawn = true;
    }

    function drawSoftware() {
    	//premiere, ps, flash. unity, blender
    	var data = [30,48,26,42,35];

	    var chart = d3.select('#fill2')
	    	.append('svg:svg')
	    		.attr('class','chart')
	    		.attr('width',580)
	    		.attr('height',65*data.length)

	    	.append('svg:g')
	    		.attr('transform', 'translate(30,90)');


	    var x = d3.scaleLinear()
	    	.domain([0,d3.max(data)])
	    	.range([0,500]);

	    chart.selectAll('line')
	   			.data(x.ticks(5))
	   		.enter().append('svg:line')
	   			.attr('x1',x)
	   			.attr('x2',x)
	   			.attr('y1',-10)
	   			.attr('y2',220)
	   			.attr('stroke','#0D1F2D');

	   			/* This gives numbers on the axes.
	   	chart.selectAll('text.rule')
	   			.data(x.ticks(10))
	   		.enter().append('svg:text')
	   			.attr('class','rule')
	   			.attr('x',x)
	   			.attr('y',0)
	   			.attr('dy',-3)
	   			.attr('text-anchor','middle')
	   			.text(String);
	   			*/

	   	//top line
	   	chart.append('svg:line')
	   		.attr('x1',0)
	   		.attr('x2',520)
	   		.attr('y1',-10)
	   		.attr('y2',-10)
	   		.attr('stroke','#0D1F2D');

	   	//bottom line
	   	chart.append('svg:line')
	   		.attr('x1',0)
	   		.attr('x2',520)
	   		.attr('y1',220)
	   		.attr('y2',220)
	   		.attr('stroke','#0D1F2D');

	   	//last line
	   	chart.append('svg:line')
	   		.attr('x1',520)
	   		.attr('x2',520)
	   		.attr('y1',-10)
	   		.attr('y2',220)
	   		.attr('stroke','#000');


	    var bars = chart.selectAll('rect')
	    		.data(data)
	    	.enter().append('svg:rect')
	    		.attr('y',function(d, i){ return i * 45; })
	    		.attr('width', 1)
	    		.attr('height',40)
	    		.attr('fill','#0D1F2D')

	    	.on('mouseover', function() {
	          d3.select(this)
		        .transition()
	            .duration(200)
	            .attr('fill', 'orange');
	        })
	        //changes back when not hovered
	        .on('mouseout', function() {
	          d3.select(this)
	            .transition()
	            .duration(320)
	            .attr('fill', '#0D1F2D');
	        })


	    //hardcoded labels :(
	    //better than no labels
	    //scale 0-5
	    //familiar comfortable proficient advanced expert
	    chart.append('text')
    		.attr('x',0)
    		.attr('y',-20)
    		.attr('class','label')
    		.text('Learning');
		chart.append('text')
			.attr('x',82)
			.attr('y',-20)
			.attr('class','label')
			.text('Familiar');
		chart.append('text')
			.attr('x',170)
			.attr('y',-20)
			.attr('class','label')
			.text('Comfortable');
		chart.append('text')
			.attr('x',285)
			.attr('y',-20)
			.attr('class','label')
			.text('Proficient');
		chart.append('text')
			.attr('x',385)
			.attr('y',-20)
			.attr('class','label')
			.text('Advanced');
		chart.append('text')
			.attr('x',495)
			.attr('y',-20)
			.attr('class','label')
			.text('Wow');
		chart.append('text')
			.attr('x',225)
			.attr('y',-50)
			.attr('class','title')
			.text('Software')

		var counter2=0;
    	bars.transition()
	        .duration(1000)
	        .delay(100)
	        .attr('width', function(d) {
	          return x - (d * 4); //Height minus data value
	        })
	        .attr('width', function(d) {
	          return d * 10;
	        })
	        .on('end',function(){
	        	//apply labels to bars after they grow out
	        	
	        	switch(counter2) {
	        		case 0:
		        		chart.append('text')
				        	.style('opacity',0)
			        		.attr('x',10)
				        	.attr('y',25)
				        	.attr('class','barlabel')
				        	.text('Premiere CC')
				        	.transition().style('opacity',1);
			        	break;
			        case 1:
				        chart.append('text')
				        	.style('opacity',0)
			        		.attr('x',10)
				        	.attr('y',70)
				        	.attr('class','barlabel')
				        	.text('Photoshop CC')
				        	.transition().style('opacity',1);
			        	break;
			        case 2:
			        	chart.append('text')
				        	.style('opacity',0)
			        		.attr('x',10)
				        	.attr('y',115)
				        	.attr('class','barlabel')
				        	.text('Flash')
				        	.transition().style('opacity',1);
			        	break;
			        case 3:
			        	chart.append('text')
				        	.style('opacity',0)
			        		.attr('x',10)
				        	.attr('y',160)
				        	.attr('class','barlabel')
				        	.text('Unity 4/5')
				        	.transition().style('opacity',1);
			        	break;
			        case 4:
			        	chart.append('text')
				        	.style('opacity',0)
			        		.attr('x',10)
				        	.attr('y',205)
				        	.attr('class','barlabel')
				        	.text('Blender')
				        	.transition().style('opacity',1);
			        	break;
			        case 5:
			        	chart.append('text')
				        	.style('opacity',0)
			        		.attr('x',10)
				        	.attr('y',250)
				        	.attr('class','barlabel')
				        	.text('wow')
				        	.transition().style('opacity',1);
			        	break;
			        default:
			        	console.log('noot');
			        	break;
	        	}
	        	counter2++;
	        });
    }

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
    
    var el = document.getElementById('fill1');
    function onVisibilityChange(el, callback) {
      var old_visible;
      return function () {
          var visible = isElementInViewport(el);
          if (visible != old_visible) {
              old_visible = visible;
              if (typeof callback == 'function') {
                  callback();
              }
          }
      }
    }

    var handler = onVisibilityChange(el, function() {
      if (drawn == false) {
        if (isElementInViewport(document.getElementById('fill1'))) {
          //alert("here");
          drawSkills();
          drawSoftware();
        }
      }
    });

    $(window).on('DOMContentLoaded load resize scroll', handler);
});
