var constants = require('./constants');

exports.welcome = app => {
        const functions = require('firebase-functions');

        const admin = require('firebase-admin');

        const usersRef = admin.database().ref('/users');

        const userId = app.getUser() ? app.getUser().userId : false;
        console.log(" inside user id " + userId);

        if (userId) {



            usersRef.child(userId).once('value').then(function(snapshot) {
                if (snapshot.val()) {
                    if ( snapshot.val()['school-name'] ) {
                        console.log('Putting school name in context ' + school_name);
                        var school_name = snapshot.val()['school-name'];
                        const parameters = {'school-name' : school_name};

                        app.setContext(constants.SCHOOL_NAME_CONTEXT, 105, parameters);
                    }
                     app.ask("Welcome back to teamup. You can ask me about events in your school. Say lunch to get today's lunch. Say bell schedule for bell schedule or help for more commands.");     


                } else
                {
                    console.log(" insideuser id else");
                    // Add without any information.


                    admin.database().ref('users/' + userId).set({'temp': 'othertemp'}).then ( () =>    {

                        app.ask("Hello ! Let's Team Up!. You can ask me about events in your school.  To get today's lunch menu, say  'Lunch Menu'. To get today's bell schedule say 'Bell Schedule' or Help for more commands.", ["You can say lunch menu to get today's lunch menu", 'Try saying Bell Schedule', 'We can stop here. See you next time.']);
                });
            }

                    },
            function(error) { console.log(" Error Reported "+ error);}
                                    );



        } else {
            console.log("user id not present in request");
            app.ask("Welcome to Team Up!. You can ask me about events in your school.  To get today's lunch menu, say  'Lunch Menu'. To get today's bell schedule say 'Bell Schedule' or Help for more commands.", ["You can say lunch menu to get today's lunch menu", 'Try saying Bell Schedule', 'We can stop here. See you next time.']);

        }
    }
