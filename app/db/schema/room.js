var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

/*
* room - an individual quiz event.
* 
* code - used by participants to enter the room. This is unique while the room is open.
* title - name of the room/event.
* owner - name of the owner of the room/event.
* quizID - structureID of the slide structure of this event.
* currentSlide - current position in the quiz.
* occupants - array of display names already in the room. Used to check for unique values.
* globalTimeout - time in seconds per question across the quiz. Default: 60.
* scoring - when the scoring is done. Live or the end of the quiz. Default: end-quiz.
* startDate - date/time when the room opens. Default is when the record is added.
* status - status of the quiz. Used to signify if a quiz has ended. Default is 'ready'
*/

var roomSchema = new Schema({
    code: String,
    title: String,
    owner: { type: String, default: 'admin' },
    quizID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "quiz"
    },
    currentSlide: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "slide"
    },
    occupants: Array,
    globalTimeout: { type: Number, default: 60 },
    scoring: { type: String, default: 'end-quiz' },
    startDate : { type: Date, default: Date.now },
    status: { type: String, default: 'ready' }
});

var roomModel = Mongoose.model( 'room', roomSchema );

module.exports = roomModel;
