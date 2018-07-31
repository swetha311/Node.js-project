

    /** This is quick try out intent to experiement*/  
    const paraIntent = app => {
        
        console.log("Action incomplete is " + app.request_.body.result.actionIncomplete);
        if (!app.request_.body.result.actionIncomplete ) {
            const paraq = app.getArgument('paraq');
            
            app.tell('Para called ' + paraq);
        } else {
            
            var fire_event =  
            
            {
            "data": {
                "paraq": "Murdock Portal"
            },
            "name": "para_event"
            };
            
    
            //app.response_.followupEvent = fire_event;
            
            app.tell({
            displayText: 'This should be ignored',
                speech: "somespeech",
                followupEvent: fire_event});
            
            
            
        }
    }
    