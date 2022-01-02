const calcButton = document.querySelector("#calc-button")

function getInputElems() {
    return document.querySelectorAll(".hms-input-element:not(.template)")
}

function getInputBoxes() {
    return document.querySelector(".hms-input-element:not(.template) .hms-input.start").querySelectorAll(".input")
}

calcButton.onclick = function() {
    let totalMS = 0
    let segStart = 0
    let segEnd = 0
    let multiplier = 1
    // loop through hms input elements
    for (let i = 0; i < getInputElems().length; i++) {
        // loop through input boxes
        for (let j = 0; j < getInputBoxes().length; j++) {

            // set multiplier for h, m, s
            switch (j) {
                case 0:
                    multiplier = 3600000;
                    segStart = 0; segEnd = 0;
                    break;
                case 1: multiplier = 60000; break;
                case 2: multiplier = 1000; break;
                case 3: multiplier = 1; break;
            }
            // calc total MS count for start and end times
            segStart += getInputElems()[i].querySelector(".hms-input.start").querySelectorAll("input")[j].value * multiplier
            segEnd += getInputElems()[i].querySelector(".hms-input.end").querySelectorAll("input")[j].value * multiplier
        }
        // get difference between start and end
        totalMS += Math.abs(segEnd - segStart)
    }
    let outTime = []

    // convert total MS back to HMS format
    outTime[3] = totalMS % 1000
    outTime[0] = Math.floor(totalMS / 3600000)
    outTime[1] = Math.floor(totalMS / 60000 - outTime[0] * 60)
    outTime[2] = Math.floor(totalMS / 1000 - outTime[1] * 60 - outTime[0] * 3600)
    
    document.querySelector(".result").textContent = `Time: ${outTime[0]}h ${outTime[1]}m ${outTime[2]}s ${outTime[3]}ms`
}