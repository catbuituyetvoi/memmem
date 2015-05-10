$(document).ready(function(){

  $('.update-item').click(function(event )
  {
    event.preventDefault();

    var itemId = $(this).attr('id');

    var amount = $("#for"+itemId).val();

    var currentURL = $(this).attr('href');
    
    var targetURL = currentURL +"?amount="+amount;

    window.location.replace(targetURL);

  });
});