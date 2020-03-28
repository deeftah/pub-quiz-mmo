var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

/*
* room - an individual quiz event.
* 
* code - used by participants to enter the room. This is unique while the room is open.
* title - name of the room/event.
* owner - name of the owner of the room/event.
* quizID - structureID of the round/slide structure of this event.
* currentSlide - current position in the quiz.
* occupants - number of people in the room. Used to calculate live number of players. Default: 0.
* globalTimeout - time in seconds per question across the quiz. Default: 60.
* startTime - epoch seconds when the room opens. Default is 0 (always open)
* endTime - epoch seconds when the event ends. Default is 0 (always open)
* scoring - when the scoring is done. Live, at the end of the round or the end of the quiz. Default: end-quiz.
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
    occupants: { type: Number, default: 0 },
    globalTimeout: { type: Number, default: 60 },
    startTime : { type: Number, default: 0 },
    endTime : { type: Number, default: 0 },
    scoring: { type: String, default: 'end-quiz' },
});

var roomModel = Mongoose.model( 'room', roomSchema );

module.exports = roomModel;
