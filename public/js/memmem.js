(function ($) {
 
    $.fn.learn = function(options) {

    	var current = 1;

    	var layerCount = this.attr("layer-count");

        var settings = $.extend({
            text         : 'Hello, World!',
            color        : null,
            complete    : null
        }, options);

    	var $wrapper 	= this,
    		$layer		= this.children('.layer'),
    		$firstLayer	= $layer.first(),
    		$showLayer	= this.children('.show'),
    		$prevBtn	= $('.prevBtn'),
    		$nextBtn	= $('.nextBtn');

        $nextBtn.on("click",function(){
        	current++;
        	nextLayer();
        	if(current>layerCount)
        	{
        		if ( $.isFunction( settings.complete ) ) {
        			settings.complete.call( this );
    			}
        	}
        });

        /*
        $prevBtn.on("click",function(e){
        	current--;
        	if(current<1)
        	{
        		current = 1;
        		return;
        	}
        	
        	prevLayer();

        });
        */

        $('.face1, .face2').click(function() {
		    var page1 = $('.face1');
		    var page2 = $('.face2');
		    var toHide = page1.is(':visible') ? page1 : page2;
		    var toShow = page2.is(':visible') ? page1 : page2;
		    
		    toHide.removeClass('flip in').addClass('flip out').hide();
		    toShow.removeClass('flip out').addClass('flip in').show();
		});



        $firstLayer.addClass("show");

        function nextLayer(){
        	$('.show').removeClass('show').next().addClass('show');
        };
        function prevLayer(){
        	$('.show').removeClass('show').prev().addClass('show');
        };

    };

//For Filter
    $.fn.filter = function(options) {

        var current = 0,
            count   = 0,
            arrResult =[];

        var layerCount = this.attr("layer-count");

        var settings = $.extend({
            text         : 'Hello, World!',
            color        : null,
            complete    : null
        }, options);

        var $wrapper    = this,
            $layer      = this.children('.layer'),
            $firstLayer = $layer.first(),
            $showLayer  = this.children('.show'),
            $unknown    = $('.unknown'),
            $known      = $('.known');


        $known.on("click",function(){
          
            current++;
            //push 1 if Knowing this word
            arrResult.push(0);
            //Load Next words
            //if current Layer reach the layer need to fillter
            //call the complete function
            if(current == layerCount)
            {
                if ( $.isFunction( settings.complete ) ) {
                    settings.complete.call( arrResult );
                }
            }

            //Load Next words
            nextLayer();
        });

        $unknown.on("click",function(){
           
            current++;
            //push 0 if Knowing this word
            arrResult.push(1);
            //complete Filter, call complete function
            if(current == layerCount)
            {
                if ( $.isFunction( settings.complete ) ) {
                    settings.complete.call( arrResult );
                }
            }

           //Load Next words
            nextLayer();
        });

        $firstLayer.addClass("show");

        function nextLayer(){
            $('.show').removeClass('show').next().addClass('show');
        };

    };

}( jQuery ));