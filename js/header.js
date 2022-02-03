const categorySelect = document.querySelector("#category-select");
const includeMScheckbox = document.querySelector("#includeMS-checkbox");

function clearContent() {
    // delete all level elems (but keep the template)
    let elemsToRemove = content.querySelectorAll(".level-container:not(.template)");
    for (let i = 0; i < elemsToRemove.length; i++) {
        elemsToRemove[i].remove();
    }
    // clear calculation result
    document.querySelector(".result").textContent = "";
}

function contentReset() {
    clearContent();
    categoryInit();
}

categorySelect.onchange = function() {
    contentReset();
    localStorage.setItem("settingCategory", categorySelect.value);
}

document.querySelector("#reset-button").onclick = function() {
    contentReset();
}

// make local storage var for checkbox, update on click
function getIncludeMS() {
    return includeMScheckbox.checked;
}

document.querySelector(".include-ms").onclick = function() {
    
    if (getIncludeMS() === false) {
        includeMScheckbox.checked = true;
        localStorage.setItem("settingMSchecked", 1);
        
        const msTemplate = document.querySelector(".segment-container.template .input.ms");
        // add ms input boxes
        for (let i = 0; i < getSegmentElems().length; i++) {
            getSegmentElems()[i].querySelector(".start").appendChild(msTemplate.cloneNode(true));
            getSegmentElems()[i].querySelector(".end").appendChild(msTemplate.cloneNode(true));
        }
        
    } else {
        includeMScheckbox.checked = false;
        localStorage.setItem("settingMSchecked", "");
        
        // remove ms input boxes
        for (let i = 0; i < getSegmentElems().length * 2; i++) {
            document.querySelector(".segment-container:not(.template) .ms").remove();
        }
    }
}

includeMScheckbox.checked = localStorage.getItem("settingMSchecked");
if (localStorage.getItem("settingCategory")) {
    categorySelect.value = localStorage.getItem("settingCategory");
}