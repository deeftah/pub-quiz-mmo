const constructDate = function( dateVal, timeHours, timeMinutes ) {
    const delimiters = [ '.', '-', '/' ];
    const currentDate = new Date();
    
    let fullDate = false;

    if ( null === dateVal || null === timeHours || null === timeMinutes ) {
        return false;
    }

    delimiters.forEach( (del) => {
        if ( dateVal.indexOf(del) !== -1 ) {
            let splitDate = dateVal.split( del );
            let splitYear = null;

            if ( splitDate.length > 1 ) {
                let splitDay = splitDate[0];
                let splitMonth = splitDate[1];

                if ( splitDate.length === 3 ) {
                    splitYear = splitDate[2];

                    if ( splitYear.length === 4 ) {
                        // great
                    } else if ( splitYear.length === 2 ) {
                        splitYear = '20' + splitYear;
                    } else {
                        return false;
                    }
                } else if ( splitDate.length === 2 ) {
                    splitYear = currentDate.getFullYear();
                } else {
                    return false;
                }

                fullDate = new Date( Number(splitYear), Number(splitMonth)-1, Number(splitDay), timeHours, timeMinutes );

                if ( fullDate < currentDate || 'Invalid Date' === fullDate.toString() ) {
                    fullDate = false;
                }
            }
        }
    });

    return fullDate;
};

// Form validation
window.addEventListener("load",function() {
    let joinForm = document.getElementsByName('user-form');
    let answerForm = document.getElementsByName('answer-form');
    let adminForm = document.querySelector('[data-form="admin"]');

    if ( adminForm && adminForm.length > 0 ) {
        adminForm.addEventListener("submit", function(e) {
            e.preventDefault();
            let submissionData = {};

            if ( adminForm.dataset.formType === 'quiz' ) {
                submissionData = {
                    title: e.target.querySelector('[name=quiz-name]').value,
                    globalTimeout : Number(e.target.querySelector('[name=quiz-timeout]').value),
                    owner: 'admin'
                };
            } else if ( adminForm.dataset.formType === 'slide' ) {
                // needs more validation
                
                submissionData = {
                    type: e.target.querySelector('[name=slide-type]').value,
                    subtype: e.target.querySelector('[name=question-type]').value,
                    text: e.target.querySelector('[name=slide-text]').value,
                    subtext: e.target.querySelector('[name=slide-subtext]').value,
                    options: e.target.querySelector('[name=slide-options]').value,
                    answers: e.target.querySelector('[name=slide-answers]').value,
                    points: e.target.querySelector('[name=slide-score]').value,
                    slideTimeout: Number(e.target.querySelector('[name=slide-timeout]').value),
                };
            } else if ( adminForm.dataset.formType === 'room' ) {
                // initial validation
                let startHours = Number(e.target.querySelector('[name=room-time-hours]').value);
                let startMinutes = e.target.querySelector('[name=room-time-minutes]').value;
                let startPeriod = e.target.querySelector('[name=room-time-period]').value;

                if ( startPeriod === 'pm' ) {
                    startHours = startHours + 12;
                    if ( startHours === 24 ) {
                        startHours = 0;
                    }
                }
                
                let constructedDateTime = constructDate( e.target.querySelector('[name=room-date]').value, startHours, startMinutes );
                let formStatus = document.querySelector('[data-form="admin"] .form__status');
                formStatus.innerHTML = '';
                
                if ( constructedDateTime === false ) {
                    formStatus.innerHTML = '<p><strong>Sorry</strong>. Invalid date entered.</p>';
                    return;
                } 

                
                console.dir(  );

                // there must be a quiz attached
                submissionData = {
                    title: e.target.querySelector('[name=room-name]').value,
                    code: e.target.querySelector('[name=room-code]').value,
                    owner: 'admin',
                    scoring: e.target.querySelector('[name=room-scoring]').value,
                    globalTimeout: Number(e.target.querySelector('[name=room-timeout]').value),
                    startDate: constructedDateTime
                };
            }

            console.dir( submissionData );

            socket.emit( 'adminFormSubmit', {
                formType : adminForm.dataset.formType,
                submissionData : submissionData
            } );
        });

        socket.on('adminFormValidation', (data) => {
            let formStatus = document.querySelector('[data-form="admin"] .form__status');

            console.dir( data );

            if (data.error) {
                formStatus.innerHTML = '<p><strong>Sorry</strong>. ' + data.error + '</p>';
            } else if (data.success) {
                // Great
                formStatus.innerHTML = '<p><strong>Great!</strong>. ' + data.success + '</p>';
            }

        });
    }

    if ( joinForm.length > 0 ) {
        joinForm[0].addEventListener("submit",function(e) {
            e.preventDefault(); 
    
            socket.emit( 'roomConnectRequest', { 
                teamName: e.target.querySelector('[name=user-name]').value, 
                roomName: e.target.querySelector('[name=user-room]').value
            } );
        });

        socket.on('roomValidation', (data) => {
            let formStatus = document.querySelector('[name="user-form"] .form__status');

            if (data.error) {
                console.dir(data.error);
                console.dir(formStatus);
                formStatus.innerHTML = '<p><strong>Sorry</strong>. ' + data.error + '</p>';
            } else {
        
            }
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