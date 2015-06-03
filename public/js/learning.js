var current = 0,
	//Get all word from json response from server
	words = [],
	//current Layer which is showing
	currentLayer = [],
	//List SCORE of each word 
	scoreList = [],
	//list of all layers
	layerList = [],
	// return from generateCourse()
	course = [],
	mainCourse = [],
	//arr of Result from Filtering
	//This will use for post to server and save to database
	arrResult = [],
	//count how many Enter pressed in typing Full Layer
	//Start with 3;
	//With Each Enter, countEnter will subtract 1
	//countEnter -= 1;
	//And will restore this value for NEXT FULL TYPING LAYER
	//The SCORE of typing Full Layer calculate by:
	//countEnter * 5
	//So if the Enter is press more, the SCORE will subtract heavy
	//For First 3 Enter press, SCORE WILL > 0;
	//Further, countEnter is < 0, therefore, the SCORE is < 0 too.
	//Therefore, if the first Answer of typingFull is true, SCORE = 15
	countEnter = 3;

$(document).ready(function(){

	//if Loading the F, init course
	if( $('.learning').attr("type") == "filter" )
	{
		initFilter();
		//count how many word the set have to known how filter layer need to render
		var layerCount = $('.filter').attr("word-count");
	}

	//if Loading the Course, init course
	if($('.learning').attr("type") == "learning")
	{
		initCourse();
	}

	/*******************************************************/
	/*FILTER LAYER */

		//handle Known button on filter
		$('.learning').on("click",".known",function(){
          //Count clicked button
            current++;
            //push 1 if Knowing this word
            arrResult.push(0);
            //Load Next words
            //if current Layer reach the layer need to fillter
            //call the complete function
            if(current == layerCount)
            {
                completeFilter();
            }
            //Load Next words
            nextFilter();
        });

		//handle unKnown button on filter
        $('.learning').on("click",".unknown",function(){
           //Count clicked button
            current++;
            //push 0 if Knowing this word
            arrResult.push(1);
            //complete Filter, call complete function
            if(current == layerCount)
            {
                completeFilter();
            }

           //Load Next words
            nextFilter();
        });



/*******************************************************/
	/* LEARNING LAYER */

        //Flip up, flip out to
        $('.learning').on("click",".face1, .face2", function() {
				    var page1 = $('.face1');
				    var page2 = $('.face2');
				    var toHide = page1.is(':visible') ? page1 : page2;
				    var toShow = page2.is(':visible') ? page1 : page2;
				    
				    toHide.removeClass('flip in').addClass('flip out').hide();
				    toShow.removeClass('flip out').addClass('flip in').show();
				});


        //handle next button, load next layers
	   	$('.learning').on("click",".nextButton", function()
	    {
	    	//load next Layer
	     	getNextLayer();
	     	//Loading next Layer and focus on first input
	     	//If next layer is "typing" type
	     	
	    });
	   	//Click on any Input of Typing Question
	    $('.learning').on('click',"input", function(e)
			{
				$(this).select();
			});



			//*****************************************************************

	    //Process typing_char Question
	     $('.learning').on('keypress',".typinganswer input", function(e)
				{
					//must have this line
					//Ignore Backspace event for keypress
					if( e.keyCode ==8 ){
						return;
				}
				//handle when Enter key press
				if(e.keyCode == 13){

					var answer = "";
					//get result from which user typing
					$(".typinganswer input").each(function(){
							answer += $(this).val();
					});
					console.log(currentLayer)
					//Current Layer is getNextLayers
					if(answer == currentLayer.answer )
						getNextLayer();
				}
				
				if( $(this).val('') != "" )
					$(this).val('');
				//If user is type for lastest character
				if($(this).is(':last-child'))
					$(this).select();
				//Focus on Next char
				$(this).next().select();

			})
	    .on('keyup',".typinganswer input",function(e)
			{
				//process Back button, the prev input will focus
				if(e.keyCode == 8)
				{
					$(this).prev().select();
					return;
				}
			});

	    //*****************************************************************

			//Process typing_full Question
			//After type answer and press Enter
			//Check the input is whether Romaji or Japanese
			//If is romaji, then check for Romaji answer
			//If is japanese, then check for key of answer
			//If fails, suggest the answer at self-input for 1/4 second

			//var answerForFullTyping = "";

			var checkRomajiInput = /^[a-zA-Z]+$/;

	     $('.learning').on('keyup',".typingFullAnswer input", function(e)
				{
					//must have this line
					//Ignore Backspace event for keypress
					//if( e.keyCode ==8 ){
					//	return;
					//}
					//handle when Enter key press
					if(e.keyCode == 13){
						//Each time the user is press Enter
						//subtract countEnter, so the SCORE will suctract base countEnter
						//the SCORE of this question is calculate by countEnter * 5
						countEnter -= 1;

						console.log("countEnter is " + countEnter);

						var thisAnswer = $(this);
						//get result from which user typing
						//Catch all type of user
						

						console.log(currentLayer)
						//If this input value is Romaji 
						//Mean user choose Romaji to Answer the Question
						if( checkRomajiInput.test( $(this).val() ) ){

							//alert(answerForFullTyping);
							
							//Process IF answer is TRUE
							if( $(this).val().toLowerCase() == currentLayer.answerRomaji.toLowerCase() )
							{
									//Show notifyMessage then next to other Word
									showNotify("chÃ­nh xÃ¡c!");
									
									getNextLayer();	
							}
							else{

								$(this).val(currentLayer.answerRomaji );

								setTimeout(function () {
									//Set this value Empty
            				thisAnswer.val("");

        					}, 750);
							}

							answerForFullTyping = "";
						}
						//If this input is not Romaji 
						//Mean user choose Japanese to Answer the Question
						else{
							//DETECT JAPANESE input 
							//Will compare input value with KEY of word
							//Process IF answer is TRUE
							if( $(this).val().toLowerCase() == currentLayer.answerJapanese )
							{
									//Show notifyMessage then next to other Word
									showNotify("chÃ­nh xÃ¡c!");
									getNextLayer();	
							}
							else{

								$(this).val( currentLayer.answerJapanese );

								setTimeout(function () {
									//Set this value Empty
            				thisAnswer.val("");

        					}, 750);
							}		
						}

						
					}

			});

		//*****************************************************************


	  //Process answer MCQ
	  //The idea of this is:
	  //If the user answer incorrect
	  //Then show the incorrect answer again
	  //support for them to remind, make long-remember this mistake word
		$('.learning').on('click',".mcq .mcqAnswer", function(e)
		{
			if( checkMCQ(this) )
			{
				//If this answer is correct
				//Show the popup "Good" in second
				//Then continue the course, load next Layer

				//showNotify("tuyá»‡t vá»i!");
				addScoreForTrueMCQ();

				$(this).prepend('<i class="fi-check darkGreen"></i>');
				setTimeout(function () {
									//Set this value Empty
            				getNextLayer();

        					}, 2000);
				
			}
			else
			{
				//create new Layer, is word of
				//that incorrect answer
				//newWord = {};
				//Get index word of incorrect answer
				var incorrectWordIndex = $(this).attr("index");
				console.log("incorrectWordIndex =" +incorrectWordIndex);
				//Get Id of Word from Answer Array
				//By point out index of this incorrect word
				//then get key Id
				var incorrectWordId = currentLayer.answer[incorrectWordIndex].keyId;
				//Example: 
				//If RED is true answer, but user choose BLUE
				//then find BLUE in wordlists by keyID have find above
				//And add to Layer List as type "word"
				//To remind user about this mistake word
				console.log("incorrectWordId" +incorrectWordId);

				var newWord = findWordById(incorrectWordId)[0];
				//If MCQ is false,
				//Create a WORD LAsYER at next Layer
				var newLayer = {};
				//Copy all attribute of word
				newLayer = newWord;
				newLayer.type = "word";
				//Push this remind-word as a new layer at next Layer
				layerList.unshift(newLayer);

				console.log(layerList);
				//Re-show this word
				getNextLayer();
			}
		});	
/***************************************************************/
/*PROCESS AUDIO */
		$('#notifyIcon').click(function(){
			$('#wordAudio').trigger("play");
		});

		$('.learning').on('mouseover','.wordVolume',function(){
				$('#wordAudio').trigger("play");
		});
		//Mute and unmute
		$('.audioMute').click(function(){

				if( $("#wordAudio").prop('muted') )
		    {
		        $("#wordAudio").prop('muted', false);
		    }
		    else
		    {
		    	$("#wordAudio").prop('muted', true);
		    }
		});
});

