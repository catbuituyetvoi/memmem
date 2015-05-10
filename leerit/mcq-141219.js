var answerMode=!0,dictIdGlobal,vocab="",vocabWithoutSpace="",repetition,audioUS,indexCorrectOption,testType,isTestTypeAudioTyping,isFront=!0,manuallyCreated=!1,isPhrase=!1,stressFirstSyl=!1,dictContent,ASK_MEANING_WORD_LABEL=gettext("<strong>What's the <u>meaning</u> of the following word?</strong>"),ASK_MEANING_WORD_INSTR=gettext("Select the meaning of the given word")+":",ASK_MEANING_PHRASE_LABEL=gettext("<strong>What's the <u>meaning</u> of the following phrase?</strong>"),ASK_MEANING_PHRASE_INSTR=
gettext("Selecct the meaning of the given phrase")+":",ASK_WORD_LABEL=gettext("<strong>Which <u>word</u> has the following meaning?</strong>"),ASK_WORD_INSTR=gettext("Select the most suitable word for the given meaning")+":",ASK_PHRASE_LABEL=gettext("<strong>Which <u>phrase</u> has the following meaning?</strong>"),ASK_PHRASE_INSTR=gettext("Select the most suitable phrase for the given meaning")+":",ASK_IMAGE_WORD_LABEL=gettext("<strong>Which <u>word</u> is illustrated by the following image?</strong>"),
ASK_IMAGE_WORD_INSTR=gettext("Select the word that best describes the given image")+":",ASK_IMAGE_PHRASE_LABEL=gettext("<strong>Which <u>phrase</u> is illustrated by the following image?</strong>"),ASK_IMAGE_PHRASE_INSTR=gettext("Select the phrase that best describes the given image")+":",ASK_BLANK_WORD_LABEL=gettext("<strong>Fill in the blank with the most appropriate <u>word</u></strong>"),ASK_BLANK_PHRASE_LABEL=ASK_BLANK_WORD_LABEL,ASK_AUDIO_TYPING_WORD_LABEL=gettext("<strong>Type the <u>word</u> that you heard?</strong>"),
ASK_AUDIO_PHRASE_LABEL=gettext("<strong>Type the <u>phrase</u> that you heard?</strong>"),ASK_SENTENCE_AUDIO_TYPING_WORD_LABEL=ASK_AUDIO_TYPING_WORD_LABEL,ASK_SENTENCE_AUDIO_PHRASE_LABEL=ASK_AUDIO_PHRASE_LABEL,ASK_AUDIO_MEANING_WORD_LABEL=gettext("<strong>What's the <u>meaning</u> of the word that you heard?</strong>"),ASK_AUDIO_MEANING_WORD_INSTR=gettext("Select the meaning of the word you just heard")+":",ASK_AUDIO_MEANING_PHRASE_LABEL=gettext("<strong>What's the <u>meaning</u> of the phrase that you heard?</strong>"),
ASK_AUDIO_MEANING_PHRASE_INSTR=gettext("Select the meaning of the phrase you just heard")+":",ANSWER_INS_LABEL=gettext("Please type your answer then click Show Answer to check"),NO_REVIEW_WORD_MSG="<h4>Reviewed Words</h4><h4>0</h4>",WORD_DUPLICATE_ERROR_MSG=gettext("This word already exists in the selected deck."),EXCEED_MAX_WORDS_IN_DECK_ERROR_MSG=gettext("You have already reached the maximum number of words allowed for your current deck.\nPlease save this word to another deck"),EXPIRED_DECK_MSG=
gettext("This deck has expired"),EMPTY_DECK_MSG=gettext("This deck doesn't have any words"),LOAD_NEXT=gettext("Loading next question..."),SENDING_RESULTS=gettext("Sending results..."),SEE_WORD_DETAILS=gettext("Word Details"),SEE_WORD_USAGE=gettext("Word Usage"),SEE_BRITISH_PRONUN=gettext("British Pronunciation"),SEE_WORD_DETAILS=gettext("Word information"),SEE_PHRASE_DETAILS=gettext("Phrase information"),SAVE_OPTION_LABEL=gettext("Save to learn"),LESSON_SEE_IPA=gettext("View IPA"),LESSON_SEE_WORD_USAGE=
gettext("Learn Word Usage"),LESSON_SEE_WORD_USAGE_AND_MORE=gettext("Learn Word Usage and other details"),LESSON_SEE_MORE=gettext("Learn more details"),NEXT_LABEL=gettext("Next"),NEXT_LABEL_EXPLANATION=gettext("Learn next word"),DONE_LABEL=gettext("Done"),DONE_LABEL_EXPLANATION=gettext("See the summary of this review round"),NEXT_OR_DONE_LABEL=NEXT_LABEL,NEXT_OR_DONE_EXPLANATION=NEXT_LABEL_EXPLANATION,I_DONT_KNOW_LABEL=gettext("I don't know yet"),I_DONT_KNOW_LABEL_EXPLANATION=gettext("Skip this question and see the lesson"),
SUBMIT_TYPING_LABEL=pgettext("Submit your answer","Submit"),SUBMIT_TYPING_LABEL_EXPLANATION=gettext("Submit your answer"),SKIP_LABEL=gettext("Skip"),SKIP_LABEL_EXPLANATION=gettext("Skip this question"),BACK_LABEL=gettext("Back to quiz"),BACK_LABEL_EXPLANATION=gettext("Back to the quiz just now"),ASSURE_USER_NEW_WORDS="<div class='assure-new-words-msg'>"+gettext("LeeRit will help you review this word in the next review sessions.")+" <br>"+gettext("And you will master this word in no time!")+"</div>",
ASSURE_USER_NEW_WORDS_CLICK_NEXT=gettext("Let's now continue with another word by clicking the button below"),REV_WORDS=gettext("Reviewed Words"),HOW_MYSCORE_COMPUTED_LABEL="<a href='/guide/#my-score'>"+gettext("How my score is computed")+"?</a>",FETCH_THRESHOLD=2,cardlists=[],pendingAJAXMemorizeRequestCardIds=[],memorizeQueue=[],lastRecordRatingCardId=-1,lastRecordRatingDictId="",isDeleteCard=!1,SCHEDULING_MODE_LABELS=[gettext("Focus on reviewing<br />old words"),gettext("Learn both<br />old and new words"),
gettext("Focus on learning<br />new words")],isTestTypeImageWord;function initSliderLabels(){for(var a=$("#slider").data().uiSlider.options,a=a.max-a.min,b=parseInt($("#slider").slider("option","value")),c=0;c<=a;c++){var d;d=$("<label>"+SCHEDULING_MODE_LABELS[c]+"</label>").css("left",c/a*100+"%");$("#slider").append(d);c+1==b&&$("#slider label:eq("+c+")").css("font-weight","bold")}}
function updateSliderLabels(){for(var a=$("#slider").data().uiSlider.options,a=a.max-a.min,b=parseInt($("#slider").slider("option","value")),c=0;c<=a;c++)c+1==b?$("#slider label:eq("+c+")").css("font-weight","bold"):$("#slider label:eq("+c+")").css("font-weight","normal")}
$(document).ready(function(){$("#slider").slider({value:preferred_scheduling_mode,min:1,max:3,step:1,change:function(){updateSliderLabels()}}).each(function(){initSliderLabels()});$(document).on("click",".offer-help-msg",function(){$(this).hide();var a=$(this).closest(".help-form-wrapper").find(".help-form");a.find(".call-mobile").show();a.find(".help-form-text-area").show();a.show()});$(document).on("click",".hide-help-form",function(){var a=$(this).closest(".help-form"),b=a.closest(".help-form-wrapper");
a.find(".help-msg-error").hide();a.find(".help-msg-sent").hide();a.hide();b.find(".offer-help-msg").show()});$(document).on("click","#send-help-msg",function(){var a=$(this).closest(".help-form"),b=a.find(".user-msg").val();if(b=="")a.find(".help-msg-error").html(gettext("Please enter a message")).show();else return $(this).attr("disabled",!0),$(this).blur(),$.ajax({type:"POST",url:"/contact/mcq-help/create/",data:{msg:b,email:userEmail},dataType:"text",success:function(b){b==1?(a.find(".call-mobile").hide(),
a.find("#send-help-msg").attr("disabled",!1),a.find(".user-msg").val(""),a.find(".help-form-text-area").hide(),a.find(".help-msg-sent").show()):(a.find(".help-msg-error").html(b).show(),a.find("#send-help-msg").attr("disabled",!1))},error:function(a){$(".playfield").append("<div class='message-wrapper'><div class='msg'></div></div>");$(".msg").html(a.responseText);$("#send-help-msg").attr("disabled",!1)}}),!1});typeof rating!="undefined"&&setWordScoreToolTip(rating,rating-wordScoreDelta,wordScoreDelta);
isMobileBrowser||($("#reviewed-words-list").slimScroll({railVisible:!0,size:"10px",height:"200px"}),$(".front-side").slimScroll({height:"160px",railVisible:!0,size:"10px",color:"#004D8D"}));allow_choosing_scheduling_mode?($("#scheduling-mode").css({width:isMobileBrowser?"100%":$("#word-quiz").css("width"),overflow:"hidden",height:$("#word-quiz").css("height"),display:"table"}),isMobileBrowser&&$("#scheduling").css("margin-top","0"),$("#scheduling-mode-submit-button").click(function(){var a=$("#slider").slider("option",
"value");$.ajax({type:"POST",url:"/smart-review/set_scheduling_mode",dataType:"json",data:{"scheduling-mode":a},success:function(a){a=a.scheduled;$("#scheduled").html(a);nextCard();$("#scheduling-mode").hide();$("#word-quiz").show()},error:function(){}})}),$("#word-quiz").hide(),$("#scheduling-mode").show()):nextCard();isMobileBrowser||window.scrollBy(0,90);if(isMCQ)var a=[[gettext("No... What's your second guess? "),userName+gettext(", give it another try! ")],[gettext("Keep up, choose another one!")],
[gettext("You now have only 2 options left"),userName+gettext(", you now have a 50/50 chance!")],[gettext("Sorry, the other one is the correct one")]],b=[[gettext("You almost got it right :("),userName+gettext(", be more careful with the spelling next time!")],[gettext("Sorry, your guess is not correct")]],c=gettext("Incorrect :("),d=[[userName+gettext(", you're a genius!"),gettext("Amazing!"),userName+gettext(", Wondeful!"),gettext("Fantastic!"),userName+gettext(", you are so smart!"),gettext("You are number 1!")],
[gettext("Well-done!"),userName+gettext(", that's correct!")],[gettext("That's cool!"),gettext("Alright. You got it!")],[gettext("You guessed correctly!")]],e=[[userName+gettext(", you're a genius!"),gettext("Amazing!"),userName+gettext(", Wonderful!"),gettext("Fantastic!"),userName+gettext(", you are so smart!"),gettext("You are number 1!")],[gettext("Well-done!")+gettext(" But try not to use the hint next time :)"),gettext("That's correct!")+gettext(" But try not to use the hint next time :)"),
gettext("That's cool!")+gettext(" But try not to use the hint next time :)"),gettext("You got it!")+gettext(" But try not to use the hint next time :)")]],f=[gettext("Well-done!"),gettext("That's cool!"),gettext("Correct")+"!"];else{$(".rating").attr("disabled",!0);$(".rating").click(function(){$(this).blur();var a=$(this).val(),a=a=="Remember"||a=="Nh\u1edb"?"Remember":a=="Vaguely recall"||a=="Nh\u1edb s\u01a1"?"Vaguely recall":a=="Forgot"||a=="Qu\u00ean"?"Forgot":-1,b=$("#cardid").val();memorize("",
b,-1,!1,a,1,-1,-1,-1,[],[]);nextCard()});var a=[],d=[]}window.incorrectMsgs=a;window.correctMsgs=d;window.incorrectMsgs_fillBlank=b;window.correctMsgs_fillBlank=e;window.incorrectMsg_mobile=c;window.correctMsg_mobile=f;$("#deck-select").change(function(){var a=$(this).val();$("#deck-listing").attr("action","/decks/"+a+"/activate");$("#deck-listing").submit()});$("#delcard").click(function(){deleteCard()});$("#editcard").click(function(){editCard()});$("#show-answer").click(showAnswer);$("#remaining-question").qtip({position:{corner:{target:"topLeft",
tooltip:"topRight"}},style:{width:200,color:"#21377F",background:"#fff",name:"blue"},border:{width:7,radius:8,color:"#0096C8"},show:"mouseover",hide:{when:"mouseout",fixed:!0}});setToolTip("deck-instr",$("#deck-instr").html(),300);bindShortcuts()});function removeElementFromArray(a,b){index=a.indexOf(b);index>-1&&a.splice(index,1);return a}
function addToMemorzieQueue(a,b,c,d,e,f,k,g,h,i,j){memorizeQueue.push({dictId:a,cardId:b,testType:c,isTestTypeImageWord:d,rating:e,difficulty:f,numIncorrectChars:k,numHintsUsed:g,numIncorrectOptions:h,hardChoices:i,easyChoices:j})}
function processMemorizeQueue(){if(memorizeQueue.length>0){var a=memorizeQueue.splice(0,1)[0];sendMemorizeRequestToServer(a.dictId,a.cardId,a.testType,a.isTestTypeImageWord,a.rating,a.difficulty,a.numIncorrectChars,a.numHintsUsed,a.numIncorrectOptions,a.hardChoices,a.easyChoices)}}function generateAjaxUrlUpToCards(){return isListeningMode?"/smart-review/listening/cards":"/smart-review/decks/"+deckid+"/cards"}
function checkConditionToRedirectToSmartReviewComplete(){return cardlists.length==0&&pendingAJAXMemorizeRequestCardIds.length==0}function redirectToSmartReviewComplete(){window.location.href="/smart-review/complete"}
function sendMemorizeRequestToServer(a,b,c,d,e,f,k,g,h,i,j){pendingAJAXMemorizeRequestCardIds.indexOf(b)==-1&&pendingAJAXMemorizeRequestCardIds.push(b);$.ajax({type:"POST",url:isListeningMode?"/smart-review/listening/cards/"+a+"/rating":"/smart-review/decks/"+deckid+"/cards/"+b+"/rating",dataType:"json",data:{testType:c,isTestTypeImageWord:d,rating:e,difficulty:f,numIncorrectChars:k,numHintsUsed:g,numIncorrectOptions:h,hardChoices:JSON.stringify(i),easyChoices:JSON.stringify(j)},success:function(a){removeElementFromArray(pendingAJAXMemorizeRequestCardIds,
b);processMemorizeQueue();var c=a.prev_word,d=a.final_rating;if(typeof c!="undefined"){var e=a.del_fcid;e&&$("#card-"+e).remove();$("#reviewed-words-list").length<=0&&$("#reviewed-words").append("<h4>"+REV_WORDS+'</h4><ul id="reviewed-words-list" class="mcq-rv-wl"></ul>');var c=c.substring(0,47),e=a.word_scoredelta,f="",f=e>0?"splus":e==0?"sunchanged":"sminus";$(".tooltip-sign").remove();var g="card-"+a.otherhalf_id+"-back";$("#reviewed-words-list").prepend("<li id='card-"+b+"' class='"+g+"'><a href='/decks/"+
deckid+"/words/"+b+"'>"+c+"</a><span class='"+f+"'>"+e+"</span><span id='word-score-delta-tooltip' class='tooltip-sign'></span></li>");setWordScoreToolTip(d,d-e,e)}if(checkConditionToRedirectToSmartReviewComplete())redirectToSmartReviewComplete();else{c=a.scheduled;d=a.user_score;if(a.word_scoredelta)e=a.word_scoredelta;setUserScoreAndToolTip(d,d-e,e);updateWordCount(a.total,!1);$("#scheduled").html(c);cardlists.length<=FETCH_THRESHOLD&&cardlists.length>0&&!("ahead"in cardlists[cardlists.length-1])&&
$.ajax({type:"GET",url:generateAjaxUrlUpToCards()+"/prefetch",dataType:"json",data:{},success:function(a){Array.prototype.push.apply(cardlists,a)},error:function(a){setSignalMsg(a.responseText)}})}},error:function(){removeElementFromArray(pendingAJAXMemorizeRequestCardIds,b);processMemorizeQueue()}});return!1}
function memorize(a,b,c,d,e,f,k,g,h,i,j){if(isListeningMode&&typeof a!="undefined"||!isListeningMode&&typeof b!="undefined")pendingAJAXMemorizeRequestCardIds.length==0?sendMemorizeRequestToServer(a,b,c,d,e,f,k,g,h,i,j):addToMemorizeQueue(a,b,c,d,e,f,k,g,h,i,j)}
function nextCard(){
	if(cardlists.length>0)
		{
			var a=cardlists.splice(0,1)[0];
			typeof wordScoreDelta=="undefined"&&(wordScoreDelta=null);
			handleNextCardData(a,wordScoreDelta)
		}else
		 $.ajax({type:"GET",url:generateAjaxUrlUpToCards()+"/next",
		 	dataType:"json",
		 	data:{},
		 	success:function(a){
		 		cardlists=a.slice(0);
		 		a=cardlists.splice(0,1)[0];
		 		typeof wordScoreDelta=="undefined"&&(wordScoreDelta=null);
		 		handleNextCardData(a,wordScoreDelta)
		 	},error:function(a){setSignalMsg(a.responseText)}});return!1
		}
