var express = require('express');
var router = express.Router();

// Home
router.get( '/', ( req, res ) => {
    res.render( 'index' );
    // If user is in an active quiz
        // Return them to the quiz
    // Else show quiz login
} );

router.get( '/quiz-master', ( req, res ) => {
    // If user is already logged in
        // List the user's quizzes.
        // Show 'create a quiz' option.
    // Else show quizmaster login form
} );

router.get( '/quiz-master/room/:id', ( req, res ) => {
    var roomID = req.params.id;
    // If user is already logged in
        // Is the ID valid?
            // Yes.
                // Show the room details.
            // No.
                // Invalid room ID.
    // Else show quizmaster login form
} );

router.get( '/quiz-master/round/:id', ( req, res ) => {
    var roundID = req.params.id;
    // If user is already logged in
        // Is the ID valid?
            // Yes.
                // Show the round details.
            // No.
                // Invalid room ID.
    // Else show quizmaster login form
} );

router.get( '/quiz-master/slide/:id', ( req, res ) => {
    var slideID = req.params.id;
    // If user is already logged in
        // Is the ID valid?
            // Yes.
                // Show the slide details.
            // No.
                // Invalid slide ID.
    // Else show quizmaster login form
} );

router.get( '/room/:id', ( req, res ) => {
    var roomID = req.params.id;
    // If user is in an active quiz
        // Great
    // Else
        // Does the ID exist?
        // Look up in the DB.
            // Yes
                // Is the start time in the future?
                    // Sorry. This hasn't started yet.
                // Is the end time in the past?
                    // Sorry. This quiz has ended.
                // The quiz is active.
                    // Join in.
            // No
                // Invalid room ID.
} );

module.exports = router;