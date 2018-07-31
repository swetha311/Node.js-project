/***
This is test functions
***/
var indexjs = require('./index.js');
/*
function sendFn(str_resp) {
    console.log("Inside send ");
   console.log( str_resp);            // The function returns the product of p1 and p2
}

function setHeaderFn(str_header) {
    console.log("Inside setheader");
}

console.log("Hello world!");

//Run lunch Test 
req = require('./json-sample-test/sample-request-lunch-menu.json');
res = {};
res.send = sendFn;
res.setHeader = setHeaderFn;

indexjs.helloHttp(req, res );
console.log( JSON.stringify(res));
/// Run all the tests.


req = require('./json-sample-test/sample-request-bell-schedule');
indexjs.helloHttp(req, res );
console.log( JSON.stringify(res));

// Test dev version
console.log("Testing Development version");
req = require('./json-sample-test/sample-request-bell-schedule');
indexjs.dev_teamup_bot_webhook(req, res );
console.log( JSON.stringify(res));

// Test dismissal


// Test without date
console.log("Testing Dismissal");
req = require('./json-sample-test/sample-request-dismissal-school');
indexjs.dev_teamup_bot_webhook(req, res );
console.log( JSON.stringify(res));


req = require('./json-sample-test/sample-request-lunch-menu-no-date.json');
res = {};
res.send = sendFn;
res.setHeader = setHeaderFn;

indexjs.helloHttp(req, res );
console.log( JSON.stringify(res));


//req = require('./json-sample-test/lunch-menu-palo-alto.json');
//req = require('./json-sample-test/sample-request-lunch-menu.json');
req = require('./json-sample-test/sample-request-bell-schedule.json');
res = {};
res.send = sendFn;
res.setHeader = setHeaderFn;

indexjs.helloHttp(req, res );
console.log( JSON.stringify(res));
*/

// A fake request object, with req.query.text set to 'input'
//const req = { query: {text: 'input'} };

const {
  actionsSdkAppRequestBodyNewSessionMock,
  actionsSdkAppRequestBodyLiveSessionMock,
  headerV1,
  headerV2,
  MockResponse,
  MockRequest,
  fakeConversationId,
  fakeUserId
} = require('actions-on-google/test/utils/mocking');

req = require('./json-sample-test/api-api-with-header-request.json');

const mockRequest = new MockRequest(headerV1, req);
// A fake response object, with a stubbed redirect function which asserts that it is called
// with parameters 303, 'new_ref'.
const res = {
  redirect: (code, url) => {
    assert.equal(code, 303);
    assert.equal(url, 'new_ref');
    done();
  }
};

mockResponse = new MockResponse();

// Invoke addMessage with our fake request and response objects. This will cause the
// assertions in the response object to be evaluated.
indexjs.dev_teamup_bot_webhook(mockRequest, mockResponse);

 console.log(`Request headers: ${JSON.stringify(mockResponse)}`);
       

