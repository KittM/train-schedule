
//global variables
$(document).ready(function() {

var trainName = "";
var destination = "";
var trainTime = "";
var frequency = "";
var arrival = "";
var timeRemaining = "";

var cTrain = $("#train-title");
var cdestination = $("#train-destination");
var cTrainTime = $("#train-time")
var cTimeFreq = $("#time-freq")

//call firebase
var firebaseConfig = {
     apiKey: "AIzaSyDyflBHwL_RBLgc1TE_Rv_6MHS9TCHcD-8",
     authDomain: "traintimes-18cdc.firebaseapp.com",
     databaseURL: "https://traintimes-18cdc.firebaseio.com",
     storageBucket: "traintimes-18cdc.appspot.com",
     messagingSenderId: "802793995900",

   };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
        
     var db = firebase.database();
     //errrr database is not a function?


     database.ref("/schedule").on("child_added", function(snapshot) {
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
          console.log("#table-data");

          $("span").hide();

     
     });

var saveinputs = function (event) {
     event.prevenDefault();

     trainName = cTrain.val().trim();
     destination = cdestination.val().trim();
     trainTime = moment(cTrainTime.val().trim(), "HH:mm").subtract(1, "years").format("X");
     frequency = cTimeFreq.val().trim();

     db.ref("/schedule").push({
          name: trainName,
          destination: destination,
          time: trainTime,
          frequency: frequency,
          NextArrivial: nextrain,
          mininutesAway: arrivinging,
          date_added: firebase.database.servervalue.TIMESTAMP
     });

     alert("train added");

     ///empty form
     cTrain.val("");
     cdestination.val("");
     cTrainTime.val("");
     cTimeFreq.val("");
};

$("btn-add").on("click", function (event) {
     if (cTrain.val().length === 0 || cdestination.val().length === 0 || cTrainTime.val().length === 0 || cTimeFreq === 0) {
          alert("missing fields");
     } else {
          saveinputs(event);
     }
     
});

$('form').on("keypress", function (event) {
     if (event.which === 13) {
          if (cTrain.val().length === 0 || cdestination.val().length === 0 || cTrainTime.val().length === 0 || cTimeFreq === 0) {
               alert("missing fields");
          }
          else {
               saveinputs(event);
          }
     
}
});
     
});

     