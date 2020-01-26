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
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // GRABBING USER INPUT FROM TEXT BOXES
    var train = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = $("#time-input").val().trim();
    var tfrequency = $("#tfrequency-input").val().trim();

    //CREATES LOCAL "TEMP" OBJECT FOR HOLDING TRAIN DATA
    var newTrain = {
        train: train,
        destination: destination,
        time: time,
        tfrequency: tfrequency,
    };

    //LOGING NEW VARIABLES TO THE CONSOLE
   console.log(newTrain.train);
   console.log(newTrain.destination);
   console.log(newTrain.time);
   console.log(newTrain.tfrequency);

// Code for handling the push
    dataRef.ref().push(newTrain)

//CLEARS OUT THE TEXT-BOXES
$("#train-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#tfrequency-input").val("");

return false;

});

// FIREBASE EVENT TO A TRAINS TO THE DATABASE
dataRef.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

//STORE SNAPSHOT ITEMS IN A VARIABLE
var train = childSnapshot.val().train;
var destination = childSnapshot.val().destination;
var time = childSnapshot.val().time;
var tfrequency = childSnapshot.val().tfrequency;
var nextTrain = childSnapshot.val().nextTrain;
var tMinutesTillTrain = childSnapshot.val().tMinutesTillTrain;

//MOMENT.JS; CONVERSION CODE FOR THE MINUTES & ARRIVAL TIME//
var tfrequency = 4;
// THE TIME IS 00:03
var firstTime = "00:03";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

// Current Time
var currentTime = moment();

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");


    //APPEND TO THE NEW ROW 
    $("#current-train-schedule > tbody").append("<tr><td>" + train + "<tr><td>" + destination + "<tr><td>" +  time + "<tr><td>" + tfrequency + "<tr><td>" + nextTrain + "<tr><td>" + tMinutesTillTrain);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});