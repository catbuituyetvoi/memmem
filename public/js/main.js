$(document).ready(function(){



  $('#popupMenuButton').click(function(){
 
    $('#popupMenuWrapper').toggle();
  });

	$('.btnFollowing').hover(function()
    {
        $(this).text("Unfollow");

    },function()
    {
        $(this).text("Following");
    });

    $('.face1, .face2').click(function() {
        var page1 = $('.face1');
        var page2 = $('.face2');
        var toHide = page1.is(':visible') ? page1 : page2;
        var toShow = page2.is(':visible') ? page1 : page2;
        
        toHide.removeClass('flip in').addClass('flip out').hide();
        toShow.removeClass('flip out').addClass('flip in').show();
    });
	
});
function follow(element,id){
	$.ajax({
  		type: "POST",
  		url: "follow",
 		data:{
 			userId:id
   		}
	})
  	.done(function( action ){
  		//Response get from ProfileController
  		if(action=="1")
  		{
  			$(element).removeClass('btnFollow').addClass('btnFollowing');
  			$(element).text('Đang theo dõi');
  		}else{
  			$(element).removeClass('btnFollowing').addClass('btnFollow');
  			$(element).text('Theo dõi');
  		}
  	})

}