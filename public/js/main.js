$(document).ready(function(){

  $(document).foundation();

  //******************************************************///
  /* OPEN AND HIDE POPUP MENU */
  
  $('#popupMenuButton').click(function(e){

    $('#popupMenuWrapper').toggle();
    return false;

  });

  $(document).click(function(){  
    $('.topPopup').hide(); //hide the button

  });

  $('#popupMenuWrapper').click(function(e) { //button click class name is myDiv
    e.stopPropagation();
  })

/* END */

//******************************************************///
  /* OPEN AND HIDE POPUP MENU */
  
  $('#popupLearningButton').click(function(e){

    $('#popupLearningWrapper').toggle();
    return false;

  });


  $('#popupLearningWrapper').click(function(e) { //button click class name is myDiv
    e.stopPropagation();
  })

/* END */



	$('.btnFollowing').on('mouseover',function()
    {
        $(this).text("Bỏ theo dõi");

    },function()
    {
        $(this).text("Đang theo dõi");
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