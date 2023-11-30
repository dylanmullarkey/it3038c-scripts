// grabbing start/reset button
const startButton = document.getElementById("btn-start")

// grabbing bottle size buttons
const btn16Oz = document.getElementById("btn-16oz")
const btn20Oz = document.getElementById("btn-20oz")
const btn24Oz = document.getElementById("btn-24oz")
const btn32Oz = document.getElementById("btn-32oz")
const btn40Oz = document.getElementById("btn-40oz")

// used when removing button highlight...
const sizeButtons = [btn16Oz, btn20Oz, btn24Oz, btn32Oz, btn40Oz]
// grabbing bottle count buttons
const btnAdd = document.getElementById("btnAdd")
const btnSubtract = document.getElementById("btnSub")

// grabbing input fields for goal & timer
const goalInput = document.getElementById("input-goal")
const hoursInput = document.getElementById("input-hours")
const minutesInput = document.getElementById("input-minutes")

// grabbing p element which shows progress
const progressEl = document.getElementById("progress")

// initializing variables for calculations
let bottleSize = 24
let hours = 0
let minutes = 0
let goalOz = 0
let bottlesFinished = 0
let selectedButton = null

startButton.addEventListener("click", function () {
  checkInput(goalInput, hoursInput, minutesInput)
})

btn16Oz.addEventListener("click", function () {
  setBottleSize(16)
  highlightButton(btn16Oz)
})
btn20Oz.addEventListener("click", function () {
  setBottleSize(20)
  highlightButton(btn20Oz)
})
btn24Oz.addEventListener("click", function () {
  setBottleSize(24)
  highlightButton(btn24Oz)
})
btn32Oz.addEventListener("click", function () {
  setBottleSize(32)
  highlightButton(btn32Oz)
})
btn40Oz.addEventListener("click", function () {
  setBottleSize(40)
  highlightButton(btn40Oz)
})

btnAdd.addEventListener("click", function () {
  bottlesFinished++
})
btnSubtract.addEventListener("click", function () {
  bottlesFinished--
})

function setBottleSize(size) {
  bottleSize = size
}

// changes button background to show user selection
function highlightButton(buttonId) {
  buttonId.classList.add("selected")
  removeBottleSizeHighlight(buttonId)
  selectedButton = buttonId
}
// removes highlight when new button is selected
function removeBottleSizeHighlight(buttonId) {
  if (buttonId === selectedButton) {
    return
  } else {
    for (i = 0; i < sizeButtons.length; i++) {
      if (sizeButtons[i] === selectedButton) {
        sizeButtons[i].classList.remove("selected")
      }
    }
  }
}

function checkInput(input1, input2, input3) {
  for (i = 0; i < arguments.length; i++) {
    if (!arguments[i].value) {
      arguments[i].setAttribute("style", `background-color: #e63946;`)
    } else {
      arguments[i].setAttribute("style", `background-color: white;`)
    }
  }
}
