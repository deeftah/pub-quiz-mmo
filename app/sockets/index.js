var ioEvents = function (io) {
    io.on('connection', function(socket) {
        console.log( 'Hello there' );
        console.dir( socket.id );
        console.log( 'There are ' + io.engine.clientsCount + ' current connections' );

        socket.on('roomConnectRequest', function( data ) {
            console.dir( data );
        });

        socket.on('answerSubmit', function( data ) {
            // here we want 
                // the time
                // the display name
                // answer
                // question/slide ID
            
            console.dir( data );
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