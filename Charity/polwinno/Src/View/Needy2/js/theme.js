(function($) {
	$(document).ready(function(){

	"use strict";

  // Start Day & Night
  $('div.day-light .circ').click(function(){
    if($('div.day-light').hasClass('active')){
        $('div.day-light').removeClass('active');
        $('body').removeClass('dark');
    }else{

        $('div.day-light').addClass('active');
        $('body').addClass('dark');
    }
  })

// Start Particle Background
if($('.portfolio-texts').length){

$('.portfolio-texts').particleground({
    dotColor: '#6e9dde',
    lineColor: '#6ede7e',
    directionX: 'left',
    directionY: 'up'
});

}


  // Start Vertical Split

  function checkdiasble(){
    var curentimg= $('.portfolio-img.active');
    if($(curentimg).is('.portfolio-img:first')){
      $('#portflio-split-nav span.left').addClass('disabled');
    }else if($(curentimg).is('.portfolio-img:last')){
      $('#portflio-split-nav span.right').addClass('disabled');      
    }
  }

  $('#portflio-split-nav span').click(function(){
    if(!$(this).hasClass('disabled')){
      $('#portflio-split-nav span').removeClass('disabled');
      var curentimg= $('.portfolio-img.active');
      var curenttext= $('.portfolio-inner-simple.active');
      var nextimg= $(curentimg).next();
      var nexttext= $(curenttext).next();
      var previmg= $(curentimg).prev();
      var prevtext= $(curenttext).prev();
      var button= $(this);

      $(curentimg).removeClass('active');
      $(curenttext).removeClass('active');

      if(button.hasClass('right')){
        $(nextimg).addClass('active');
        $(nexttext).addClass('active');
        checkdiasble()
      }else{
        $(previmg).addClass('active');
        $(prevtext).addClass('active');
        checkdiasble()
      }
    }
  })


// Start Main Menu
		$('#mainmenu li ').hover(function(){
			$(this).children('ul').stop(true,true).fadeIn();
		})
		$('#mainmenu li ').mouseleave(function(){
			$(this).children('ul').stop(true,true).fadeOut();
		})



if($('#portfolioinner.nobg').length){
  function autoheight(){
    var h= $(window).height()-$('#header').height()-$('#menu').height();
    $('#portfolioinner.nobg').css('height',h);
  }
  autoheight();
  $(window).resize(function(){
  autoheight();

  })

  $('.show-info').click(function(){
    if($(this).hasClass('active')){
      $(this).removeClass('active'),
    $('.portfolio-inner-simple.hide').fadeOut();
    }else{
    $(this).addClass('active'),
    $('.portfolio-inner-simple.hide').fadeIn();
    }
  })
}



// Custom  scrolbar
if($('#portfolio-wrapper').length){

$("#portfolio-wrapper").mCustomScrollbar({
          axis:"x",
          theme:"rounded-dark",
          advanced:{autoExpandHorizontalScroll:true}
        });

}

    // Start Faq
    $('.faq .question').click(function(){
      if($(this).parent().hasClass('active')){
        $(this).parent().removeClass('active');
        $(this).siblings().slideUp();
      }else{
        $(this).parent().addClass('active');
        $(this).siblings().slideDown();

        $(this).parent().siblings().removeClass('active').children('.answer').slideUp();
      }
    })

		

		// Start Mmenu
		 $("#my-menu").mmenu({
	         extensions: [
	         "position-right",
	         "fx-menu-zoom",
              "fx-panels-zoom",
              "pagedim-black"

	         ],
	         rtl: {
               use: true
            }
	      });



     // Start Circle 
     // Start Progress bar
$('.circle').each(function(){
  $(this).waypoint(function(){
      var a = $(this).data('value')*100;


    $(this).circleProgress({

  }).on('circle-animation-progress', function(event, progress) {
    $(this).find('strong').html(Math.round(a * progress) + '<i>%</i>');
  });
    
  },{offset: '70%'})
})

       



     // Start MasonryGallery
if($('#gallerym').length){

  var $grid = $('#gallerym').masonry({
  itemSelector: '.gallerm-item',
  // use element for option
  columnWidth: '.col-lg-3',
  percentPosition: true
});
// layout Masonry after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry('layout');
});


//      $('#gallerym').masonry({
//   // options
//   itemSelector: '.gallerm-item',
//   columnWidth: 10
// });
}



// Start Portfolio
if($('#portfolios').length){
var $grid = $('#portfolios').isotope({
  itemSelector: '.portfolios',
  percentPosition: true,
  masonry: {
    columnWidth: '.col-lg-3'
  }
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.isotope('layout');
}); 

$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});

}



// Start Portfolio
if($('#portfolioh').length){
var $grid = $('#portfolioh').isotope({
  itemSelector: '.portfolios',
  layoutMode: 'packery',
   packery: {
    horizontal: true
  }
  
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.isotope('layout');
}); 



}




// Start Progress bar
$('.fill').each(function(){
  $(this).waypoint(function(){
    var a=$(this).data('width');
    $(this).css("width",a+"%");
  },{offset: '70%'})
})


// Start animat scroll
$('.flipd').each(function(){
  $(this).waypoint(function(){
    
    $(this).addClass('active');
  },{offset: '70%'})
})

$('.bunced').each(function(){
  $(this).waypoint(function(){
    
    $(this).addClass('active');
  },{offset: '70%'})
})


     // Start Timeline

