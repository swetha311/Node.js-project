s = require('./school_data_t1.json');
console.log('{');
s.forEach( function (school) {
      console.log(
    `"${school.schoolname}" :
        {"short_name": "${school.shortname}",
        "streetaddress": "${school.streetaddress}",
        "zip": "${school.zip}",
        "phone" : "${school.phone}",
        "city" : "${school.city}",
        "calendar_url" : "${school.calendarurl}",
        "district_name" : "${school.district}"
}
`);

                             console.log(',')});
console.log('}');
