$(document).ready(function() {

  // Initialize Firebase
    var config = {
        apiKey: "AIzaSyClg_9CBuyBx1zfG00NvXisqPkV1sSybZ4",
        authDomain: "my-first-project-4101a.firebaseapp.com",
        databaseURL: "https://my-first-project-4101a.firebaseio.com",
        projectId: "my-first-project-4101a",
        storageBucket: "my-first-project-4101a.appspot.com",
        messagingSenderId: "942795942547"
    };
    
    firebase.initializeApp(config);

    var database = firebase.database();

    // User enters name
        var trainName = "";
    
    // User enters Destination
        var trainDestination = "";
    
    // User enters train Time
        var trainTime = 0;
    
    // User enters frequency to determine time to destination
        var trainFrequency = 0;

    // Capture Train Submit Button Click
    $('#submit').on('click', function(){
        event.preventDefault();

        // store and retrieve the most recent train
        trainName = $('#train-name').val().trim();
        trainDestination = $('#train-destination').val().trim();
        trainTime = $('#train-time').val().trim();
        trainFrequency = $('#train-frequency').val().trim();

        database.ref().push({
            trainName: trainName,
            trainDestination: trainDestination,
            trainTime: trainTime,
            trainFrequency: trainFrequency
        }); // database set

    }); // submit on click

    // Firebase Watcher
    // database.ref().on('value', function(snapshot){
    //     console.log(snapshot.val());
    //     console.log(snapshot.child.key);
    //     console.log(snapshot.val().trainDestination);
    //     console.log(snapshot.val().trainTime);
    //     console.log(snapshot.val().trainFrequency);
    var ref = firebase.database().ref();

    var query = firebase.database().ref().orderByKey();
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.key;
          console.log(key);
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          console.log(childData);

          console.log("train dest: " + childData.trainDestination);
          console.log("train name: " + childData.trainName);
          console.log("train time: " + childData.trainTime);
          console.log("train Frequency: " + childData.trainFrequency);

            var newTrain = $('<tr>');
            var childName = $("<td>").text(childData.trainName);
            var childDestination = $("<td>").text(childData.trainDestination);
            var childTime = $("<td>").text(childData.trainTime);
            var childFrequency = $("<td>").text(childData.trainFrequency);

            newTrain.append(childName).append(childDestination).append(childFrequency).append(childTime);

            $('#train-schedule-area').append(newTrain);

      });
    

        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
       
    });// Firebase Watcher




}); // document ready 