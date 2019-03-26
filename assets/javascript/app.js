var triviaQuestions = [{
	question: "Who was the last member to join the Foo Fighters?",
	answerList: ["Pat Smear", "Nate Mendel", "Rami Jaffee", "Dave Grohl"],
	answer: 2
},{
	question: "Taylor Hawkins played for a famous singer before he joined the Foo Fighters. Who was that singer?",
	answerList: ["Alanis Morissette", "Cher", "Cyndi Lauper", "Madonna"],
	answer: 0
},{
	question: "What Foo Fighters album was also an HBO TV series?",
	answerList: ["Sonic Highways", "Concrete and Gold", "Wasting Light", "In Your Honor"],
	answer: 0
},{
	question: "Which of the following in NOT a Foo Fighters song?",
	answerList: ["I am the River", "For All the Cows", "Skin and Bones", "Heart Shaped Box"],
	answer: 3
},{
	question: "Taylor Hawkins is the main singer in this song:",
	answerList: ["A Cold Day in the Sun", "Sunday Rain", "Best of you", "Big Me"],
	answer: 1
},{
	question: "In which movie does Dave Grohl play Satan?",
	answerList: ["The Devil's Advocate", "Constantine", "Tenacious D and the Pick of Destiny", "The Devil Wears Prada"],
	answer: 2
},{
	question: "What instrument does Pat Smear play?",
	answerList: ["Drums", "Keyboard", "Bass", "Guitar"],
	answer: 3
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7'];

var currentQuestion; 
var answered;
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var userSelect;
var messages = {
	correct: "Allllriiiiight. Correct answer. You are In The Clear!",
	incorrect: "One of These Days you'll get the right answer. But that day is not today.",
	endTime: "Times Like These are up!",
	finished: "Ready to see if you rocked or if you rolled?"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}

