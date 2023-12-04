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

// grabbing input field for goal
const goalInput = document.getElementById("input-goal")

// grabbing p element which shows progress
const progressEl = document.getElementById("progress")
const bottleSizeP = document.getElementById("p-bottle-size")
const congratulations = document.getElementById("congratsTxt")

// initializing variables for calculations
let bottleSize = 24
let goalOz = 0
let bottlesFinished = 0
let ozDrank = 0
let validInput = false

// setting default to 24oz
let selectedButton = btn24Oz
highlightButton(btn24Oz)

// button and input event listeners
startButton.addEventListener("click", function () {
  if (startButton.innerText === "Reset") {
    location.reload()
  } else {
    checkInput(goalInput) //, hoursInput, minutesInput
    renderStart()
  }
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
  if (validInput) {
    bottlesFinished++
    updateProgress()
  }
})
btnSubtract.addEventListener("click", function () {
  if (validInput) {
    if (bottlesFinished > 0) {
      bottlesFinished--
      updateProgress()
    }
  }
})

// assigns bottleSize depending on button clicked
function setBottleSize(size) {
  bottleSize = size
  bottleSizeP.textContent = `${bottleSize} oz.`
}

// updates progress and triggers finishedMessage() if goal oz is met
function updateProgress() {
  ozDrank = bottleSize * bottlesFinished
  console.log(
    `${ozDrank}oz Drank,  ${bottleSize} bottle size,  ${bottlesFinished} bottles finished, ${goalOz}`
  )
  if (ozDrank >= goalOz) {
    progressEl.textContent = `${goalOz} oz. / ${goalOz} oz.`
    finishedMessage()
  } else {
    progressEl.textContent = `${ozDrank} oz. / ${goalOz} oz.`
  }
}

// checks input and renders it to web page
function renderStart() {
  if (validInput) {
    goalOz = goalInput.value
    console.log(goalOz)
    progressEl.textContent = `0 oz. / ${goalOz} oz.`
    startButton.textContent = "Reset"
    disableInput(goalInput)
    disableBottleSize()
  } else {
    console.log("Invalid input -- cannot start")
    return
  }
}

// adds disabled-input CSS class to html elements
function disableInput(element) {
  for (i = 0; i < arguments.length; i++) {
    arguments[i].classList.add("disabled-input")
  }
}

// shows congrats message and disables the add/subtract buttons
function finishedMessage() {
  disableInput(btnAdd, btnSubtract)
  progressEl.classList.add("hide")
  congratulations.classList.remove("hide")
}

// disables bottle size buttons
function disableBottleSize() {
  for (i = 0; i < sizeButtons.length; i++) {
    sizeButtons[i].classList.add("disabled-input")
  }
  selectedButton.classList.add("selected")
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

// ensures goal input is present and valid
function checkInput(input1) {
  for (i = 0; i < arguments.length; i++) {
    if (!arguments[i].value || arguments[i].value < 0) {
      arguments[i].setAttribute("style", `background-color: #e63946;`)
      validInput = false
    } else {
      arguments[i].setAttribute("style", `background-color: white;`)
      validInput = true
    }
  }
}
