window.onload = assignEvents;

// array of the events we want to track
var events=new Array("abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting");

// global variable declarations
var vid = null;
var pxs = null;

var play = false;
var pause = false;
var firstQuart = false;
var secondQuart = false;
var thirdQuart = false;
var fourthQuart = false;

function assignEvents() {
    vid = document.getElementById('video');
    pxs = document.getElementById('pxs');

    // add event listeners to the video
    for (var i in events) {
        vid.addEventListener(events[i], showEvent, false);
    }
}
 
function showEvent(e) {
    switch (e.type) {
        case 'timeupdate':
            var currentTime = e.target.currentTime.toFixed(3);
            var totalTime = vid.duration;
            var percent = ((currentTime/totalTime)*100).toFixed();
            // console.log("timeupdate - [" + currentTime + " / " + totalTime + "] ( " + percent + "% ) - current time of the video");
            if(percent >= 25 && percent < 50 && firstQuart === false){
                firstQuart = true;
                ga('send', 'event', 'Video Event', 'Video Watching', 'First Quartile');
                console.log("FIRST QUARTILE");
            }
            if(percent >= 50 && percent < 75 && secondQuart === false){
                secondQuart = true;
                ga('send', 'event', 'Video Event', 'Video Watching', 'Second Quartile');
                console.log("SECOND QUARTILE");
            }
            if(percent >= 75 && percent < 99 && thirdQuart === false){
                thirdQuart = true;
                ga('send', 'event', 'Video Event', 'Video Watching', 'Third Quartile');
                console.log("THIRD QUARTILE");
            }
            if(percent >= 99 && fourthQuart === false){
                fourthQuart = true;
                ga('send', 'event', 'Video Event', 'Video Watching', 'Video Completion');
                console.log("COMPLETED");
            }
            break;
        case 'play':
            ga('send', 'event', 'Video Event', 'Video Interaction', 'Video Play');
            if(play === false){
                play = true;
                ga('send', 'event', 'Video Event', 'Video Interaction', 'First Video Play');
                console.log("FIRST PLAY");
            }
            break;
        case 'pause':
            ga('send', 'event', 'Video Event', 'Video Interaction', 'Video Pause');
            if(pause === false){
                pause = true;
                ga('send', 'event', 'Video Event', 'Video Interaction', 'First Video Pause');
                console.log("FIRST PAUSE");
            }
            break;
    }
}