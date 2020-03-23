var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
* room - an individual quiz event.
* 
* code - used by participants to enter the room. This is unique while the room is open.
* title - name of the room/event.
* owner - name of the owner of the room/event.
* structure - structureID of the round/slide structure of this event.
* globalTimeout - time in seconds per question across the quiz. Default: 60.
* startTime - date/time the event begins.
* endTime - date/time the event ends.
* scoring - when the scoring is done. Live, at the end of the round or the end of the quiz. Default: end-quiz.
*/

var roomSchema = new Schema({
    code: String,
    title: String,
    owner: String,
    structure: Array,
    globalTimeout: { type: Number, default: 60 },
    startTime : { type: Date },
    endTime : { type: Date },
    scoring: { type: String, default: 'end-quiz' },
});

var roomModel = Mongoose.model( 'room', roomSchema );

module.exports = roomModel;
