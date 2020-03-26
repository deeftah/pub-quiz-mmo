var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

/*
* session - an individual quiz participant.
* 
* code - used by participants to enter the room. This is unique while the room is open.
* displayname - name of the participant(s)
* slideCurrent - current position in the quiz
* rankCurrent - current rank in the quiz
* totalScore - current quiz score
*/

var sessionSchema = new Schema({
    code: String,
    displayName: String,
    slideCurrent: { type: Number, default: 0 },
    rankCurrent: { type: Number, default: 0 },
    totalScore: { type: Number, default: 0 },
});

var sessionModel = Mongoose.model( 'session', sessionSchema );

module.exports = sessionModel;
