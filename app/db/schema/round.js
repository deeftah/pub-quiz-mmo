var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
* round - a collection of slides (questions/info).
*
* title - name of the round.
* description - explanation of the round.
* slides - array of slides for the round in the order they are displayed.
* roundTimeout - override the quiz timeout if set.
*/

var roundSchema = new Schema({
    title: Text,
    description: Text,
    slides : Array,
    roundTimeout: Number
});

var roundModel = Mongoose.model( 'round', roundSchema );

module.exports = roundModel;
