var ical = require('ical');

const Fuse = require('fuse.js');
const fs = require('fs');
var constants = require('./constants');


function whenis(app) {

    var school_name = app.getArgument('school-name');

    var event_name = app.getArgument('event-name');


    var resp_txt = respond_when_is(app, school_name, event_name);

    let hasScreen = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
    let hasAudio = app.hasSurfaceCapability(app.SurfaceCapabilities.AUDIO_OUTPUT);

    if (hasAudio) {
      var resp_txt_speech = '<speak>' + resp_txt + constants.prompt_txt_speech + '</speak>';

        app.ask(resp_txt_speech);
        return;
    } else {

        app.ask(resp_txt);
        return;
    }

}

function respond_when_is(app, school_name, event_name) {

    var moment = require('moment');


    console.log(`When is started  School name ${school_name} Event name ${event_name}`);


    const fuse_options = {
        threshold: 0.2,
        keys: ['summary']
    };


    const master_school_data = require('../data/master-school-data.json');


    var school = master_school_data[school_name];

    if ( ! school || !school.short_name) {
        return `I don't have information about when is ${event_name} at ${school_name}` ;
    }
    var done = false;
    // Need to check if the file exist
    ical_file = './data/iCal-files/' + master_school_data[school_name].short_name + '_calendar.ical';
    console.log("****   ical File *****" + ical_file);
    try {
        fs.accessSync(ical_file);

        var data = ical.parseFile('./data/iCal-files/' + master_school_data[school_name].short_name + '_calendar.ical');

        for (var k in data) {

            var ev = [data[k]];
            //console.log(` Output is: ${JSON.stringify(ev)}`);

            var fuse = new Fuse(ev, fuse_options);
            var output = fuse.search(event_name);

            if (output && output.length != 0) {
                const event_school = output[0];

                var str_resp = event_school.summary;
                if (event_school.start) {

                    const today = moment().add(-7, 'hours');
                    //console.log(  ` ${event_school.start} Type is ${typeof(event_school.start)} Diff is ${today.diff(event_school.start)}`);
                    if (today.diff(event_school.start) > 0) {
                        //Event was in past
                        continue;
                    }

                    console.log(" foo " + moment(event_school.start).format('MMMM Do YYYY, h:mm:ss a'));

                    str_resp = str_resp + " is on " + moment(event_school.start).format('MMMM Do YYYY, h:mm:ss a');
                }
                if (event_school.location) {
                    str_resp = str_resp + " at  " + event_school.location;
                }

                return str_resp
                //console.log( "Returned " + str_resp);


            }
        }

        } catch (e) {
            console.log( e);
            return `Sorry, I don't know when is ${event_name} at ${school_name}. I am still learning to be more precise.`;
        }

    return `Sorry, I don't know when is ${event_name} at ${school_name}. I am still learning.`;
}


module.exports = {
    whenis: whenis
}
