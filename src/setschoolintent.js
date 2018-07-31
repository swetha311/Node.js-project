var constants = require('./constants');

 function set_school_name (app) {
       
                
        var school_name = app.getArgument('school-name');
        
        const resp = "Okay. School set to " + school_name;
     
        var resp_txt_speech = '<speak>' + resp + '</speak>';
        const resp_txt = resp + constants.prompt_txt;
        
        let hasScreen = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
        let hasAudio = app.hasSurfaceCapability(app.SurfaceCapabilities.AUDIO_OUTPUT);
        
        if (hasAudio) {
            app.ask( resp_txt_speech, [constants.prompt_txt_speech ]);
        } else {
            app.tell(resp_txt);
        }
        
     
}
 

module.exports = {
  set_school_name: set_school_name
}