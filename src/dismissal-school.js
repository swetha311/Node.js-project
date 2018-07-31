
const fs = require('fs');
var moment = require('moment-timezone');
var utils = require('./utils');
var constants = require('./constants');
var lookup_special_events = require('./lookup_special_events');

function start_school(app) {
      var school_name = app.getArgument('school-name');
        var req_date_txt = app.getArgument('date');
        var req_date;
        if (! req_date_txt) {
            req_date = moment().add(-7, 'hours');

        } else
            req_date = moment( req_date_txt);


        resp_txt= respond_school_start( school_name, req_date);


      var resp_txt_speech = '<speak>' + resp_txt + constants.prompt_txt_speech + '</speak>';
        resp_txt = resp_txt + constants.prompt_txt;

        let hasScreen = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
        let hasAudio = app.hasSurfaceCapability(app.SurfaceCapabilities.AUDIO_OUTPUT);

        if (hasAudio) {
            app.ask( resp_txt_speech);
        } else {
            app.ask(resp_txt);
        }
}
/**
req_date is moment
*/
function respond_school_start ( school_name, req_date) {

    var day_of_week = req_date.day();


       if ((day_of_week == 6) || (day_of_week == 0)) {

        // Saturday and Sunday
            return  "Enjoy your weekend.\n" +
          "No school !.\n ";
      }


    const master_school_data = require('../data/master-school-data.json');

    var school = master_school_data[school_name];


    if ( ! school || !school.short_name) {
        return `I don't have bell schedule for ${school_name}` ;
    }

    // Find if there is school by looking up calendar.

    school_close_resp =  lookup_special_events.schoolClose(school.short_name, req_date);
    if( school_close_resp) {
      // That means school is close.

      return `${school_name} is closed on ${req_date.format('MMMM Do YYYY')} because of ${school_close_resp}`;
    }

      bell_schedule_file = './data/bell-schedule/' + school.short_name + '_daily_schedule.json';

    console.log(" Bell schedule name " + bell_schedule_file);
    try {
        fs.accessSync(bell_schedule_file);
        daily_schedule = require('../' + bell_schedule_file);


        if (daily_schedule && daily_schedule.start_time && daily_schedule.start_time[day_of_week]) {

            return   `Here is school start time for ${school_name} on ${req_date.format('dddd')} the ${req_date.format('MMMM Do YYYY')}` +
"<break time='1s'/>" +  "\n"  + daily_schedule.start_time[day_of_week];
        } else {



            return "Sorry, I don't have school dismissal for the school";
        }

    } catch (e) {
        console.log( " Error " + e);
        return "Sorry, I don't have bell schedule for " + school_name;

    }

    return "Sorry, I don't have bell schedule for your school";

}


 function dismissal_school (app) {



        var school_name = app.getArgument('school-name');
        var req_date_txt = app.getArgument('date');
        var req_date;
        if (! req_date_txt) {
            req_date = moment().add(-7, 'hours');

        } else
            req_date = moment( req_date_txt);

        resp_txt= respond_school_dismissal( school_name, req_date);
        var resp_txt_speech = utils.makeSpeechResponse(resp_txt);


      //var resp_txt_speech = '<speak>' + resp_txt + constants.prompt_txt_speech + '</speak>';
        resp_txt = resp_txt + constants.prompt_txt;

        let hasScreen = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
        let hasAudio = app.hasSurfaceCapability(app.SurfaceCapabilities.AUDIO_OUTPUT);

        if (hasAudio) {
            app.ask( resp_txt_speech);
        } else {
            app.ask(resp_txt);
        }

}



function respond_school_dismissal ( school_name, req_date) {



    var day_of_week = req_date.day();

        console.log("day of  week " + day_of_week);


       if ((day_of_week == 6) || (day_of_week == 0)) {

        // Saturday and Sunday
            return  "Enjoy your weekend.\n" +
          "No school - that means no students to dismiss.\n ";
      }



    const master_school_data = require('../data/master-school-data.json');

    var school = master_school_data[school_name];


    if ( !school ) {
        return "Sorry, I don't have school dismissal for the school";

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
        daily_schedule = require('../' + bell_schedule_file);


        if (daily_schedule && daily_schedule.end_time && daily_schedule.end_time[day_of_week]) {

            resp =  "Here is school dismissal for " + school_name  + " on " + req_date.format('dddd') + " the " + req_date.format('MMMM Do YYYY') + "." +
"<break time='1s'/>" +  "\n" ;
            if (conferenceSchedule)
                return resp + "Conference week. The dismissal time will be changed. Please check with school for correct dismissal time";
            else
              return resp + daily_schedule.end_time[day_of_week];
        } else {



            return "Sorry, I don't have school dismissal for the school";
        }

    } catch (e) {
        console.log( " Error " + e);
        return "Sorry, I don't have bell schedule for " + school_name;

    }

    return "Sorry, I don't have bell schedule for your school";

}





module.exports = {
  dismissal_school: dismissal_school,
  start_school: start_school
}
