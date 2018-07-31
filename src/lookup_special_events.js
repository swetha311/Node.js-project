/**
If the school is closed, returns string stating reason.
Else returns false.
**/

var ical = require('ical');

const Fuse = require('fuse.js');
const fs = require('fs');
var moment = require('moment');


function schoolClose(school_short_name, req_date) {
  const search_pattern =   /No\sschool|Recess|Staff\sLearning/i;;
  return schoolEvent(school_short_name, req_date, search_pattern);
}

function schoolConference(school_short_name, req_date) {
  const search_pattern =   /conference/i;;
  return schoolEvent(school_short_name, req_date, search_pattern);

}
/**
req_date is moment instance.
school_short_name is string.
**/
function schoolEvent(school_short_name, req_date, search_pattern) {


  ical_file = '../data/iCal-files/' + school_short_name + '_calendar.ical';
  console.log("Looking into   ical File *****" + ical_file);

    try {
      fs.accessSync(ical_file);

      var data = ical.parseFile(ical_file);
      if( !data) {
        return false;
      }

      console.log(" request date original is" + req_date + " Modified is " + req_date.format());
      for (var k in data) {
        var event_school = data[k];
        start_date = moment(event_school.start);
        var end_date;
        if  (!start_date.isValid() ) {
          console.log("Date is invalid " + event_school.start);
        }

        if (event_school.end ) {
          end_date = moment(event_school.end);
        }else {
          if ( event_school.duration) {
            duration = event_school.duration;

            var pattern = /P([0-9]+)D/i;
            var result = pattern.exec(duration);
            if (result ) {
              //console.log( 'Duration is ' +result[1] + ' days');
              if (result[1] == 1) {
                 // One day
                 end_date = start_date;

              } else
              end_date = start_date.clone().add( result[1], 'days');


            } else {
              end_date = start_date;
            }
          }
        }

        if ( req_date.isBetween(start_date,end_date, 'day', true)) {

          console.log("In between " + event_school.summary);

          if( search_pattern.test(event_school.summary)) {
            return event_school.summary;
          } else {
            return false;
          }
        }
      }
    }catch( e) {
      console.log(e);
    }
  return false;
}

module.exports = {
  schoolEvent: schoolEvent,
  schoolClose: schoolClose,
  schoolConference: schoolConference

}
