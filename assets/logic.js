
//global variables

var trainName = "";
var destination = "";
var trainTime = "";
var frequency = "";
var arrival = "";
var timeRemaining = "";

var cTrain = $("#train-title");
var cdestination = $("#train-destination");

//call firebase
     var firebaseConfig = {
          apiKey: "AIzaSyC4WTdsGiBHyXuX9Pne3UTEX5x6Rnii6lI",
          authDomain: "bootcamp-ee030.firebaseapp.com",
          databaseURL: "https://bootcamp-ee030.firebaseio.com",
          projectId: "bootcamp-ee030",
          storageBucket: "bootcamp-ee030.appspot.com",
          messagingSenderId: "842772261153",
          appId: "1:842772261153:web:1af54899c893a73d243660"
        };
        // Initialize Firebase
firebase.initializeApp(firebaseConfig);
        
var db = firebase.database();

database.ref("/trains").on("child_added", function(snapshot) {
     //local variables
     var diff = 0;
     var remainder = 0;
     var arrivinging = "";
     var nextrain = "";
     var frequency = snapshot.val().frequency;

     diff = moment().diff(moment.unix(snapshot.val().time), "minutes");

     remainder = diff % frequency;

     arrivinging = frequency - remainder;
     
     //format for standard time
     nextrain = moment().add(arrivinging, "m").format("hh:mm A");

    // append to our table of trains, inside tbody, with a new row of the train data
    $("#table-data").append(
        "<tr><td>" + snapshot.val().name + "</td>" +
        "<td>" + snapshot.val().destination + "</td>" +
        "<td>" + frequency + "</td>" +
        "<td>" + arrivinging + "</td>" +
        "<td>" + nextrain + "  " + "<a><span class='glyphicon glyphicon-remove icon-hidden' aria-hidden='true'></span></a>" + "</td></tr>"
    );

    $("span").hide();

  
});
     
     