const btn_confirmURL = document.querySelector("#btn-confirm-url");
const btn_setInpoint = document.querySelector("#btn-inpoint");
const btn_setOutpoint = document.querySelector("#btn-outpoint");

let input_videoID = "";

let segment_inPoints = [];
let segment_outPoints = [];
let segment_timestamps = [];

class timestamp {
    constructor(type, time) {
        this.type = type; // "in" or "out"
        this.time = time; // num
    }
}

let player;
function onYouTubeIframeAPIReady()
{
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

btn_confirmURL.onclick = function()
{
    player.cueVideoById(getVideoID(getInputURL()));
}

function getInputURL()
{
    return document.querySelector("#input-url").value;
}

function getVideoID(input_URL)
{
    let start = input_URL.indexOf("v=") + 2;
    let end = 0;
    if (input_URL.indexOf("&") !== -1) {
        end = input_URL.indexOf("&");
    } else {
        end = input_URL.length;
    }
    return input_URL.substring(start, end);
}

btn_setInpoint.onclick = function()
{
    let inpoint = new timestamp("in", player.getCurrentTime());
    updateSegments(insertSorted(inpoint));
    console.log(segment_timestamps);
}

btn_setOutpoint.onclick = function()
{
    let outpoint = new timestamp("out", player.getCurrentTime());
    updateSegments(insertSorted(outpoint));
    console.log(segment_timestamps);
}

function updateSegments(newSegment) {
    if (newSegment === null) return;
    // create new html element
    // inpoints on the left, outpoints on the right
    // pair inpoints with adjacent outpoints if possible and place them next to each other
    // otherwise place above or below based on sorted array index
}

// may be good to rewrite this to be more generally applicable (take in array, element to insert, metric by which to sort)
function insertSorted(timestamp)
{
    if (segment_timestamps.length === 0) {
        segment_timestamps.push(timestamp);
        return timestamp;
    }
    for (let i = 0; i < segment_timestamps.length; i++) {
        if (timestamp.time === segment_timestamps[i].time) return null;

        // loop through until larger element is found
        if (timestamp.time < segment_timestamps[i].time) {
            segment_timestamps.splice(i, 0, timestamp);
            return timestamp;
        // insert at end when last element is reached
        } else if (i === segment_timestamps.length-1) {
            segment_timestamps.push(timestamp);
            return timestamp;
        }
    }
}