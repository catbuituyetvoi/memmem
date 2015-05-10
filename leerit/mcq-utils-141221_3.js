// we assume that a width < 800 pixels indicates a mobile device
var MOBILE_MAX_WIDTH = 800;

var skipButtonPressed = false;

var delayAudioUsedMCQ = false; // delay audio because fancybox is displayed for first-time users

var CORRECT_OPT = 'correct-opt';
var INCORRECT_OPT = 'incorrect-opt';

var MEANING_EMPTY = "You haven't recorded the meaning for this word yet.";
var EDITOR_FUNCS = "bold italic underline | color highlight removeformat | undo redo"; // |
																						// print";
																						// //source";

// ===In rendering a word============///
var CLICK_TO_HEAR = gettext("Click to hear");

var ENCTX_LABEL = gettext("You encountered the word in the following context");
var PRONUNC_LABEL = gettext("Pronunciation");
var PATTERNS_LABEL = gettext("Patterns");
var EXAMPLES_LABEL = gettext("Examples");
var SYNONYMS_LABEL = gettext("Synonyms");
var OPPOSITES_LABEL = gettext("Opposites");
var PHRASE_LABEL = gettext("Phrase");

// /===================================

// ===labels for fill in the blank============///
var FILL_BLANK_INSTRUCTION_LABEL = gettext('Please type your answer and press Enter');
var FILL_BLANK_INSTRUCTION_LABEL_MOBILE = gettext('Please type your answer and press Submit');
var FILL_BLANK_INSTRUCTION_LABEL_MOBILE_ANDROID = FILL_BLANK_INSTRUCTION_LABEL_MOBILE;
var FILL_BLANK_INSTRUCTION_LABEL_MOBILE_IOS = FILL_BLANK_INSTRUCTION_LABEL_MOBILE;
var AUDIO_TYPING_INSTRUCTION_LABEL = gettext('Please type the word that you heard and press Enter');
var AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE = gettext('Please type the word that you heard and press Submit');
var AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE_ANDROID = AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE;
var AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE_IOS = AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE;
var SENTENCE_AUDIO_TYPING_INSTRUCTION_LABEL = AUDIO_TYPING_INSTRUCTION_LABEL;
var SENTENCE_AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE = AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE;
var SENTENCE_AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE_ANDROID = AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE_ANDROID;
var SENTENCE_AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE_IOS = AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE_IOS;
var GET_A_HINT_LABEL = gettext('Get a hint');
var GET_A_HINT_TOOLTIP_LABEL_PART_1 = gettext('You can get up to');
var GET_A_HINT_TOOLTIP_LABEL_PART_2 = gettext('hint(s) for this word.');
var GET_A_HINT_TOOLTIP_LABEL_PART_3 = gettext('Each hint will allow you to click on <strong>1</strong> letter to reveal it. But each time you use a hint, you will be deducted <strong>1</strong> point for this word :P');
var GET_A_HINT_INSTRUCTION_LABEL = gettext("Please click on a cell to reveal the letter");
var ANSWER_LABEL = gettext('Answer');
var MEANING_LABEL = gettext('Meaning');
var KEYBOARD_SHORTCUTS_LABEL = gettext('Keyboard shortcuts');
var KEYBOARD_SHORTCUTS_TOOLTIP_LABEL = '<em>' + pgettext('Keyboard shortcuts', 'General')
	+ '</em>' + '<br /><strong>' + pgettext('Keyboard shortcuts', 'Space')
	+ '</strong>: ' + gettext('Go to next question') + '<br /><br />'
	+ '<em>' + gettext('MCQ questions') + '</em><br /><strong>'
	+ pgettext('Keyboard shortcuts', '1 &ndash; 5') + '</strong>: '
	+ gettext('Choose the 1st &ndash; 5th option') + '<br /><br />'
	+ '<em>' + gettext('Audio questions') + '</em><br /><strong>'
	+ pgettext('Keyboard shortcuts', 'Space') + '</strong>: '
	+ gettext('Replay the audio');

var FIRST_EXERCISE_BODY_LABEL_1 = gettext('At LeeRit, you will:');
var FIRST_EXERCISE_BODY_LABEL_2 = gettext('Learn vocabulary the correct way');
var FIRST_EXERCISE_BODY_LABEL_3 = gettext("You will not only remember a word's meaning but also know its usage patterns and correct pronunciation.");
var FIRST_EXERCISE_BODY_LABEL_4 = gettext('Remember new words faster');
var FIRST_EXERCISE_BODY_LABEL_5 = gettext('Depending on whether you answer the questions correctly or not, we will automatically plan when you need to review a word or learn a new one.');
var FIRST_EXERCISE_BODY_LABEL_6 = gettext("Let's start!");
var FIRST_EXERCISE_BODY_LABEL_7 = gettext("Start");

var NEW_EXERCISE_HEADING_LABEL = gettext('New Exercise &ndash; Fill in the Blank');
var NEW_EXERCISE_BODY_LABEL_1 = gettext('This question introduces a new exercise');
var NEW_EXERCISE_BODY_LABEL_2 = gettext('fill in the blank');
var NEW_EXERCISE_BODY_LABEL_3 = gettext('which helps you to remember the word spelling');
var NEW_EXERCISE_BODY_LABEL_4 = gettext('This exercise is only available for the words whose meanings you have remembered well');
// /===================================

// ===labels for audio question============///
var CLICK_TO_HEAR_AGAIN_LABEL = gettext('Click or press Space to hear the pronunciation again');
var CLICK_HERE_LABEL = gettext('Click here');
var TO_HEAR_LABEL = gettext('to hear the pronunciation');
var TO_HEAR_AGAIN_LABEL = gettext('to hear the pronunciation again');
// /===================================

// ===labels for words encountered for the first time============///
var DO_YOU_KNOW_LABEL = gettext('This is a new word. Can you guess it?');
var YES_LABEL = gettext('Yes');
var NO_LABEL = gettext('No');
// /===================================


var showRandomImageOptions = false;

var arrayCharInput = [];


// DEPRECATED, no longer needed
function getRootCallerURL(url) {
	// strip away the GET params
	var paramIndex = url.indexOf('?');
	if (paramIndex != -1) {
		referrer = url.substring(0, paramIndex);
	} else {
		referrer = url;
	}

	return referrer;
}

function setSignalMsg(action, duration) {
	if (duration === undefined) duration = 5000;
	if (action != "") {
		$(".playfield").append(
				'<div class="message-wrapper"><div class="msg"></div></div>');
		$('.msg').html(action + "!").fadeOut(duration);
		return true;
	}
	return false;
}

// deprecated, to be phased out
function setMsg(msg) {
	if (msg != "") {
		$('#signal-msg').html(msg).fadeOut(1000);
		return true;
	}
	return false;
}

function clearContents() {
	// clear content
	$('.front-side, .back-side').empty();
	$('.opt-wrapper').remove();

	$('.repetition').hide();

	$('#guessResult, #typingGuessResult').empty();
}

var score; // score is used as rating for questions where users need to select
			// an option

// 0 (word not asked yet); > 0: same value as testType
var difficulty;

//for typing exercise, the number of incorrect chars (when comparing the user's input and the correct answer)
var numIncorrectChars = -1;
var numHintsUsed = -1; // the number of hints a user uses

var numIncorrectOptions = -1; // the message for wrong answers at different times are
						// different;

var timeoutID; // used to cancel the displaying of "get a hint" when an answer
				// is already typed before the time out

function recordRating() {
	var learnedDictId = dictIdGlobal;
	var learnedCardId = $('#cardid').val();
	
	//alert ('record rating called for id = ' + learnedCardId); //testing
		
	// do this because sometimes we press 'Next' before mobile-guessResult is scheduled to be timeout
	$('#mobile-guessResult').hide();
	
	// NOTE: we MUST empty the word lesson or else it will be mistaken as the
	// lesson for the next words as well
	if ($('#word-lesson').html() != "") {// it might have been cleared if
											// user click next lesson inside the
											// lesson
		$('#word-lesson').html('').removeClass('mcq-review').hide();
		$('#word-quiz').show();
	}
	
	// keep a copy because nextCard would set score to MAX_SCORE_MEANING_WORD
	// and the memorize and nextCard calls below are asynchronous (so we don't know the actual execution order)
	var learnedScore = score;
	var learnedDifficulty = difficulty;
	var learnedTestType = testType;
	var learnedIsTestTypeImageWord = isTestTypeImageWord;
	var learnedNumIncorrectChars = numIncorrectChars;
	var learnedNumHintsUsed = numHintsUsed;
	var learnedNumIncorrectOptions = numIncorrectOptions; 

	var hardChoices = [];
	var easyChoices = [];

	//alert ('test type = ' + testType + ', diff = ' + difficulty);
	
	// select the choices that user selected wrongly (they are "hard choices")
	// the .incorrect tells us that user has selected this wrong option
	// This is NA for typing questions
	if (testType != TEST_TYPE_FILL_BLANK && testType != TEST_TYPE_SENTENCE_AUDIO_TYPING_WORD && (testType != TEST_TYPE_AUDIO_TYPING_WORD || !isTestTypeAudioTyping)) {
		// if the options are meaning, we need to get the corresponding word
		var selectUnderlyingWord = (testType == TEST_TYPE_WORD_MEANING || testType == TEST_TYPE_AUDIO_MEANING) ? true: false;

		var word, optId, opt;
		$('.options.incorrect input[type=radio].incorrect-opt').each(
				function() {
					if (selectUnderlyingWord) {
						optId = $(this).prop('id');
						// get the underlying word of this meaning
						word = $('#' + optId + '-word').html();
					} else {// if the options are word, we can just get the value of the option
						word = $(this).val();
					}
					hardChoices.push(word);
				}
		);

		// select easy choices (user didn't select)
		$('.options').not('.incorrect, .correct').each(function() {
			$opt = $(this).find("input[type=radio].incorrect-opt");
			if (selectUnderlyingWord) {
				// get the underlying word of this meaning
				word = $('#' + $opt.prop('id') + '-word').html();
			} else {
				word = $opt.val();
			}
			easyChoices.push(word);
		});
	}

	
	// check this condition to make sure that we don't call this function more than once for a particular card,
	// which may happen when user double clicks the next button
	if (isListeningMode) {
		if (lastRecordRatingDictId == '' || learnedDictId != lastRecordRatingDictId) {
			lastRecordRatingDictId = learnedDictId;
			
			nextCard();
		}
	} else {
		if (lastRecordRatingCardId == -1 || learnedCardId != lastRecordRatingCardId) {
			lastRecordRatingCardId = learnedCardId;
			
			nextCard();
		}
	}
	
	//alert ('About to call memorize for this card: id = ' + learnedCardId); //testing
	
	memorize(learnedDictId, learnedCardId, learnedTestType,
			 learnedIsTestTypeImageWord, learnedScore, learnedDifficulty, learnedNumIncorrectChars,
			 learnedNumHintsUsed, learnedNumIncorrectOptions, hardChoices, easyChoices);
}

// this is called from flashcard.js and learned_flashcard.js
function getPseudoIsFront(isMCQ, isFront, testType) {
	var pseudoIsFront;
	// if Flashcard mode: use isFront from flashcard object
	// if MCQ mode: use test type to determine
	if ((!isMCQ && isFront)
			|| (isMCQ && (testType == TEST_TYPE_WORD_MEANING || testType == TEST_TYPE_AUDIO_MEANING))) {
		pseudoIsFront = true;
	} else {
		pseudoIsFront = false;
	}
	return pseudoIsFront;
}

function displayAudioQuestion(delayAudio, sentenceAudio) {
	$('#word-info').hide();

	$('.audio-input-bottom').html("&nbsp;");

	// may have been hidden by mcq -> show again
	$('.audio-input-wrapper').show();

	var fullAudioUS;
	if (sentenceAudio == null) {
		fullAudioUS = getAudioPrefixPath(audioUS) + audioUS;
	} else {
		fullAudioUS = getAudioPrefixPath(sentenceAudio) + sentenceAudio;
	}

	$('#audio-input-question')
			.html(
					'<span id="audio-input-question-inner" style="cursor: pointer;" onclick="playSound(\''
							+ fullAudioUS
							+ '\');"><img src="/static/flashcards/images/audio_icon.jpg" /></span>');

	if (isMobileTabletBrowser) {
		// want this for BOTH mobile and tablet
		$('.audio-input-bottom').html('<span style="cursor: pointer; color: #0073AD; text-decoration: underline;" onclick="playSound(\''
				+ fullAudioUS
				+ '\');">' + CLICK_HERE_LABEL + '</span>&nbsp<span style="color: #666666;">' + TO_HEAR_AGAIN_LABEL + '</span>');
	} else {
		$('.audio-input-bottom').html(
				'<span style="color: #666666;">' + CLICK_TO_HEAR_AGAIN_LABEL
						+ '</span>');
	}

	var timeout;
	if (delayAudioUsedMCQ) {
		timeout = 1000;
	} else {
		timeout = 0;
	}
	
	//if (!isMobileTabletBrowser) { // need to confirm with Android on 3G before putting this in
		// on mobile and tablet usually we can't play sound automatically
		// so here we check that it is NOT mobile or tablet
		setTimeout(function() {
			if (delayAudio) {
				setTimeout(function() {
					playSound(fullAudioUS);
				}, 1000);
			} else {
				playSound(fullAudioUS);
			}
		}, timeout);
	//}
}


function hideAudioWizard() {
	if (testType == TEST_TYPE_FILL_BLANK || testType == TEST_TYPE_AUDIO_TYPING_WORD) {
		$('.word-input-wrapper').show();
		$('#typingGuessResult').show();
	} else {
		$('#guessResult').show();
		$('#question-instructions').show();
		$('.options-side').show();
	}

	if (!isMobileBrowser) {
		$('.next').show();
	}

	$('#audio-wizard').hide();
}


function showAudioWizard() {
	$('#audio-wizard').show();

	if (testType == TEST_TYPE_FILL_BLANK || testType == TEST_TYPE_AUDIO_TYPING_WORD) {
		$('.word-input-wrapper').hide();
		$('#typingGuessResult').hide();
	} else {
		$('#guessResult').hide();
		$('#question-instructions').hide();
		$('.options-side').hide();
	}

	if (!isMobileBrowser) {
		$('.next').hide();
	}

	$('#yes-can-hear-button').click(function() {
		usedAudio = true;
		hideAudioWizard();
	});

	$('#no-cant-hear-button').click(function() {
		$('#audio-wizard-screen-2-wrapper').show();
		$('#audio-wizard-screen-1-wrapper').hide();

		$('#turn-off-audio-button').click(function() {
			// $.form('/smart-review/set_audio_mode', {'audio-mode': false}).submit();

			// $('<form action="/smart-review/set_audio_mode" method="POST">' + 
		 //    '<input type="hidden" name="audio-mode" value="false">' +
		 //    '</form>').submit();

			$.ajax({
				type: "POST", 
				url: '/smart-review/set_audio_mode',
				dataType: "json",
				data: {'audio-mode': false},
				success: function(data) {},
				error: function (request, status, error) {}
			});

			$('#audio-wizard-screen-3-wrapper').show();
			$('#audio-wizard-screen-2-wrapper').hide();

			$('#ok-button').click(function() {
				location.reload(true);
			});
		});
	});
}


/*
function displayDoYouKnowLabel(elementToShow, contentToAppendBeforeShowing,
		isMCQTest, testType, showSpeakerIcon) {
	$('.audio-first-time').show();
	$('.audio-first-time')
			.html(
					'<div style="font-weight:bold;">'
							+ DO_YOU_KNOW_LABEL
							+ '</div><br /><div><span class="do-you-know-button" id="first-time-no">'
							+ NO_LABEL
							+ '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="do-you-know-button" id="first-time-yes">'
							+ YES_LABEL + '</span>');

	$('#first-time-yes').click(function() {
		$('.audio-first-time').hide();
		$(elementToShow).show();
		if (contentToAppendBeforeShowing != '') {
			$(elementToShow).append(contentToAppendBeforeShowing);
		}
		if (isMCQTest) {
			showMCQTest(testType);
		} else {
			showTypingTest(testType, showSpeakerIcon);
		}
	});
}
*/

function programaticallySubmitTypingExercise(callingElement, isSkipButton) {
	if (isSkipButton) {
		skipButtonPressed = true;
	}
	
	var e = jQuery.Event("keypress");
	e.keyCode = 13; // enter key
	$("#char-input-1").trigger(e);

	if (isSkipButton) {
		skipButtonPressed = false; // reset the value to false
	}

	callingElement.hide();
	$('#next-button').show();
}


function showDontKnowButtonOrSkipButtonOrSubmitTypingButton(allowSubmitTypingButton, allowSkipButton) {
	if (allowSubmitTypingButton) {
		var buttonHTML = '<div id="submit-typing-button" class="right-button white-button" role="button" style="-webkit-user-select: none; -moz-user-select: none;" title="' + SUBMIT_TYPING_LABEL_EXPLANATION + '">' + SUBMIT_TYPING_LABEL + '</div>';
	
		$('.mobile-bottom-buttons').append(buttonHTML);
		$('.mobile-bottom').show();

		$('#submit-typing-button').click(function() {
			programaticallySubmitTypingExercise($(this), false)
		});
	} else {
		if (repetition == 0) {
			var dontKnowButtonHTML = '<div id="dont-know-button" class="right-button white-button" role="button" style="-webkit-user-select: none; -moz-user-select: none;" title="' + I_DONT_KNOW_LABEL_EXPLANATION + '">' + I_DONT_KNOW_LABEL + '</div>';
			if (isMobileBrowser) {
				$('.mobile-bottom-buttons').append(dontKnowButtonHTML);
				$('.mobile-bottom').show();
			} else {
				$('.next').append(dontKnowButtonHTML);
			}

			$('#dont-know-button').click(function() {
				// when dont-know-button is clicked, we should start from scratch
				difficulty = 1;
				score = 1;
				
				displayLesson(true);
			});
		} else {
			if (allowSkipButton) {
				var skipButtonHTML = '<div id="skip-button" class="right-button white-button" role="button" style="-webkit-user-select: none; -moz-user-select: none;" title="' + SKIP_LABEL_EXPLANATION + '">' + SKIP_LABEL + '</div>';
				
				// we assume that when this happens, we are in article listening
				// mode. in this mode, we want to have a wrapper so that we can
				// center the skip button
				if (typeof listeningId !== 'undefined') {
					skipButtonHTML = "<div id='skip-button-wrapper'>" + skipButtonHTML + "</div>";	
				}

				if (isMobileBrowser) {
					// for now, don't support skip button on mobile because skip
					// button will be shown at the bottom of the screen. and it is
					// only enabled after user has used up all the hints. at that
					// time, when we show the skip button, we will automatically
					// scroll to the bottom of the screen. this will create some
					// confusion for the user, because s/he may still want to guess
					// the answer, but the skip button is shown

					// $('.mobile-bottom-buttons').append(skipButtonHTML);
					// $('.mobile-bottom').show();
				} else {
					$('.next').append(skipButtonHTML);
				}

				$('#skip-button').click(function() {
					programaticallySubmitTypingExercise($(this), true)
				});

				$('#skip-button').hide();
			}
		}
	}
}


