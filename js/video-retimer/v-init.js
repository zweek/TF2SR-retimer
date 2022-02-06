const confirmURLbutton = document.querySelector("#confirm-url");
const testButton = document.querySelector("#test");
let input_videoID = "";

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '405',
        width: '720',
        //videoId: 'M7lc1UVf-VE',
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

confirmURLbutton.onclick = function() {
    player.cueVideoById(getVideoID(getInputURL()));
}

testButton.onclick = function() {
    console.log(player.getCurrentTime());
}

function getInputURL() {
    return document.querySelector("#url-input").value;
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