function setUserScoreAndToolTip(a,b,c){$("#user-score").html(a+"<span id='user-score-tooltip' class='tooltip-sign'></span>");$(".mobile-score").html(a);a=c!=null?gettext("Your previous score is: ")+b+gettext(". <br/>The score change for the word just reviewed is: ")+c+gettext(". <br/>So, your current score is: ")+b+" + "+c+" = <strong>"+a+"</strong>.<br/>"+HOW_MYSCORE_COMPUTED_LABEL:gettext("Your score is : ")+a+".<br/>"+HOW_MYSCORE_COMPUTED_LABEL;setToolTip_right("user-score-tooltip",a,375)}
function setWordScoreToolTip(a,b,c){a=gettext("The score you just got for this word is: ")+a+gettext(".<br>The previous score you got is: ")+b+gettext(".<br>So, the score change is: ")+a+" - "+b+" = <strong>"+c+"</strong>"+gettext(".<br><a href='/guide/#word-score'>How words are scored?</a>");setToolTip_right("word-score-delta-tooltip",a,300)}
function setToolTip(a,b,c){$("#"+a).qtip({content:b,position:{corner:{target:"rightTop",tooltip:"topLeft"}},style:{width:c,color:"#21377F",background:"#fff",name:"blue"},border:{width:7,radius:8,color:"#0096C8"},show:"mouseover",hide:{when:"mouseout",fixed:!0}})}
function setToolTip_keyboardShortcuts(a,b,c){$("#"+a).qtip({content:b,position:{corner:{target:"leftMiddle",tooltip:"bottomLeft"},adjust:{y:-7}},style:{width:c,color:"#21377F",background:"#fff",name:"blue"},border:{width:7,radius:8,color:"#0096C8"},show:"mouseover",hide:{when:"mouseout",fixed:!0}})}
function setToolTip_right(a,b,c){$("#"+a).qtip({content:b,position:{corner:{target:"topLeft",tooltip:"topRight"}},style:{width:c,color:"#21377F",background:"#fff",name:"blue"},border:{width:7,radius:8,color:"#0096C8"},show:"mouseover",hide:{when:"mouseout",fixed:!0}})}
function continueHandleNextCardData(a)
{
	"last_card"in a?(NEXT_OR_DONE_LABEL=DONE_LABEL,NEXT_OR_DONE_EXPLANATION=DONE_LABEL_EXPLANATION):(NEXT_OR_DONE_LABEL=NEXT_LABEL,NEXT_OR_DONE_EXPLANATION=NEXT_LABEL_EXPLANATION);
testType=a.test_type;
var b=setCardInfo(a,!0,isMCQ,testType);
dictIdGlobal=b[0];
vocab=b[1];
isFront=b[2];
manuallyCreated=b[3];
isPhrase=b[4];
stressFirstSyl=b[5];
repetition=b[6];
var b=a.chosen_example,c,d;
if(isPhrase)
	c=a.chosen_example_occurrence,
	d=a.chosen_example_occurrence_ignored_indexes;
var e;
testType==TEST_TYPE_SENTENCE_AUDIO_TYPING_WORD&&(e=a.chosen_example_audio);
var f=a.placeholder_string,
	k=a.options,
	g=null,
	h=null,
	i=null,
	j=null,
	l=null;
if(testType==TEST_TYPE_WORD_MEANING||testType==TEST_TYPE_AUDIO_MEANING||testType==TEST_TYPE_MEANING_WORD)
	i=a.option_dids,
	j=a.option_language_codes,
	l=a.option_locations,
	testType==TEST_TYPE_WORD_MEANING||testType==TEST_TYPE_AUDIO_MEANING?g=a.option_words:h=a.option_meanings;
	var m=a.option_audios;
	indexCorrectOption=a.index_correct_option;
	isTestTypeAudioTyping=
a.is_test_type_audio_typing;
isTestTypeImageWord=a.is_test_type_image_word;
$("#show-answer").attr("disabled",!1);
hideBackSide(isMCQ,isPhrase,testType,a.delay_audio,b,c,d,e,f,k,m,i,g,h,j,l,manuallyCreated);
isMCQ?testType==TEST_TYPE_MEANING_WORD?(isTestTypeImageWord?isPhrase?
		($("#word-question").html(ASK_IMAGE_PHRASE_LABEL),
		$("#question-instructions").html(ASK_IMAGE_PHRASE_INSTR))
		:
		($("#word-question").html(ASK_IMAGE_WORD_LABEL),
		$("#question-instructions").html(ASK_IMAGE_WORD_INSTR))
		:isPhrase?($("#word-question").html(ASK_PHRASE_LABEL),
	$("#question-instructions").html(ASK_PHRASE_INSTR)):($("#word-question").html(ASK_WORD_LABEL),$("#question-instructions").html(ASK_WORD_INSTR)),$("#question-instructions").show()):testType==TEST_TYPE_FILL_BLANK?(isPhrase?$("#word-question").html(ASK_BLANK_PHRASE_LABEL):$("#word-question").html(ASK_BLANK_WORD_LABEL),$("#question-instructions").hide()):testType==TEST_TYPE_AUDIO_MEANING?(isPhrase?($("#word-question").html(ASK_AUDIO_MEANING_PHRASE_LABEL),$("#question-instructions").html(ASK_AUDIO_MEANING_PHRASE_INSTR)):
	($("#word-question").html(ASK_AUDIO_MEANING_WORD_LABEL),$("#question-instructions").html(ASK_AUDIO_MEANING_WORD_INSTR)),$("#question-instructions").show()):testType==TEST_TYPE_WORD_MEANING?(isPhrase?($("#word-question").html(ASK_MEANING_PHRASE_LABEL),$("#question-instructions").html(ASK_MEANING_PHRASE_INSTR)):($("#word-question").html(ASK_MEANING_WORD_LABEL),$("#question-instructions").html(ASK_MEANING_WORD_INSTR)),$("#question-instructions").show()):testType==TEST_TYPE_AUDIO_TYPING_WORD?(isPhrase?
	$("#word-question").html(ASK_AUDIO_PHRASE_LABEL):$("#word-question").html(ASK_AUDIO_TYPING_WORD_LABEL),$("#question-instructions").hide()):testType==TEST_TYPE_SENTENCE_AUDIO_TYPING_WORD&&(isPhrase?$("#word-question").html(ASK_SENTENCE_AUDIO_PHRASE_LABEL):$("#word-question").html(ASK_SENTENCE_AUDIO_TYPING_WORD_LABEL),$("#question-instructions").hide()):(isFront?isPhrase?$("#word-question").html(ASK_MEANING_PHRASE_LABEL):$("#word-question").html(ASK_MEANING_WORD_LABEL):isPhrase?$("#word-question").html(ASK_PHRASE_LABEL):
	$("#word-question").html(ASK_WORD_LABEL),
	$("#word-answer").html(ANSWER_INS_LABEL));
	!usedAudio&&(testType==TEST_TYPE_AUDIO_MEANING||testType==TEST_TYPE_AUDIO_TYPING_WORD)&&showAudioWizard();
	$("#delcard").show();
	$("#editcard").show()
}
function hideElementsBeforeSmartReviewCompletePage()
{
	clearContents();
	$("#word-question").html("&nbsp;");
	$("#word-answer").html("");
	$(".word-input-question").html("&nbsp;");
	$(".word-input-instruction").html("&nbsp;");
	$(".word-input").html("&nbsp;");
	$(".word-input-bottom").html("&nbsp;");
	$("#guessResult").html("&nbsp;");
	$(".next").html("&nbsp;");
	$("#audio-input-question").html("&nbsp");
	$(".audio-input-bottom").html("&nbsp");
	$(".vocab-info-minimal").html("&nbsp;");
	$(".mobile-bottom").hide();
	$(".front-side").empty();
	$(".ex-image").empty();
	$(".back-side").empty();
	$(".options-side").empty();
	$("#show-answer").hide();
	$("#stats").hide();
	$("#switch-mode").hide();
	$("#next-button").hide()
}
function handleNextCardData(a){
	$(".rating").attr("disabled",!0);
	prevAction!=""&&(setSignalMsg(prevAction),prevAction="");
	if("ahead"in a||"expired"in a||"empty"in a)
		{
			answerMode=!1;
			$("#session").val("");
			clearContents();
			$("#word-question").html("&nbsp;");
			$("#word-answer").html("");
			$(".word-input-question").html("&nbsp;");
			$(".word-input-instruction").html("&nbsp;");
			$(".word-input").html("&nbsp;");
			$(".word-input-bottom").html("&nbsp;");
			$("#guessResult").html("&nbsp;");
			$(".next").html("&nbsp;");
			$("#audio-input-question").html("&nbsp");
			$(".audio-input-bottom").html("&nbsp");
			$(".vocab-info-minimal").html("&nbsp;");
			$(".mobile-bottom").hide();
			if("ahead"in a)
				$(".front-side").empty(),
				$("#front-content-below-image-wrapper").html("&nbsp;"),
				$(".ex-image").css("visibility","hidden"),
				$(".back-side").empty(),$(".options-side").empty(),
				$("#show-answer").hide(),$("#stats").hide(),
				$("#switch-mode").hide(),$("#next-button").hide(),
				$('<p class="center">'+SENDING_RESULTS+"</p>").insertAfter("#word-question"),
				isDeleteCard&&checkConditionToRedirectToSmartReviewComplete()&&
redirectToSmartReviewComplete();
			else
			{
				var b;
				if("expired"in a)
				{
					b='<p class="center" style="font-weight: bold">'+EXPIRED_DECK_MSG+"</p>";
					var c=gettext("To continue learning this deck, please")+" ",
					d="center";
					a.sub_renew_url?(c+="<a href='"+a.sub_renew_url+"'>"+gettext("renew your LeeRit Pro Account")+"</a>",
					a.wl_renew_url&&(c+=" "+gettext("or")+" <a href='"+a.wl_renew_url+"'>"+gettext("renew just this wordlist")+"</a>",
					d="justify")):c+=a.wl_renew_url?"<a href='"+a.wl_renew_url+"'>"+gettext("renew this wordlist")+
"</a>":"<a href='/contact/'>"+gettext("contact LeeRit")+"</a>";
					b+='<p class="'+d+'" style="font-size: 16px; line-height:25px;">'+c+"</p>";$("li.utility").remove();$("#word-count-wrapper").remove()}else b='<p class="center" style="font-weight: bold">'+EMPTY_DECK_MSG+"</p>",c=gettext("You can")+" <a href='/wordlists/'>"+gettext("load a wordlist")+"</a> "+gettext("into this deck or ")+"<a href='/decks/"+$("#deck-select").val()+"/words/new'>"+gettext("manually add words")+"</a>",b+='<p class="center">'+
c+"</p>";
					$(".front-side").append(b);
					$("#show-answer").attr("disabled",!0)
				}	
					$("#delcard").parent().remove();
					$("#editcard").parent().remove()
			}else 
				isDeleteCard=!1,
				clearContents(),
				isMCQ?(usedMCQ||$.ajax({type:"POST",url:"/account/on_used_mcq",success:function(){usedMCQ=!0}}),
				continueHandleNextCardData(a),
				usedFillBlank||$.ajax({type:"POST",url:"/account/on_used_fill_blank",success:function(){usedFillBlank=!0}})):continueHandleNextCardData(a)
			}
