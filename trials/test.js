/***
This is test functions
***/
var indexjs = require('./index.js');


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
indexjs.helloHttp(mockRequest, mockResponse);

 console.log(`Request headers: ${JSON.stringify(mockResponse)}`);
    
console.log('********* Welcome request testing *********')
 welcome_req = new MockRequest( headerV1, require('./json-sample-test/welcome-sample-request.json'));

mockResponse = new MockResponse();

indexjs.helloHttp(welcome_req, mockResponse);
 console.log(`Request headers: ${JSON.stringify(mockResponse)}`);

console.log("**** Welcome request with user id ******");

welcome_req_withuser = new MockRequest( headerV1, require('./json-sample-test/welcome-with-userid-sample-request.json'));

mockResponse = new MockResponse();

indexjs.helloHttp(welcome_req_withuser, mockResponse);
 console.log(`Request headers: ${JSON.stringify(mockResponse)}`);


console.log("**** Lunch menu request with date******");

welcome_req_withuser = new MockRequest( headerV1, require('./json-sample-test/sample-request-lunch-menu.json'));

mockResponse = new MockResponse();

indexjs.helloHttp(welcome_req_withuser, mockResponse);
console.log(`Request headers: ${JSON.stringify(mockResponse)}`);


console.log("**** Lunch menu request without date******");

welcome_req_withuser = new MockRequest( headerV1, require('./json-sample-test/sample-request-lunch-menu-no-date.json'));

mockResponse = new MockResponse();

indexjs.helloHttp(welcome_req_withuser, mockResponse);




console.log(`Request headers: ${JSON.stringify(mockResponse)}`);

console.log("*** When is  starting ***");

welcome_req_withuser = new MockRequest( headerV1, require('./json-sample-test/when-is-sample-request.json'));

mockResponse = new MockResponse();

indexjs.helloHttp(welcome_req_withuser, mockResponse);


console.log(`Request headers: ${JSON.stringify(mockResponse)}`);







//process.exit()