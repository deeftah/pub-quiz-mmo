var Mongoose = require('mongoose');

// Connect to DB.
Mongoose.connect( "mongodb://localhost/pub-quiz-mmo", {
    useMongoClient: true, 
} );

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
        room: require( './schemas/room.js' ),
        round: require( './schemas/round.js' ),
        slide: require( './schemas/slide.js' ),
    }
};
