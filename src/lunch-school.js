 var moment = require('moment');

var constants = require('./constants');
var lookup_special_events = require('./lookup_special_events');
var utils = require('./utils');

 function schoollunch (app) {




        var school_name = app.getArgument('school-name');
        var req_date_txt = app.getArgument('date');
        var req_date;
        if (! req_date_txt) {
            req_date = moment().add(-7, 'hours');

        } else
            req_date =  moment( req_date_txt);


        if( !school_name) {
             app.tell("Sorry, I don't have school lunch data, Try asking me again.");
        }
        console.log (" Lunch date is " + req_date);
        const lunch_menu_str = respond_school_lunch(school_name, req_date);
        var resp_txt_speech = utils.makeSpeechResponse(lunch_menu_str);

        //var resp_txt_speech = `<speak>' ${lunch_menu_str}.  \n${constants.prompt_txt_speech} </speak>`;
        const resp_txt = lunch_menu_str + constants.prompt_txt;

        let hasScreen = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
        let hasAudio = app.hasSurfaceCapability(app.SurfaceCapabilities.AUDIO_OUTPUT);

        if (hasAudio) {
            app.ask( resp_txt_speech, [constants.prompt_txt_speech ]);
        } else {
            app.tell(resp_txt);
        }

}

function find_lunch_menu(school_name) {


     switch( school_name) {

                case "Sedgwick Elementary School":
                case "Blue Hills Elementary School":
                case "Collins Elementary School":
                case "De Vargas Elementary School":
                case "Dilworth Elementary School":
                case "Eisenhower Elementary School":
                case "Eaton Elementary School":
                case "Faria Elementary School":
                case "Murdock-Portal Elementary School":
                case "Garden Gate Elementary School":
                case "Lincoln Elementary School":
                case "Christa McAuliffe School":
                case "Meyerholz Elementary School":
                case "Stocklmeir Elementary School":
                case "Stevens Creek Elementary School":
                case "West Valley Elementary School":
                case "Nimitz Elementary School":
                case "Montclaire Elementary School":
                    return '../data/food_menu/' + 'cupertino_elementary_lunch_menu.json';

                case "Warren E. Hyde Middle School":
                case "Kennedy Middle School":
                case "Lawson Middle School":
                case "Miller Middle School":
                    return '../data/food_menu/' + 'cupertino_middle_lunch_menu.json';


            default:
                    return undefined;

        }


}


respond_school_lunch = function ( school_name, req_date) {


        var day_of_week;
        var current_date;

        console.log(` Type of req_date  ${typeof(req_date)} ${req_date.day()}`);
    var day_of_week = req_date.weekday();

    //day_of_week =   moment(req_date).tz("America/Los_Angeles").isoWeekday();

    // ISO Weekday 1 is Monday 7 is Sunday.
    // 0 == sunday , 6 == saturday
    console.log("day of  week " + day_of_week);


       if ((day_of_week == 6) || (day_of_week == 0)) {

        // Saturday and Sunday
            return  "Enjoy your weekend.\n" +
          "No school - that means no lunch menu.\n ";
      }


      const master_school_data = require('../data/master-school-data.json');

      var school = master_school_data[school_name];

      if ( ! school || !school.short_name) {
          return `I don't have lunch menu for ${school_name}. I am still learning` ;
      }

      school_close_resp =  lookup_special_events.schoolClose(school.short_name, req_date);
      if( school_close_resp) {
        // That means school is close.

        return `${school_name} is closed on ${req_date.format('MMMM Do YYYY')} because of ${school_close_resp}. No school means no lunch is served.`;
      }


      lunch_menu_file = find_lunch_menu(school_name);
      console.log("File Menu " + lunch_menu_file);
      if (lunch_menu_file === undefined ) {

              return "Sorry, I don't have school lunch data for that school";
          }



    lunchmenu = require(lunch_menu_file);


     //req_date_txt =  req_date.getFullYear()+ "-" + ("0" + (req_date.getMonth() + 1)).slice (-2)  + "-" + ("0" + req_date.getDate()).slice(-2);

     req_date_txt = req_date.format("YYYY-MM-DD");

    console.log( ' REQUEST DATE ' + req_date_txt);
        if (lunchmenu[req_date_txt] != undefined) {

            return  "Here is lunch for " + school_name  + " on " + moment(req_date).format('MMMM Do') + "\n"+ lunchmenu[req_date_txt];

        }
       else
                return "I don't have menu for that date - sorry. I have dispatched a human to add that information.";
}




module.exports = {
  schoollunch: schoollunch
}
