// FIREBASE CONFIGURATION & LIBRARY
var firebaseConfig = {
    apiKey: "AIzaSyCwVJrOhlryspeim54o0v5D4Aelm9d6F6Y",
    authDomain: "train-time-a363e.firebaseapp.com",
    databaseURL: "https://train-time-a363e.firebaseio.com",
    projectId: "train-time-a363e",
    storageBucket: "train-time-a363e.appspot.com"
};

// INITIALIZING FIREBASE
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database.
var dataRef = firebase.database();

// CAPTURE THE BUTTON CLICK
$("#add-train-btn").on("click",function() {
    event.preventDefault();

// GRABBING USER INPUT FROM TEXT BOXES
    var train = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = moment($("#time-input").val().trim(), "HH:mm").subtract(10,"years").format("X");
    var frequency = $("#frequency-input").val().trim()

//CREATES LOCAL "TEMP" OBJECT FOR HOLDING TRAIN DATA
    var newTrain = {
        name: train,
        destination: destination,
        time: time,
        frequency: frequency,
    }

//LOGING NEW VARIABLES TO THE CONSOLE
   console.log(newTrain.train);
   console.log(newTrain.destination);
   console.log(newTrain.time);
   console.log(newTrain.frequency);

// Code for handling the push
    dataRef.ref().push(newTrain)

//CLEARS OUT THE TEXT-BOXES
$("#train-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");

return false;
});

// FIREBASE EVENT TO A TRAINS TO THE DATABASE
dataRef.ref().on("child_added", function (childSnapshot) {
    
//STORE SNAPSHOT ITEMS IN A VARIABLE
var train = childSnapshot.val().train;
var destination = childSnapshot.val().destination;
var time = childSnapshot.val().time;
var frequency = childSnapshot.val().frequency;
//var nextTrain = childSnapshot.val().nextTrain;
//var MinutesTillTrain = childSnapshot.val().MinutesTillTrain;
console.log(childSnapshot.val());


//MOMENT.JS; CONVERSION CODE FOR THE MINUTES & ARRIVAL TIME//
var remainder = moment().diff(moment.unix(time), "minutes") %frequency;
var minutes = frequency - remainder;
var arrival = moment().add(minutes, "m").format("hh:mm A");

console.log(remainder);
console.log(minutes);
console.log(arrival);

//APPEND TO THE NEW ROW 
    $("#current-train-schedule > tbody").append("<tr><td>" + train + "</tr></td>" + destination + "<tr><td>" +  time + "</tr></td>" + frequency + "<tr><td>" + arrival + "</tr></td>" + "<tr><td>" + minutes + "</tr></td>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});