function showAnswer()
{
	answerMode?(showBackSide(vocab,isFront,manuallyCreated,stressFirstSyl),
		$("#show-answer").attr("disabled",!0),
		$("#show-answer").blur(),
		$(".rating").attr("disabled",!1)):window.location="/smart-review/complete"
}
function updateWordCount(a,b)
{
	var c;
	c=b?parseInt($("#total-value").html())+a:a;
	c="<a href='/vocabs/'><span id='total-value'>"+c+"</span> "+(c>1?gettext("words"):gettext("word"))+"</a>";
	$("#total").html(c)
}
function deleteCard()
{
	var a=gettext("Are you sure you want to delete this word?");
	if(!confirm(a))return!1;
	var b=$("#cardid").val();
	$.ajax({type:"POST",url:"/decks/"+deckid+"/words/"+b+"/delete",dataType:"text",data:{},success:function(){$("#cardid").val("");
		$(".rating").attr("disabled",!0);
		var a="card-"+b;
		$("#"+a).remove();
		$("."+a+"-back").remove();
		$("#reviewed-words-list li").size()==0&&$("#reviewed-words").html("");
		updateWordCount(-1,!0);
		prevAction=gettext("Word deleted");
		isDeleteCard=!0;nextCard();
		$("#show-answer").attr("disabled",!1);
		$(".front-side").unbind("click")},error:function(a){alert(a.responseText)}});
		return!1
}
function editCard()
{
	location.href="/decks/"+deckid+"/words/"+$("#cardid").val()+"?edit"
}
function preserveSpaceNormalBehavior(){return $(".help-form textarea").is(":focus")}
function spaceButtonKeyUp(){preserveSpaceNormalBehavior()||($("#next-button").is(":visible")||$("#lesson-next-button").is(":visible")?recordRating():$(".audio-input-wrapper").is(":visible")&&$("#audio-input-question-inner").click())}
function bindShortcuts(){$(document).bind("keydown","shift+a",function(){location.href="/flashcards/decks/"+deckid+"/cards/new"});$(document).bind("keydown","shift+m",function(){location.href="/vocabs/"});$(document).bind("keydown","shift+u",editCard);$(document).bind("keydown","shift+d",deleteCard);$(document).bind("keydown","shift+s",showAnswer);$(document).bind("keypress","1",function(){$(".options:nth-child(1) input").click()});$(document).bind("keypress","2",function(){$(".options:nth-child(2) input").click()});
$(document).bind("keypress","3",function(){$(".options:nth-child(3) input").click()});$(document).bind("keypress","4",function(){$(".options:nth-child(4) input").click()});$(document).bind("keypress","5",function(){$(".options:nth-child(5) input").click()});window.addEventListener("keydown",function(a){[37,39].indexOf(a.keyCode)>-1&&a.preventDefault();isMCQ&&[32].indexOf(a.keyCode)>-1&&!preserveSpaceNormalBehavior()&&a.preventDefault()},!1);isMCQ&&$(document).bind("keyup","space",function(){spaceButtonKeyUp()})}
;
