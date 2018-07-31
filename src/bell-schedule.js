 var moment = require('moment-timezone');

var constants = require('./constants');
var utils = require('./utils');
const fs = require('fs');
var lookup_special_events = require('./lookup_special_events');

function bellschedule(app) {

        var school_name = app.getArgument('school-name');
        var req_date_txt = app.getArgument('date');
        var req_date;
        if (! req_date_txt) {
            req_date = moment().add(-7, 'hours');

        } else
            req_date = moment( req_date_txt);

        var resp_txt = respond_bell_schedule(school_name, req_date);



        var resp_txt_speech = utils.makeSpeechResponse(resp_txt);
        resp_txt = resp_txt + constants.prompt_txt;

        let hasScreen = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
        let hasAudio = app.hasSurfaceCapability(app.SurfaceCapabilities.AUDIO_OUTPUT);

        if (hasAudio) {
            app.ask( resp_txt_speech);
        } else {
            app.ask(resp_txt);
        }


    }


function respond_bell_schedule ( school_name, req_date) {


        var day_of_week = req_date.day();


        console.log(`day of  week  ${day_of_week} and req date ${req_date}`);


       if ((day_of_week == 6) || (day_of_week == 0)) {

        // Saturday and Sunday
            return  req_date.format('YYYY-MM-DD') + " is weekend. No school- enjoy your weekend.\n ";
      }



    const master_school_data = require('../data/master-school-data.json');

    var school = master_school_data[school_name];

    if ( ! school || !school.short_name) {
        return `I don't have bell schedule for ${school_name}. I am still learning` ;
    }

    // Find if there is school by looking up calendar.

    school_close_resp =  lookup_special_events.schoolClose(school.short_name, req_date);
    if( school_close_resp) {
      // That means school is close.

      return `${school_name} is closed on ${req_date.format('MMMM Do YYYY')} because of ${school_close_resp}`;
    }

    // Find out if conferences schedule

    conferenceSchedule =  lookup_special_events.schoolConference(school.short_name, req_date);


    bell_schedule_file = './data/bell-schedule/' + school.short_name + '_daily_schedule.json';

    console.log(" Bell schedule name " + bell_schedule_file);
    try {
        fs.accessSync(bell_schedule_file);
        bellschedule = require('../' + bell_schedule_file);


        if (bellschedule && bellschedule.bell_schedule && bellschedule.bell_schedule[day_of_week]) {
          var resp = "Here is bell schedule for " + school_name  + " on " + req_date.format('dddd') + " the " + req_date.format('MMMM Do YYYY') +
"<break time='1s'/>";
            if(conferenceSchedule) {

                return resp + " Conference Week - daily schedule is changed. Please check with school site for exact schedule";

            } else
              return  resp + bellschedule.bell_schedule[day_of_week];
        }

    } catch (e) {
        console.log( " Error " + e);
        return "Sorry, I don't have bell schedule for " + school_name;

    }

    return `Sorry, I don't have bell schedule for ${school_name} on ${req_date.format('MMMM Do YYYY')}`;

}





module.exports = {
  bellschedule: bellschedule
}
