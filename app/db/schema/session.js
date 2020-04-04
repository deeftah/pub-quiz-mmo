var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

/*
* session - an individual quiz participant.
* 
* displayname - name of the participant(s)
* roomID - ID of the current room.
* rankCurrent - current rank in the quiz
* totalScore - current quiz score
*/

var sessionSchema = new Schema({
    displayName: String,
    roomID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "room"
    },
    rankCurrent: { type: Number, default: 0 },
    totalScore: { type: Number, default: 0 },
});

var sessionModel = Mongoose.model( 'session', sessionSchema );

module.exports = sessionModel;
