var express = require('express');
var router = express.Router();

// Home
router.get( '/', ( req, res ) => {
    res.render( 'index' );
    // If user is in an active quiz
        // Great
    // Else show quiz login
} );


router.get( '/quiz-master', ( req, res ) => {
    res.render( 'admin' );
    // If user is already logged in
        // List the user's quizzes.
        // Show 'create a quiz' option.
    // Else 
        // show quizmaster login form
} );

router.get( '/quiz-master/room/:id', ( req, res ) => {
    var roomID = req.params.id;
    // If user is already logged in
        // Is the ID valid?
            // Yes.
                // Show the room details.
            // No.
                // Invalid room ID.
    // Else 
        // show quizmaster login form
} );

router.get( '/quiz-master/round/:id', ( req, res ) => {
    var roundID = req.params.id;
    // If user is already logged in
        // Is the ID valid?
            // Yes.
                // Show the round details.
            // No.
                // Invalid room ID.
    // Else 
        // show quizmaster login form
} );

router.get( '/quiz-master/slide/:id', ( req, res ) => {
    var slideID = req.params.id;
    // If user is already logged in
        // Is the ID valid?
            // Yes.
                // Show the slide details.
            // No.
                // Invalid slide ID.
    // Else 
        // show quizmaster login form
} );

// Handle 404
router.use(function(req, res) {
    res.status(400);
    res.render('404');
});

// Handle 500
router.use(function(error, req, res, next) {
    res.send('500: Internal Server Error', 500);
});

module.exports = router;