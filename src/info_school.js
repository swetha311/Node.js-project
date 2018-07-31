var constants = require('./constants');

var constants = require('./constants');
var utils = require('./utils');
 function phone_number_school (app) {


        var school_name = app.getArgument('school-name');

        const master_school_data = require('../data/master-school-data.json');

        var school = master_school_data[school_name];
        var resp;

        if(school) {
         resp =   `Here is phone number for  ${school_name}.  <break time='1s'/> <say-as interpret-as='telephone' format='1'> ${school.phone} </say-as>`;

        } else
             resp = "Sorry, I don't know phone for " + school_name;

        var resp_txt_speech = utils.makeSpeechResponse(resp);

        //var resp_txt_speech = '<speak>' + resp + constants.prompt_txt_speech + '</speak>';
        const resp_txt = resp + constants.prompt_txt;

        let hasScreen = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
        let hasAudio = app.hasSurfaceCapability(app.SurfaceCapabilities.AUDIO_OUTPUT);

        if (hasAudio) {
            app.ask( resp_txt_speech);
        } else {
            app.ask(resp_txt);
        }

}


 function address_school (app) {


        var school_name = app.getArgument('school-name');

        const master_school_data = require('../data/master-school-data.json');

        var school = master_school_data[school_name];
        var resp;
        let hasScreen = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
        let hasAudio = app.hasSurfaceCapability(app.SurfaceCapabilities.AUDIO_OUTPUT);

        if(school) {
            console.log("Found School " + school_name);
             address = `${school.streetaddress} ${school.city} ${school.zip}`;

            if (hasAudio) {
                resp = `Here is address for  ${school_name} <break time='1s'/> <say-as interpret-as='address'>  ${address} </say-as>`;

                var resp_txt_speech = utils.makeSpeechResponse(resp);

                app.ask( resp_txt_speech, [constants.prompt_txt_speech]);
            } else {
                app.ask(`Here is address for  ${school_name} -  ${address} `);
            }
        } else {
             resp = "Sorry, I don't know address for " + school_name;
             app.ask(resp,  [constants.prompt_txt_speech]);
        }
}


module.exports = {
  address_school : address_school,
    phone_number_school: phone_number_school
}