//******************************************************************
//Showing a text for a time
function showNotify(message){
	$('#notifyMessage').html( message );
	$('#notify').fadeIn('slow').delay(1000).fadeOut('slow');
	//$('#notifyMessage').html("");
}
//Find a Word in wordlist
//By attribute Key Id
//Find where wordId = keyId in "words" array
function findWordById(keyId){
    return $.grep(words, function(word){
      return word.id == keyId;
    });
};

//Check MCQ answer is true
function checkMCQ(answer)
{
	//if this attribute "index" equals to the 
	//correctAnswer indicate in MCQ Layer
	if( $(answer).attr("index") == currentLayer.correctAnswer )
		return true;

	//return false;
}
//Add score to current Variable
//Save to Database IF MCQ ANSWER is TRUE
//Using AJAX to save
// PARAM: id of WORDCOLLECTION of this word
// AcTION: +10 SCORE for this word
function addScoreForTrueMCQ()
{
		var wordId = currentLayer["id"];
		//Add Score for Local Browser Variable
		scoreList[ wordId ] += 10;
		//alert("else");
		$.ajax({
			type:"post",
			url: window.location.href + "/truemcq",
			dataType:"json",
			data:{ id: wordId },
			success:function()
			{
				console.log("success save TRUE mcq")
			},
			error:function(a){
				setSignalMsg(a.responseText)
			}
		});
}
//Save to Database IF MCQ ANSWER is TRUE
//Using AJAX to save
// PARAM: id of WORDCOLLECTION of this word
// AcTION: +10 SCORE for this word
function saveFalseMCQ(questionId,incorrectId)
{
	//alert("else");
		$.ajax({
			type:"GET",
			url: window.location.href + "/truemcq",
			dataType:"json",
			data:{ id: wordId },
			success:function(filterList)
			{
				console.log("success save TRUE mcq")
			},
			error:function(a){
				setSignalMsg(a.responseText)
			}
		});
}
//on typing mode, focus on First Input
//take user ready to typing the answer.
function focusOnFirstInput()
{
	 $('.learning input[type!=hidden]:first').focus();
}
//Get random Int
//Select Random word for mcq Layer
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//shuffle an array in jQuery
function shuffleArr(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
//Initial filter
//Loading Filter data
function initFilter()
{
	//alert("else");
		$.ajax({
			type:"GET",
			url: window.location.href + "/filterData",
			dataType:"json",
			data:{},
			success:function(filterList)
			{
				layerList = filterList.slice(0);
				//Get first filter From Array of Filter
				currentFilter = layerList.splice(0,1)[0];
				//Rendering HTML from current Filter
				handleNextFilter(currentFilter);

				console.log(currentFilter);
				console.log("This Layer");
				console.log(currentFilter);
				console.log("this List");
				console.log(layerList);
			},
			error:function(a){
				setSignalMsg(a.responseText)
			}
		});
}
//display next filter
function nextFilter()
{
		//get data of next filter
		a=layerList.splice(0,1)[0];
		//render the next filter
		handleNextFilter(a);
		//layerList.shift();
		console.log("This Layer");
		console.log(a);
		console.log("this List");
		console.log(layerList);
		console.log("handling");
}
//handle when complete Filtering a Set, ready for Course
function completeFilter()
{
	//alert("complete filter");

	var urls = window.location.href + "/filtered";
			$.ajax({
		  		type: "POST",
		  		url: urls,
		 		data:{
		 			filterResult : arrResult
		   		}
			})
		  	.done(function( message ){
		  		//Response get from ProfileController
		  		if(message == 1)
		  		//If filter done, reload and ready to learn
		  		{
		  			location.reload();
		  		}
		  		else{
		  			alert("There is an Error");
		  		}

		  	})
}

//Loading the data file
//Generate course and layer
function initCourse()
{
	//alert("else");
		$.ajax({
			type:"GET",
			url: window.location.href +"/data",
			dataType:"json",
			data:{},
			success:function(wordList)
			{
				//get Wordlist
				//GET FIRST ARRAY OF Response
				//WORD LIST IS in FIRST ELEMENT OF RESPONSE ARRAY
				words = wordList.slice(0)[0];
				//SCORE LIST is in SECOND ELEMENT OF RESPONSE ARRAY
				scoreList = wordList.slice(0)[1];
				//Generate course from word list
				layerList = generateCourse(words);
				//get data of first Layer
				currentLayer = layerList.splice(0,1)[0];
				//render first layer
				handleNextLayer(currentLayer);

				console.log(currentLayer);

				$('#loading').fadeOff();
			},
			error:function(a)
			{
				setSignalMsg(a.responseText)
			}
		});
}

//PARAM: the word List to be learning
//generate a layer list for course
//Include word Layers, typing Layers, MCQ and more and more...
function generateCourse(wordList)
{
var lazyImage = [];
		//Generating from all words the user choosen to learn
		//make a List of Layer
		$.each(wordList, function(index,word)
		{

lazyImage += "<img src='../" + word.image + "'/>";
			var wordPair = [];

			var wordLayer = {};
			//Copy all attributes of this word
			wordLayer = word
			//Override some default attribute name
			wordLayer.type = "word";
			//wordLayer.key = word.key;
			//wordLayer.image = word.image;
			//wordLayer.value = word.value;
			wordLayer.wordId = word.id;
			//wordLayer.attributes = word.attributes
			//wordLayer.englishMean = word.englishMean

			//Generate a typing_FULL question
			//var typingFullLayer = {};

			//Push this word to Layer
			//course.push(wordLayer);
			//Also generate a typing_full Layer
			var typingFullLayer = generateTypingFullLayer(word);

			//course.push( typingFullLayer );
			//WORDPAIR have "WORD" and it own "TYPING" layer
			wordPair.push(wordLayer);
			wordPair.push(typingFullLayer);
			//PUSH TO A TEMPORARY ARRAY
			course.push(wordPair);
			//AFTER this, the temporary array will be an array of n array ( each are a pair of word and typing )
		});
	//Lazy loading Image
		$('.lazyImage').html(lazyImage);

		//var mainCourse = [];
		//Loop until all element is push into mainCourse[]
		while( course.length != 0 )
		{
			var rd = getRandomInt(0, course.length -1);

			mainCourse.push( course[rd][0] );

			course[rd].splice(0,1);
			//Remove if this pair
			if(course[rd].length == 0)
			{
				course.splice(rd,1);
			}
		}

		return mainCourse;
}
//********************************************************
//param: word - array of word Data
//return: typingFullLayer - array of Typing Full Question
//********************************************************
function generateTypingFullLayer(word){
	//Generate a typing_char
			var typingFullLayer = {};

			typingFullLayer.id = word.id;
			typingFullLayer.image = word.image;
			typingFullLayer.type = "typing_full";
			typingFullLayer.answerJapanese = word.key;
			typingFullLayer.answerRomaji = word.romaji;
			typingFullLayer.question = word.value;

			return typingFullLayer;
}
//Get the Next Layer in Array List
function getNextLayer()
{
	if(layerList.length > 0)
	{
		currentLayer = layerList.splice(0,1)[0];

		handleNextLayer(currentLayer);

		console.log(currentLayer);
	}
	else
	{
		//Call Finish learning function
	}
}

function handleNextFilter(currentLayer)
{

		var html = "<div class='row'>"
						+'<br><br><div class="small-10 small-centered columns">'
							+"<div class='row'>"
								+'<div class="small-5 columns">'
									+'<img src="../'
										+currentLayer["image"]
									+'" alt="thumbnail">'
								+"</div>"
								+'<div class="small-7 columns">'
									+ currentLayer["key"] 
									+ "<br>"
									+currentLayer["value"]
								+"</div>"
							+"</div>"
							+'<br><br><div class="row clearfix">'
								+'<div class="small-6 columns">'
									+'<button class="unknown">Há»ŒC</button>'
								+'</div>'
								+'<div class="small-6 columns">'
									+'<button class="known">KHÃ”NG Há»ŒC</button>'
								+'</div>'
							+'</div>'
						+"</div>"
					+'<div>';
		
		$('.filter').html(html);

}
//Rendering HTML from next Layer
function handleNextLayer(currentLayer)
{

 	if(currentLayer["type"] == "word")
 	{
 		var html = '<div class="word">'
	 					+'<div class="row">'
		 					+'<div class="small-10 small-centered columns">'
		 					+'<br>'
			 					+'<div class="row">'

				 					+'<div class="face1 row">'
					 					+'<div class="small-4 columns">'
					 						+'<img class="layerImage" src="../'+currentLayer["image"]+'" alt="'+currentLayer["key"]+'">'
					 					+'</div>'
					 					+'<div class="small-8 columns">'
					 						
						 						+'<h2 class="wordKey">'+ currentLayer["key"]  +'<i class="fi-volume size-36 wordVolume"></i><span class="wordScore right">'+scoreList[ currentLayer["id"] ]+'</span></h3>'
						 						+ '<p class="wordHiragana">' + currentLayer["hiragana"] + '<span class="wordAttributes">( '+currentLayer["attributes"]+' )</span></p>'
						 						+ '<p>' + currentLayer["kanjiMean"] + '</p>'
						 						
							 					//+'<h4>'+currentLayer["value"]+'</h4>'
							 					//+'<h4>Xin chao</h4>'
						 					
					 					+'</div>'
					 				+'</div>'

					 				+'<div class="face2 row">'
					 					+'<div class="small-4 columns">'
					 						+'<img class="layerImage" src="../'+ currentLayer["image"]+'" alt="'+currentLayer["value"]+'">'
					 					+'</div>'
					 					+'<div class="small-8 columns">'
					 						
						 					//	+'<h3>'+currentLayer["key"]+'</h3>'
							 					+'<h2 class="wordValue">'+currentLayer["value"]+ '<span class="wordEnglishMean">'+currentLayer["englishMean"]+'</span></h4>'
							 					+'<p>' +currentLayer["romaji"]+'</p>'
							 					+'<p>' +currentLayer["exampleJp"]+'</p>'
							 					//+'<p>' +currentLayer["exampleVi"]+'</p>'
							 					//+'<p>' +currentLayer["exampleEn"]+'</p>'
						 				
					 					+'</div>'
					 				+'</div>'
					 				+'<br>'
					 				+'<br>'
					 				+'<div class="row">'
						 				+'<div class="small-4 small-centered columns">'
						 					+'<button class="nextButton small-8 button success">há»c tiáº¿p</button>'
						 				+'</div>'
     								+'</div>'
			 					+'</div>'
		 					+'</div>'
	 					
 					+'</div>';
 		
 		$('.learning').html(html);

 		$('#wordAudio').trigger("play");
 	}


 	if(currentLayer["type"] == "typing_char")
 	{
 		var charInput = "";

 		for (var i = 0; i < currentLayer["answer"].length; i++)
 		{
              charInput +='<input class="charAnswer left" type="text" />';
        };

 		var html = '<div class="typingCharQuestion">'
 					+'<div class="row">'
	 					+'<div class="small-6 small-centered columns">'
		 					+'<div class="row question">'
			 					+'<div class="row labels">Cho nghÄ©a, nháº­p tá»«</div>'
				 					+'<div class="row content">'
				 						+'<h2>'+currentLayer["question"]+'</h2>'
				 					+'</div>'
			 					+'</div><br><br>'
			 					+'<div class="row">Nháº­p Ä‘Ã¡p Ã¡n rá»“i báº¥m Enter:</div>'
			 					+'<div class="row typinganswer">'+charInput+'</div>'
			 					+'<div class="row"><span class="typingHelp">Gá»£i Ã½</span></div>'
		 					+'</div>'
	 					+'</div>'
 					+'</div>';
 		
 		$('.learning').html(html);
		//Focus on first input, ready to answer
		focusOnFirstInput();
 	}

 	if(currentLayer["type"] == "typing_full")
 	{
 		var charInput = '<input type="text" placeholder="Nháº­p Ä‘Ã¡p Ã¡n báº±ng Japanese hoáº·c Romaji rá»“i báº¥m Enter:">';
 		var html = '<div class="typingFull">'
 					+'<div class="row">'
	 					+'<div class="small-6 small-centered columns">'
		 					+'<div class="row question">'
			 					+'<h3 class="lightGray">Cho nghÄ©a, nháº­p tá»«</h3>'
				 					+'<div class="row content">'
				 						+'<h2>'+currentLayer["question"]+'</h2>'
				 					+'</div>'
			 					+'</div><br><br>'
			 					//+'<div class="row"></div>'
			 					+'<div class="row typingFullAnswer" >'+charInput+'</div>'
		 					+'</div>'
	 					+'</div>'
 					+'</div>';
 		
 		$('.learning').html(html);

 		//RESET countEnter value to 3
 		countEnter = 3;
 		//Focus on first input, ready to answer
 		focusOnFirstInput();
 	}


 	if(currentLayer["type"] == "mcq")
 	{
 		var htmlAnswer = "";

 		$.each(currentLayer["answer"], function(index,answer)
		{
			htmlAnswer += '<p class="mcqAnswer" index="'+index+'"><span>'+answer.content+'</span></p>';
		});

 		var html = '<div class="mcq">'
 					
 					+'<div class="row">'
	 					+'<div class="small-8 small-centered columns">'
		 					+'<div class="row">'
			 					+'<div class="small-4 columns">'
			 						+	'<img class="layerImage" src="../'+currentLayer["image"]+'" alt="thumbnail">'
			 					+'</div>'
			 					+'<div class="small-8 columns">'
				 					+'<h3 class="mcqQuestion">'+currentLayer["question"]+' ?</h3>'
				 					+'<h5>Chá»n Ä‘Ã¡p Ã¡n Ä‘Ãºng</h5>'
				 					+'<h4></h4> '+ htmlAnswer +'</h4>'
			 					+'</div>'
		 					+'</div>'
	 					+'</div>'
 					+'</div><br><br>'
 					+'<div class="row">'
 						+'<div class="small-8 small-centered columns">'
 							+'<div class="row">'
 								+'<div class="small-6 text-center columns">'
 									+'</div>'
 								+'</div>'
 							+'</div>'
 						+'</div>'
 					+'</div>';
 		
 		$('.learning').html(html);
 	}

}