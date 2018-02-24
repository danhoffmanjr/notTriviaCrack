﻿(function () {
    var httpRequest,
        apiKey = '064fa487e5692b71cd7d4bd13fc74a30',
        baseURL = "http://localhost:51912",
        method = {
            post: 'POST',
            get: 'GET'
        };

    var theWheel = new Winwheel({
        'outerRadius': 220,        // Set outer radius so wheel fits inside the background.
        'innerRadius': 44,         // Make wheel hollow so segments dont go all way to center.
        'textFontSize': 18,         // Set default font size for the segments.
        'textOrientation': 'horizontal', // Make text vertial so goes down from the outside of wheel.
        'textAlignment': 'center',    // Align text to outside of wheel.
        'numSegments': 7,         // Specify number of segments.
        'rotationAngle': -26,
        'segments':             // Define segments including colour and text.
        [
            { 'fillStyle': '#ee2a36', 'text': 'Art' },
            { 'fillStyle': '#e85aa2', 'text': 'Entertainment' },
            { 'fillStyle': '#864fa0', 'text': 'Prize' },
            { 'fillStyle': '#2774ba', 'text': 'Geography' },
            { 'fillStyle': '#44b968', 'text': 'Science' },
            { 'fillStyle': '#f7e042', 'text': 'History' },
            { 'fillStyle': '#f8951e', 'text': 'Sports' }
        ],
        'animation': // Specify the animation to use.
        {
            'type': 'spinToStop',
            'duration': 7,
            'spins': 3,
            'callbackFinished': getQuestionByCategory
        }
    });

    var btnSpin = document.getElementById("btn-spin");

    btnSpin.addEventListener("click", function () {
        startSpin();
    });

    var wheelSpinning = false;

    function startSpin() {
        if (wheelSpinning == false) {
            theWheel.animation.spins = 7;
            theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
            theWheel.startAnimation();
            wheelSpinning = true;
        }
    }

    function resetWheel() {
        theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.   
        theWheel.draw();                // Call draw to render changes to the wheel.
        wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
    }

    // Called when the spin animation has finished.
    function getQuestionByCategory(indicatedSegment) {
        if (indicatedSegment.text == 'Prize') {
            // code to select category to win
        }
        var output = document.getElementById("spin-result");
        output.innerHTML = "<h2>" + indicatedSegment.text + "!</h2>";
        getQuestions('GET', baseURL + '/api/list');
        resetWheel();
    }

    function getQuestions(method, uri) {
        httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            console.log('ERROR getting questions: Cannot create an XMLHTTP instance.');
            return false;
        }
        httpRequest.open(method, uri);
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    httpRequest.onload = function () {
                        var details = JSON.parse(httpRequest.responseText);
                        //renderDetails(details);
                        console.log("List of Questions:");
                        console.log(details);
                    }
                } else {
                    console.log('[getQuestions] There was a problem with the request.');
                }
            }
        };
        httpRequest.send();
    }
})();