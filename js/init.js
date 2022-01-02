const content = document.querySelector("#content")
const levels = ["Gauntlet","BT-7274","Blood & Rust","Abyss 1","Abyss 2","Abyss 3","Effect & Cause 1","Effect & Cause 2","Effect & Cause 3","Beacon 1","Beacon 2","Beacon 3","Trial by Fire","The Ark","Fold Weapon"]
const levelsShort = ["g","bt","bnr","ita1","ita2","ita3","enc1","enc2","enc3","b1","b2","b3","tbf","ark","tfw"]

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function getCurrentLevelInputElems(element) {
    return element.closest(".hms-input-level").querySelectorAll(".hms-input-element")
}

function remButtonFunc(button) {
    // add 'remove' button functionality
    button.onclick = function() {
        let inputLevel = button.closest(".hms-input-level")
        button.closest(".hms-input-element").remove()
        // remove 'remove' button from other element when only 1 element is left
        if (inputLevel.querySelectorAll(".hms-input-element").length === 1) {
            inputLevel.querySelector(".rem-button").remove()
        }
    }
}

function createNewInputElem(currentElem) {
    // copy input template
    const inputTemplate = document.querySelector(".hms-input-element.template")
    const remButtonTemplate = document.querySelector(".rem-button.template")
    let newInputElem = inputTemplate.cloneNode(true)
    let newRemButton = remButtonTemplate.cloneNode(true)
    // remove template class to make visible
    newInputElem.classList.remove("template")
    newRemButton.classList.remove("template")
    // remove ms elements if includeMS is false
    if (getIncludeMS() === false) {
        newInputElem.querySelector(".ms").remove()
        newInputElem.querySelector(".ms").remove()
    }
    // add new element to level
    if (currentElem.nextSibling === null) {
        currentElem.closest(".hms-input-level").appendChild(newInputElem)
    } else {
        insertAfter(newInputElem, currentElem)
    }
    // add 'remove' button to next sibling
    if (getCurrentLevelInputElems(currentElem).length > 1) {
        currentElem.nextSibling.appendChild(newRemButton)
        remButtonFunc(currentElem.nextSibling.querySelector(".rem-button"))
    }
    // add 'remove' button to self on first call
    if (getCurrentLevelInputElems(currentElem).length === 2) {
        newRemButton = newRemButton.cloneNode(true)
        currentElem.appendChild(newRemButton)
        remButtonFunc(currentElem.querySelector(".rem-button"))
    }
}

function createNewLevelElem(level) {
    // copy level template
    const levelTemplate = document.querySelector(".hms-input-level.template")
    let newLevelElem = levelTemplate.cloneNode(true)
    // remove template classes to make visible
    newLevelElem.classList.remove("template")
    // apply level name
    newLevelElem.querySelector(".level-title").textContent = level
    createNewInputElem(newLevelElem)
    // add new element to page
    content.appendChild(newLevelElem)
}

// adds functionality to button to create a copy of its parent
function newAddButtonFunc(currentButton) {
    currentButton.onclick = function() {
        // add new element
        createNewInputElem(currentButton.closest(".hms-input-element"))
        // give next button same functionality
        newAddButton(currentButton)
    }
}

function newAddButton(currentButton) {
    // update current 'add' button to be from neighboring element
    currentButton = currentButton.closest(".hms-input-element").nextSibling.querySelector(".add-button")
    newAddButtonFunc(currentButton)
}

function addButtonInit() {
    let addButtons = document.querySelectorAll(".add-button")
    // create click event for every default 'add' button
    for (let i = 0; i < addButtons.length; i++) {
        let currentButton = addButtons[i]
        newAddButtonFunc(currentButton)
    }
}

function categoryInit() {
    // Full Game
    if (categorySelect.value === "fg") {
        for(let i = 0; i < levels.length; i++) {
            createNewLevelElem(levels[i])
        }
    }
    // Individual Level
    if (categorySelect.value === "il") {
        createNewLevelElem("IL")
    }
    // Pilot's Challenge
    if (categorySelect.value === "pc") {
        createNewLevelElem(levels[2])  // bnr
        createNewLevelElem(levels[7])  // enc2
        createNewLevelElem(levels[10]) // b2
    }
    addButtonInit()
}

// main entry point call
categoryInit()