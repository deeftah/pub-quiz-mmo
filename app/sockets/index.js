let validate = require('validate.js');

var Quiz = require('../models/quiz');
var Room = require('../models/room');
var Round = require('../models/round');
var Slide = require('../models/slide');

const currentDate = new Date;
const currentYear = currentDate.getFullYear();
const formattedDate = ( currentDate.getDate() ) + "/" + ( currentDate.getMonth() + 1 ) + "/" + ( currentYear.toString().substr(2,2) ) ;

var ioEvents = function (io) {
    io.on('connection', function(socket) {
        console.log( 'Hello there ' + socket.id );
        console.log( 'There are ' + io.engine.clientsCount + ' current connections' );

        socket.on('roomConnectRequest', function( data ) {
            // look up room
            Room.findOne({"code": data.roomName }, (err, room) => {
                if ( err ) {
                    console.log( 'Room fetch error' );
                    console.dir( err );
                }
                
                if ( room ) {
                    // check if someone with the same username is already in the room

                    console.dir(room);

                    // if the response has a value
                        // another error
                    // else
                        // set up a session for this user
                        // it's quiz time

                } else {
                    socket.emit( 'roomValidation', { error: 'Room not found' } );
                }
            });
        });

        socket.on('answerSubmit', function( data ) {
            // here we want
                // the display name
                // question/slide ID
            console.dir( data );
        });

        // admin form submission
        socket.on('adminFormSubmit', function( data ) {
            // validate
            let response = { success: 'New ' + data.formType + ' successfully added' };

            if ( data.formType === 'quiz' ) {
                // does this owner already have a quiz of this title?
                Quiz.findOne({ $and: [ { "title": data.submissionData.title }, { "owner": data.submissionData.owner } ] }, (err, quiz) => {
                    if ( quiz ) {
                        response = { error: 'Your quiz name already exists' };
                    } else {
                        Quiz.create( data.submissionData );
                    }

                    socket.emit( 'adminFormValidation', response );
                });
            } else if ( data.formType === 'round' ) {
                Round.findOne({ $and: [ { "title": data.submissionData.title }, { "owner": data.submissionData.owner } ] }, (err, round) => {
                    if ( round ) {
                        response = { error: 'Your round name already exists' };
                    } else {
                        Round.create( data.submissionData );
                    }

                    socket.emit( 'adminFormValidation', response );
                });
            } else if ( data.formType === 'room' ) {                
                // lots more validation needed here.
                if ( data.submissionData.globalTimeout === 0 ) {
                    data.submissionData.globalTimeout = 60;
                }
                
                let roomValidation = {
                    code: {
                        presence: true,
                        length: {
                            minimum: 4,
                            maximum: 10,
                            message: "must be between 4 and 10 characters"
                        },
                    },
                    startDate: {
                        presence: true
                    },
                    globalTimeout: {
                        numericality: {
                            greaterThanOrEqualTo: 10,
                            lessThanOrEqualTo: 600,
                            message: "must be between 10 and 600 seconds"
                        }
                    },
                    title: {
                        presence: true,
                    },
                    owner: {
                        presence: true
                    }
                };
                
                let roomCheck = validate( data.submissionData, roomValidation );

                if ( typeof roomCheck === "undefined" ) {
                    console.dir('Validation passed');

                    // check the room code is valid
                    console.dir( typeof data.submissionData.startDate );
                    
                    let startDateISO = new Date(data.submissionData.startDate).toISOString();
                    let quizDate = new Date(data.submissionData.startDate);
                    let endDate = quizDate.setDate( quizDate.getDate() + 1 );
                    let endDateISO = new Date( endDate ).toISOString();

                    console.dir( startDateISO );
                    console.dir( endDateISO );

                    Room.findOne({ $and: [ { "code" : data.submissionData.code }, { "startDate" : { "$gte" : startDateISO, "$lte" : endDateISO } } ] }, (err, room) => {                        
                        if ( room ) {
                            response = { error: 'Your room code is already in use' };
                        } else {
                            Room.create( data.submissionData );
                        }
                        socket.emit( 'adminFormValidation', response );
                    });
                } else {
                    for ( errorKey in roomCheck ) {
                        response = { error : roomCheck[errorKey] }
                        break;
                    }
                    
                    socket.emit( 'adminFormValidation', response );
                }
            } else if ( data.formType === 'slide' ) {
                // if question
                    // has answer
                    // has point
                let slideValidation = {

                };

                let slideCheck = validate( data.submissionData, slideValidation );
                
                if ( typeof roomCheck === "undefined" ) {
                    Slide.create( data.submissionData );
                } else {
                    // handle the error
                }
            }
        });
        

        socket.on('disconnect', function(){
            console.log('Goodbye then');
            console.log( 'There are ' + io.engine.clientsCount + ' current connections' );
        });
    });
}

var init = function(app) {
    var server = require('http').Server(app);
    var io = require('socket.io')(server);

    ioEvents(io);

    console.log('Listening');

    return server;
};

module.exports = init;