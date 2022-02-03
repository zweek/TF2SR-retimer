const input_URL = document.querySelector("#url-input").value
const confirmURLbutton = document.querySelector("#confirm-url");
let input_videoID = "";

// TODO figure out embed api so i can pull data from the video
let tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";

confirmURLbutton.onclick = function() {
    input_videoID = getVideoID(input_URL);
    embedVideo(input_videoID);
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

function embedVideo(videoID) {
    let videoEmbedElem = document.createElement("iframe");
    videoEmbedElem.width = 560;
    videoEmbedElem.height = 315;
    videoEmbedElem.src = `https://www.youtube.com/embed/${videoID}`;

    if (document.querySelector("iframe") !== null) {
        document.querySelector("iframe").src = videoEmbedElem.src
    } else {
        document.body.appendChild(videoEmbedElem);
    }
}