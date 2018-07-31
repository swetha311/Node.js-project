 var moment = require('moment-timezone');



       
exports.find_break_school = function (nnReq, resp) {
    
    resp_txt = "Schools will be in recess on November 20-24 2017";
    
    resp.send(JSON.stringify({  

                        "speech": resp_txt, 
                       "displayText": resp_txt,

         //"speech" is the spoken version of the response, "displayText" is the visual version
        }));
    return;
    
    school_name = nnReq.body.result.parameters['school-name']();
    req_date =  nnReq.body.result.parameters['date']();

    console.log(" school name " + school_name +" date " + req_date);

    resp_txt = respond_dismissal_school( school_name, req_date);
    console.log("Resp text " + resp_txt);
    resp.send(JSON.stringify({  

                        "speech": resp_txt, 
                       "displayText": resp_txt,

         //"speech" is the spoken version of the response, "displayText" is the visual version
        }));
    return;
}