    // Storage bucket name is bucket-teamupschool
    // Project =name
    // gcloud beta functions deploy helloHttp  --stage-bucket bucket-teamupschool  --trigger-http
    // gcloud beta functions deploy dev_teamup_bot_webhook --stage-bucket bucket-teamupschool  --trigger-http
    // gcloud beta functions describe helloHttp
    // gcloud beta functions call helloHttp
    // gcloud beta functions logs read
    /*
         HTTP Cloud Function.

         @param {Object} req Cloud Function request context.
         @param {Object} res Cloud Function response context.
        */
// https://us-central1-bot-teamupschool.cloudfunctions.net/dev_teamup_bot_webhook
// https://us-central1-bot-teamupschool.cloudfunctions.net/helloHttp
// firebase serve --only functions
//
//https://001851d4.ngrok.io/bot-teamupschool/us-central1/helloHttp

 'use strict';

process.env.DEBUG = 'actions-on-google:*';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const welcomeintent = require('./src/welcome_intent.js');
const when_is = require('./src/when-is.js');
const lunch_school = require('./src/lunch-school.js');

var constants = require('./src/constants');
const { ApiAiApp } = require('actions-on-google');


 const helloHttp = functions.https.onRequest((request, response) => {

     function fillup_schoolname( app, request, response) {

         console.log("Inside fillup");

         const output =" some out";
         const school_prompt = "Which school do you go to? We support schools in Cupertino School District. You can say name of school such as 'Murdock-Portal' or 'Eaton Elementary'";
         const userId = app.getUser() ? app.getUser().userId : false;

         console.log(" User Id is " + userId);

        if (! userId ){
            response.send(JSON.stringify({ 'speech' :school_prompt,
                                                   'displayText': school_prompt}));
            return;
        }
        const usersRef = admin.database().ref('/users');

        usersRef.child(userId).once('value').then(function(snapshot) {
        if (snapshot.val()) {
            console.log(" Snapshot " +JSON.stringify(snapshot.val()));
            if ( snapshot.val()['school-name'] ) {
                console.log("School name found in the database ");
                    var school_name = snapshot.val()['school-name'];


                    var fire_event =  {
                        "data": { "school-name": school_name},
                        "name": "fill_school_name_event"
                        };

                    response.send(JSON.stringify({ 'speech': output, 'displayText': output , followupEvent: fire_event}));
                } else  {
                    console.log("No School name found in db ");
                    //response.send(JSON.stringify({}));

                    response.send(JSON.stringify({ 'speech' :school_prompt,
                                                   'displayText': school_prompt}));

                }



            } else {
                console.log(" insideuser id else");
                    // Add without any information.

                response.send(JSON.stringify( {'speech' :school_prompt,
                                                   'displayText': school_prompt}));
            }

        });

     }

     function save_school_name(userId, school_name) {
         console.log("Inside save school");
         admin.database().ref('users/' + userId).set({'school-name': school_name});

     }


     console.log( `Dashbot is ${functions.config().dashbot.api_key}`);

     const dashbot = require('dashbot')(functions.config().dashbot.api_key).google;

    const app = new ApiAiApp({request, response});

    dashbot.configHandler(app);
    console.log("Action incomplete is " + request.body.result.actionIncomplete);
    if (request.body.result.actionIncomplete ) {
            // Is user available? If yes, try to find school name in the database.
        fillup_schoolname( app, request, response);
        return;
    }

    const userId = app.getUser() ? app.getUser().userId : false;

     if (userId && app.getArgument('school-name')) {
         // invoke school name
          save_school_name( userId, app.getArgument('school-name') );
     }

     // For any of the actions where school name is given, try
    const actionMap = new Map();
    var school_lunch = require('./src/lunch-school.js');
    const school_dismissal = require('./src/dismissal-school.js');

    const setschoolintent = require('./src/setschoolintent.js');


    const bell_schedule = require('./src/bell-schedule.js');
    const info_school = require('./src/info_school.js');
    const dismissal_school = require('./src/dismissal-school.js');
    actionMap.set(constants.Actions.LUNCH_MENU, school_lunch.schoollunch);

    actionMap.set(constants.Actions.BELL_SCHEDULE, bell_schedule.bellschedule);
    //actionMap.set(constants.Actions.BREAK_SCHOOL, dismissal_school.breakschool);
    actionMap.set(constants.Actions.STARTTIME_SCHOOL, dismissal_school.start_school);
    actionMap.set(constants.Actions.DISMISSAL_SCHOOL, dismissal_school.dismissal_school);

    actionMap.set(constants.Actions.WHEN_IS, when_is.whenis);
    actionMap.set(constants.Actions.WELCOME_INTENT, welcomeintent.welcome);
    actionMap.set(constants.Actions.SET_SCHOOL , setschoolintent.set_school_name);
    actionMap.set(constants.Actions.SCHOOL_ADDRESS, info_school.address_school);
    actionMap.set(constants.Actions.SCHOOL_PHONE, info_school.phone_number_school);

    //actionMap.set(constants.Actions.PARA_ACTION, paraIntent)

    console.log("**** Start of Log request ****" );
    console.log('headers: ' + JSON.stringify(request.headers));
    console.log('body: ' + JSON.stringify(request.body));
    app.handleRequest(actionMap);


 });


 const dev_teamup_bot_webhook = functions.https.onRequest((request, response) => {
     // All the database code that needs testing goes here.
     console.log(" inside dev web hook 2");
     //var admin = require("firebase-admin");

     admin.initializeApp(functions.config().firebase);


     var db = admin.database();

     db.ref('/some_resource/').once('value').then(
         function (snapshot) {

            if (snapshot.val()) {
                console.log("Some value found " + snapshot.val());
                reqsponse.status(200).send('value is ' + snapshot.val());

            }
        },
         function (error) {
             console.log(" some value could not be found ");
             reqsponse.status(200).send('Sorry no value found ');
         }
     );


    });

    module.exports = {
        dev_teamup_bot_webhook,
        helloHttp
    };
