var firebase = require("firebase");
var admin = require("firebase-admin");

var serviceAccount = require("./private-key-bot-teamupschool-firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bot-teamupschool.firebaseio.com"
});



function writeUserData(userId, schoolname) {
  admin.database().ref('users/' + userId).set({
    username: name,
    email: email
  });
}

function readUserData(userId) {
 admin.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  console.log("Username is " +  username); 
});
}

//writeUserData("6767", "kiran", "kiran@yahoo.com")

admin.database().ref('/users/' + '6767').once('value').then(function(snapshot) {
  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  console.log("Username is " +  username); 
});


console.log("User name 2 is " );
/**
 // Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyAUaBsSKOgSv16IGSu35xd65oyOq6ySeNI",
  authDomain: "bot-teamupschool.firebaseapp.com",
  databaseURL: "https://bot-teamupschool.firebaseio.com",
  storageBucket: "bot-teamupschool.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();

function writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email
  });
}

writeUserData("1212", "meera", "meerab@yahoo.com")

**/