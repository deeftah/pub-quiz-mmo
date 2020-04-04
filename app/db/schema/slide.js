var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

/*
* slide - display of a question or an information panel.
* 
* type - is this a question or an info panel.
* subtype - will be expanded upon (text input, number input, multiple choice, click an image).
* text - the main display text.
* subtext - supporting text.
* mediaURL - supporting image/video URL.
* options - list of multiple choice options.
* answers - list of possible correct answers.
* points - score awarded for a correct answer. No default as this could be a text slide.
* slideTimeout - override the round/quiz timeout if set.
*/

var slideSchema = new Schema({
    type: { type: String, default: 'question' },
    subtype: String,
    text: String,
    subtext: String,
    mediaURL : String,
    options : { type: Array },
    answers : { type: Array },
    points: Number,
    slideTimeout: Number
});

var slideModel = Mongoose.model( 'slide', slideSchema );

module.exports = slideModel;
