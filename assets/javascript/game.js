var words = ["cairo", "dakar", "lagos", "paris", "quito", "seoul", "tokyo", "milan", "dhaka", "kyoto"];

var guesses = [];
var winsCounter = document.getElementById("wins");
var remainingCounter = 10;
var wordsPlayed = [];
var userGuess;
var gameCounter = 0;
var letterCounter = 0;
var wordPicked;

var pickWord = function() {
	var wordPick;
	var arr;

	do {
		wordPick = words[(Math.floor((Math.random() * 10) + 1))];
	} while (wordsPlayed.indexOf(wordPick) >= 0);

	wordsPlayed[gameCounter] = wordPick;
	arr = wordPick.split("");

	return arr;
}



var reseter = function() {
	remainingCounter = 10;
	guesses = [];
	letterCounter = 0;
}

var printCorrectGuesses = function(guesses) {

}

var printIncorrectGuesses = function(guesses){

}

wordPicked = pickWord();
document.onkeyup = function(event) {

	userGuess = event.key;
	if (guesses.indexOf(userGuess) < 0) {
		guesses[letterCounter] = userGuess;
		letterCounter++;
	}

	console.log(wordPicked);

	// reseter();

	
	// console.log(guesses);
	// console.log(guesses);

}