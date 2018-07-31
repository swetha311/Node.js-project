var chai = require('chai'),
	should = require('chai').should(),
	expect = require('chai').expect,
	supertest = require('supertest'),
	api=supertest('https://us-central1-bot-teamupschool.cloudfunctions.net');
/***
const fs = require('fs');
var data = fs.readFileSync('post_body.json');
var post_body = JSON.parse(data);


describe('first test',function(){
	it('should return 200 response',function(done){
		api
			.post('/helloHttp')
			.send(post_body)
			.expect('Content-Type',/json/)
			.expect(200)
			.end(function(err,res){
				done(err);
			});
	});
});
***/
