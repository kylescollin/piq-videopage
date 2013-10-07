window.onload = assignEvents;

// array of the events we want to track
var events=new Array("abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting");

// declare global variables
var vid = null;
var pxs = null;

function assignEvents() {
    vid = document.getElementById('video');
    pxs = document.getElementById('pxs');

    // add event listeners to the video
    for (var i in events) {
        vid.addEventListener(events[i], showEvent, false);
    }
}
 
function showEvent(e) {
 var addMsg = "";
 if (e.type == "durationchange") {
    addMsg = e.type + "[" + vid.duration + "]";
 } else if (e.type == "seeked") {
    addMsg = e.type + "[" + vid.currentTime + "]";
 } else if (e.type == "progress") {
    addMsg = e.type + "[" + vid.currentTime + "]";
 } else if (e.type == "timeupdate") {
    addMsg = e.type + " - " + e.target.currentTime.toFixed(3);
 } else if (e.type == "volumechange") {
    addMsg = "volume " + (vid.muted ? "muted" : vid.volume);
 } else {
    addMsg = e.type;
 }
 if (addMsg != "") {
    pxs.innerHTML = addMsg + ((pxs.innerHTML == "") ? "":", ") + pxs.innerHTML + "</br>";
 }
}