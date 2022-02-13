const testButton = document.querySelector("#test");
const iframePlayer = document.querySelector("iframe");


testButton.onclick = function() {
    console.log(player.getCurrentTime());
}

top.document.documentElement.addEventListener('keydown', (event) => {
    let code = event.code;

    if (code === "KeyI") {
        segment_inPoints.push(player.getCurrentTime().toFixed(2));
        console.log(segment_inPoints);
    }

    if (code === "KeyO") {
        segment_outPoints.push(player.getCurrentTime().toFixed(2));
        console.log(segment_outPoints);
    }
})
