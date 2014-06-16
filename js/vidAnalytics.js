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
        case 'loadstart' :
            _gaq.push(['_trackEvent','Video Event','Loading','Load Start']);
            console.log("loadstart - begin loading media data");
            break;
        case 'progress':
            _gaq.push(['_trackEvent','Video Event','Loading','Progress']);
            console.log("progress - fetching media...");
            break;
        case 'canplay':
            _gaq.push(['_trackEvent','Video Event','Loading','Can Play']);
            console.log("canplay - can play, but will eventually have to buffer");
            break;
        case 'canplaythrough':
            _gaq.push(['_trackEvent','Video Event','Loading','Can Play Through']);
            console.log("canplaythrough - can play, won't have to buffer anymore");
            break;
        case 'loadeddata':
            _gaq.push(['_trackEvent','Video Event','Loading','Loaded Data']);
            console.log("loadeddata - can render media data at current playback position");
            break;
        case 'loadedmetadata':
            _gaq.push(['_trackEvent','Video Event','Loading','Load Meta Data']);
            console.log("loadedmetadata - now we know duration, height, width, and more");
            break;
        case 'timeupdate':
            var currentTime = e.target.currentTime.toFixed(3);
            var totalTime = vid.duration;
            var percent = ((currentTime/totalTime)*100).toFixed();
            console.log("timeupdate - [" + currentTime + " / " + totalTime + "] ( " + percent + "% ) - current time of the video");
            if(percent >= 25 && percent < 50 && firstQuart === false){
                firstQuart = true;
                _gaq.push(['_trackEvent','Video Event','Watching','First Quartile']);
                console.log("FIRST QUARTILE");
            }
            if(percent >= 50 && percent < 75 && secondQuart === false){
                secondQuart = true;
                _gaq.push(['_trackEvent','Video Event','Watching','Second Quartile']);
                console.log("SECOND QUARTILE");
            }
            if(percent >= 75 && percent < 99 && thirdQuart === false){
                thirdQuart = true;
                _gaq.push(['_trackEvent','Video Event','Watching','Third Quartile']);
                console.log("THIRD QUARTILE");
            }
            if(percent >= 99 && fourthQuart === false){
                fourthQuart = true;
                _gaq.push(['_trackEvent','Video Event','Watching','Completed']);
                console.log("FOURTH QUARTILE");
            }
            break;
        case 'durationchange':
            _gaq.push(['_trackEvent','Video Event','Adjusting','Duration Change']);
            console.log("durationchange - new info about the duration");
            break;
        case 'volumechange':
            _gaq.push(['_trackEvent','Video Event','Adjusting','Volume Change']);
            console.log("volumechange - volume or muted property has changed");
            break;
        case 'play':
            _gaq.push(['_trackEvent','Video Event','Adjusting','Play']);
            console.log("play - just returned from the play function");
            if(play === false){
                play = true;
                _gaq.push(['_trackEvent','Video Event','Adjusting','First Play']);
                console.log("FIRST PLAY");
            }
            break;
        case 'playing':
            _gaq.push(['_trackEvent','Video Event','Adjusting','Playing']);
            console.log("playing - playback has started");
            break;
        case 'pause':
            _gaq.push(['_trackEvent','Video Event','Adjusting','Pause']);
            console.log("pause - just returned from the pause function");
            if(pause === false){
                pause = true;
                _gaq.push(['_trackEvent','Video Event','Adjusting','First Pause']);
                console.log("FIRST PAUSE");
            }
            break;
        case 'suspend':
            _gaq.push(['_trackEvent','Video Event','Adjusting','Suspend']);
            console.log("suspend - loading has stopped, but not all of the media has downloaded");
            break;
        case 'waiting':
            _gaq.push(['_trackEvent','Video Event','Adjusting','Waiting']);
            console.log("waiting - stopped playback because we're waiting for the next frame");
            break;
        case 'stalled':
            _gaq.push(['_trackEvent','Video Event','Adjusting','Stalled']);
            console.log("stalled - fetching media data, but none is arriving");
            break;
        case 'webkitbeginfullscreen':
            _gaq.push(['_trackEvent','Video Event','Adjusting','Fullscreen']);
            console.log("webkitbeginfullscreen - entering fullscreen mode");
            break;
        case 'webkitendfullscreen':
            _gaq.push(['_trackEvent','Video Event','Adjusting','Close Fullscreen']);
            console.log("webkitendfullscreen - exiting fullscreen mode");
            break;
        case 'error':  
            var error = document.querySelector('video').error;
            switch (error.code) {
              case error.MEDIA_ERR_ABORTED:
                _gaq.push(['_trackEvent','Video Event','Errors','Fetching Aborted']);
                console.log("ERROR - fetching aborted at the user's request"); 
                break;
              case error.MEDIA_ERR_NETWORK:
                _gaq.push(['_trackEvent','Video Event','Errors','Network Error']);
                console.log("ERROR - a network error caused the browser to stop fetching the media"); 
                break;
              case error.MEDIA_ERR_DECODE:
                _gaq.push(['_trackEvent','Video Event','Errors','Decoding Error']);
                console.log("ERROR - an error occurred while decoding the media"); 
                break;
              case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                _gaq.push(['_trackEvent','Video Event','Errors','Source Error']);
                console.log("ERROR - the media indicated by the src attribute was not suitable"); 
                break;
              default:
                _gaq.push(['_trackEvent','Video Event','Errors','Generic Error']);
                console.log("ERROR - an error occurred"); 
                break;
            }
            break;
        }
    }