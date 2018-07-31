var chai = require('chai'),
	should = require('chai').should(),
	expect = require('chai').expect,
	supertest = require('supertest'),
	api=supertest('https://us-central1-bot-teamupschool.cloudfunctions.net');
	const { ApiAiApp } = require('actions-on-google');
	var bellschedule = require('../src/bell-schedule.js');

var assert = require('assert');
var school_names =["Sedgwick Elementary School",
 									 "Blue Hills Elementary School",
									 "Collins Elementary School"
									,"De Vargas Elementary School"
									,"Dilworth Elementary School"
									,"Eisenhower Elementary School"
									,"Eaton Elementary School"
									,"Faria Elementary School"
									,"Murdock-Portal Elementary School"
									,"Garden Gate Elementary School"
									,"Lincoln Elementary School"
									,"Christa McAuliffe School"
									,"Meyerholz Elementary School"
									,"Stocklmeir Elementary School"
									,"Stevens Creek Elementary School"
									,"West Valley Elementary School"
									,"Nimitz Elementary School"
									,"Montclaire Elementary School"
									,"Warren E. Hyde Middle School"
									,"Kennedy Middle School"
									,"Lawson Middle School"
									,"Miller Middle School"];

const {
  actionsSdkAppRequestBodyNewSessionMock,
  actionsSdkAppRequestBodyLiveSessionMock,
  headerV1,
  headerV2,
  MockResponse,
  MockRequest,
  fakeConversationId,
  fakeUserId,
	apiAiAppRequestBodyNewSessionMock
} = require('actions-on-google/test/utils/mocking');

describe('unit test bell schedule',function(){
	it('should return bell schedule response',function(){


		const fs = require('fs');
		var data = fs.readFileSync('./json-sample-test/bell-schedule-sample-1.json');
		var post_body = JSON.parse(data);

		for(var i=0; i<school_names.length; i++){
			console.log(school_names[i]);
			post_body.result.parameters["school-name"] = school_names[i];
		//	apiAiAppRequestBodyNewSession = apiAiAppRequestBodyNewSessionMock;
			const mockRequest = new MockRequest(headerV1, post_body);
			mockResponse = new MockResponse();

			      const app = new ApiAiApp({
			        request: mockRequest,
			        response: mockResponse

			      });

			bellschedule.bellschedule(app);
			//console.log(JSON.stringify(app.body_) );
			console.log(JSON.stringify(mockResponse.body.speech));
			assert( (mockResponse.body.speech.indexOf( 'Here is bell schedule') !== -1) , 'Response contains bell schedule');
		}

	return;
	});
});
