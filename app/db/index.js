var Mongoose = require('mongoose');

// Connect to DB.
Mongoose.connect( "mongodb://localhost/pub-quiz-mmo", { useUnifiedTopology: true, useNewUrlParser: true } );

// Throw error.
Mongoose.connection.on( 'error', (err) => {
    if (err) {
        return console.log('Mongoose error: ' + err);
    }
} );

// Create promise.
Mongoose.Promise = global.Promise;

module.exports = {
    Mongoose,
    models: {
        room: require( './schema/room.js' ),
        round: require( './schema/round.js' ),
        slide: require( './schema/slide.js' ),
    }
};
