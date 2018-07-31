// This test reads calendar and determines if we have holiday or not
var ical = require('ical');

const Fuse = require('fuse.js');
const fs = require('fs');
var moment = require('moment');

console.log("what node");

ical_file = './data/iCal-files/' + 'murdock_portal' + '_calendar.ical';
console.log("****   ical File *****" + ical_file);

try {
    fs.accessSync(ical_file);

    var data = ical.parseFile(ical_file);
    today = moment().add(1, 'day');
    console.log(" today is " + today.format());
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
            end_date = start_date.clone().add( result[1], 'days');

          } else {
            end_date = start_date;
          }
        }
      }

      if ( today.isBetween(start_date,end_date, 'day', true)) {

        console.log("In between " + event_school.summary);
        if(event_school.summary.includes("No school"))
      }
      if (today.isSame(start_date, 'day')) {
        console.log( "is same " + event_school.summary);
        //console.log( " End date is " + end_date.format());
        console.log( " Event is  %j" , event_school);
      }


    }
}catch( e) {
  console.log(e);
}