if($('.timeline').length){
     $('.timeline').timeline({
      forceVerticalMode: 800,
      mode: 'horizontal',
      visibleItems: 4
    });
}


// Start Counter
if($('.counter').length){
  
$('.counter').counterUp({
    delay: 10,
    time: 1000
});
}


// Smooth Scroll
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top-100
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });


// fix sidebar
    $('.content, .sidebar').theiaStickySidebar({
      // Settings
      additionalMarginTop: 30
    });



// fixing menu
if($('#menu').length){

	var a= $('#menu').offset().top;

$(window).scroll(function(){
	if($(window).scrollTop()>a){
		$('#menu').addClass('fix');
	}else{
		$('#menu').removeClass('fix');

	}
})
}




// Search pop
$('.search-pop').click(function(){
	$('#searchpop').slideDown();
	$('.search-pop-form input').focus();
})
$('#searchpop span.close').click(function(){
	$('#searchpop').fadeOut();
})


// log pop
$('ul.usermenu li span').click(function(){
	$('#poplogin').fadeIn();
})
$('#poplogin span.close').click(function(){
	$('#poplogin').fadeOut();
})



// Start Backtotop
$('.backtotop').click(function(){
	$('html,body').animate({scrollTop : 0},600);
})

function totop(){
	var totop= $(window).height();
	$(window).scroll(function(){
		if($(window).scrollTop()>totop){
		$('.backtotop').addClass('active');
		}else{
			$('.backtotop').removeClass('active');

		}
	})
}
totop();



// Start Basket
$('#cart span.total').click(function(){
	var par= $(this).parent();

	if(par.hasClass('active')){
		par.removeClass('active');
	}else{
		par.addClass('active');

	}
})


// Start Price Range
if($( "#slider-range" ).length){

  $( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "تومان" + ui.values[ 0 ] + " - تومان" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "تومان" + $( "#slider-range" ).slider( "values", 0 ) +
      " - تومان" + $( "#slider-range" ).slider( "values", 1 ) );
  } );

}

// Start Zoomer
if($("#img_01").length){
	
$("#img_01").elevateZoom({gallery:'gal1', cursor: 'pointer', galleryActiveClass: 'active', imageCrossfade: true, loadingIcon: 'http://www.elevateweb.co.uk/spinner.gif'}); 

//pass the images to Fancybox
$("#img_01").bind("click", function(e) {  
  var ez =   $('#img_01').data('elevateZoom');	
	$.fancybox(ez.getGalleryList());
  return false;
});
}


// Start Tooltip
if($(".tooltip").length){
    $( ".tooltip" ).tooltip({
           show: {
	        effect: "slide",
	        delay: 250
	      },
	       hide: {
	        effect: "explode",
	        delay: 250
	      },
	       position: {
		        my: "center bottom-10",
		        at: "center top"
		   },
    });

}




// Start Tab
$('.tabnav li').click(function(){
	var a= $(this).index();
	var c= $(this).parents('.tabnav').siblings('.tabcontainer').children('ul');
	$(this).addClass('active').siblings().removeClass('active');
	c.children('li').eq(a).addClass('active').siblings().removeClass('active');
})




// Start Owl carousel

if($(".related-products").length){
$('.related-products').owlCarousel({
    loop:true,
    margin:30,
    nav:false,
    rtl: true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
})

}

// Start Why
if($(".why-boxes").length){
$('.why-boxes').owlCarousel({
    loop:true,
    margin:30,
    dots: false,
    nav:true,
    navText:['<i class="fas fa-chevron-right"></i>','<i class="fas fa-chevron-left"></i>'],
    rtl: true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
})

}




// Start portfolio inner
if($("#portfolio-owl").length){
  var owl = $('#portfolio-owl');
owl.owlCarousel({
    loop:true,
    margin:30,
    dots: false,
    autoWidth:true,
    nav:true,
    navText:['<i class="fas fa-chevron-right"></i>','<i class="fas fa-chevron-left"></i>'],
    rtl: true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
})
owl.on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY>0) {
        owl.trigger('next.owl');
    } else {
        owl.trigger('prev.owl');
    }
    e.preventDefault();
});
}


// Start Owl carousel

if($(".related-post").length){
$('.related-post').owlCarousel({
    loop:true,
    margin:30,
    nav:false,
    rtl: true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
})

}


// Testimnial
if($('.testimonials').length){

$('.testimonials').owlCarousel({
    loop:true,
    margin:30,
    dots: false,
    nav:true,
    rtl: true,
    autoplay: true,
    navText:['<i class="fas fa-chevron-right"></i>','<i class="fas fa-chevron-left"></i>'],
    items:1
})
}

// Start Coming soon

if($("#countdown").length){

$("#countdown").countdowntimer({
	dateAndTime : "2018/09/01 00:00:00",
	size : "lg",
	displayFormat: 'ODHMS',
	labelsFormat: true
});

}


// Start Speciaoffer
if($(".special-time").length){

	$('.special-time').each(function(){
		var a= $(this).data('time');
		$(this).countdowntimer({
			dateAndTime : a,
			size : "lg",
			displayFormat: 'DHMS',
			labelsFormat: true
		});

	})

$('.specialoffers').owlCarousel({
    loop:true,
    margin:30,
    nav:false,
    rtl: true,
    autoplay: true,
    items:1
})

}







   })
	

})(window.jQuery);