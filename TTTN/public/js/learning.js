var current = 0,
	words = [],//Get all word from json response from server
	currentLayer = [],//current Layer which is showing
	layerList = [],//list of all layers
	course = [],// return from generateCourse()
	arrResult = [];

$(document).ready(function(){

	//if Loading the F, init course
	if( $('.learning').attr("type") == "filter" )
	{
		initFilter();
		//count how many word to make how filter layer
		var layerCount = $('.filter').attr("word-count");
	}

	//if Loading the Course, init course
	if($('.learning').attr("type") == "learning")

		initCourse();

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
	     	//If next layer is typing
	     	focusOnFirstInput();
	    });
	   	//Click on any Input of Typing Question
	    $('.learning').on('click',"input", function(e)
		{
			$(this).select();
		});

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
				
				if($(this).val('') != "")
					$(this).val('');

				if($(this).is(':last-child'))
					$(this).select();
				
				$(this).next().select();

			})
	     	.on('keyup',".typinganswer input",function(e)
			{
				if(e.keyCode==8){
					$(this).prev().select();
					return;
				}
			})
	     //Click on MCQ Answer
		$('.learning').on('click',".mcq .mcqAnswer", function(e)
		{
			if( checkMCQ(this) )
			{
				//If this answer is correct
				//Then load next Layer
				getNextLayer();
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

				var newWord = findWordByKeyId(incorrectWordId)[0];
				//If MCQ is false,
				//Create a WORD LAsYER at next Layer
				var newLayer = {};
				
				newLayer.type = "word";
				newLayer.key = newWord.key;
				newLayer.value = newWord.value;

				layerList.unshift(newLayer);

				console.log(layerList);
				getNextLayer();
			}
		});
		//Click help button
		//To unlock some char for typing questions
		$('.learning').on('click',".typing typingHelp", function(e)
		{
			$(this).fadeOff();
		});
		
});
//Find a Word in wordlist
//By attribute Key Id
//Find where wordId = keyId in "words" array
function findWordByKeyId(keyId){
    return $.grep(words, function(word){
      return word.id == keyId;
    });
};

