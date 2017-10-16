var target;
var counter = 0;
var winCounter = 0;
var lossCounter = 0;

function getRandomInt(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function resetValues() {

    $("#red").attr("data-crystalvalue", getRandomInt(1, 12));
    $("#blue").attr("data-crystalvalue", getRandomInt(1, 12));
    $("#yellow").attr("data-crystalvalue", getRandomInt(1, 12));
    $("#green").attr("data-crystalvalue", getRandomInt(1, 12));

    target = getRandomInt(19, 120);
    counter = 0;
    $("#current-score").text(counter);
    $("#target-score").text(target);
}

function youWon() {
	winCounter++;
	$("#wins").text(winCounter);
}

function youLost() {
	lossCounter++;
	$("#losses").text(lossCounter);
}

resetValues();

$(".crystal-image").on("click", function() {
	var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);

    counter += crystalValue;
    $("#current-score").text(counter);
    
    // Determine if win/loss, and reset values
    if (counter >= target) {

    	if (counter === target) {
    		youWon();
    	} else {
    		youLost();
    	}

    	resetValues();
    }
});