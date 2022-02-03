// key combo tracking
let map = {};
// add held key to array
onkeydown = function(e) {
    map[e.location] = e.code;
}
// remove unheld keys from array
onkeyup = function(e) {
    delete map[e.location];
}

function getFocusedSegment() {
    return document.activeElement.closest(".segment-container");
}

function getFocusedLevel() {
    return document.activeElement.closest(".level-container");
}

function getLevelSegments() {
    return getFocusedLevel().querySelectorAll(".segment-container");
}

document.addEventListener('keydown', (event) => {
    let code = event.code;
    // get input element index
    let inputPos = Array.from(getFocusedSegment().querySelectorAll("input")).indexOf(document.activeElement);
    
    if (code === "Enter") {
        // add new segment
        getFocusedSegment().querySelector(".add-button").click();
        // move focus to next segment
        getFocusedSegment().nextSibling.querySelectorAll("input")[inputPos].focus();
    }

    if (code === "Backspace") {
        if (map[1] === "ShiftLeft") {
            if (getLevelSegments().length === 1) return;
            // if on first segment, move focus forward
            if (getFocusedSegment() === getLevelSegments()[0]) {
                getFocusedSegment().nextSibling.querySelectorAll("input")[inputPos].focus();
                getFocusedSegment().previousSibling.querySelector(".rem-button").click();
            }
            // otherwise move focus backwards
            else {
                getFocusedSegment().previousSibling.querySelectorAll("input")[inputPos].focus();
                getFocusedSegment().nextSibling.querySelector(".rem-button").click();
            }
        }
        if (map[1] === "ControlLeft" && document.activeElement.value === "") {
            // clear content of current segment
            for (let i = 0; i < getFocusedSegment().querySelectorAll("input").length; i++) {
                getFocusedSegment().querySelectorAll("input")[i].value = "";
            }
        }
    }

    if (code === "ArrowUp") {
        event.preventDefault();
        // move focus to prev segment unless already at top
        if (getFocusedSegment() !== getFocusedLevel().querySelectorAll(".segment-container")[0]) {
            getFocusedSegment().previousSibling.querySelectorAll("input")[inputPos].focus();
        } else
        // move focus to last segnebt of prev level unless already at top
        if (getFocusedLevel() !== content.querySelectorAll(".level-container:not(.template)")[0]) {
            let prevLevelSegments = getFocusedLevel().previousSibling.querySelectorAll(".segment-container");
            prevLevelSegments[prevLevelSegments.length - 1].querySelectorAll("input")[inputPos].focus();
        }
    }

    if (code === "ArrowDown") {
        event.preventDefault();
        // move focus to next segment if it exists
        if (getFocusedSegment().nextSibling !== null) {
            getFocusedSegment().nextSibling.querySelectorAll("input")[inputPos].focus();
        } else
        // move focus to next level if it exists
        if (getFocusedLevel().nextSibling !== null) {
            getFocusedLevel().nextSibling.querySelectorAll("input")[inputPos].focus();
        }
    }

    if (document.activeElement.value === "") {
        if (code === "ArrowLeft") getFocusedSegment().querySelectorAll("input")[inputPos-1].focus();
        if (code === "ArrowRight") getFocusedSegment().querySelectorAll("input")[inputPos+1].focus();
    }

}, false);