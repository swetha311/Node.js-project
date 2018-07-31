var constants = require('./constants');



function makeSpeechResponse(resp_txt) {
  resp_txt = resp_txt.trim();
  period = resp_txt.slice(-1);
  if (period != '.') {
    resp_txt = resp_txt +'. ';
  }
  return '<speak>' + resp_txt + constants.prompt_txt_speech + '</speak>';
}

module.exports = {
  makeSpeechResponse: makeSpeechResponse
}
