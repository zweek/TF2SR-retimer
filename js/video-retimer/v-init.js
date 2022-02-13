const btn_confirmURL = document.querySelector("#btn-confirm-url");
const btn_setInpoint = document.querySelector("#btn-inpoint");
const btn_setOutpoint = document.querySelector("#btn-outpoint");

let input_videoID = "";

let segment_inPoints = [];
let segment_outPoints = [];
let segment_timestamps = [];

class timestamp {
    constructor(type, time) {
        this.type = type;
        this.time = time;
    }
}

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '405',
        width: '720',
        videoId: 'M7lc1UVf-VE',
        playerVars: {
            'playsinline': 1,
            'modestbranding': 1
        },
        events: {
            //'onReady': onPlayerReady,
            //'onStateChange': onPlayerStateChange
        }
    });
}

btn_confirmURL.onclick = function() {
    player.cueVideoById(getVideoID(getInputURL()));
}

function getInputURL() {
    return document.querySelector("#input-url").value;
}

function getVideoID(input_URL) {
    let start = input_URL.indexOf("v=") + 2;
    let end = 0;
    if (input_URL.indexOf("&") !== -1) {
        end = input_URL.indexOf("&");
    } else {
        end = input_URL.length;
    }
    return input_URL.substring(start, end);
}

btn_setInpoint.onclick = function() {
    let inpoint = new timestamp("in", player.getCurrentTime().toFixed(2));
    segment_timestamps.push(inpoint);
    console.log(segment_timestamps);
    updateSegments();
}

btn_setOutpoint.onclick = function() {
    let outpoint = new timestamp("out", player.getCurrentTime().toFixed(2));
    segment_timestamps.push(outpoint);
    console.log(segment_timestamps);
    updateSegments();
}

function updateSegments() {

}