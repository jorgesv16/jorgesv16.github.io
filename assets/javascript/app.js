// Initialize Firebase
var config = {
	apiKey: "AIzaSyCrQMQE7CTS1qIcwFaXxexjrR5HvpkhYbY",
	authDomain: "trainscheduler-f59b1.firebaseapp.com",
	databaseURL: "https://trainscheduler-f59b1.firebaseio.com",
	projectId: "trainscheduler-f59b1",
	storageBucket: "trainscheduler-f59b1.appspot.com",
	messagingSenderId: "178778277029"
};
firebase.initializeApp(config);

var database = firebase.database();

var name;
var destination;
var freq;
var firstTrain;
var nextTrain = 0;
var minutesAway = 0;


$("#add-btn").on("click", function(event) {
	event.preventDefault();

	// Grabbed values from text boxes
	name = $("#name").val().trim();
	destination = $("#destination").val().trim();
	freq = $("#frequency").val().trim();
	firstTrain = $("#time").val().trim();
	minutesAway = calculateAway(firstTrain, freq);
	nextTrain = calculateNext(minutesAway);

	// Code for handling the push
	database.ref().push({
		name: name,
		destination: destination,
		frequency: freq,
		firstTrain: firstTrain,
		nextTrain: nextTrain,
		minutesAway: minutesAway,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});

	$("#name").val("");
	$("#destination").val("");
	$("#frequency").val("");
	$("#time").val("");
});


database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
	// storing the snapshot.val() in a variable for convenience
	var sv = snapshot.val();
	var tableBody = $("#train-table");
	var tableRow = $("<tr>");

	var tdName = $("<td>");
	var tdDest = $("<td>");
	var tdFreq = $("<td>");
	var tdNext = $("<td>");
	var tdAway = $("<td>");

	tdName.text(snapshot.val().name);
	tdDest.text(snapshot.val().destination);
	tdFreq.text(snapshot.val().frequency);
	tdNext.text(snapshot.val().nextTrain);
	tdAway.text(snapshot.val().minutesAway);

	tableRow.append(tdName);
	tableRow.append(tdDest);
	tableRow.append(tdFreq);
	tableRow.append(tdNext);
	tableRow.append(tdAway);

	tableBody.prepend(tableRow);
});

function calculateAway(firstTrain, freq) {
	firstTrain = moment(moment().format("YYYY-MM-DD") + " " + firstTrain + ":00");
	var result = Math.ceil(firstTrain.diff(moment(), 'minutes', true));

	while (result < 0) {
		firstTrain.add(freq, 'minutes');
		result = Math.ceil(firstTrain.diff(moment(), 'minutes', true));
	}

	return result;
}

function calculateNext(minutesAway) {
	return moment().add(minutesAway, 'minutes').format("h:mmA");
}