function showGetAHintButton(numHintsAllowed) {
	if (numHintsAllowed > 1) {
		$('.word-input-help')
				.html(
						'<span class="word-input-help-icon">'
								+ GET_A_HINT_LABEL
								+ '</span>&nbsp;&nbsp;<span class="word-input-help-num-hints">x&nbsp;&nbsp;'
								+ numHintsAllowed.toString()
								+ '</span>&nbsp;<span title="" class="tooltip-sign" id="help-tooltip"></span>');
	} else {
		$('.word-input-help')
				.html(
						'<span class="word-input-help-icon">'
								+ GET_A_HINT_LABEL
								+ '</span><span title="" class="tooltip-sign" id="help-tooltip"></span>');
	}
	
	var tooltip = GET_A_HINT_TOOLTIP_LABEL_PART_1 + ' <strong>'
	+ numHintsAllowed.toString() + '</strong> '
	+ GET_A_HINT_TOOLTIP_LABEL_PART_2 + '<br /><br />'
	+ GET_A_HINT_TOOLTIP_LABEL_PART_3;
	
	setToolTip('help-tooltip', tooltip, 310);
}


function focusInputField(id) {
	// only do the focus if it is not mobile
	if (!isMobileBrowser) {
		$(id).focus();
	}

	// on mobile, we don't want to do this because whenever we focus on an input
	// field, the keyboard will be shown automatically at the bottom of the
	// screen and it will make the visible area much smaller, i.e., only a small
	// part of the question can be seen, which is not very convenient for the
	// user
}

function setWordInputInstruction(testType) {
	var label;
	if (testType == TEST_TYPE_FILL_BLANK) {
		if (isMobileBrowser) {
			if (isAndroidBrowser) {
				label = FILL_BLANK_INSTRUCTION_LABEL_MOBILE_ANDROID;
			} else if (isIOSBrowser) {
				label = FILL_BLANK_INSTRUCTION_LABEL_MOBILE_IOS;
			} else {
				label = FILL_BLANK_INSTRUCTION_LABEL_MOBILE;
			}
		} else {
			label = FILL_BLANK_INSTRUCTION_LABEL;
		}
	} else if (testType == TEST_TYPE_AUDIO_TYPING_WORD) {
		if (isMobileBrowser) {
			if (isAndroidBrowser) {
				label = AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE_ANDROID;
			} else if (isIOSBrowser) {
				label = AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE_IOS;
			} else {
				label = AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE;
			}
		} else {
			label = AUDIO_TYPING_INSTRUCTION_LABEL;
		}
	} else {
		if (isMobileBrowser) {
			if (isAndroidBrowser) {
				label = SENTENCE_AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE_ANDROID;
			} else if (isIOSBrowser) {
				label = SENTENCE_AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE_IOS;
			} else {
				label = SENTENCE_AUDIO_TYPING_INSTRUCTION_LABEL_MOBILE;
			}
		} else {
			label = SENTENCE_AUDIO_TYPING_INSTRUCTION_LABEL;
		}
	}

	$(".word-input-instruction").html(label);
}


function wordInputHelpIconOnClick(event) {
	var numHints = event.data.numHints;
	var spaceIndices = event.data.spaceIndices;
	var placeHolderString = event.data.placeHolderString;
	var isPhrase = event.data.isPhrase;
	var chosenExampleOccurrenceIgnoredIndexes = event.data.chosenExampleOccurrenceIgnoredIndexes; 
	var showSpeakerIcon = event.data.showSpeakerIcon; 
	var testType = event.data.testType;
	
	if (numHints - numHintsUsed > 0) {
		numHintsUsed++;
		
		countCharsToBeTyped = showCharInputFieldsOrLockIcons(isPhrase, vocabWithoutSpace, spaceIndices,
				chosenExampleOccurrenceIgnoredIndexes, false);
		
		$(".word-input").hide();
		$('.word-input-help').hide();
		$(".word-input-instruction")
				.html(
						GET_A_HINT_INSTRUCTION_LABEL);

		for ( var i = 1; i <= vocabWithoutSpace.length; i++) {
			$('#letter-' + i.toString())
					.bind(
							'click',
							{
								'i' : i
							},
							function(event) {
								var i = event.data.i;

								$("#char-input-" + i.toString())
									.attr('value', vocabWithoutSpace.charAt(i - 1));
								$("#char-input-" + i.toString())
									.attr('disabled', true);
								// special css for letter revealed using the
								// hint
								$("#char-input-" + i.toString())
									.css({"backgroundColor" : "#b7f8a2",
										  "color" : "#0b4f30"});

								// we need to change the behavior of the input
								// fields before and after the selected letter
								// to skip the selected letter

								// find the first non-disabled letter before
								// the revealed letter
								var prevNonDisabled = findFirstNonDisabledLetterBefore(i);

								// find the first non-disabled letter after the
								// revealed letter
								var nextNonDisabled = findFirstNonDisabledLetterAfter(i);

								// modify key events for prevNonDisabled and
								// nextNonDisabled
								if (prevNonDisabled != -1) {
									setKeyPressEventForCharInput(
											prevNonDisabled,
											vocabWithoutSpace.length,
											spaceIndices,
											testType,
											placeHolderString,
											isPhrase,
											chosenExampleOccurrenceIgnoredIndexes,
											showSpeakerIcon);
								}
								if (nextNonDisabled != -1) {
									setKeyPressEventForCharInput(
											nextNonDisabled,
											vocabWithoutSpace.length,
											spaceIndices,
											testType,
											placeHolderString,
											isPhrase,
											chosenExampleOccurrenceIgnoredIndexes,
											showSpeakerIcon);
								}

								$(".word-input").show();
								$(".word-input-show-letter").hide();
								setWordInputInstruction(testType);

								// if there are still some hints left, show the
								// hint option
								if (numHints - numHintsUsed > 0) {
									showGetAHintButton(numHints - numHintsUsed);
									$('.word-input-help').show();
								}

								// find the first input field that is not
								// disabled to set the focus
								for ( var j = 1; j <= vocabWithoutSpace.length; j++) {
									if ($("#char-input-" + j.toString())
											.is(":disabled") == false) {
										focusInputField("#char-input-" + j.toString());
										break;
									}
								}

								// if no more hints, allow skip button
								if (numHints - numHintsUsed == 0) {
									// need to do a check here
									// because from the time we set time out
									// to the moment just before showing the skip button
									// the user may have typed in a correct answer
									// in that case, we should not show the skip button anymore
									setTimeout(function() {
										if (!$('#next-button').is(":visible") &&
											!$('#dont-know-button').is(":visible") &&
											!$('#submit-typing-button').is(":visible")) {
											showSkipButton();
										}
									}, 3500);
								}
							});
		}
	}
}


function divCharInputClickFunction(clickedElement) {
	var charInput = clickedElement.children();

	// only handle click event if it has a character
    if (charInput.text() != "") {
	    var charSelect = $("#" + arrayCharInput[charInput.attr('id')]);
	    
	    charSelect.css("visibility", "visible");
	    // re-enable click event of the parent of this element
	    charSelect.parent(".div-char-keypad").click(function() {
			divCharKeyPadClickFunction($(this));
	    });

	    charInput.text("");
	    // remove click event of the parent of this element
	    charInput.parent(".div-char-input").unbind();
	    delete arrayCharInput[charInput.attr('id')];
    }
}


function divCharKeyPadClickFunction(clickedElement) {
	// each .div-char-keypad only has 1 child, so child Element is only 1 element
    var charSelect = clickedElement.children();

    // only handle click event if it has NOT been hidden by
    // ("visibility", "hidden")
    if (charSelect.css("visibility") != "hidden") {
        $("#word-input-wrapper-input-area .char-input-block").children().each(function() {
            var charInput = $(this).children();
            if (charInput.text() == "") {
                charInput.text(charSelect.text());
                // enable click event of the parent of this element
                charInput.parent(".div-char-input").click(function() {
			        divCharInputClickFunction($(this));
			    });

                charSelect.css("visibility", "hidden");
                // remove click event of the parent of this element
                charSelect.parent(".div-char-keypad").unbind();

                var idCharInput = charInput.attr('id');
                var idCharSelect = charSelect.attr('id')
                arrayCharInput[idCharInput] = idCharSelect;

                // break out of the "each" loop
                return false;
            }
        });
    }
}


//if in typing exercise: show char input fields
//else if in 'get a hint mode': show char input fields/lock icons
//return: number of non-disabled chars
function showCharInputFieldsOrLockIcons(isPhrase, vocabWithoutSpace, spaceIndices,
		chosenExampleOccurrenceIgnoredIndexes, isTypingMode) {
	var parentClassName,
		charInputWrapperClassName,
		charInputBlockIDPrefix,
		charInputIDPrefix;
	if (isTypingMode) {
		parentClassName = 'word-input';
		charInputWrapperClassName = 'char-input-wrapper';
		charInputBlockIDPrefix = 'char-input-block-';
		charInputIDPrefix = 'char-input-';
		charInputIDPrefix_typingMode = charInputIDPrefix; 
	} else {
		parentClassName = 'word-input-show-letter';
		charInputWrapperClassName = 'char-input-wrapper-show-letter';
		charInputBlockIDPrefix = 'char-input-block-show-letter-';
		charInputIDPrefix = 'char-input-show-letter-';
	}
	
	$("." + parentClassName).replaceWith(
			'<div class="' + parentClassName + '" style="text-align: center;">'
			+ '<span class="' + charInputWrapperClassName + '">'
			+ '<span class="char-input-block" id="' + charInputBlockIDPrefix + '1"></span>'
			+ '</span>'
			+ '</div>');
	
	var curIndexInSpaceIndices = 0;
	var charInputBlockNumber = 1;
	var chosenExampleOccurrenceIgnoredIndexes_index = 0;
	var countNonIgnoredChars = 0;
	var matchedIgnoredIndex = false;
	for ( var i = 1; i <= vocabWithoutSpace.length; i++) {
		// plus 1 because values in chosenExampleOccurrenceIgnoredIndexes start from 0
		matchedIgnoredIndex = isPhrase
			&& charInputBlockNumber ==
				chosenExampleOccurrenceIgnoredIndexes[chosenExampleOccurrenceIgnoredIndexes_index] + 1;
		
		// set margin-bottom for char-input because if there are so many input
		// fields and they go over to the
		// 2nd row, then there will be a small spaces between lines of input
		// fields -> easier to see

		// it happens that font-size: 120%; is the same as font-size: 18px;
		// here we choose to use the latter; note how it coincides nicely with
		// height: 18px; of input field
		
		if ((isTypingMode == true) ||
				(isTypingMode == false &&
						$("#" + charInputIDPrefix_typingMode + i.toString()).is(":disabled"))) {
			if (isMobileTabletBrowser) {
				// the reason we use <div class="char-input"> instead of
				// <input class="char-input"> is because on Android (e.g., 2.2),
				// clicking (i.e., touching) on disabled input fields doesn't
				// fire any events
				$("#" + charInputBlockIDPrefix + charInputBlockNumber.toString()).append(
						'<div class="div-char-input"><div class="char-input" id="' + charInputIDPrefix + i.toString() + '"</div></div>');
			} else {
				$("#" + charInputBlockIDPrefix + charInputBlockNumber.toString()).append(
						'<input class="char-input" id="' + charInputIDPrefix + i.toString() + '"'
						+ ' type="text" onclick="this.select();" tabindex="' + i.toString() + '" />');
			}
			
			// these are the two cases where we reveal the letter:
			// 1. [both desktop and mobile/tablet] typing mode and matches
			//    ignored index
			// 2. [only dekstop] hint mode (always revealed letter because in
			//    the previous if statement
			//    we have checked .is(":disabled"))
			if ((isTypingMode && matchedIgnoredIndex) || (isTypingMode == false)) {
				$('#' + charInputIDPrefix + i.toString()).attr('value', vocabWithoutSpace.charAt(i - 1));
				$('#' + charInputIDPrefix + i.toString()).attr('disabled', true);
				
				if (matchedIgnoredIndex) {
					// if matchedIgnoredIndex, for both typing mode and hint mode
					// style it using 'char-input-disabled' (gray background)
					$('#' + charInputIDPrefix + i.toString()).addClass('char-input-disabled');
				} else {
					// if we go to this branch, it means we are in hint mode,
					// so we style with 'opened-letter' (green background)
					$('#' + charInputIDPrefix + i.toString()).addClass('opened-letter');
				}
			}
			
			// there used to be:
			//
			// else if (isMobileTabletBrowser) {
			//     $('#' + charInputIDPrefix + i.toString()).attr('disabled', true);
			// }
			//
			// since we have switched to using div on mobile, there's no need to
			// disable char-input any more
			
			if (matchedIgnoredIndex == false) {
				countNonIgnoredChars++;
			}
		// only for hint mode: show lock icons
		} else if (isTypingMode == false) {
			$("#" + charInputBlockIDPrefix + charInputBlockNumber.toString()).append(
					'<img id="letter-' + i.toString() + '"'
					+ ' src="/static/flashcards/images/unlock-icon.png" />');
		}
		
		// add space between words (if vocab contains more than one word)
		if (spaceIndices.length > 0
				&& curIndexInSpaceIndices <= spaceIndices.length - 1) {
			if (i == spaceIndices[curIndexInSpaceIndices]) {
				charInputBlockNumber++;
				
				if (matchedIgnoredIndex) {
					chosenExampleOccurrenceIgnoredIndexes_index++;
				}
				
				$("." + charInputWrapperClassName).append(
						'<span class="char-input-space">&nbsp;</span>'
						+ '<span class="char-input-block" id="' + charInputBlockIDPrefix
						+ charInputBlockNumber.toString() + '"></span>');
				curIndexInSpaceIndices++;
			}
		}
	}
	
	// typing mode:
	// add padding-right so that when we display the correct/wrong icon
	// the input fields will not be shifted to the left
	// hint mode:
	// also add padding-right to be consistent with typing mode 
	$('#' + charInputBlockIDPrefix + charInputBlockNumber.toString()).addClass('with-margin-right');

	if (isTypingMode) {
		$("." + parentClassName).append(
				'<img class="correct-icon" src="/static/flashcards/images/correct-icon.png" />'
				+ '<img class="wrong-icon" src="/static/flashcards/images/wrong-icon.png" />');
		
		focusInputField("#char-input-1");
	}

	// on mobile/tablet, we'll show virtual keypad, so here we initialize the
	// placeholder
	if (isMobileTabletBrowser) {
		$('.word-input-bottom').hide();

		$('.word-input-wrapper').after(
			'<div class="word-input-wrapper" id="word-input-wrapper-keypad">'
				+ '<div class="word-input" style="text-align: center;">'
					+ '<span class="char-input-wrapper">'
						+ '<span class="char-input-block" id="char-keypad-block"></span>'
					+ '</span>'
				+ '</div>'
			+ '</div>');

		generateHTMLForVirtualKeypad();

	    // use click() on .div-char-keypad because the input fields are disabled and cannot be attached to click()
	    $(".div-char-keypad").click(function() {
			divCharKeyPadClickFunction($(this));
	    });
	}
	
	return countNonIgnoredChars;
}


function initNextButton(showKeyboardShortcuts) {
	var buttonColorClass;
	if (isMobileBrowser) {
		buttonColorClass = 'white-button';
	} else {
		buttonColorClass = 'blue-button';
	}

	var nextButtonHTML = '<div id="next-button" class="right-button '
						 + buttonColorClass + '" role="button" style="-webkit-user-select: none; -moz-user-select: none;" title="' + NEXT_OR_DONE_EXPLANATION + '">' + NEXT_OR_DONE_LABEL + '</div>';

	if (isMobileBrowser) {
		$('.mobile-bottom-buttons').html(nextButtonHTML);
	} else {
		var newHTMLContent = '<div class="next clearfix">';
		if (showKeyboardShortcuts) {
			newHTMLContent += '<span title="" class="tooltip-sign-small" id="keyboard-shortcuts">'
							  + KEYBOARD_SHORTCUTS_LABEL + '</span>'
		}
		newHTMLContent += nextButtonHTML;
		newHTMLContent += '</div>';

		$('.next').replaceWith(newHTMLContent);

		if (showKeyboardShortcuts) {
			setToolTip_keyboardShortcuts('keyboard-shortcuts', KEYBOARD_SHORTCUTS_TOOLTIP_LABEL, 350);
		}
	}

	$('#next-button').click(function() {
		if ($('#next-button').is(":visible") || $('#lesson-next-button').is(":visible")) {
			//alert ('recordRating called inside next button clicked: showTypingTest'); //testing*/
			recordRating();
		}
	});

	$('#next-button').hide();
}


// ------- these functions are for typing exercises on mobile/tablet

NUM_CHARS_VIRTUAL_KEYPAD_PER_ROW = NUM_CHARS_VIRTUAL_KEYPAD / 2;

function generateHTMLForVirtualKeypad() {
    var arrayChar = generateVirtualKeypad();
    var charSelect;
    for (var i=0; i < NUM_CHARS_VIRTUAL_KEYPAD; i++) {
    	// var charSelect = '<div class="div-char-keypad">\
    	// 					<input class="char-input" id="char-keypad-' + i +'" type="text" value="' + arrayChar[i] + '" disabled="disabled">\
					// 	</div>';

		// the reason we use <div class="char-input"> instead of
		// <input class="char-input"> is because on Android (e.g., 2.2),
		// clicking (i.e., touching) on disabled input fields doesn't fire any events
		charSelect = '<div class="div-char-keypad">\
						<div class="char-input" id="char-keypad-' + i +'">' + arrayChar[i] + '</div>\
					</div>';
        if (i == NUM_CHARS_VIRTUAL_KEYPAD_PER_ROW - 1) {
            charSelect += '<br/>'
        }
        $("#char-keypad-block").append(charSelect);
    }

    var submitButton = '<br /><div class="div-char-submit">\
    					<div id="char-submit-button" \
    					class="char-input char-submit">' + SUBMIT_TYPING_LABEL +
    					'</div></div>';
    $("#char-keypad-block").append(submitButton);

    $('#char-submit-button').click(function() {
    	programaticallySubmitTypingExercise($(this), false);
	});
}

function generateVirtualKeypad() {
    var word = vocabWithoutSpace.toUpperCase();
    var mycharacters = [];
    // we want each alphabet to be chosen at most 2 times, so that's why we
    // duplicate the string here
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i=0; i < word.length; i++) {
        // note that replace() only replaces the first occurrence
        possible = possible.replace(word.charAt(i), '');
    }

    for (var i=0; i < NUM_CHARS_VIRTUAL_KEYPAD - word.length; i++) {
        var mychar = possible.charAt(Math.floor(Math.random() * possible.length));
        mycharacters.push(mychar);
        possible = possible.replace(mychar, '');
    }

    for (var i=0; i < word.length; i++) {
        var index = Math.floor(Math.random() * (NUM_CHARS_VIRTUAL_KEYPAD + 1))
        mycharacters.splice(index, 0, word.charAt(i));
    }

    return mycharacters;
}
// -------


