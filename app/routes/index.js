var express = require('express');
var router = express.Router();
var Mongoose = require('mongoose');

var Quiz = require('../models/quiz');
var Round = require('../models/round');

// Home
router.get( '/', ( req, res ) => {
    res.render( 'pages/index' );
    // If user is in an active quiz
        // Great
    // Else show quiz login
} );


router.get( '/quiz-master', ( req, res ) => {
    var quizList;

    Quiz.find({}, (err, quizzes) => {
        if ( quizzes ) {
            res.render( 'pages/admin', { 'quizzes': quizzes } );
        }
    });

    // If user is already logged in
        // List the user's quizzes.
        // Show 'create a quiz' option.
    // Else 
        // show quizmaster login form
} );

router.get( '/quiz-master/quiz/new', ( req, res ) => {
    res.render( 'pages/admin/new/quiz' );
} );

router.get( '/quiz-master/quiz/:id', ( req, res ) => {
    Quiz.findById( req.params.id , (err, quiz) => {
        if ( quiz ) {
            res.render( 'pages/admin/section/quiz', { 'quiz': quiz } );
        } else {
            res.render( 'pages/404' );
        }
    });
} );

router.get( '/quiz-master/room/new', ( req, res ) => {
    res.render( 'pages/admin/new/room' );
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

router.get( '/quiz-master/round/new', ( req, res ) => {
    res.render( 'pages/admin/new/round' );
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

router.get( '/quiz-master/slide/new', ( req, res ) => {
    res.render( 'pages/admin/new/slide' );
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
    res.render('pages/404');
});

module.exports = router;