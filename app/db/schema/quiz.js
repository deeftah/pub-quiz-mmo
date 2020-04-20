var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

/*
* quiz - a repeatable collection of slides.
* 
* title - name of the room/event.
* owner - name of the owner of the room/event.
* structure - slides that make up the quiz.
* globalTimeout - time in seconds per question across the quiz. Default: 60.
*/

var quizSchema = new Schema({
    title: String,
    owner: { type: String, default: 'admin' },
    structure: [ {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "slide"
    } ],
    globalTimeout: { type: Number, default: 60 }
});

var quizModel = Mongoose.model( 'quiz', quizSchema );

module.exports = quizModel;