function showTypingTest(testType, isPhrase, chosenExampleOccurrence, chosenExampleOccurrenceIgnoredIndexes, placeHolderString, showSpeakerIcon) {
	if (isPhrase) {
		vocab = chosenExampleOccurrence;
	}
	
	// trim spaces
	vocab = $.trim(vocab);
	// replace multiple spaces with single spaces:
	// http://stackoverflow.com/questions/1981349/regex-to-replace-multiple-spaces-with-a-single-space
	vocab = vocab.replace(/\s{2,}/g, ' ');

	var spaceIndices = getIndicesOf(' ', vocab, false);
	// we need to "discount" the space indices here
	// e.g. vocab = 'a lot of'
	// spaceIndices before discounting is [1, 5], which are the indices in the
	// string vocab
	// but because we are going to use spaceIndices to know after which
	// character we should introduce the space
	// we should discount the accummulating number of spaces before that (which
	// increase the indices of the white
	// spaces in the string vocab)
	// so, after discounting, spaceIndices of 'a lot of' should be [1, 4]
	// that is, for first space index, no discount (b/c there are no spaces
	// before it)
	// for second space index, minus one (b/c there is 1 space before it)
	// for third space index, minus two (b/c there are 2 spaces before it)
	// and so on
	if (spaceIndices.length > 0) {
		var currentDiscount = 0;
		for ( var j = 0; j < spaceIndices.length; j++) {
			spaceIndices[j] -= currentDiscount;
			currentDiscount++;
		}
	}

	// note that in is_short_enough_for_mobile_tablet() in flashcards/views.py
	// we do something similar to count the number of characters that a user
	// has to type in. the purpose is to decide whether that word can be tested
	// on mobile/tablet or not. so any changes here should be reflected there as
	// well 
	vocabWithoutSpace = vocab.replace(/\s+/g, '');
	
	var countCharsToBeTyped = showCharInputFieldsOrLockIcons(isPhrase, vocabWithoutSpace, spaceIndices,
			chosenExampleOccurrenceIgnoredIndexes, true);
	
	// need to put the call to setKeyPressEventForCharInput() in a separate loop
	// because it needs to check the 'disabled' attributes of ALL input fields
	// to set the correct key press events
	for ( var i = 1; i <= vocabWithoutSpace.length; i++) {
		setKeyPressEventForCharInput(i, vocabWithoutSpace.length, spaceIndices,
				testType, placeHolderString, isPhrase, chosenExampleOccurrenceIgnoredIndexes, showSpeakerIcon);
	}

	if (testType == TEST_TYPE_AUDIO_TYPING_WORD
			&& isTestTypeAudioTyping == true) {
		setWordInputInstruction(testType);
	} else if (testType == TEST_TYPE_FILL_BLANK) {
		setWordInputInstruction(testType);
	} else {
		setWordInputInstruction(testType);
	}
	$(".word-input-instruction").show();

	$('.front-side').prepend(
			'<strong>' + MEANING_LABEL + ':</strong><br /><br />');

	// show the hint option only for desktop, not for mobile/tablet
	// and if the word only has 1 character, don't show the hint option for that
	// word
	// the philosophy here is that numHints should always be < vocab.length
	// so that users have to fill in at least 1 character themselves
	if (!isMobileTabletBrowser && countCharsToBeTyped > 1) {
		var numHints = Math.min(Math.ceil(countCharsToBeTyped / 2),
				MAX_SCORE_FILL_BLANK - 2);
		timeoutID = setTimeout(
				function() {
					var numHintsAllowed = numHints - numHintsUsed;
					showGetAHintButton(numHintsAllowed);
					$('.word-input-help').fadeIn();

					$('.word-input-help-icon').die();

					// use live() instead of click() so that the event handler
					// will also handle events in the future
					$('.word-input-help-icon').live('click',
							
							{'numHints': numHints,
							'spaceIndices': spaceIndices,
							'placeHolderString': placeHolderString,
							'isPhrase': isPhrase,
							'chosenExampleOccurrenceIgnoredIndexes': chosenExampleOccurrenceIgnoredIndexes,
							'showSpeakerIcon': showSpeakerIcon,
							'testType': testType},
							
							function(event) {
								wordInputHelpIconOnClick(event);
							}
					);
				}, 7000);
	}

	initNextButton(true);

	showDontKnowButtonOrSkipButtonOrSubmitTypingButton(false, true);
}

// "vocab-display" class is used to highlight the current word
// however, sometimes we don't want this highlight so this function can be used to remove it
// input: <ul class="examples">...The numbers <label class="vocab-display">add</label> up to exactly 100...</ul>
//    parentClass = "examples" in this case
// output: The numbers add up to exactly 100.
function removeVocabDisplayTag(parentClass) {
	// use 'each' here because there may be multiple '.vocab-display'
	$('ul.examples').find('.vocab-display').each(function() {
		$(this).replaceWith($(this).text());
	});
}

function jQueryShowInlineBlock(element) {
	element.css('display', 'inline-block');
}


function showNextButton() {
	// first, hide the other buttons
	if ($('#submit-typing-button').is(":visible")) {
		$('#submit-typing-button').hide();
	} else if (repetition == 0) {
		$('#dont-know-button').hide();
	} else {
		$('#skip-button').hide();
	}

	// then, show the next button
	$('#next-button').show();
	if (isMobileBrowser) {
		$('.mobile-bottom').show();
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	}
}

function showSkipButton() {
	$('#skip-button').show();

	// see the reason why we disable the skip button on mobile for now
	// in the comments of showDontKnowButtonOrSkipButton()
	// if (isMobileBrowser) {
	// 	$('.mobile-bottom').show();
	// 	$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	// }
}


// when we switch from e.g., lesson view, back to mcq view, we need to set these
// CSS if the current question is image-word
function addImageWordCSSClasses() {
	if (isMobileTabletBrowser) {
		// on mobile & tablet, we don't use slim scroll, so we should hide
		// front-side
		$('.front-side').addClass('display-none');
	} else {
		// need to use $('.front-side').parents('.slimScrollDiv') because there
		// is another .slimScrollDiv for #reviewed-words-list. so if we just
		// write $('.slimScrollDiv').addClass('display-none'), it will affect
		// #reviewed-words-list
		$('.front-side').parents('.slimScrollDiv').addClass('display-none');
	}

	$('.ex-image').addClass('ex-image-center');
}


// reset these CSS, because if the previous question is MEANING_WORD
// we may have modified these CSS values
function removeImageWordCSSClasses() {
	if (isMobileTabletBrowser) {
		// on mobile & tablet, we don't use slim scroll, so we should remove
		// the class from front-side instead
		$('.front-side').removeClass('display-none');
	} else {
		// need to use $('.front-side').parents('.slimScrollDiv') because there
		// is another .slimScrollDiv for #reviewed-words-list. so if we just
		// write $('.slimScrollDiv').addClass('display-none'), it will affect
		// #reviewed-words-list
		$('.front-side').parents('.slimScrollDiv').removeClass('display-none');
	}
	$('.ex-image').removeClass('ex-image-center');
}


