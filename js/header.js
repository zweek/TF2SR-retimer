const categorySelect = document.querySelector("#category-select")

function clearContent() {
    // delete all level elems (but keep the template)
    let elemsToRemove = content.querySelectorAll(".hms-input-level:not(.template)")
    for (let i = 0; i < elemsToRemove.length; i++) {
        elemsToRemove[i].remove()
    }
}

function contentReset() {
    clearContent()
    categoryInit()
}

function getIncludeMS() {
    return document.querySelector("#includeMS-checkbox").checked
}

categorySelect.onchange = function() {
    contentReset()
}

document.querySelector("#reset-button").onclick = function() {
    contentReset()
}