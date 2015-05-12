$(document).ready(function(){

  $(document).foundation();

  //******************************************************///
  /* OPEN AND HIDE POPUP MENU */
  
  $('#popupMenuButton').click(function(e){

    $('#popupMenuWrapper').toggle();
    return false;

  });

  $(document).click(function(){  
    $('#popupMenuWrapper').hide(); //hide the button

  });

  $('#popupMenuWrapper').click(function(e) { //button click class name is myDiv
    e.stopPropagation();
  })

/* END */


	$('.btnFollowing').hover(function()
    {
        $(this).text("Unfollow");

    },function()
    {
        $(this).text("Following");
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