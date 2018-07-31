var chai = require('chai'),
	should = require('chai').should(),
	expect = require('chai').expect,
	supertest = require('supertest'),
	api=supertest('https://us-central1-bot-teamupschool.cloudfunctions.net');
	const { ApiAiApp } = require('actions-on-google');

var SchoolLunch = require('../src/lunch-school.js');

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

var assert = require('assert');

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


describe('unit test for lunch menu', function(){
  it('should return lunch response on weekday', function(){
		const fs = require('fs');
    var data = fs.readFileSync('.test/json-sample-test/lunch-menu-sample-1.json');
    var post_body = JSON.parse(data);
		mockResponse = new MockResponse();

		for(var i=0; i<school_names.length; i++){
			console.log(school_names[i]);
			post_body.result.parameters["school-name"] = school_names[i];
			post_body.result.parameters.date = '2017-10-17';
			const mockRequest = new MockRequest(headerV1, post_body);
		  const app = new ApiAiApp({
							           request: mockRequest,
							           response: mockResponse
					         });

      SchoolLunch.schoollunch(app);
      console.log(JSON.stringify(mockResponse.body.speech));
      assert( (mockResponse.body.speech.indexOf( 'Here is lunch') !== -1) , 'Response contains Lunch Menu');
		}

    return;

  });

	it('should return lunch response on weekend', function(){
		const fs = require('fs');
		var data = fs.readFileSync('./test/json-sample-test/lunch-menu-sample-1.json');
		var post_body = JSON.parse(data);
		mockResponse = new MockResponse();

		for(var i=0; i<school_names.length; i++){
			console.log(school_names[i]);
			post_body.result.parameters["school-name"] = school_names[i];
			post_body.result.parameters.date = '2017-11-11';
			const mockRequest = new MockRequest(headerV1, post_body);
			const app = new ApiAiApp({
												 request: mockRequest,
												 response: mockResponse
									 });

			SchoolLunch.schoollunch(app);
			console.log(JSON.stringify(mockResponse.body.speech));
			assert( (mockResponse.body.speech.indexOf( 'Enjoy your weekend') !== -1) , 'Response contains no Lunch Menu');
		}

		return;

	});


});