//Check MCQ is true
function checkMCQ(element)
{
	//if this attribute "index" equals to the 
	//correctAnswer indicate in MCQ Layer
	if( $(element).attr("index") == currentLayer.correctAnswer )
		return true;

	return false;
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
//next filter
function nextFilter()
{
		a=layerList.splice(0,1)[0];

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
		  		//If filter done, reload to learn
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
				words = wordList.slice(0);

				//Generate course from word list
				layerList = generateCourse(words);

				currentLayer = layerList.splice(0,1)[0];

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

//generate a layer list for course
//Include word Layers, typing Layers and more...
function generateCourse(wordList)
{
		//Generating from all words
		//make a List of Layer
		$.each(wordList, function(index,word)
		{
			var wordLayer = {};
			var typingLayer = {};

			if(index == 3)
			{

			//For first of 3 words, generate a MCQ Layer
				var mcqLayer = {};
				var answerList = [];
			//Random to select 1 in 3 word for create MCQ for this words
				var selectWord = getRandomInt(0,2);

				mcqLayer.type = "mcq";
				mcqLayer.keyId = wordList[selectWord].id;
				mcqLayer.image = wordList[selectWord].image;
				mcqLayer.question = wordList[selectWord].value;

				for( i= 0; i<3; i++)
				{
					var answer = {};
					//keyId using for Last Layer
					//If answer is incorrect
					//Make a True False Layer
					answer.keyId = wordList[i].id;
					answer.content = wordList[i].key;
					answer.mean = wordList[i].value;
					answer.value = false;

					if( i == selectWord)
					{
						answer.value = true;
					}

					answerList.push(answer);
				}

				mcqLayer.answer = shuffleArr(answerList);
				//Loop Shuffle Arr to find the correct Answer
				$.each(answerList, function(index,word)
				{
					if( word.keyId == wordList[selectWord].id)
						mcqLayer.correctAnswer = index;
				});

				course.push(mcqLayer);
			}

			wordLayer.type = "word";
			wordLayer.key = word.key;
			wordLayer.image = word.image;
			wordLayer.value = word.value;
			wordLayer.wordId = word.id;

			typingLayer.keyId = word.id;
			typingLayer.image = word.image;
			typingLayer.type = "typing";
			typingLayer.answer = word.key;
			typingLayer.question = word.value;

			course.push(wordLayer);
			course.push(typingLayer);

		});

		return course;
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
									+'<button class="unknown">HỌC</button>'
								+'</div>'
								+'<div class="small-6 columns">'
									+'<button class="known">KHÔNG HỌC</button>'
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
					 						+'<img src="../'+currentLayer["image"]+'" alt="thumbnail">'
					 					+'</div>'
					 					+'<div class="small-8 columns">'
					 						
						 						+'<h3>'+currentLayer["key"]+'</h3>'
						 				
							 					//+'<h4>'+currentLayer["value"]+'</h4>'
							 					//+'<h4>Xin chao</h4>'
							 				//	+'<div class="small-6 text-center columns">'
							 				//		+'<button class="nextButton small-8 button">học tiếp</button>'
							 				//	+'</div>'
						 					
					 					+'</div>'
					 				+'</div>'

					 				+'<div class="face2 row">'
					 					+'<div class="small-4 columns">'
					 						+'<img src="../'+currentLayer["image"]+'" alt="thumbnail">'
					 					+'</div>'
					 					+'<div class="small-8 columns">'
					 						
						 					//	+'<h3>'+currentLayer["key"]+'</h3>'
							 					+'<h4>'+currentLayer["value"]+'</h4>'
							 					
							 					+'<div class="small-6 text-center columns">'
							 						+'<button class="nextButton small-8 button">học tiếp</button>'
							 					+'</div>'
						 				
					 					+'</div>'
					 				+'</div>'
					 				+'<br>'
					 				+'<br>'
					 				+'<div class="row">'
						 				+'<div class="small-10 small-centered  columns">'
						 					+'<a href="#" class="button small-2 small-centered columns"> Thảo luận</a>'
						 				+'</div>'
     								+'</div>'
			 					+'</div>'
		 					+'</div>'
	 					
 					+'</div>';
 		
 		$('.learning').html(html);
 	}


 	if(currentLayer["type"] == "typing")
 	{
 		var charInput = "";

 		for (var i = 0; i < currentLayer["answer"].length; i++)
 		{
              charInput +='<input class="charAnswer left" type="text" />';
        };

 		var html = '<div class="typingquestion">'
 					+'<div class="row">'
	 					+'<div class="small-6 small-centered columns">'
		 					+'<div class="row question">'
			 					+'<div class="row labels">Cho nghĩa, nhập từ</div>'
				 					+'<div class="row content">'
				 						+'<h2>'+currentLayer["question"]+'</h2>'
				 					+'</div>'
			 					+'</div><br><br>'
			 					+'<div class="row">Nhập đáp án rồi bấm Enter:</div>'
			 					+'<div class="row typinganswer">'+charInput+'</div>'
			 					+'<div class="row"><span class="typingHelp">Gợi ý</span></div>'
		 					+'</div>'
	 					+'</div>'
 					+'</div>';
 		
 		$('.learning').html(html);
 	}


 	if(currentLayer["type"] == "mcq")
 	{
 		var htmlAnswer = "";

 		$.each(currentLayer["answer"], function(index,answer)
		{
			htmlAnswer += '<p class="mcqAnswer" index="'+index+'">'+answer.content+'</p>';
		});

 		var html = '<div class="mcq">'
 					+'<div class="row">'
 					+'<div class="small-8 small-centered columns">'
 					+'<div class="row">'
 					+'<div class="small-4 columns">'
 					+'<img src="../'+currentLayer["image"]+'" alt="thumbnail">'
 					+'</div>'
 					+'<div class="small-8 columns">'
 					+'<h3>'+currentLayer["question"]+'</h3>'
 					+'<h4>Chọn đáp án đúng</h4>'
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