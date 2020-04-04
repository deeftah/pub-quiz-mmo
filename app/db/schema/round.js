var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

/*
* round - a collection of slides (questions/info).
*
* title - name of the round.
* description - explanation of the round.
* slides - array of slides for the round in the order they are displayed.
* roundTimeout - override the quiz timeout if set.
* owner - user who created the round.
*/

var roundSchema = new Schema({
    title: String,
    description: String,
    slides : [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "slide"
          }
    ],
    roundTimeout: Number,
    owner: { type: String, default: 'admin' }
});

var roundModel = Mongoose.model( 'round', roundSchema );

module.exports = roundModel;
