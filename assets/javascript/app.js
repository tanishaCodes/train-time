// FIREBASE CONFIGURATION & LIBRARY
var firebaseConfig = {
  apiKey: "AIzaSyCwVJrOhlryspeim54o0v5D4Aelm9d6F6Y",
  authDomain: "train-firstTrain-a363e.firebaseapp.com",
  databaseURL: "https://train-time-a363e.firebaseio.com",
  projectId: "train-firstTrain-a363e",
  storageBucket: "train-firstTrain-a363e.appspot.com"
};

// INITIALIZING FIREBASE
firebase.initializeApp(firebaseConfig);

// VARIABLE THAT REFERENCES DATABASE
var dataRef = firebase.database();

// CAPTURE THE BUTTON CLICK
$("#add-train-btn").on("click", function() {
  event.preventDefault();

  // GRABBING USER INPUT FROM TEXT BOXES
  var train = $("#train-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var firstTrain = moment(
    $("#firstTrain-input")
      .val()
      .trim(),
    "HH:mm"
  )
    .subtract(10, "years")
    .format("X");
  var frequency = $("#frequency-input")
    .val()
    .trim();

  // CREATES LOCAL "TEMP" OBJECT FOR HOLDING TRAIN DATA
  var newTrain = {
    name: train,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // CODE FOR HANDELING THE PUSH
  dataRef.ref().push(newTrain);

  //LOGING NEW VARIABLES TO THE CONSOLE
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  //CLEARS OUT THE TEXT-BOXES
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");

  return false;
});

// FIREBASE EVENT TO LOG TRAIN TO THE DATABASE
dataRef.ref().on(
  "child_added",
  function(snapshot) {
    //STORE SNAPSHOT ITEMS IN A VARIABLE
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var firstTrain = snapshot.val().firstTrain;
    var frequency = snapshot.val().frequency;
  
    console.log(snapshot.val());

    //MOMENT.JS; CONVERSION CODE FOR THE MINUTES & ARRIVAL firstTrain//
    var remainder =
      moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    var minutes = frequency - remainder;
    var arrival = moment()
      .add(minutes, "m")
      .format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    //APPEND TO THE NEW ROW
    $("#current-train-schedule > tbody").append(
      "<tr><td>" +
        name +
        "</td><td>" +
        destination +
        "</td><td>" +
        frequency +
        "</td><td>" +
        arrival +
        "</td><td>" +
        minutes +
        "</td></tr>"
    );

    // HANDLES THE ERRORS
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