function showMCQTest(testType) {
	if (testType == TEST_TYPE_MEANING_WORD && isTestTypeImageWord) {
		addImageWordCSSClasses();

		var front_content_clone = $('#front-content').clone();
		front_content_clone.attr('id', 'front-content-below-image');
		// reduce font-size so that user focuses on the image more
		front_content_clone.css('font-size', '14px');
		front_content_clone = $('<div id="front-content-below-image-wrapper" style="text-align: center; margin-top: 10px;"></div>').append(front_content_clone);

		$('#word-info').append(front_content_clone);
	}

	var maxScore;
	
	// set and hide the audio (and other info) so that when users select the
	// correct option
	// the audio will be readily available (otherwise it will take some time to
	// load)
	// Currently, this is meant for meaning-word mcq only
	// BUT the intended effect of pre-loading is NOT working!!!
	// under .options, the link is hidden by default
	//setAudio_ExtraInfoLink($('.' + CORRECT_OPT).parents(".options"), isPhrase, true, true, false, true);

	// initialize score; every wrong click would decrease the score by 1
	if (testType == TEST_TYPE_MEANING_WORD) {
		maxScore = MAX_ACCUM_SCORE_MEANING_WORD;
	} else if (testType == TEST_TYPE_AUDIO_MEANING) {
		maxScore = MAX_ACCUM_SCORE_AUDIO_MEANING;
	} else if (testType == TEST_TYPE_WORD_MEANING) {
		maxScore = MAX_ACCUM_SCORE_WORD_MEANING;
	} else if (testType == TEST_TYPE_AUDIO_TYPING_WORD) {
		maxScore = MAX_ACCUM_SCORE_AUDIO_TYPING_WORD;
	} else if (testType == TEST_TYPE_SENTENCE_AUDIO_TYPING_WORD) {
		maxScore = MAX_ACCUM_SCORE_SENTENCE_AUDIO_TYPING_WORD;
	}
	
	score = maxScore;

	initNextButton(true);

	showDontKnowButtonOrSkipButtonOrSubmitTypingButton(false, false);
	
	numIncorrectOptions = 0;
	$('.' + CORRECT_OPT).click(function() {
		if (numIncorrectOptions < 4) {
			// only display message if question was not skipped
			if (skipButtonPressed == false) {
				if (isMobileBrowser) {
					var msg = correctMsgs[numIncorrectOptions];
					// access msg and a random index 0 to len(msg) - 1
					msg = msg[Math.floor(Math.random() * msg.length)];
					$('#mobile-guessResult-inner').html(msg);
					
					$('#mobile-guessResult').show();
					
					/* save these, in case we want to come back to the fancy styles
					
					// access correctMsg_mobile and a random index 0 to len(correctMsg_mobile) - 1 
					var msg = correctMsg_mobile[Math.floor(Math.random() * correctMsg_mobile.length)]; 
					$('#mobile-guessResult-inner').html(msg);
					
					$('#mobile-guessResult').fadeIn();
					setTimeout(function() {
						$('#mobile-guessResult').fadeOut();
					}, 2000);
					
					*/
				} else {
					var msg = correctMsgs[numIncorrectOptions];
					// access msg and a random index 0 to len(msg) - 1
					msg = msg[Math.floor(Math.random() * msg.length)];
					$('#guessResult').removeClass('incorrect-guess').addClass('correct-guess').html(msg);
					$('#guessResult').show();
				}
			}
		}
						
		// show audio, reveal word under the image (if there is
		// image) and link to popped-up word details
		if (testType == TEST_TYPE_MEANING_WORD) {
			setAudio_ExtraInfoLink($(".correct-opt").parents(".options"), isPhrase, false, false, false, true);
			jQueryShowInlineBlock($(".correct-opt").parents(".options").children(".lookup"));
			//$(".correct-opt").parents(".opt-label").children(".lookup").show();

		} else if (testType == TEST_TYPE_AUDIO_MEANING
					|| (testType == TEST_TYPE_AUDIO_TYPING_WORD && isTestTypeAudioTyping == false)) {
			$(".audio-input-bottom").html(
					'<div class="audio-input-answer"><span class="word-input-answer-word">'
							+ vocab.toUpperCase()
							+ '</span></div>');
			
			// NOTE: the .lookup is not hidden (by css) under
			// audio-input-answer
			setAudio_ExtraInfoLink($(".audio-input-answer"), isPhrase, false, false, false, true);
			$('.mcq-inline-audio').prepend('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		} else if (testType == TEST_TYPE_WORD_MEANING) {
			setAudio_ExtraInfoLink($(".vocab-info-minimal"), isPhrase, false, false, false, true);
		}

		/*
		 * var wordClass; if (score == 5){ wordClass =
		 * 'correct-word'; } else { wordClass =
		 * 'incorrect-word'; } $('.ex-image .word').html("<a
		 * href='javascript:void(0);' onclick='$(\".ex-image
		 * img\").click();' class='" + wordClass + "'>" + vocab + "</a>");
		 */

		// disable all options clicking
		$('.' + CORRECT_OPT).attr('disabled', true);
		$('.' + INCORRECT_OPT).attr('disabled', true);

		// question done
		$('.' + CORRECT_OPT).parents(".options").addClass("correct");
		$('.' + INCORRECT_OPT).parents(".options").addClass("complete");

		setTimeout(function() {
			showAnswer(); // defined inside mcq.js
		}, 200);
		
		// if new word and not perfect score -> user has to learn this word from the first type
		if (repetition == 0 && score < maxScore) {
			difficulty = 1;
			score = 1;
		}
		
		showNextButton();
		
		$('#question-instructions').html('');
	});

	$('.' + INCORRECT_OPT).click(function() {
		// only display message if question was not skipped
		if (skipButtonPressed == false) {
			var msg = incorrectMsgs[numIncorrectOptions];
			msg = msg[Math.floor(Math.random() * msg.length)];
			$('#guessResult').removeClass('correct-guess').addClass('incorrect-guess').html(msg);
			$('#guessResult').show();
			
			//show explanations
			var explanation = insertOptionExplanationAndSaveButton($(this), testType);
			$('label[for=' + $(this).attr('id') + ']').append(explanation);
		}
		
		$(this).attr('disabled', true); // disable this option as it's already selected
		$(this).parents(".options").addClass("incorrect"); // For styling purpose

		--score;
		numIncorrectOptions++;
		
		// only the correct choice left, click the correct option and show answer automatically
		if (numIncorrectOptions == 4) {
			setTimeout(function() {
				$('.' + CORRECT_OPT).click();
			}, 200);
		}
		//hide the question instruction 
		$('#question-instructions').html('');
	});
}

function addWordFromOption($optId, $saveOptLabel, testType){
	var optId = $optId.attr('id');
	var dictId = $('#' + optId + '-did').html();
	
	//check if we've previously constructed the deck selection div, if so simply show them
	if ($('#opt-deck-selection-' + dictId).length > 0){
		$('#opt-deck-selection-' + dictId).show();
		$saveOptLabel.hide();
		return;
	}
	

	//clone the deck listing and change id
	var $deckListing = $('#deck-select').clone(); 
	$deckListing.attr('id', $deckListing.attr('id') + '-' + dictId);
	$deckListing.addClass('opt-deck-listing')
	
	var saveBtnId = 'save-opt-btn-' + dictId;
	var $saveBtn = $("<span>&nbsp;<button class='opt-save-btn' id='" + saveBtnId + "'>" + gettext("Save") + "</button></span>"); 
	
	var cancelSaveId = 'cancel-save-link-' + dictId;
	var $cancelSaveLink = $("<span>&nbsp;<a class='cancel-save-link' id='" + cancelSaveId + 
							"' href='javascript:void(0);'>" + gettext("Cancel") + "</a></span>");
	
	//wrap the deck listing and the btn inside a span
	var $deckSelectionWrapper = $("<span class='opt-deck-selection-wrapper' id='opt-deck-selection-" + dictId + "'></span>");
	$deckSelectionWrapper.append($deckListing);
	$deckSelectionWrapper.append($saveBtn);
	$deckSelectionWrapper.append($cancelSaveLink);
	
	$saveOptLabel.hide();
	$('#' + optId + '-opt-explanation-wrapper').append($deckSelectionWrapper);
	
	$('#' + cancelSaveId).click(function(){
		$deckSelectionWrapper.hide();
		$saveOptLabel.show(); //show the btn to allow users to click save again if they want to
	});
	
	$('#' + saveBtnId).click(function(){
		$saveBtn.attr('disabled', true);
		$deckSelectionWrapper.hide();
		
		var selDeckId = $deckListing.val(), 
			langCode = $('#' + $optId.attr('id') + '-langcode').html(), 
			pageURL = document.URL, 
			cardId = $('#cardid').val();
		$.ajax({
			type: "POST", 
			url: "/decks/-1/words/save-to-mcq/mcq-options/",
			data: {'dictId': dictId, 'langCode': langCode, 'ctxUrl': pageURL, 'deckId': selDeckId, 
					'cardId': cardId, 'testType': testType},
			dataType: "json",
			success: function(data){
				if (data.allowed) {
					if (data.existed == 1) {
						//var word = (testType == TEST_TYPE_MEANING_WORD)? $optId.val(): $('#' + $optId.attr('id') + '-word').html();
						$("#opt-deck-selection-" + dictId).show();
						$('#' + saveBtnId).attr('disabled', false);
						alert (WORD_DUPLICATE_ERROR_MSG);
					} else if (data.exceeded == 1) {
						$("#opt-deck-selection-" + dictId).show();
						$('#' + saveBtnId).attr('disabled', false);
						alert (EXCEED_MAX_WORDS_IN_DECK_ERROR_MSG);
					} else {//ok
						$("#opt-deck-selection-" + dictId).remove();
						//currently, we don't display the success msg b/c it will form in user a habit of waiting for this msg
						//and b/c our server's processing speed is currently not very fast, this may cause unncessary delay 
						//in user's learning experience
						/*
						$('#' + optId + '-opt-explanation-wrapper').append(
													"<span class='opt-saved-success-msg' id='opt-saved-success-msg-" + dictId + "'>" 
													+ gettext("Saved!") + "</span>");
						$('#opt-saved-success-msg-' + dictId).fadeOut(3000);
						*/
						//if user added the word to the current deck, we need to increase the number of words by 1 
						if (selDeckId == deckid) {
							updateWordCount(1, true);
						}
					}
				} else {//not allowed to do this
					$("#opt-deck-selection-" + dictId).remove(); //hide the deck selection
					var exceedMsg = "<br/>" + gettext("You have already reached the saving limit of") + " " + data.saving_limit + " " + gettext("words") + 
									".<br/>" + gettext("In order to save unlimited words while learning with Smart MCQ, please upgrade to") + " " + 
											"<a href='/account/payment/leerit-pro-account/?r=opt-saving'>" + 
											gettext("LeeRit Pro Account") + "</a>";
					
					$('#' + optId + '-opt-explanation-wrapper').append(
									"<span class='opt-saved-exceed-msg' id='opt-saved-exceed-msg-" + dictId + "'>" 
									+ exceedMsg + "</span>");
				}
			},
			error: function (request, status, error) {
				alert(request.responseText);
			}
		});
	});//click handler
	
}

function insertOptionExplanationAndSaveButton($optId, testType){
	var optId = $optId.attr('id');
	var explanation = '';
	if (testType == TEST_TYPE_MEANING_WORD || testType == TEST_TYPE_WORD_MEANING || testType == TEST_TYPE_AUDIO_MEANING){
		var dictId = $('#' + optId + '-did').html();
		//if already in this deck, we'll tell users about this and there is no save button
		var optionInThisDeck= $('#' + optId + '-location').html() == 'true'; 
		var saveOptLabelId = 'save-option-label-' + dictId; 
		
		if (testType == TEST_TYPE_MEANING_WORD) {
			var meaning = $('#' + optId + '-meaning').html();	
			var explanation = "<span class='opt-explanation-wrapper' id='" + optId + "-opt-explanation-wrapper'>" + 
									"<span class='opt-explanation-label'>" + 
										gettext("the meaning of") + " " + (isPhrase? gettext("this phrase"): gettext("this word")) + " " + gettext("is") + 
									": " + "</span>" + 
									"<span class='opt-explanation'>" + meaning + "</span>" + 
									(!optionInThisDeck? "<span class='save-option-label' id='" + saveOptLabelId + "'>" + 
											SAVE_OPTION_LABEL + "</span>"
											: "<span class='option-exist-label'>(" + (isPhrase? gettext("This phrase"): gettext("This word")) + 
												" " + gettext("also belongs to this deck") + ")</span>"
									) + 
							  "</span>";
		} else {
			var word = $('#' + optId + '-word').html();
			var explanation = "<span class='opt-explanation-wrapper' id='" + optId + "-opt-explanation-wrapper'>" + 
									"<span class='opt-explanation-label'>" + 
										gettext("this is a meaning of") + " " + (isPhrase? gettext("the phrase"): gettext("the word")) + 
									": " + "</span>" + 
									"<span class='opt-explanation'>" + word  + "</span>"; 
			
			if (testType == TEST_TYPE_AUDIO_MEANING) {
				//additional explanations to suit this type of ex
				explanation += "<span class='opt-explanation-label'>" + ". " + 
								gettext("But this is not the word you just heard.") + "</span>"; 
			} 
			
			explanation += (!optionInThisDeck? "<span class='save-option-label' id='" + saveOptLabelId + "'>" + SAVE_OPTION_LABEL + "</span>"
											: "<span class='option-exist-label'>(" + (isPhrase? gettext("This phrase"): gettext("This word")) + 
												" " + gettext("also belongs to this deck") + ")</span>"
							) + 
							"</span>"; //span of wrapper
		} 
		
		//this wrapper function avoids the last value in a closure problem: 
		//http://stackoverflow.com/questions/6425062/passing-functions-to-settimeout-in-a-loop-always-the-last-value
		$(document).on("click", "#" + saveOptLabelId, function(){
			return (function(currentOptId, saveOptLabel) {
						addWordFromOption(currentOptId, saveOptLabel, testType);
					})($optId, $(this));
		});
	}

	return explanation;
}

// this is not strictly mobile
// but as long as the screen size is small (even on a PC) we want to do this
// because our mcq-review-responsive.css is also based on the width
/*
function isSmallScreen() {
	return window.innerWidth <= MOBILE_MAX_WIDTH;
}
*/

// Currently, the only place this is called is inside  mcq.js
function hideBackSide(isMCQ, isPhrase, testType, delayAudio,
						chosenExample, chosenExampleOccurrence, chosenExampleOccurrenceIgnoredIndexes,
						chosenExampleAudio, placeHolderString, 
						options, optionAudios, 
						underlyingDictIds, underlyingWords, underlyingMeanings, underlyingLanguageCodes, underlyingOptionLocations,
						manuallyCreated) {
	// TODO: consider moving this logic to the server side
	// so that in this .js file, difficulty is always equal to testType (for simplicity) 
	
	// the only 2 cases where difficulty is different from testType
	// case 1. don't know button is clicked. in this case, we want to start from scratch, i.e., difficulty = 1
	// case 2. the answer to the first question of a new word is wrong. in this case, we also want to start
	// from scratch, i.e., difficulty = 1
	difficulty = testType;
	
	pseudoIsFront = getPseudoIsFront(isMCQ, isFront, testType);

	if (pseudoIsFront) { // front-side contains vocab, back-side contains
							// meaning
		$('#back-content').hide();
		$('#edit-back').hide(); // deprecated, to be phased out
		$('.examples').hide();
		$('.synonyms').hide();
	} else { // the back side contains vocab
		if (manuallyCreated) {
			$('#back-content').hide();
			$('#edit-back').hide(); // deprecated, to be phased out
		} else {
			// vocab-para contains back-content (which is the word) and other
			// annotations such as POS, audios, etc.
			$('#vocab-para').hide();
			$('#idioms').hide();
			$('#usage-patterns').hide();
		}
	}

	if ($('#dict').length > 0) {
		// store this so that this value can be used in showBackSide()
		dictContent = $('#dict').html();

		// we always want to hide this, because if we display it, users can
		// easily get the answer
		// no matter whether the current flashcard question is guess the word,
		// or guess the meaning
		$('#dict').remove();
	}

	if (!isMCQ) {
		$('.back-side').prepend(
				'<textarea id="guess" class="content-edit"></textarea>');
		$('#guess').focus();
	}

	if (!pseudoIsFront) { // users need to guess the word
		// move pos from back to front
		// because right now if there is no further details of the word, we
		// won't display the back-side
		// and this means user won't know the POS of this word

		if ($('#pos').length > 0) {// this means pos element exists, NOT that
									// pos != ""
			var posContent = $('#pos').html();
			$('#pos').remove();
			var posHtml;
			if (posContent != "") {
				posHtml = "(<label id='pos'>" + posContent + "</label>) ";
			} else {// just put an empty label there
				posHtml = "<label id='pos'></label>";
			}
			posHtml = "<span id='pos-in-meaning'>" + posHtml + "</span>";
			$('#front-content').html(posHtml + $('#front-content').html());
		}

	}
	
	$('.mobile-bottom').hide();

	// the 2 guess results are due to the html structure. Our goal is to alwasy
	// put the msg in the middle of the frame
	// the suitable one would be activated later
	$('#guessResult').html("&nbsp;").hide(); // this is for all types except
												// typing
	$('#typingGuessResult').html('&nbsp;').hide(); // for typing

	// put if (isMCQ) here because all the following test types are only meaningful when it is MCQ mode
	if (isMCQ) {
		removeImageWordCSSClasses();

		// may have been created by MEANING_WORD with isTestTypeImageWord == True
		// so we remove it here. note that this should not be included in
		// removeImageWordCSSClasses() because this function is also called by
		// lesson-back-button. and when it is called by this button, we still
		// need to display front-content-below-image-wrapper
		$('#front-content-below-image-wrapper').remove();

		$('#word-input-wrapper-keypad').remove();

		if (testType == TEST_TYPE_MEANING_WORD
				|| testType == TEST_TYPE_AUDIO_MEANING
				|| testType == TEST_TYPE_WORD_MEANING
				|| (testType == TEST_TYPE_AUDIO_TYPING_WORD && isTestTypeAudioTyping == false)) {
			$('#guessResult').show();
	
			// used in word typing mode only
			$('.word-input-wrapper').hide();
	
			// used in audio-meaning mode only
			$('.audio-input-wrapper').hide();
	
			// may have been hidden by fill-in-the-blank mode or audio mode, so we
			// show them here
			$('#examples-label').show();
			$('#examples-content').show();
	
			// note that it is important to handle the case of
			// TEST_TYPE_WORD_MEANING first
			// because it is going to hide #word-info, whereas the other test types
			// will show #word-info
			if (testType == TEST_TYPE_WORD_MEANING) {
				$('#word-info').hide();
	
				var pos = getHTML_EmptyIfNull($('#pos'));
				var vocabClass = !isPhrase? "lesson-word": "lesson-phrase"
				$('.vocab-info-minimal').html('<div class="vocab-display-wrapper"><label class="vocab-display ' + vocabClass + '">'
												+ (isPhrase? $('#idioms').html(): vocab) 
												+ '</label>'
												+ (!isPhrase && pos != "" ? ' (<label>' + pos + '</label>)' : "")
												+ '</div>'
											 ).show();
			} else {
				$('.vocab-info-minimal').hide();
	
				$('#word-info').show();
	
				if (testType == TEST_TYPE_AUDIO_MEANING
						|| testType == TEST_TYPE_AUDIO_TYPING_WORD) { // only for
																		// audio
																		// question
					displayAudioQuestion(delayAudio, null);
				} else if (testType == TEST_TYPE_MEANING_WORD) {
					if (isPhrase) {
						// for idioms and phrasal verbs, we should not show POS
						// because POS is for the head word, and not for idioms and phrasal verbs
						$('#pos-in-meaning').hide();
						
						// for idioms and phrasal verbs, we want to hide the examples
						// and the encounter context because we're not able to do a good
						// 'hiding' of the correct answer for idioms & phrasal verbs yet
						$('#enctx-label').hide();
						$('#enctx-content').hide();
						$('#examples-label').hide();
						$('#examples-content').hide();
					}
					
					// note that "synonyms" class covers both synonyms and antonyms
					// we want to hide antonyms because antonyms may be one of the
					// MCQ choices
					// so displaying it here makes it too easy for the user to
					// eliminate the wrong choice
					$('.synonyms').hide();
	
					// highlight the meaning
					$('#front-content').css('font-size', '18px');
				}
			}
	
			// we'll display the options for users to select
			var groupName = "g" + vocab;
			var optionsHtml = '';
			var markerCls;
			for ( var i = 0; i < options.length; ++i) {
				var curOpt = options[i];
				if (i == indexCorrectOption) {
					markerCls = CORRECT_OPT;
				} else {
					markerCls = INCORRECT_OPT;
				}
				if (testType == TEST_TYPE_AUDIO_TYPING_WORD) {
					var fullOptionAudio = getAudioPrefixPath(optionAudios[i])
							+ optionAudios[i];
					optionsHtml += "<div class='options'><label for='"
							+ i
							+ "' class='opt-label'><input type='radio' id='"
							+ i
							+ "' name='"
							+ groupName
							+ "' value='"
							+ curOpt
							+ "' class='"
							+ markerCls
							+ "' > "
							+ curOpt
							+ ' <span style="cursor: pointer;" onclick="playSound(\''
							+ fullOptionAudio
							+ '\');"><img src="/static/flashcards/images/audio_icon.jpg" height="16" width="16" title="'
							+ CLICK_TO_HEAR_AGAIN_LABEL
							+ '" /></span></label></div>';
				} else {
					// if !(...) is because for the case of image options, we'll
					// populate the image options at a later point
					if (!((testType == TEST_TYPE_AUDIO_MEANING || testType == TEST_TYPE_WORD_MEANING)
						&& showRandomImageOptions)) {
						optionsHtml += "<div class='options'><label for='" + i
								+ "' class='opt-label'><input type='radio' id='" + i
								+ "' name='" + groupName + "' value='" + curOpt
								+ "' class='" + markerCls + "' > " + curOpt
								+ "</label></div>";
					}
				}
			}
	
			// store underlying info of the options
			var underlyingDictIdsHtml = '';
			if (underlyingDictIds !== null) {
				for ( var i = 0; i < underlyingDictIds.length; ++i) {
					underlyingDictIdsHtml += "<label id='" + i + "-did' class='underlying-dictids'>" + 
												underlyingDictIds[i] + "</label>";
				}
			} 
			var underlyingWordsHtml = '';
			if (underlyingWords !== null) {
				for ( var i = 0; i < underlyingWords.length; ++i) {
					underlyingWordsHtml += "<label id='" + i + "-word' class='underlying-words'>" + 
											underlyingWords[i] + "</label>";
				}
			}
			var underlyingMeaningsHtml = '';
			if (underlyingMeanings !== null) {
				for ( var i = 0; i < underlyingMeanings.length; ++i) {
					underlyingMeaningsHtml += "<label id='" + i + "-meaning' class='underlying-meanings'>" + 
											underlyingMeanings[i] + "</label>";
				}
			} 
			
			var underlyingLanguageCodesHtml = '';
			if (underlyingLanguageCodes !== null) {
				for ( var i = 0; i < underlyingLanguageCodes.length; ++i) {
					underlyingLanguageCodesHtml += "<label id='" + i + "-langcode' class='underlying-language-codes'>" + 
												underlyingLanguageCodes[i] + "</label>";
				}
			} 
			
			var alreadyInThisDeckHtml = '';
			if (underlyingOptionLocations !== null) {
				for ( var i = 0; i < underlyingOptionLocations.length; ++i) {
					alreadyInThisDeckHtml += "<label id='" + i + "-location' class='underlying-locations'>" + 
								underlyingOptionLocations[i] + "</label>";
				}
			} 
			
			
			
			optionsHtml = "<div class='opt-wrapper'>" + optionsHtml + underlyingWordsHtml + 
														underlyingMeaningsHtml + underlyingDictIdsHtml + 
														underlyingLanguageCodesHtml + 
														alreadyInThisDeckHtml + 
														"</div>";
	
			// option to skip the question when a user encounter a word for the
			// first time
			/*
			 * if (repetition == 0 && testType == TEST_TYPE_AUDIO_MEANING) {
			 * $('.options-side').hide(); displayDoYouKnowLabel('.options-side',
			 * optionsHtml, true, testType, false); } else {
			 */
	
			// for now, always show this and do not display DO_YOU_KNOW_LABEL
			$('.options-side').show();
			$('.options-side').append(optionsHtml);

			if ((testType == TEST_TYPE_AUDIO_MEANING || testType == TEST_TYPE_WORD_MEANING)
				&& showRandomImageOptions) {
				$.ajax({
					type: "GET", 
					url: "/smart-review/get-random-image-option",
					dataType: "json",
					data: {},
					success: function(data) {
						var img_urls = [];
						for (var i = 0; i < 5; ++i) {
							img_urls.push(data[i.toString()]);
							console.log(data[i.toString()]);
						}

						var tempHtml = "";
						var markerCls;
						var curImgURL;
						var skippedOneWrongOption = false;
						var count = 0;
						for (var i = 0; i < 5; ++i) {
							if (i == indexCorrectOption) {
								markerCls = CORRECT_OPT;
								if ($('.ex-image img').attr('src') === undefined) {
									curImgURL = img_urls[i];
								} else {
									curImgURL = $('.ex-image img').attr('src');
								}
							} else {
								if (skippedOneWrongOption) {
									markerCls = INCORRECT_OPT;
									curImgURL = img_urls[i];
								} else {
									skippedOneWrongOption = true;
									continue;
								}
							}

							if (count == 0 || count == 1) {
								if (count % 2 == 0) {
									tempHtml += "<div class='options " + markerCls + "' style='display: inline-block; float: left; margin-left: 80px; height: 150px; overflow: hidden; cursor: pointer;'><img src='" + curImgURL + "' style='height: 150px; width: 150px' />" + "<label for='" + i
									+ "' class='opt-label'><input type='radio' id='" + i
									+ "' name='" + groupName + "' value='" + curOpt
									+ "' class='" + markerCls + "' > "
									+ "</label></div>";
								} else {
									tempHtml += "<div class='options " + markerCls + "' style='display: inline-block; float: left; margin-left: 40px; height: 150px; overflow: hidden; cursor: pointer;'><img src='" + curImgURL + "' style='height: 150px; width: 150px' />" + "<label for='" + i
									+ "' class='opt-label'><input type='radio' id='" + i
									+ "' name='" + groupName + "' value='" + curOpt
									+ "' class='" + markerCls + "' > "
									+ "</label></div>";
								}
							} else {
								if (count % 2 == 0) {
									tempHtml += "<div class='options " + markerCls + "' style='display: inline-block; float: left; margin-left: 80px; margin-top: 40px; height: 150px; overflow: hidden; cursor: pointer;'><img src='" + curImgURL + "' style='height: 150px; width: 150px' />" + "<label for='" + i
									+ "' class='opt-label'><input type='radio' id='" + i
									+ "' name='" + groupName + "' value='" + curOpt
									+ "' class='" + markerCls + "' > "
									+ "</label></div>";
								} else {
									tempHtml += "<div class='options " + markerCls + "' style='display: inline-block; float: left; margin-left: 40px; margin-top: 40px; height: 150px; overflow: hidden; cursor: pointer;'><img src='" + curImgURL + "' style='height: 150px; width: 150px' />" + "<label for='" + i
									+ "' class='opt-label'><input type='radio' id='" + i
									+ "' name='" + groupName + "' value='" + curOpt
									+ "' class='" + markerCls + "' > "
									+ "</label></div>";
								}
							}

							count++;
						}
						
						$('.opt-wrapper').prepend(tempHtml);

						showMCQTest(testType);
					},
					error: function (request, status, error) {
						// do nothing
					}
				});
			} else {
				showMCQTest(testType);
			}
	
			// }
	
		} else if (testType == TEST_TYPE_FILL_BLANK || testType == TEST_TYPE_SENTENCE_AUDIO_TYPING_WORD
				|| (testType == TEST_TYPE_AUDIO_TYPING_WORD && isTestTypeAudioTyping)) {
			$('#typingGuessResult').show();
	
			numHintsUsed = 0;
	
			// these are the things to hide from mcq interface
			$('#examples-label').hide();
			$('#examples-content').hide();
			$('.options-side').hide();
			
			// note that this is only required for TEST_TYPE_FILL_BLANK
			// and not for TEST_TYPE_AUDIO_TYPING_WORD
			// for the former, we show fields such as meaning and encounter context
			// together with the question, so we need to hide the correct word
			// for the latter, we do not show fields like meaning and encounter context
			// so we need not hide the correct word
			if (testType == TEST_TYPE_FILL_BLANK || testType == TEST_TYPE_SENTENCE_AUDIO_TYPING_WORD) {
				// the correct word may appear in these fields, so we need to hide it
				showHideWord(false, placeHolderString, isPhrase, chosenExampleOccurrenceIgnoredIndexes);
			}
	
			// things need to hide from word-meaning test type
			$('.vocab-info-minimal').hide();
	
			// may have been hidden by audio mode, so we show it here
			$('#word-info').show();
	
			// things to hide from audio-meaning mode
			$('.audio-input-wrapper').hide();
	
			$('.word-input-answer').hide();
	
			// for flashcard interface, these are the things to hide
			$('.back-side').hide();
			$('#word-answer').hide();
			$('#flashcard-ratings').hide();
	
			var showSpeakerIcon; // when showing the answer
			if (testType == TEST_TYPE_FILL_BLANK) {
				if (isPhrase) {
					// for idioms and phrasal verbs, we should not show POS
					// because POS is for the head word, and not for idioms and phrasal verbs
					$('#pos-in-meaning').hide();
				}
					
				$(".word-input-question").replaceWith(
						'<div class="word-input-question">' + chosenExample
								+ '</div>')
	
				// the meaning might have been assigned a large font in meaning-word
				// question
				$('#front-content').css('font-size', '100%');
	
				showSpeakerIcon = true;
			} else if ((testType == TEST_TYPE_AUDIO_TYPING_WORD
					&& isTestTypeAudioTyping == true)) {
				$(".word-input-question").hide();
	
				displayAudioQuestion(delayAudio, null);
	
				showSpeakerIcon = false;
			} else if (testType == TEST_TYPE_SENTENCE_AUDIO_TYPING_WORD) {
				displayAudioQuestion(delayAudio, chosenExampleAudio);
				
				$(".word-input-question").replaceWith(
						'<div class="word-input-question">' + chosenExample
								+ '</div>')
				
				// the meaning might have been assigned a large font in meaning-word
				// question
				$('#front-content').css('font-size', '100%');
				
				showSpeakerIcon = true;
			}
	
			// option to skip the question when a user encounter a word for the
			// first time
			/*
			 * if (repetition == 0 && testType == TEST_TYPE_AUDIO_TYPING_WORD &&
			 * isTestTypeAudioTyping == true) { $('.word-input-wrapper').hide();
			 * displayDoYouKnowLabel('.word-input-wrapper', '', false, testType,
			 * showSpeakerIcon); } else {
			 */
	
			// for now, always show this and do not display DO_YOU_KNOW_LABEL
			$('.word-input-wrapper').show();
			showTypingTest(testType, isPhrase, chosenExampleOccurrence, chosenExampleOccurrenceIgnoredIndexes, placeHolderString, showSpeakerIcon);
	
			// }
		}
	}
	
	//scroll to top because user may have scrolled down while they answer the question
	// know bug on android: http://stackoverflow.com/questions/8939458/how-to-scroll-an-html-div-programmatically-on-android-3-1
	if (isMobileBrowser) {
		// this idea came from someone on the internet and it works!
		$('.mcq-review').css('display', 'none');
		setTimeout(function() {
			$('.mcq-review').css('display', 'block');
		}, 100);
		
		// all do not work
		//window.scrollTo(0, 0);
		//$("html, body").animate({ scrollTop: 0 }, "slow");
		//$('.mcq-wrapper').scrollTop();
		//$('.mobile-nav').scrollTop();
		
		// http://blog.westmonroepartners.com/jquery-scrolltop-and-android-browsers-a-work-around/
		// does not work
		//setTimeout(function() {
			//$('.mcq-review').css('overflow', 'hidden');
			//$('.mcq-review').scrollTop(0);
			//$('.mcq-review').css('overflow', 'auto');
		//}, 100);
	}
}

// show or hide the word, depending on whether we are asking a question
// or whether we are showing an answer (e.g., after a user has typed in a word)
function showHideWord(isShow, placeHolderString, isPhrase, chosenExampleOccurrenceIngoredIndexes) {
	var oldString, newString;

	if (isShow) {
		oldString = placeHolderString;
		if (isPhrase) {
			newString = '';
			
			// only highlight the words that are NOT ignored in blue
			// words that are ignored will be in black (as normal text)
			var tokens = vocab.split(" ");
			for (var i = 0; i < tokens.length; i++) {
				if (chosenExampleOccurrenceIngoredIndexes.indexOf(i) == -1) {
					newString += ' <label class="vocab-display">' + tokens[i] + '</label>';
				} else {
					newString += ' ' + tokens[i];
				}
			}
			newString = $.trim(newString);
		} else {
			newString = '<label class="vocab-display">' + vocab + '</label>';
		}
	} else {
		// need to call escapeRegExp because the string contains special chars such as [
		oldString = escapeRegExp('<label class="vocab-display">[word]</label>');
		newString = placeHolderString;
	}

	var htmlContent, htmlContentBeforeMeaningPart, index;

	// also replace in the meaning part because in some rare cases, the
	// definition is recursive
	// i.e., the definition also contains the word
	htmlContent = $('#front-content').html();
	// front-content has the following format: ( + <label id="pos>...</label> +
	// meaning + )
	// we only want to replace the occurrences in the meaning part
	index = htmlContent.indexOf('</label>)');
	if (index > -1) {
		htmlContentBeforeMeaningPart = htmlContent.substring(0, index
				+ '</label>)'.length);
		htmlContentMeaningPart = htmlContent.substring(index
				+ '</label>)'.length);

		// replace all occurrences
		htmlContentMeaningPart = htmlContentMeaningPart.replace(new RegExp(
				oldString, 'g'), newString);
		$('#front-content').html(
				htmlContentBeforeMeaningPart + htmlContentMeaningPart);
	}

	htmlContent = $('#opposites-content').html();
	htmlContent = htmlContent.replace(new RegExp(oldString, 'g'), newString);
	$('#opposites-content').html(htmlContent);

	htmlContent = $('#enctx-content').html();
	htmlContent = htmlContent.replace(new RegExp(oldString, 'g'), newString);
	$('#enctx-content').html(htmlContent);
	
	htmlContent = $('.word-input-question').html();
	htmlContent = htmlContent.replace(new RegExp(oldString, 'g'), newString);
	$('.word-input-question').html(htmlContent);
}

// find the first non-disabled letter before the given letter
function findFirstNonDisabledLetterBefore(letterIndex) {
	var prevNonDisabled = -1;
	for ( var j = letterIndex - 1; j >= 1; j--) {
		if ($("#char-input-" + j.toString()).is(":disabled") == false) {
			prevNonDisabled = j;
			break;
		}
	}
	return prevNonDisabled;
}

// find the first non-disabled letter after the given letter
function findFirstNonDisabledLetterAfter(letterIndex) {
	var nextNonDisabled = -1;
	for ( var j = letterIndex + 1; j <= vocabWithoutSpace.length; j++) {
		if ($("#char-input-" + j.toString()).is(":disabled") == false) {
			nextNonDisabled = j;
			break;
		}
	}
	return nextNonDisabled;
}


// =============================================================================
// the ideas of the functions in this section are borrowed from
// http://www.gundersen.net/keep-ipadiphone-ios-keyboard-up-between-input-fields/
// with heavy modifications

function isFirstLastChildNonDisabled(obj, checkFirstChild) {
	var id = "-1";
	var elements;
	// when we traverse in the normal order, we would find the LAST
	// non-disabled child
	if (!checkFirstChild) {
		elements = obj.parent().children().each(function () {
			if ($(this).is(":disabled") == false) {
				id = $(this).attr("id");
			}
		});
	// when we traverse in the reverse order, we would find the FIST
	// non-disabled child
	} else {
		// http://stackoverflow.com/questions/16609882/jquery-iterate-children-in-reverse
		// note the syntax: need to wrap ...reverse() inside $()
		elements = $(obj.parent().children().get().reverse()).each(function () {
			if ($(this).is(":disabled") == false) {
				id = $(this).attr("id");
			}
		});
	}

	if (id == "-1") {
		return false;
	} else {
		return id == obj.attr("id");
	}
}


function changeInputField(fromidx, toidx, thisid, numCharInputs,
						  backSpacePressed) {
	var toid = parseInt(toidx);

	fromidx = "char-input-" + fromidx;
	toidx = "char-input-" + toidx;

	var fromobj = $('#'+fromidx);
	// note that this should be checked here, before we modify the values of
	// char-input's. the reason we need these is for cases like this:
	// [normal input field] [disabled input field] [*new char-input-block*] [disabled input field] [normal input field]
	// so in this case, we want to "jump" across the disabled input fields, and
	// across the char-input-block
	var fromobj_is_last_child_non_disabled = isFirstLastChildNonDisabled($(fromobj), false);
	var fromobj_is_first_child_non_disabled = isFirstLastChildNonDisabled($(fromobj), true);

    var toobj = $('#'+toidx);

    var temp_val = $(toobj).val();
    $(toobj).val($(fromobj).val());
    // this looks simple, but it is a major hack to make backspace work on
    // Android. Android has a bug with backspace because it does not always fire
    // keyup / keydown event when user presses the backspace button, as reported
    // here:
    // https://code.google.com/p/chromium/issues/detail?id=184812
    // https://code.google.com/p/chromium/issues/detail?id=118639
    // also, when we "jump" to an input field programmatically (using .select()
    // or focus()), backspace does not fire any event, probably because it is
	// not in the 'composition mode' for the input field that we've just jumped
	// to. luckily, one of the side effects of our hack for iOS devices is that
	// even though user thinks we are moving from input field to input field,
	// we are actually staying at the same input field and we just move it
	// around. so from android's perspective, we are staying at the same input
	// field, and we are in the 'composition mode' of that field, so backspace
	// does fire keyup / keydown event. however, there is still one caveat: if
	// we set the value of the text field programmatically using val() then
	// somehow backspace does not fire an event anymore (probably because we
	// have somehow exited the 'composition mode'). thus, the if condition here
	// makes sure that we don't call val(), which is not needed anyway because
	// we alreay clear the value of the input field before we enter this
	// function
	//
	// side note: but actually in the function that calls this function, we
	// clear the input field by calling
	// $("#char-input-" + i.toString()).val('');
	// how come this works but setting the value of $(fromobj) here with val()
	// does not work. anyway, think about this later. the important thing is
	// it WORKS now!
	//
	// if not android browser, always do this
	// if android browser, only do this for other keys, and not for backspace
    if (!isAndroidBrowser || !backSpacePressed) {
    	$(fromobj).val(temp_val);
	}

    // swap the tab indices to preserve them, so that when user uses 'tab' or
    // arrow buttons on mobile phones, they will jump through the input fields
    // in the correct order
    var temp_tabindex = $(toobj).attr("tabindex");
    $(toobj).attr("tabindex", $(fromobj).attr("tabindex"));
    $(fromobj).attr("tabindex", temp_tabindex);

    // important to do these here, before calling insertBefore()
    var toobj_parent = $(toobj).parent();
	var toobj_parent_id = toobj_parent.attr("id");
	// the reason we need these is because toobj may contain extra classes
	// like with-margin-right, so we also need to copy the class attribute
	var toobj_parent_class = toobj_parent.attr("class");

	// this is an element of the char-input-space class
	var toobj_parent_prev = toobj_parent.prev();

	// this is an element of the char-input-space class
	var toobj_parent_next = toobj_parent.next();

	// swap from obj and to obj
	// var toobj_clone = $(toobj).clone(true, true);
	// toobj_clone.css("background-color", "red");
	// var fromobj_clone = $(fromobj).clone(true, true);
	// fromobj_clone.css("background-color", "red");
	// toobj_clone.insertAfter($(fromobj));
	// fromobj_clone.insertAfter($(toobj));
	// alert('test');
	// var fromobj_old = $(fromobj);
	// fromobj_old.remove();
	// var toobj_old = $(toobj);
	// toobj_old.remove();
	// fromobj = $('#'+fromidx);
	// toobj = $('#'+toidx);


    if (toid > thisid) {
    	// if within the same char-input-block
    	if (!fromobj_is_last_child_non_disabled) {
    		// *** if you make any modifications here, you should also do so for
			// the corresponding case where toid < thisid ***

    		// note that it should be toobj which is removed and re-inserted
		    // we should not remove and re-insert fromobj because then it would loose
		    // the focus, i.e., the cursor
    		var objs_in_between = $(fromobj).nextUntil($(toobj));
	    	$(toobj).insertBefore($(fromobj));
	    	objs_in_between.insertBefore($(fromobj));

	    // if across 2 char-input-block
    	} else { //  && thisid < numCharInputs

	    	// *** if you make any modifications here, you should also do so for
			// the corresponding case where toid < thisid ***

			// alert('here1');
		 //    var objs_after_fromobj = $(fromobj).nextAll();
		 //    var objs_before_toobj = $(toobj).prevAll();
	  //   	$(toobj).insertBefore($(fromobj));
	  //   	objs_after_fromobj.insertBefore($(fromobj));
	  //   	objs_before_toobj.insertBefore($(fromobj));
	  //   	alert('here2');

	  		var fromobj_parent = $(fromobj).parent();

	  		var blocks_between_cur_char_block_and_next_char_block = $(fromobj_parent).nextUntil($(toobj_parent));

	  		var objs_before_toobj = $(toobj).prevAll();
	  		var objs_after_toobj = $(toobj).nextAll();
	  		$(toobj).insertBefore($(fromobj));

	    	// to truly understand what is going on here, you should draw out
	    	// the steps on paper
	    	// the general idea is that we don't want to touch the current
	    	// char-input because then it would loose the focus. so in the special
	    	// case that the current char-input is the last one in a
	    	// char-input-block, we have to try to "move" it to next
	    	// char-input-block without touching it. so we do as follows
	    	// 1. duplicate current char-input-block
	    	// 2. remove current char-input from the duplicated char-input-block
	    	// 3. remove all elements from the parent of current char-input (except
	    	//    for current char-input itself)
			// 4. copy over items from the previous char-input-block. those
			//    before toobj will be put before current char-input. those
			//    after toobj will be put after current char-input
			// 5. remove the next char-input-block

	    	// pass (true, true) to clone() to preserve all event handlers of the
	    	// elements and its children
	    	// http://stackoverflow.com/questions/9549643/jquery-clone-not-cloning-event-bindings-even-with-on
	    	var fromobj_parent_clone = fromobj_parent.clone(true, true);

	    	// to ensure no two objects having same id
	    	$(fromobj).parent().attr("id", "dummy");
	    	$(fromobj).prevAll().remove();
	    	$(fromobj).nextAll().remove();

	    	fromobj_parent_clone.insertBefore(fromobj_parent);
	    	fromobj_parent_clone.children('#' + fromidx).remove();

	    	toobj_parent_prev.insertAfter(fromobj_parent_clone);

	    	// it would be wrong to use objs_before_toobj.insertBefore($(fromobj));
	    	// because objs_before_toobj is a set of objects, which complicate
	    	// the insertBefore() function, i.e., the elements are inserted
	    	// in the reverse order. so here, we have to reverse the elements
	    	// before making the insert
	    	$(objs_before_toobj.get().reverse()).insertBefore($(fromobj));

	    	objs_after_toobj.insertAfter($(fromobj));

	    	blocks_between_cur_char_block_and_next_char_block.insertAfter($(fromobj_parent_clone));

	    	fromobj_parent.attr("id", toobj_parent_id);
	    	fromobj_parent.attr("class", toobj_parent_class);
	    	toobj_parent.remove();
	    }

	} else if (toid < thisid) {
		// if within the same char-input-block
		if (!fromobj_is_first_child_non_disabled) {
			// *** if you make any modifications here, you should also do so for
			// the corresponding case where toid > thisid ***

			var objs_in_between = $(toobj).nextUntil($(fromobj));
			$(toobj).insertAfter($(fromobj));
			objs_in_between.insertAfter($(fromobj));

		// if across 2 char-input-block
		} else { // && thisid > 1

			// *** if you make any modifications here, you should also do so for
			// the corresponding case where toid > thisid ***

			// var objs_after_fromobj = $(fromobj).nextAll();
		 //    var objs_before_toobj = $(toobj).prevAll();
			// $(toobj).insertAfter($(fromobj));
			// objs_before_toobj.insertAfter($(fromobj));
			// objs_after_fromobj.insertAfter($(fromobj));

			var fromobj_parent = $(fromobj).parent();

			var blocks_between_cur_char_block_and_next_char_block = $(toobj_parent).nextUntil($(fromobj_parent));

			var objs_before_toobj = $(toobj).prevAll();
	  		var objs_after_toobj = $(toobj).nextAll();
	  		$(toobj).insertAfter($(fromobj));

			// see the comments of the if clause to understand the logic
			// because the logic here is very similar to that of the if clause

			// brief explanation
			// 1. duplicate current char-input-block
	    	// 2. remove current char-input from the duplicated char-input-block
	    	// 3. remove all elements from the parent of current char-input (except
	    	//    for current char-input itself)
			// 4. copy over items from the previous char-input-block. those
			//    before toobj will be put before current char-input. those
			//    after toobj will be put after current char-input
			// 5. remove the previous char-input-block

	    	// pass (true, true) to clone() to preserve all event handlers of the
	    	// elements and its children
	    	// http://stackoverflow.com/questions/9549643/jquery-clone-not-cloning-event-bindings-even-with-on
	    	var fromobj_parent_clone = fromobj_parent.clone(true, true);

	    	// to ensure no two objects having same id
	    	$(fromobj).parent().attr("id", "dummy");
	    	$(fromobj).prevAll().remove();
	    	$(fromobj).nextAll().remove();

	    	fromobj_parent_clone.insertAfter(fromobj_parent);
	    	fromobj_parent_clone.children('#' + fromidx).remove();

	    	toobj_parent_next.insertBefore(fromobj_parent_clone);

	    	// it would be wrong to use objs_before_toobj.insertBefore($(fromobj));
	    	// because objs_before_toobj is a set of objects, which complicate
	    	// the insertBefore() function, i.e., the elements are inserted
	    	// in the reverse order. so here, we have to reverse the elements
	    	// before making the insert
	    	$(objs_before_toobj.get().reverse()).insertBefore($(fromobj));

	    	objs_after_toobj.insertAfter($(fromobj));

	    	blocks_between_cur_char_block_and_next_char_block.insertAfter($(fromobj_parent));

	    	fromobj_parent.attr("id", toobj_parent_id);
	    	fromobj_parent.attr("class", toobj_parent_class);
	    	toobj_parent.remove();
	    }
	}

    var toobj2 = document.getElementById(toidx);
    var temp_toobj2_id = toobj2.id;
    var fromobj2 = document.getElementById(fromidx);
    var temp_fromobj2_id = fromobj2.id;
    toobj2.id = "dummy"; // to ensure no two objects having same id
    fromobj2.id = temp_toobj2_id;
    toobj2.id = temp_fromobj2_id;
}


// i: the ith char-input
// delta: how much to move
function setKeyPressEventForCharInput(i, numCharInputs, spaceIndices, testType, placeHolderString, isPhrase, chosenExampleOccurrenceIgnoredIndexes,
		showSpeakerIcon) {
	var prevNonDisabled = findFirstNonDisabledLetterBefore(i);
	var nextNonDisabled = findFirstNonDisabledLetterAfter(i);

	$("#char-input-" + i.toString()).unbind();

	// according to the below URL,
	// Apple won't deliver the keypress/keydown event if the input field loses
	// focus while the keypress/keydown event is being fired.
	// http://support.apple.com/kb/ht4334 (see
	// CVE-ID: CVE-2010-1422)

	// so the goal here is to make sure that the keypress/keydown event is fired
	// and yet we still want to maintain the focus in the text field (otherwise
	// the keyboard in iOS devices will keep going "up" and "down" as user moves
	// to the next input fields)

	// solution: borrow ideas from
	// http://www.gundersen.net/keep-ipadiphone-ios-keyboard-up-between-input-fields/

	$("#char-input-" + i.toString()).bind('keypress', function(event) {
		var prefix = 'char-input-';
		var thisid = $(this).attr("id");
		var i = parseInt(thisid.substring(prefix.length,thisid.length));

		// leave tab and shift+tab to browser to handle (based
		// on tabindex attributes + also ignore space (which is later handled
		// in the keyup event)
		if (event.keyCode != 9 && event.which != 32) {
			switch (event.keyCode) {
			case 13: // enter key
				this.blur();
				checkTypedWord(spaceIndices, testType, placeHolderString, isPhrase, chosenExampleOccurrenceIgnoredIndexes,
						showSpeakerIcon);
				break;
			// for other keys, simply move to next input field
			default:
				// ignore back space and arrow keys
				if (event.keyCode != 8 && event.keyCode != 37
						&& event.keyCode != 38
						&& event.keyCode != 39
						&& event.keyCode != 40) {
					var keypressed = String.fromCharCode(event.which).toUpperCase();
				    $("#char-input-" + i.toString()).val(keypressed);

				    var nextid = findFirstNonDisabledLetterAfter(i);

				    if (nextid != -1 && nextid <= numCharInputs) {
						changeInputField(i.toString(), nextid, i, numCharInputs, false);
						this.select();
					}

					event.preventDefault();
				}
				break;
			}
		}
	});

	// for some reasons, using keypress is not effective for Chrome, so we have
	// to move some keys to keydown
	$("#char-input-" + i.toString()).bind('keydown', function(event) {
		var prefix = 'char-input-';
		var thisid = $(this).attr("id");
		var i = parseInt(thisid.substring(prefix.length,thisid.length));

		// leave tab and shift+tab to browser to handle (based
		// on tabindex attributes + also ignore space (which is later handled
		// in the keyup event)
		if (event.keyCode != 9 && event.which != 32) {
			switch (event.keyCode) {
			case 8: // for backspace move to previous input field
				var curVal = $("#char-input-" + i.toString()).val();

				var supportBackSpace;

				// if not android, always support backspace
				if (!isAndroidBrowser) {
					supportBackSpace = true;
				} else {
					// if android, only support back space if current char input
					// field is empty, i.e., moving backwards from an empty
					// field. this is because there is a bug in Android: when
					// we set the value of an input field, pressing backspace
					// on that field will not fire any keydown/keypress event
					// for more details, see the comments in changeInputField
					// regarding the hack for Android
					supportBackSpace = (curVal == '');
				}

				var previd = findFirstNonDisabledLetterBefore(i);
				
				if (supportBackSpace) {
					// erase the current value
					$("#char-input-" + i.toString()).val('');

					if (previd != -1 && previd >= 1) {
						// var temp_val = $("#char-input-" + previd.toString()).val();

						changeInputField(i.toString(),previd, i, numCharInputs,
							             true);

						// var e = jQuery.Event("keypress");
						// e.which = String.charCodeAt(0);
						// $("#char-input-" + previd).trigger(e);
					}
				}

				event.preventDefault();
				this.select();
				break;
			case 37: // for left arrow move to previous input field
				var previd = findFirstNonDisabledLetterBefore(i);

				if (previd != -1 && previd >= 1) {
					changeInputField(i.toString(),previd, i, numCharInputs,
						             false);
				}

				event.preventDefault();
				this.select();
				break;
			case 39: // for right arrow move to next input field
				var nextid = findFirstNonDisabledLetterAfter(i);

				if (nextid != -1 && nextid <= numCharInputs) {
					changeInputField(i.toString(),nextid, i, numCharInputs,
						             false);
				}

				event.preventDefault();
				this.select();
				break;
			default:
				break;
			}
		}
	});

	// in bindShorcuts() we use keyup for space so here we also use keyup for
	// space
	$("#char-input-" + i.toString()).bind('keyup', 'space', function() {
		spaceButtonKeyUp();
	});
}


// =============================================================================
// these functions are not used, but left here for reference

// function kdn(obj,ev,moveon){
// 	var kc = ev.keyCode;
//     var prefix = 'char-input-';
// 	var thisid = parseInt(obj.id.substring(prefix.length,obj.id.length));

// 	var previd = findFirstNonDisabledLetterBefore(thisid);
// 	var nextid = findFirstNonDisabledLetterAfter(thisid);

// 	var numCharInputs = ev.data.numCharInputs;
// 	var spaceIndices = ev.data.spaceIndices;
// 	var testType = ev.data.testType;
// 	var placeHolderString = ev.data.placeHolderString;
// 	var isPhrase = ev.data.isPhrase;
// 	var chosenExampleOccurrenceIgnoredIndexes = ev.data.chosenExampleOccurrenceIgnoredIndexes;
// 	var showSpeakerIcon = ev.data.showSpeakerIcon;

// 	var evprevdef = true;
// 	if (kc == '8') { // for backspace, delete character and move to previous input field
// 		$ (obj).val('');
// 		if (previd != -1 && previd >= 1) {
// 			moveon(thisid,previd, parseInt(thisid), numCharInputs);
// 		}
// 	} else if (kc == '37') { // for left arrow move to previous input field
// 		if (previd != -1 && previd >= 1) {
// 			moveon(thisid,previd,parseInt(thisid), numCharInputs);
// 		}
// 	} else if (kc == '39') { // for right arrow move to next input field
// 		if (nextid != -1 && nextid <= numCharInputs) {
// 			moveon(thisid, nextid,parseInt(thisid), numCharInputs);
// 		}
// 	}  else if (kc == '13') { // enter key
// 		obj.blur();
// 		checkTypedWord(spaceIndices, testType, placeHolderString, isPhrase,
// 			chosenExampleOccurrenceIgnoredIndexes, showSpeakerIcon);
// 	} else {
// 		evprevdef = false;
// 	}

// 	if (evprevdef) {
// 		ev.preventDefault();
// 	}

//  	return !evprevdef;
// }

// function kpress(obj,ev,moveon){
// 	var k = ev.which;
//     var prefix = 'char-input-';
// 	var thisid = parseInt(obj.id.substring(prefix.length,obj.id.length));

// 	if(k < 42){ // < 42 are those control keys like space and arrow keys
// 		ev.preventDefault();
// 		return false;
// 	}

// 	var keypressed = String.fromCharCode(k).toUpperCase();
//     $(obj).val(keypressed);

//     var nextid = findFirstNonDisabledLetterAfter(thisid);

//     var numCharInputs = ev.data.numCharInputs;
//     if (nextid != -1 && nextid <= numCharInputs) {
// 		moveon(thisid, nextid, parseInt(thisid), numCharInputs);
// 	}

// 	ev.preventDefault();
// 	return false;
// }


// // i: the ith char-input
// // delta: how much to move
// function setKeyPressEventForCharInput(i, numCharInputs, spaceIndices, testType, placeHolderString, isPhrase, chosenExampleOccurrenceIgnoredIndexes,
// 		showSpeakerIcon) {
// 	//var prevNonDisabled = findFirstNonDisabledLetterBefore(i);
// 	//var nextNonDisabled = findFirstNonDisabledLetterAfter(i);

// 	$("#char-input-" + i.toString()).unbind();

// 	// solution: borrow ideas from
// 	// http://www.gundersen.net/keep-ipadiphone-ios-keyboard-up-between-input-fields/

// 	$("#char-input-" + i.toString()).keypress({//'prevNonDisabled' : prevNonDisabled,
// 		//'nextNonDisabled': nextNonDisabled,
// 		'numCharInputs': numCharInputs,
// 		'spaceIndices': spaceIndices,
// 		'testType': testType,
// 		'placeHolderString': placeHolderString,
// 		'isPhrase': isPhrase,
// 		'chosenExampleOccurrenceIgnoredIndexes': chosenExampleOccurrenceIgnoredIndexes,
// 		'showSpeakerIcon': showSpeakerIcon
// 	},
// 		function(event){return kpress(this,event,changeInputField);
// 	});

// 	$("#char-input-" + i.toString()).keydown ({//'prevNonDisabled' : prevNonDisabled,
// 		//'nextNonDisabled': nextNonDisabled,
// 		'numCharInputs': numCharInputs,
// 		'spaceIndices': spaceIndices,
// 		'testType': testType,
// 		'placeHolderString': placeHolderString,
// 		'isPhrase': isPhrase,
// 		'chosenExampleOccurrenceIgnoredIndexes': chosenExampleOccurrenceIgnoredIndexes,
// 		'showSpeakerIcon': showSpeakerIcon
// 	},
// 		function(event){return kdn   (this,event,changeInputField);
// 	});
// }

// =============================================================================


function getValueOfCharInput(id) {
	var result;
	if (isMobileTabletBrowser) {
		// on mobile and tablet, we use <div class="char-input"> so we need to
		// use text() here
		result = $('#' + id).text();
	} else {
		// on desktop, we use <input class="char-input"> so we need to use
		// .value here
		result = document.getElementById(id).value;
	}

	return result;
}


function checkTypedWord(spaceIndices, testType, placeHolderString, isPhrase, chosenExampleOccurrenceIgnoredIndexes, showSpeakerIcon) {
	clearTimeout(timeoutID);

	var wordInputResultHtml = '<span class="word-input-answer-word">'
			+ ANSWER_LABEL + ': ';
	var numCorrectChars = 0;
	var curIndexInSpaceIndices = 0;
	var valueOfCharInput;
	var correctChar;

	for (var i = 1; i <= vocabWithoutSpace.length; i++) {
		// charAt(i - 1) because ID's of input fields start from 1
		document.getElementById('char-input-' + i.toString()).disabled = true;

		valueOfCharInput = getValueOfCharInput('char-input-' + i.toString()).toUpperCase();
		correctChar = vocabWithoutSpace.charAt(i - 1).toUpperCase();

		if ((valueOfCharInput === correctChar) ||
			(valueOfCharInput == 'E' && correctChar == 'É')) {
			wordInputResultHtml += correctChar;
			numCorrectChars++;
		} else {
			wordInputResultHtml += '<span style="color: #CE2C40;">'
					+ correctChar + '</span>';
		}

		// add space between words (if vocab contains more than one word)
		if (spaceIndices.length > 0
				&& curIndexInSpaceIndices <= spaceIndices.length - 1) {
			if (i == spaceIndices[curIndexInSpaceIndices]) {
				wordInputResultHtml += '&nbsp;';
				curIndexInSpaceIndices++;
			}
		}
	}
	wordInputResultHtml += '</div>';

	numIncorrectChars = vocabWithoutSpace.length - numCorrectChars;

	var percentageCorrect = Math
			.round((numCorrectChars / vocabWithoutSpace.length) * 100);

	var penaltyScore;

	if (percentageCorrect == 100) {
		penaltyScore = 0;
	} else if (percentageCorrect >= 75) {
		penaltyScore = 1;
	} else if (percentageCorrect >= 50) {
		penaltyScore = 2;
	} else if (percentageCorrect >= 25) {
		penaltyScore = 3;
	} else {
		penaltyScore = 4;
	}

	var maxScore, maxAccumScore;
	if (testType == TEST_TYPE_FILL_BLANK) {
		maxScore = MAX_SCORE_FILL_BLANK;
		maxAccumScore = MAX_ACCUM_SCORE_FILL_BLANK;
	} else if (testType == TEST_TYPE_AUDIO_TYPING_WORD) {
		maxScore = MAX_SCORE_AUDIO_TYPING_WORD;
		maxAccumScore = MAX_ACCUM_SCORE_AUDIO_TYPING_WORD;
	} else if (testType == TEST_TYPE_SENTENCE_AUDIO_TYPING_WORD) {
		maxScore = MAX_SCORE_SENTENCE_AUDIO_TYPING_WORD;
		maxAccumScore = MAX_ACCUM_SCORE_SENTENCE_AUDIO_TYPING_WORD;
	}

	penaltyScore = penaltyScore + numHintsUsed;
	if (penaltyScore > maxScore - 1) {
		penaltyScore = maxScore - 1;
	}

	score = maxAccumScore - penaltyScore;
	// if new word and not perfect score -> user has to learn this word from the first type
	if (repetition == 0 && score < maxAccumScore) {
		difficulty = 1;
		score = 1;
	}

	var msg;
	var typedCorrectly;
	$(".empty-icon").hide();
	
	// before showing the correct/wrong icon, we will remove margin-right from all char-input
	// inside char-input-wrapper 
	$('.char-input-wrapper .char-input-block').removeClass("with-margin-right");
	
	if (numCorrectChars == vocabWithoutSpace.length) { // correct answer
		typedCorrectly = true;
		if (numHintsUsed == 0) {
			msg = correctMsgs_fillBlank[0];
		} else {
			msg = correctMsgs_fillBlank[1];
		}
		$(".correct-icon").show();
	} else { // wrong answer
		typedCorrectly = false;
		if (numIncorrectChars <= 2) { // almost correct
			msg = incorrectMsgs_fillBlank[0];
		} else {
			msg = incorrectMsgs_fillBlank[1];
		}
		$(".wrong-icon").show();
	}
	msg = msg[Math.floor(Math.random() * msg.length)]; // access msg and a
														// random index 0 to
														// len(msg) - 1

	if (skipButtonPressed == false) {
		// only display message if question was not skipped
		if (typedCorrectly) {
			$('#typingGuessResult').removeClass('incorrect-guess').addClass(
					'correct-guess').html(msg);
		} else {
			$('#typingGuessResult').addClass('incorrect-guess').html(msg);
		}

	}

	$(".word-input-show-letter").hide();

	$(".word-input-help").hide();

	if (isMobileTabletBrowser) {
		$('#word-input-wrapper-keypad').hide();

		// need to unbind. otherwise, user can still click on .div-char-input's
		// and make the characters disappear
		$(".div-char-input").unbind();

		$(".word-input-bottom").show();
	}

	$(".word-input-answer").html(wordInputResultHtml);
	$(".word-input-answer").show();

	setAudio_ExtraInfoLink($(".word-input-answer-word").parents(
			".word-input-answer"), isPhrase, showSpeakerIcon, false, false,
			true);

	$('.mcq-inline-audio').append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
	$('.mcq-inline-audio').show();
	jQueryShowInlineBlock($('.lookup'));
	//$('.lookup').show();
	if (numCorrectChars == vocabWithoutSpace.length) { // correct answer -> remove
													// Answer: ...
		$(".word-input-answer-word").remove();
		// do this so that the lookup label is centered
		$('.lookup').css('margin-left', '0');
	}

	// for TEST_TYPE_FILL_BLANK, when showing the question, we hide the correct word
	// in fields such as meaning and encounter context, so here we need to unhide
	// the correct word
	// note that for other test types like TEST_TYPE_AUDIO_TYPING_WORD, we do not
	// hide anything when showing the question, so there is no need to unhide the
	// correct word
	if (testType == TEST_TYPE_FILL_BLANK || testType == TEST_TYPE_SENTENCE_AUDIO_TYPING_WORD) {
		// also replace occurrences in other fields such as encounter context, etc.
		showHideWord(true, placeHolderString, isPhrase, chosenExampleOccurrenceIgnoredIndexes);
	}

	showNextButton();
}

function playSoundInnerFunction(soundfile) {
	soundManager.createSound({
		id: soundfile,
		url: soundfile
	});
	soundManager.play(soundfile);
}

function playSound(soundfile) {
	// if soundManager has been initialized, play the sound
	if (soundManager.ok()) {
		playSoundInnerFunction(soundfile);
	// otherwise, "schedule" the sound to be played when soundManager has been initialized
	} else {
		soundManager.onready(playSoundInnerFunction(soundfile));
	}
}

// http://stackoverflow.com/questions/3410464/how-to-find-all-occurrences-of-one-string-in-another-in-javascript
function getIndicesOf(searchStr, str, caseSensitive) {
	var startIndex = 0, searchStrLen = searchStr.length;
	var index, indices = [];
	if (!caseSensitive) {
		str = str.toLowerCase();
		searchStr = searchStr.toLowerCase();
	}
	while ((index = str.indexOf(searchStr, startIndex)) > -1) {
		indices.push(index);
		startIndex = index + searchStrLen;
	}
	return indices;
}

function setAudio_ExtraInfoLink($container, isPhrase, 
								showSpeakerIcon, showDifferentIPAs, showAudioInfo, showLookup) {
	/*
	 * This function set the audio info --- and --- link for user to click to
	 * find more details about the word
	 */
	
	
	var wordDetailsHtml = '';
	if (showAudioInfo){
		// prepare the audio to show when user selects the correct option
		var ipa, audio;
		var ipaUS = $('#ipa-us').html();
		var ipaUK = $('#ipa-uk').html();
		var ipaDifferent = false;
		if (ipaUS != null && ipaUS != "") {// as of now, null occurs when it's a manually created word
			ipaUS = ipaUS.replace('US:', ''); // strip out the US: part to compare the IPA content only
			if (ipaUK != null && ipaUK != "") {
				ipaUK = ipaUK.replace('UK:', '');
			}
			if (ipaUS == ipaUK) {
				ipa = ipaUS;
			} else {
				ipa = ipaUS;
				ipaDifferent = true;
			}
			audio = $('#audio-us').html();
		} else if (ipaUK != null && ipaUK != "") {
			ipa = ipaUK;
			audio = $('#audio-uk').html();
		} else {
			ipa = '';
			audio = '';
		}

		if (ipa != "") {
			ipa = ipa.replace(/\/(.*?)\//, '/<strong>$1</strong>/'); // hilight the ipa
		}
		
		if (showDifferentIPAs) {
			if (ipaDifferent) {
				// delayed till after we have the 'lookupLabel'
				// add in the instruction sign to explain a little about what "US"
				// means
				var instr = gettext("This is American pronunciation. The British pronunciation may be slightly different.")
						+ "<br/>"
						+ gettext("Click")
						+ " <strong>"
						+ lookupLabel
						+ "</strong>" + gettext(" to see both.");

				// when ipaDifferent is true -> ipa was set to ipaUS, which contains
				// the word "US"
				ipa = "US<span class='tooltip-sign region-pronun' title='" + instr
						+ "'></span>: " + ipa.replace('US:', '')
			} else {
				ipa = PRONUNC_LABEL + ':' + ipa;
			}
		} else {
			ipa = PRONUNC_LABEL + ':' + ipa;
		}
		
		if (ipa != ""){
			wordDetailsHtml = '<span class="mcq-inline-audio">' + ipa + (showSpeakerIcon ? audio : '') + '</span>';
		}
	}
	
	// The label to display: depending on the most significant info we have to show
	var lookupLabel;
	if (!isPhrase) {
		//deprecated, we don't want to make it too complex, unnecessarily, here
		/*
		 * var hasWordDetails = false; if ($('#usage-patterns').length > 0 &&
		 * $('#usage-patterns').html() != ""){//1st priority, show usage pattern
		 * lookupLabel = SEE_WORD_USAGE; } else if ( ($('#inflections').length >
		 * 0 && $('#inflections').html() != null) || ($('#meta-usage').html() != "" &&
		 * $('#meta-usage').html() != null) ){//2nd: other word info lookupLabel =
		 * SEE_WORD_DETAILS; } else if (ipaDifferent){// 3rd: difference in ipa
		 * lookupLabel = SEE_BRITISH_PRONUN; } else {//don't show lookupLabel =
		 * ''; }
		 */
		lookupLabel = SEE_WORD_DETAILS;
	} else {
		lookupLabel = SEE_PHRASE_DETAILS;
	}

	showLookup = showLookup && lookupLabel != '';
	var audioBesideLookup = '';
	if (!isMobileBrowser) {
		var audioElement;
		if (isPhrase) {
			audioElement = '';
		} else {
			audioElement = getHTML_EmptyIfNull($('#audio-us'));
		}

		if (audioElement != '' && testType != TEST_TYPE_AUDIO_TYPING_WORD && testType != TEST_TYPE_AUDIO_MEANING) {
			audioBesideLookup = '<div class="audio-beside-lookup">' + audioElement + '</div>';
		}
	}


	if (showLookup) {
		wordDetailsHtml += audioBesideLookup + '<div class="lookup">' + lookupLabel + '</div>';
		//use on(..) b/c we haven't added this element to the container yet
		$(document).on("click", ".lookup", function() {
			displayLesson(false);
		});
	}

	$container.append(wordDetailsHtml);
	// When audio icon doesn't display, lookup element has 10px of margin-left, 
	// thus reset value to 0
	if (audioBesideLookup == '') {
		// for TEST_TYPE_MEANING_WORD, we need a different vale for margin-left
		// b/c in this case, the lookup button is displayed in the "option"
		// area. note that TEST_TYPE_MEANING_WORD also includes image-word type
		if (testType == TEST_TYPE_MEANING_WORD) {
			$('.lookup').css('margin-left', '30px');
		} else {
			$('.lookup').css('margin-left', '0');
		}
	}
	
	if ($('.region-pronun').length > 0) {
		$('.region-pronun').qtip({
			style : {
				'width' : 300
			},
			position : {
				corner : {
					target : 'rightBottom',
					tooltip : 'topLeft'
				}
			}
		});
	}

}

// helper for displayLesson
function getHTML_EmptyIfNull($id) {
	if ($id.length > 0) {
		return $id.html();
	} else {
		return '';
	}
}

// http://stackoverflow.com/questions/2419749/get-selected-elements-outer-html
function getOuterHTML(element) {
    return element.clone().wrap('<p>').parent().html();
}

function displayLesson(isNewWordSurrender) {
        if (!isMobileBrowser) {
	    removeImageWordCSSClasses();
        }

	// because this may have been shown when a question is answered correctly
	$('#mobile-guessResult').hide();
	
	var $lesson = $('#word-lesson');
	if ($.trim($lesson.html()) == "") {// we've not created the lesson before
		var vocab, pos, audioUS, ipaUS,
			vocabClass; //font of phrase smaller than word

		var isFront = getPseudoIsFront(true, false, testType);
		if (isFront) {
			$vocabContent = $('#front-content');
			$meaningContent = $('#back-content');
		} else {
			$vocabContent = $('#back-content');
			$meaningContent = $('#front-content');
		}
		
		if (!isPhrase) {
			vocab = $vocabContent.html(); // single word
			pos = getHTML_EmptyIfNull($('#pos')); // need to call this to handle the case of manually created words where they are null
			audioUS = getHTML_EmptyIfNull($('#audio-us'));
			ipaUS = getHTML_EmptyIfNull($('#ipa-us'));
			if (ipaUS != '') {
				ipaUS = ipaUS.replace("US:", "");
			}
			vocabClass = 'lesson-word';
		} else {
			vocab = $('#idioms').html(); //both idioms and phrasalverbs are stored in this element
			pos = '';
			// right now, we only have audio for the head word so we won't show
			// it for now
			audioUS = '';
			ipaUS = '';
			vocabClass= 'lesson-phrase';
		}

		// if user click "idontknow" for new words or in typing questions, we
		// need to call the function to show back side
		// for other cases, user enters here ONLY AFTER the correct answer has
		// been selected <-> the showBackSide has been called
		if (isNewWordSurrender || difficulty == TEST_TYPE_AUDIO_TYPING_WORD
				|| difficulty == TEST_TYPE_FILL_BLANK || difficulty == TEST_TYPE_SENTENCE_AUDIO_TYPING_WORD) {
			showBackSide(vocab, isFront, manuallyCreated, stressFirstSyl); // manuallyCreated and stress... are global vars
		}

		// example image
		if ($('.ex-image img').attr('src') != "") {
			$lessonImage = $('.ex-image').clone();
			// set the data-lightbox to a different value from the quiz'img to avoid clashing
			// use first() because we only want to add data-lightbox for the <a> used on desktop
			// for the <a> used on mobile (with class="sub-image"), we don't want to add data-lightbox
			$lessonImage.find('a').first().attr('data-lightbox', 'lesson-' + $('.ex-image a').attr('data-lightbox'));
			$lessonImage.addClass('lesson-ex-image');
			
			addSubImageClassForResponsive($lessonImage);
		} else {
			$lessonImage = null;
		}

		var metaUsage = getHTML_EmptyIfNull($('#meta-usage'));

		// remove LESSON_SEE_IPA because it does not make sense to display View IPA
		// then user clicks on that and we show the IPA in exactly the same position with the same space
		// would be better to just show to IPA from the beginning
		// but if we ever want to revert to "View IPA", can use this:
		// "<div id='lesson-view-ipa-us'>" + LESSON_SEE_IPA + "</div>"
		// + "<div id='lesson-ipa-us' class='lesson-audio'>" + ipaUS + "</div>"
		
		// needs to remove the pos that was embedded in the meaning
		var embeddedPos = $('#pos-in-meaning').html();
		var $meaningOnly = $meaningContent.html().replace(embeddedPos, '');
		var $lessonMeaning = $("<div class='lesson-meaning'></div>").append($meaningOnly);

		// here we use isMobileBrowser instead of isMobileTablet browser
		// probably because on tablet we have more space so we can display more
		// info, and thus on tablet we'll show the same info as on desktop
		if (isMobileBrowser) {
			var $wordInfo = $("<div class='lesson-word-info'>"
					+ "<div class='lesson-word-info-l1'>"
					+ "<span class='" + vocabClass + " vocab-display'>" + vocab + "</span>"
					+ "<div id='lesson-audio-us' class='lesson-audio'>" + audioUS + "</div>"
					+ (ipaUS != "" ? "<div id='lesson-ipa-us' class='lesson-audio'>" + ipaUS + "</div>" : "")
					+ "</div>"
					+ "<div class='lesson-word-info-l2'>"
					+ (pos != "" ? "<span class='lesson-pos lesson-label'>(" + pos
							+ ")</span>" : "")
					+ (metaUsage != "" ? "<span class='lesson-meta-usage'>"
							+ metaUsage + "</span>" : "") + "</div>" + 
				"</div>");
			$wordInfo.append("<div class='lesson-image-mobile ex-image ex-image-center'>" + ($lessonImage ? $lessonImage.html() : '') + "</div>");
			$wordInfo.append($lessonMeaning);
		} else {
			var $wordInfo = $("<div class='lesson-word-info-meaning-container clearfix'><div class='lesson-word-info'>"
									+ "<div class='lesson-word-info-l1'>"
									+ "<span class='" + vocabClass + " vocab-display'>" + vocab + "</span>"
									+ "<span id='lesson-audio-us' class='lesson-audio'>" + audioUS + "</span>"
									+ (ipaUS != "" ? "<div id='lesson-ipa-us' class='lesson-audio'>" + ipaUS + "</div>" : "")
									+ "</div>"
									+ "<div class='lesson-word-info-l2'>"
									+ (pos != "" ? "<span class='lesson-pos lesson-label'>(" + pos
											+ ")</span>" : "")
									+ (metaUsage != "" ? "<span class='lesson-meta-usage'>"
											+ metaUsage + "</span>" : "") + "</div>"
									+ getOuterHTML($lessonMeaning)
							+ "</div></div>");
		}

		// examples
		var $lessonExamples;
		var exampleContent = getHTML_EmptyIfNull($('#examples-content'));
		if (exampleContent != "") {
			$lessonExamples = $("<div class='lesson-examples'>"
					+ "<span class='lesson-label highlight-label'>"
					+ EXAMPLES_LABEL + ": </span>"
					+ "<div class='lesson-examples-content'>" + exampleContent
					+ "</div>" + "</div>");
		} else {
			$lessonExamples = null;
		}

		var $lessonUsagePatterns;
		var $usagePatterns = getHTML_EmptyIfNull($('#usage-patterns'));
		if ($usagePatterns != "") {
			$lessonUsagePatterns = $("<div class='lesson-usage-patterns'>"
					+ "<span class='lesson-label highlight-label'>"
					+ PATTERNS_LABEL + ": </span>"
					+ "<div class='lesson-usage-patterns-content'>"
					+ $('#usage-patterns-content').html() + "</div>" + "</div>");
		} else {
			$lessonUsagePatterns = null;
		}

		// Others: related words + encounter context

		// related words: synonyms, antonyms
		var $synonyms;
		var synonyms = getHTML_EmptyIfNull($('#synonyms-content'));
		if (synonyms != "") {
			$synonyms = $('<div class="lesson-synonyms"><span class="lesson-synonym-label">'
					+ SYNONYMS_LABEL
					+ ": </span>"
					+ '<span class="synonyms">'
					+ synonyms + '</span></div>');
		} else {
			$synonyms = null;
		}

		var $opposites;
		var opposites = getHTML_EmptyIfNull($('#opposites-content'));
		if (opposites != "") {
			$opposites = $('<div class="lesson-opposites"><span class="lesson-synonym-label">'
					+ OPPOSITES_LABEL
					+ ": </span>"
					+ '<span class="synonyms">'
					+ opposites + '</span></div>');
		} else {
			$opposites = null;
		}

		var $relatedWordInfo;
		if ($synonyms != null || $opposites != null) {
			$relatedWordInfo = $("<div class='lesson-related-words'></div>");
			if ($synonyms != null) {
				$relatedWordInfo.append($synonyms);
			}
			if ($opposites != null) {
				$relatedWordInfo.append($opposites);
			}
		} else {
			$relatedWordInfo = null;
		}

		// encounter context
		var $context;
		var encounterCtxt = getHTML_EmptyIfNull($('#enctx-content'));
		if (encounterCtxt != "") {
			$context = "<div class='lesson-enctx'>" + "<span class='label'>"
					+ ENCTX_LABEL + ": </span>"
					+ "<div class='lesson-enctx-content'>" + encounterCtxt
					+ "</div>" + "</div>";
		} else {
			$context = null;
		}

		var $otherInfo;
		if ($relatedWordInfo != null || $context != null) {
			$otherInfo = $("<div class='lesson-other-info'></div>");
			if ($relatedWordInfo != null) {
				$otherInfo.append($relatedWordInfo);
			}
			if ($context != null) {
				$otherInfo.append($context);
			}
		} else {
			$otherInfo = null;
		}

		// the usageExample + otherInfo needs to be put in a scrollable area
		$scrollableArea = $("<div class='lesson-scrollable-area'></div>");

		if ($lessonExamples != null) {
			$scrollableArea.append($lessonExamples);
		}

		var $readMore;
		if ($lessonUsagePatterns != null || $otherInfo != null) {
			var readMoreLabel;

			if ($lessonUsagePatterns != null) {
				$scrollableArea.append($lessonUsagePatterns);
				if ($otherInfo != null) {
					readMoreLabel = LESSON_SEE_WORD_USAGE_AND_MORE;
				} else {
					readMoreLabel = LESSON_SEE_WORD_USAGE;
				}
			} else {
				readMoreLabel = LESSON_SEE_MORE;
			}

			if ($otherInfo != null) {
				$scrollableArea.append($otherInfo);
			}

			// b/c usage patterns and other info are hidden by default, we need
			// a "read more"
			$readMore = $("<a href='javascript:void(0);' class='lesson-read-more-label'>"
					+ readMoreLabel + "</a>");
			$scrollableArea.append($readMore);
		} else {
			$readMore = null;
		}

		$lessonTop = $("<div class='lesson-top'></div>").append($wordInfo, $scrollableArea);

		// lesson bottom: assurance msg (if any) + the buttons
		$lessonBottom = $("<div class='lesson-bottom'></div>");
		
		$nextBtns = $('<div class="lesson-next-btns clearfix"><div id="lesson-next-button" class="blue-button" role="button" style="-webkit-user-select: none; -moz-user-select: none;" title="' + NEXT_OR_DONE_EXPLANATION + '">' + NEXT_OR_DONE_LABEL + '</div></div>');
		
		/*$nextBtns = $('<div class="lesson-next-btns clearfix">'
		+ '<input type="button" id="lesson-next-button" class="blue-button" value="'
		+ NEXT_OR_DONE_LABEL + '" title="' + NEXT_OR_DONE_EXPLANATION
		+ '" />' + '</div>');*/

		var $assureNewWords;
		if (isNewWordSurrender) {
			// add a message to reassure the user
			$assureNewWords = $("<div class='assure-new-words'>"
					+ ASSURE_USER_NEW_WORDS + "<br>"
					+ ASSURE_USER_NEW_WORDS_CLICK_NEXT + "<div>");

			$lessonBottom.append($assureNewWords);
		} else {
			// on mobile we would not have enough space to display lesson-back-button
			// so this is only for desktop
			if (!isMobileBrowser) {
				// show the goback to quiz link only if user didn't click "idon't know"
				$nextBtns.append('<div id="lesson-back-button" class="white-button" role="button" style="-webkit-user-select: none; -moz-user-select: none;">' + BACK_LABEL + '</div>');
				//$nextBtns
						//.append('<a id="lesson-back-button" href="javascript:void(0)">'
								//+ BACK_LABEL + '</a>');
			}
			
			$assureNewWords = null;
		}

		// assured msg is already appended above (if any)
		if (isMobileBrowser) {
			$('.mobile-bottom-buttons').html('<div id="lesson-next-button" class="white-button" role="button" style="-webkit-user-select: none; -moz-user-select: none;" title="' + NEXT_OR_DONE_EXPLANATION + '">' + NEXT_OR_DONE_LABEL + '</div>');
			$('.mobile-bottom').show();
		} else {
			$lessonBottom.append($nextBtns);
		}

		// lesson = top + bottom + image (if any)
		$lesson.append($lessonTop, $lessonBottom);

		// only adjusts after we have appended to the $lesson
		// only for desktop, no need to do on mobile
		if (!isMobileBrowser) {
			if (isNewWordSurrender) {
				// sum of nextBtn height and the re-assurance height,
				// re-assurance div: width fixed to 100 (due to padding, it's
				// inaccurate or unnecesasrily complex to get it value dynamically)
				var lessonBottomHeightPx = (100 + parseInt($nextBtns.css('height'),
						10))
						+ 'px';
				$scrollableArea.css('padding-bottom', lessonBottomHeightPx);
				$lessonBottom.css({
					'height' : lessonBottomHeightPx,
					'margin-top' : '-' + lessonBottomHeightPx
				});
			} else {
				var nextBtnsHeightPx = $nextBtns.css('height');
				$scrollableArea.css('padding-bottom', nextBtnsHeightPx);
				$lessonBottom.css({
					'height' : nextBtnsHeightPx,
					'margin-top' : '-' + nextBtnsHeightPx
				});
			}
		}

		if ($lessonImage !== null) {
			$('.lesson-word-info-meaning-container').prepend($lessonImage);
		}

		// get the current width and height of the current quiz
		// so that when we swap it with the lesson, there won't be any
		// "movement"
		$quiz = $('#word-quiz');

		if (!isMobileBrowser) {
			var lessonHeightPx = $quiz.css('height');
			$lesson.css({
				'width' : $quiz.css('width'),
				'min-height' : lessonHeightPx
			});
			
			// this is necessary to push the lessonBottom to the bottom of the
			// lesson
			$lessonTop.css('min-height', (parseInt(lessonHeightPx, 10) - parseInt($wordInfo.css('margin-top'), 10)) + 'px');
		} else {
			// responsive: don't set those min-height value
		}

		/*
		 * $scrollableArea.slimScroll({ height: (isNewWordSurrender? '170px':
		 * '220px'), //reduce the size to show the assurance msg railVisible:
		 * true, size: '10px', color: '#004D8D' });
		 */

		$('#lesson-view-ipa-us').click(function() {
			$(this).hide();
			$('#lesson-ipa-us').show();
		});

		if ($readMore != null) {
			$readMore.click(function() {
				$(this).hide();
				$('.lesson-usage-patterns').show();
				$('.lesson-other-info').show();
			});
		}

	}

	// lesson is now ready, display it
	$quiz.hide();
	$lesson.addClass('mcq-review').show();

	$('#lesson-next-button').click(function() {
		// do what the next-button does
		if ($('#next-button').is(":visible") || $('#lesson-next-button').is(":visible")) {
			//alert ('recordRating called inside lesson next btn clicked'); //testing/
			recordRating();
		}
	});

	$('#lesson-back-button').click(function() {
                if (testType == TEST_TYPE_MEANING_WORD && isTestTypeImageWord) {
		    addImageWordCSSClasses();
                }

		// hide the lesson and show the quiz
		$('#word-lesson').hide();
		$('#word-quiz').show();
	});

}

function showBackSide(vocab, isFront, manuallyCreated, stressFirstSyl) {
	if (isFront) {// the side to show contains meaning
		$('#back-content').show();
		$('#edit-back').show(); // deprecated
		$('.examples').show();
		$('.synonyms').show();
	} else {// the side to show contains vocab
		var lastChar = vocab.substring(vocab.length - 1);
		var vocabFront = vocab.substring(0, vocab.length - 1);

		var endsWithVowel = false;
		var endsWithY = false;
		var endsWithVowelCons = false; // dubbed; banned; dubbing; excluding words ending with w/x/y/z

		if (lastChar == "a" || lastChar == "e" || lastChar == "i"
				|| lastChar == "o" || lastChar == "u") {
			endsWithVowel = true;
		} else if (lastChar == 'y') {
			endsWithY = true;
		} else if (lastChar != "w" && lastChar != "x" && lastChar != "z") {
			// last char is consonant, and not in the excluded cases
			
			var penultimate = vocab.substring(vocab.length - 2, vocab.length - 1);
			// if not stress first syl and has Consonant-Vowel-Consonant ending,
			// double the last consonant before -ed and -ing
			// note that for single-syllable word, there is no stress mark and
			// they'll have stressFirstSyl = false
			// ref: http://english-zone.com/spelling/doubles.html
			if (!stressFirstSyl
					&& (penultimate == "a" || penultimate == "e"
							|| penultimate == "i" || penultimate == "o" || penultimate == "u")) {
				var thirdLast = vocab.substring(vocab.length - 3,
						vocab.length - 2);
				if (thirdLast != "a" && thirdLast != "e" && thirdLast != "i"
						&& thirdLast != "o" && thirdLast != "u") {
					endsWithVowelCons = true;
				}
			}
		}

		$('#front-content').html(
				showHiddenVocab($('#front-content').html(), 
						endsWithVowel, endsWithY, endsWithVowelCons, vocab, vocabFront));

		if (manuallyCreated) {
			$('#back-content').show();
			$('#edit-back').show();
		} else {
			$('#vocab-para').show();
			$('#idioms').show();
			$('#usage-patterns').show();

			$('.ex-image a').attr('title', vocab.toUpperCase());

			// now we need to insert back the vocab into the '[word]'
			$('#enctx-content').html(
					showHiddenVocab($('#enctx-content').html(), 
							endsWithVowel, endsWithY, endsWithVowelCons, vocab, vocabFront));

			$('#examples-content').html(
					showHiddenVocab($('#examples-content').html(),
							endsWithVowel, endsWithY, endsWithVowelCons, vocab, vocabFront));

			$('#synonyms-content').html(
					showHiddenVocab($('#synonyms-content').html(),
							endsWithVowel, endsWithY, endsWithVowelCons, vocab, vocabFront));

			$('#opposites-content').html(
					showHiddenVocab($('#opposites-content').html(),
							endsWithVowel, endsWithY, endsWithVowelCons, vocab, vocabFront));
			
			if (testType == TEST_TYPE_MEANING_WORD && isPhrase) {
				// for idioms and phrasal verbs, we don't want any highlighting so we call this function
				removeVocabDisplayTag('examples');
				
				// for idioms/phrasal verbs, these 4 are hidden when the question is shown
				// so when the correct option is clicked, we want to show these
				// so that at least the user will see one example of the idiom/phrasal verb
				$('#enctx-label').show();
				$('#enctx-content').show();
				$('#examples-label').show();
				$('#examples-content').show();
			}
		}
	}

	$('.back-side')
			.append('<p id="dict" class="right">' + dictContent + '</p>');
}

function showHiddenVocab(html, endsWithVowel, endsWithY, endsWithVowelCons, vocab, vocabFront) {
	if (html == null) {
		return null;
	} else {
		if (endsWithVowelCons) {
			html = html.replace(/\[word\]<\/label>ing/g, vocab + "</label>"
					+ vocab.substring(vocab.length - 1) + 'ing');
			html = html.replace(/\[word\]<\/label>ed/g, vocab + "</label>"
					+ vocab.substring(vocab.length - 1) + 'ed');
		} else if (endsWithVowel) {
			html = html.replace(/\[word\]<\/label>ing/g, vocabFront + "ing</label>");
		} else if (endsWithY) {
			html = html.replace(/\[word\]<\/label>ies/g, vocabFront + "ies</label>");
			html = html.replace(/\[word\]<\/label>ier/g, vocabFront + "ier</label>");
		}

		html = html.replace(/\[word\]<\/label>/g, vocab + "</label>");

		return html;
	}
}

function getAudioPrefixPath(audioUS) {
	if (audioUS.indexOf('/static/flashcards/audios/') != -1 ||
			audioUS.indexOf('/static/flashcards/sentence_audios/') != -1) { // local file
		return '';
	} else {
		return 'http://www.oxfordlearnersdictionaries.com';
	}
}

function hideMeaningImage() {
	$('.ex-image').hide();

	// set to empty now or else the next loading of the next image would cause a
	// disturbing flash effect
	$('.ex-image a').attr('href', '');

	$('.ex-image img').attr('src', '');
}

//responsive
function addSubImageClassForResponsive(parentElement) {
	// only append if there is not already a ".sub-image"
	if (parentElement.children(".sub-image").length == 0) {
		parentElement.append('<a href="#" class="sub-image"></a>')
	}
	
	// word lesson on mobile device, ".sub-image" element is a new element
	// so using delegate to attach a handler to it.
	$('.mcq-wrapper').on("click", ".sub-image", function(){
		$(".ex-image-container").addClass("active").closest(".mobile-alt").addClass("active");
	});
}

function setCardInfo(data, transformed, isMCQ, testType) {
	/*
	 * This function display the content of a word isFront = true if the word is
	 * the question
	 * 
	 * In our main MCQ mode: the word is alwasys "back": (meaning, word). So the
	 * back-side contains the word
	 */
	var cardid = data.cardid, repetition = data.repetition,

	dict_id = data.dict_id,

	vocab = data.vocab,

	// all these 6 fields may contain the word and we may need to hide the words
	meaning = data.meaning, preCtx = data.preCtx, postCtx = data.postCtx, 
			enCtx = preCtx + ' ' + postCtx, ctxUrl = data.ctxUrl, 
			examples = data.examples, 
			synonyms = data.synonyms, opposites = data.opposites, 
			imageUrl = data.imageUrl,

	session = data.session, manuallyCreated = data.manuallyCreated, isFront = data.isFront;

	//alert ('receive card id = ' + cardid + ', vocab = ' + vocab + ', meaning = ' + meaning);

	hideMeaningImage(); // hide first, if there is image, the text area would
						// then shrink back

	$('#cardid').val(cardid);
	$('#session').val(session);

	var vocabSideName, meaningSideName;
	var pseudoIsFront = getPseudoIsFront(isMCQ, isFront, testType);
	if (pseudoIsFront) {
		vocabSideName = "front";
		meaningSideName = "back";
	} else {
		vocabSideName = "back";
		meaningSideName = "front";
	}

	var vocabSideClass = '.' + vocabSideName + '-side';
	var vocabContent = vocabSideName + '-content';
	var editVocab = 'edit-' + vocabSideName;

	var meaningSideClass = '.' + meaningSideName + '-side';
	var meaningContent = meaningSideName + '-content';
	var editMeaning = 'edit-' + meaningSideName;

	$(meaningSideClass).empty();
	$(vocabSideClass).empty();
	$('.options-side').empty(); // for MCQs

	$(meaningSideClass)
			.append(
					'<p id="'
							+ meaningContent
							+ '" class="text-display"></p>'
							+
							/*
							 * '<label id="' + editMeaning + '"
							 * class="edit-content">Edit</label>' +
							 */
							"<div class='after-meaning'>"
							+ '<p class="synonyms"><label id="synonyms-label" class="synonyms label"></label><label id="synonyms-content" class="synonyms"></label></p>'
							+ '<p class="synonyms"><label id="opposites-label" class="synonyms label"></label><label id="opposites-content" class="synonyms"></label></p>'
							+ '<p id="enctx-label" class="examples label"></p><p id="enctx-content" class="examples"></p>'
							+ '<p id="examples-label" class="examples label"></p><p id="examples-content" class="examples"></p>'
							+ "</div>");

	// temporary solution
	/*
	 * transform indicates displaying of flashcard in learning (in Smart
	 * Flashcard page): we need to hide the word in the question-side Transform
	 * is false in editing mode.
	 */
	
	//right now, if it's prepared word and it's idioms or phrasal verbs, we won't attempt to hide anything (even just the head word) 
	//TODO: support hiding of idioms and phrasal verbs
	if (transformed && !pseudoIsFront && (manuallyCreated || (data.idioms == "" && data.phrasalVerbs == ""))) {
		// show meaning, guess word so we need to remove all occurrences of words
		// needs to filter the vocab from example sentences, if any.

		// reason for last char: dub --> dubbing (2 b's)
		var lastChar = vocab.substring(vocab.length - 1);

		var vocabFront;
		if (vocab.length >= 4) {
			// reason for vocab front: repatriate --> repatriating (e is
			// deleted)
			vocabFront = vocab.substring(0, vocab.length - 1);
		} else {// too short words such as "go" -> "g" and this would match
				// virtually everything
			vocabFront = vocab;
		}

		// the ^\\w: (not a 'char') is to make sure 'vocab' is a word, and not
		// part of a word
		var regex = new RegExp('((un|in|im|dis)|[^\\w]|^)(' + preg_quote(vocab)
				+ '|' + preg_quote(vocabFront) + ')((' + preg_quote(lastChar)
				+ ')?((s|ies|es|ier|d|ed|ing|ly)?($|[^\\w])))', 'gi');

		meaning = meaning.replace(regex,
				"$1<label class='vocab-display'>[word]</label>$6");

		if (!manuallyCreated) {
			examples = examples.replace(regex,
					"$1<label class='vocab-display'>[word]</label>$6");

			synonyms = synonyms.replace(regex,
					"$1<label class='vocab-display'>[word]</label>$6");
			opposites = opposites.replace(regex,
					"$1<label class='vocab-display'>[word]</label>$6");

			// if the word was stored in context (using Word Saver)
			// there is already this marker inside preCtx: <label
			// class='wctx'><word/phrase></label>
			// So we need first to hide everything inside that label

			// Note that if we replace, for example, "long lost" with [word],
			// we'd (currently)
			// display "long-lost" (the dictionary form) instead of the origin
			// form. TODO: fix this

			// alert ('orig pre = ' + preCtx);
			preCtx = preCtx.replace(/<label class='wctx'>.*?<\/label>/g,
					"<label class='vocab-display'>[word]</label>");
			// alert ('after pre = ' + preCtx + ", pstCtxt = " + postCtx);

			preCtx = preCtx.replace(regex,
					"$1<label class='vocab-display'>[word]</label>$6");
			postCtx = postCtx.replace(regex,
					"$1<label class='vocab-display'>[word]</label>$6");
			enCtx = preCtx + ' ' + postCtx;
		}
	}

	$('#' + meaningContent).html(meaning);

	// check if this is a manually-created card, which has different display
	// from auto-created cards
	if (manuallyCreated) {
		$(vocabSideClass).append('<p id="' + vocabContent + '" class="text-display"></p>'
		/*
		 * + '<label id="' + editVocab + '" class="edit-content">Edit</label>'
		 */);
		/*
		 * $("#" + editVocab).click(function(){ addContent(vocabSideName); });
		 */
	} else {
		$(vocabSideClass)
				.append(
						'<div id="vocab-para"><label id="'
								+ vocabContent
								+ '" class="vocab-display big"></label> '
								+ '<label id="pos"></label> '
								+ '<label id="ipa-us"></label><span id="audio-us"></span> '
								+ '<label id="ipa-uk"></label><span id="audio-uk"></span> '
								+ '<label id="inflections"></label>'
								+ '<label id="meta-usage"></label>' + '</div>');
		$(vocabSideClass).append('<div id="idioms"></div>');
		$(vocabSideClass).append('<div id="usage-patterns"></div>');
	}
	$('#' + vocabContent).html(vocab);

	// repetition == 0: show the new-word label but ONLY if it is not mobile
	if (repetition == 0 && !isMobileBrowser) {
		var classShown;

		if (manuallyCreated || (data.idioms == '' && data.phrasalVerbs == "")) {//single word
			$('.repetition.new-phrase').hide();
			$('.repetition.new-word').show();

			classShown = '.repetition.new-word';
		} else {
			$('.repetition.new-word').hide();
			$('.repetition.new-phrase').show();

			classShown = '.repetition.new-phrase';
		}

		var paddingAmount = parseInt($(classShown).css('width'), 10) +
			parseInt($(classShown).css('padding-left'), 10) +
			parseInt($(classShown).css('padding-right'), 10);

		// in theory, we need to do paddingAmount = paddingAmount + 20 (px)
		// however, in practice, because the new word label is right on the
		// edge of .mcq-wrapper while #word-question is in #word-quiz which
		// has 20px padding, so no need to do paddingAmount = paddingAmount
		// + 20 (px)
		paddingAmount = paddingAmount + 'px';

		$('#word-question').css('padding-right', paddingAmount);
	} else {// old word, hide the new label
		$('.repetition.new-word').hide();
		$('.repetition.new-phrase').hide();

		// if previous question has "New word" / "New phrase" label, we may have
		// added padding-right, so here we reset it
		$('#word-question').css('padding-right', '0');
	}

	if (manuallyCreated) {
		return [dict_id, vocab, pseudoIsFront, manuallyCreated, false, false, repetition];
	}
	

	// the following is display for auto-created cards (from dictionaries)
	var pos = data.pos, formality = data.formality, beforeNounOnly = data.beforeNounOnly, modifiedType = data.modifiedType, 
				usedForm = data.usedForm, inflections = data.inflections, 
				idioms = data.idioms, phrasalVerbs = data.phrasalVerbs, 
				usagePatterns = data.usagePatterns, literary = data.literary, 
				approval = data.approval, region = data.region, ipaUS = data.ipaUS, 
				ipaUK = data.ipaUK, audioUK = data.audioUK;

	// global var
	audioUS = data.audioUS;

	dictionary = data.dictionary;
	dictRelUrl = data.dictRelUrl;

	var metaUsage = "";

	if (formality != "") {
		metaUsage += formality;
	}
	if (beforeNounOnly == "True") {
		metaUsage += (metaUsage == "" ? "before noun only"
				: ", before noun only");
	}
	if (modifiedType != "") {
		metaUsage += (metaUsage == "" ? modifiedType : ", " + modifiedType);
	}

	if (usedForm != "") {
		metaUsage += (metaUsage == "" ? usedForm : ", " + usedForm);
	}

	// skip inflections for now
	// if (inflections != "") {
	//	metaUsage += (metaUsage == "" ? inflections : ", " + inflections);
	//}

	if (literary == "True") {
		metaUsage += (metaUsage == "" ? "literary" : ", literary");
	}
	if (approval != "") {
		metaUsage += (metaUsage == "" ? approval : ", " + approval);
	}

	if (metaUsage != "") {
		metaUsage = "[" + metaUsage + "]";
	}

	if (region != "") {
		region = "(" + region + ")";
		metaUsage = region + "  " + metaUsage;
	}

	if (usagePatterns != "") {
		$("#usage-patterns").html(
				"<span class='label'>" + PATTERNS_LABEL
						+ ":</span> <span id='usage-patterns-content'>"
						+ usagePatterns + "</span>");
	}

	if (pos != "") {
		$('#pos').html(pos);
	}
	
	$('#meta-usage').html(metaUsage);

	ipaUS = $.trim(ipaUS);
	ipaUK = $.trim(ipaUK);
		
	stressFirstSyl = false;
	if (ipaUS == "" || ipaUK == "") {
		// we'll label as "pronunciation"
		if (ipaUK == "") {// this rarely happens
			ipaUK = ipaUS;
		}
		if (ipaUK != "") {
			$('#ipa-uk').html(PRONUNC_LABEL + ": /" + ipaUK + "/");
		}
	} else {
		if (vocab != 'travel' && ipaUS.substring(0, 1) == 'ˈ') {
			// for travel: we still want to double the l
			stressFirstSyl = true;
		}

		ipaUS = "US: /" + ipaUS + "/";
		ipaUK = "UK: /" + ipaUK + "/";
		$('#ipa-us').html(ipaUS);
		$('#ipa-uk').html(ipaUK);
	}

	// determine whether the audio file is local or on oxford server
	var audioPath = getAudioPrefixPath(audioUS);

	insertAudio(audioUS, audioPath, 'audio-us');
	insertAudio(audioUK, audioPath, 'audio-uk');
	
	var isPhrase;
	if (idioms != "" || phrasalVerbs != "") {
		var phrase;
		if (idioms != "") {
			phrase = idioms;
		} else {
			phrase = phrasalVerbs;
		}
		$("#idioms").html(phrase);
		isPhrase = true;
	} else {
		isPhrase = false;
	}
	
	// encounter context
	if (preCtx != "" || postCtx != "") {
		$('#enctx-label').html(ENCTX_LABEL);
		if (ctxUrl != "") {
			var url = ctxUrl.substring(0, 50);
			if (ctxUrl.length > 50) {
				url += '...';
			}
			var source = '(Article: <a href="' + ctxUrl + '" target="_blank">'
					+ url + '</a>)';
		} else {
			source = "";
		}
		$('#enctx-content').html('...' + enCtx + '...' + source);
	}

	if (examples != "") {
		examples = examples.replace(/<br \/>/g, "<br /><br />"); // a quick
																	// fix for
																	// now
		$('#examples-label').html(EXAMPLES_LABEL + ":");
		$('#examples-content').html(examples);
	}

	// alert ('syn length = ' + synonyms.length + ", = " + synonyms);
	if (synonyms != "") {
		$('#synonyms-label').html(SYNONYMS_LABEL + ": ");
		$('#synonyms-content').html(synonyms);
	}
	if (opposites != "") {
		$('#opposites-label').html(OPPOSITES_LABEL + ": ");
		$('#opposites-content').html(opposites);
	}

	// image (if any)
	if (imageUrl != "") {
		// use first() because we only want to add data-lightbox for the <a> used on desktop
		// for the <a> used on mobile (with class="sub-image"), we don't want to add data-lightbox
		var $imageLink = $('.ex-image a').first();
		$imageLink.attr({
			'data-lightbox' : imageUrl,
			'href' : imageUrl,
			'title' : '' // clear the previous title
		});

		// get the small image path
		var dotIndex = imageUrl.lastIndexOf(".")
		var smallImagePath = imageUrl.substring(0, dotIndex) + "_small"
				+ imageUrl.substring(dotIndex);
		$('.ex-image img').attr('src', smallImagePath);
		
		addSubImageClassForResponsive($('.ex-image'));

		$('.ex-image').show();
		
		// responsive
		$('.ex-image-container img').attr('src', imageUrl);
	}

	$('.front-side').append('<p id="dict" class="right"></p>');
	var dictUrl = '', dictName = '';

	if (dictionary == 'oxf default' || dictionary == 'oxf'
			|| dictionary == 'Oxford Learners') {
		if (dictRelUrl != "") {
			dictUrl = 'http://www.oxfordlearnersdictionaries.com/' + dictRelUrl;
		} else {
			dictUrl = 'http://www.oxfordlearnersdictionaries.com/definition/english/' + vocab;
		}
		dictName = 'Oxford Learners Dictionary';
	} else if (dictionary == 'fvd') {
		// for this dict, it doesn't provide a url directly to the word
		dictUrl = 'http://www.informatik.uni-leipzig.de/~duc/Dict/';
		dictName = 'Free Vietnamese Dict';
	} else if (dictionary == 'wn') {
		dictUrl = 'http://wordnetweb.princeton.edu/perl/webwn?s=' + vocab;
		dictName = 'Word Net';
	}

	if (dictName != '') {
		$('#dict').html(
				"<a href='" + dictUrl + "' target='_blank'>" + "(" + dictName
						+ ")" + "</a>");
	}

	return [dict_id, vocab, pseudoIsFront, manuallyCreated, isPhrase, stressFirstSyl, repetition];

}

function insertAudio(path, urlPrefix, element) {
	if (path != "") {
		path = urlPrefix + path;
		
		if (isMobileTabletBrowser) {
			// want this for BOTH mobile and tablet
			// note that we wrap it with a <div> because we want the text to appear on a new line
			var audioCode = ' <div><span style="cursor: pointer; color: #0073AD; text-decoration: underline;" onclick="playSound(\''
				+ path
				+ '\');">' + CLICK_HERE_LABEL + '</span>&nbsp<span style="color: #666666;">' + TO_HEAR_LABEL + '</span></div>';
		} else {
			var audioCode = ' <span style="cursor: pointer;" onclick="playSound(\''
					+ path
					+ '\');"><img src="/static/flashcards/images/audio_icon_small.png" /></span>';
		}

		$('#' + element).html(audioCode);
	}
}

// no longer needed
function convertToHtmlBreak(text) {
	// alert ("orig text = " + text);
	text = text.replace(/\r\n/g, "<br />");
	text = text.replace(/\r/g, "<br />");
	text = text.replace(/\n/g, "<br />");
	// alert ("after converting to HTML=" + text);
	return text;
}

// no longer needed
function convertToTextLineBreak(text) {
	// alert ("orig text = " + text);
	text = text.replace(/<br \/>/g, "\n");
	// alert ("after converting to Text 1=" + text);
	text = text.replace(/<br>/g, "\n");
	// alert ("after converting to Text 2=" + text);
	return text;
}

// not used
function transform_HtmlListToText(text) {
	text = text.replace(/<ul.*?>/g, '<br />');
	text = text.replace(/<\/ul>/g, '');

	text = text.replace(/<li>/g, '');
	text = text.replace(/<\/li>/g, '<br />');

	return text;
}

function putContent(label, previewLabel) {
	var txtArea = label + "-edit";
	if ($('#' + txtArea).length <= 0) {// when txt area doesn't exist (no edit
										// was made, and hence was notcreated)
		return;
	}

	// var edit = "edit-" + label;
	var sideClass = "." + label + "-side";
	var para = label + "-content";
	// var sideSignal = label + '-signal';

	var content = $('#' + txtArea).val();
	content = content.replace(/(\n)*$/g, "");// remove trailing \n's
	var examples = $('#examples-content').html();
	var synonyms = $('#synonyms-content').html();

	// var signal = $('#' + sideSignal).html();

	$(sideClass).empty();

	// $(sideClass).append('<label>' + getSideLabel(label) + '</label>');
	$(sideClass).append('<p id="' + para + '" class="text-display"></p>');
	$('#' + para).html(convertToHtmlBreak(content));

	/*
	 * $(sideClass).append('<label id="' + edit + '" class="edit-content">Edit</label>');
	 * $('#' + edit).click(function(){ addContent(label, previewLabel); });
	 */
	$(sideClass).append('<p id="examples-content"></p>');
	$('#examples-content').html(examples);
	$(sideClass).append('<p id="synonyms-content"></p>');
	$('#synonyms-content').html(synonyms);

	/*
	 * $(sideClass).append('<label class="side-signal" id="' + sideSignal + '"></label>');
	 * $('#' + sideSignal).html(signal);
	 */
}

/* DEPRECATED, now is simpler */
function getOrPutGetContents() {
	var frontContent = "", backContent = "";

	if ($('#front-content').length > 0) {
		frontContent = $('#front-content').html();
	}

	if ($('#back-content').length > 0) {
		backContent = $('#back-content').html();
	}

	// this potentially means that the text area is being opened
	// if so, we need to get the latest content from it first
	if (frontContent == "") {
		putContent("front");
		frontContent = $('#front-content').html();
	}
	if (backContent == "") {
		putContent("back");
		backContent = $('#back-content').html();
	}

	frontContent = convertToTextLineBreak(frontContent);
	backContent = convertToTextLineBreak(backContent);

	return [ frontContent, backContent ];
}

function getContent(name) {
	var content = "";
	if ($('#' + name + '-edit').length > 0) {
		content = $('#' + name + '-edit').val();
	} else if ($('#' + name + '-content').length > 0) { // auto created -->
														// currently not allowed
														// to edit
		content = $('#' + name + '-content').html(); // the vocab
	}

	content = content.replace(/( |<br>)*$/g, "");// remove trailing (spaces
													// and <br>'s)

	return content;
}

function getSideLabel(label) {
	var sideLabel;
	if (label == "front") {
		sideLabel = "Question:";
	} else {
		sideLabel = "Answer:";
	}
	return sideLabel;
}

function preg_quote(str) {
	// http://kevin.vanzonneveld.net
	// + original by: booeyOH
	// + improved by: Ates Goral (http://magnetiq.com)
	// + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// + bugfixed by: Onno Marsman
	// * example 1: preg_quote("$40");
	// * returns 1: '\$40'
	// * example 2: preg_quote("*RRRING* Hello?");
	// * returns 2: '\*RRRING\* Hello\?'
	// * example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
	// * returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'

	return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g,
			"\\$1");
}


// use to escape strings where special characters like [ and ] are used in a
// regular expression
// http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}


function showAudioQuestionSettingsNotification(name, isVietnamese) {
    var msg;
    msg = '<div style="margin: 0 auto; text-align: justify; padding: 10px;">Hi ' + name + ',';
    msg += '<br /><br />' + gettext('You currently disable pronunication questions') + '.';
    msg += '<br /><br /><div>' + gettext('You can re-enable pronunciation questions in') + ' <a href="/account/#smart-review" target="_blank">' + gettext('Account Settings') + '</a> ' + gettext('anytime you want') + '.</div>';
    msg += '<br /><div style="font-weight: bold;">' + gettext('Enabling pronunciation questions will help you learn the correct pronunciation of new words, which is very important if you want to improve your speaking and listening skills') + '!</div>';
    msg += '<br /><br /><div style="text-align: center;"><div id="fancybox-ok-button" class="blue-button">OK</div></div>';
    
    var fancyboxWidth = 590;
    var fancyboxHeight;
    if (isVietnamese) {
    	fancyboxHeight = 250;
    } else {
    	fancyboxHeight = 270;
    }

    $.fancybox(
        msg,
        {
            'autoDimensions' : false,
            'width' : fancyboxWidth,
            'height' : fancyboxHeight,
            onClosed: function() {
                setViewedNotification();
            }
        }
    );

    $('#fancybox-ok-button').click(function() {
        $.fancybox.close();
    })

    $.ajax({
        type: "POST", 
        url: "/account/notifications/audio_question_settings/viewed",
        dataType: "text",
        data: {},
        success: function(data) {},
        error: function (request, status, error) {}
    });
}
