const categorySelect = document.querySelector("#category-select")

function clearContent() {
    // delete all level elems (but keep the template)
    let elemsToRemove = content.querySelectorAll(".level-container:not(.template)")
    for (let i = 0; i < elemsToRemove.length; i++) {
        elemsToRemove[i].remove()
    }
    // clear calculation result
    document.querySelector(".result").textContent = ""
}

function contentReset() {
    clearContent()
    categoryInit()
}

categorySelect.onchange = function() {
    contentReset()
}

document.querySelector("#reset-button").onclick = function() {
    contentReset()
}

function getIncludeMS() {
    return document.querySelector("#includeMS-checkbox").checked
}

document.querySelector(".include-ms").onclick = function() {
    
    if (getIncludeMS() === false) {
        document.querySelector("#includeMS-checkbox").checked = true
        
        const msTemplate = document.querySelector(".segment-container.template .input.ms")
        // add ms input boxes
        for (let i = 0; i < getSegmentElems().length; i++) {
            getSegmentElems()[i].querySelector(".start").appendChild(msTemplate.cloneNode(true))
            getSegmentElems()[i].querySelector(".end").appendChild(msTemplate.cloneNode(true))
        }

    } else {
        document.querySelector("#includeMS-checkbox").checked = false
        
        // remove ms input boxes
        for (let i = 0; i < getSegmentElems().length * 2; i++) {
            document.querySelector(".segment-container:not(.template) .ms").remove()
        }
    }
}
