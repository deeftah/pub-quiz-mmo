// Form validation

// Form handling for index

window.addEventListener("load",function() {
    let joinForm = document.getElementsByName('user-form');
    let answerForm = document.getElementsByName('answer-form');
    
    if ( joinForm.length > 0 ) {
        joinForm[0].addEventListener("submit",function(e) {
            e.preventDefault(); 
    
            socket.emit( 'roomConnectRequest', { 
                teamName: e.target.querySelector('[name=user-name]').value, 
                roomName: e.target.querySelector('[name=user-room]').value
            } );
        });
    }

    if ( answerForm.length > 0 ) {
        answerForm[0].addEventListener("submit",function(e) {
            e.preventDefault();

            var now = new Date();
            var epoch_millis = now.getTime();

            socket.emit( 'answerSubmit', {
                timestamp: epoch_millis,
                questionAnswer: e.target.querySelector('[name=question-answer-text]').value,
                questionID : e.target.querySelector('[name=question-answer-id]').value,
            } );
        });
    }
});