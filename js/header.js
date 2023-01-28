const categorySelect = document.querySelector("#category-select")
const includeMScheckbox = document.querySelector("#includeMS-checkbox")

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
    localStorage.setItem("settingCategory", categorySelect.value)
}

document.querySelector("#reset-button").onclick = function() {
    contentReset()
}

// make local storage var for checkbox, update on click
function getIncludeMS() {
    return includeMScheckbox.checked
}

document.querySelector("#includeMS-checkbox").onclick = function() {
    
    if (getIncludeMS()) {
        const msTemplate = document.querySelector(".segment-container.template .input.ms")
        // add ms input boxes
        for (let i = 0; i < getSegmentElems().length; i++) {
            getSegmentElems()[i].querySelector(".start").appendChild(msTemplate.cloneNode(true))
            getSegmentElems()[i].querySelector(".end").appendChild(msTemplate.cloneNode(true))
        }
        
    } else {
        // remove ms input boxes
        for (let i = 0; i < getSegmentElems().length * 2; i++) {
            document.querySelector(".segment-container:not(.template) .ms").remove()
        }
    }
    localStorage.setItem("settingMSchecked", includeMScheckbox.checked) // gets converted to string 'true' or 'false'
}

includeMScheckbox.checked = localStorage.getItem("settingMSchecked") == 'true'
if (localStorage.getItem("settingCategory")) {
    categorySelect.value = localStorage.getItem("settingCategory")
}