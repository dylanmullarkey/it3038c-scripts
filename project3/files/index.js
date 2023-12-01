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
const bottleSizeP = document.getElementById("p-bottle-size")

// initializing variables for calculations
let bottleSize = 24
let hours = 0
let minutes = 0
let goalOz = 0
let bottlesFinished = 0
let ozDrank = 0
let validInput = false

let selectedButton = btn24Oz
highlightButton(btn24Oz)

startButton.addEventListener("click", function () {
  if (startButton.innerText === "Reset") {
    location.reload()
  } else {
    checkInput(goalInput, hoursInput, minutesInput)
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

function updateProgress() {
  ozDrank = bottleSize * bottlesFinished
  console.log(
    `${ozDrank}oz Drank,  ${bottleSize} bottle size,  ${bottlesFinished} bottles finished, ${goalOz}`
  )
  progressEl.textContent = `${ozDrank} oz. / ${goalOz} oz.`
}

function renderStart() {
  if (validInput) {
    const goalOz = goalInput.value
    progressEl.textContent = `0 oz. / ${goalOz} oz.`
    startButton.textContent = "Reset"
    // goalInput.classList.add("disabled-input")
    disableInput(goalInput, hoursInput, minutesInput)
    hoursInput.classList.add("disabled-input")
    minutesInput.classList.add("disabled-input")
    disableBottleSize()
  } else {
    console.log("Invalid input -- cannot start")
    return
  }
}
function disableInput(element) {
  for (i = 0; i < arguments.length; i++) {
    arguments[i].classList.add("disabled-input")
  }
}

function disableBottleSize() {
  // if (buttonId === selectedButton) {
  //   return
  // } else {
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

function checkInput(input1, input2, input3) {
  for (i = 0; i < arguments.length; i++) {
    if (!arguments[i].value) {
      arguments[i].setAttribute("style", `background-color: #e63946;`)
      validInput = false
    } else {
      arguments[i].setAttribute("style", `background-color: white;`)
      validInput = true
    }
  }
  if (input2 === false && input3 === true) {
    input2.setAttribute("style", `background-color: white;`)
  }
  if (input3 === false && input2 === true) {
    input3.setAttribute("style", `background-color: white;`)
  }
}

function stopStopwatch() {
  clearInterval(stopwatchInterval) // stop the interval
  elapsedPausedTime = new Date().getTime() - startTime // calculate elapsed paused time
  stopwatchInterval = null // reset the interval variable
}

function resetStopwatch() {
  stopStopwatch() // stop the interval
  elapsedPausedTime = 0 // reset the elapsed paused time variable
  document.getElementById("stopwatch").innerHTML = "00:00:00" // reset the display
}

function updateStopwatch() {
  var currentTime = new Date().getTime() // get current time in milliseconds
  var elapsedTime = currentTime - startTime // calculate elapsed time in milliseconds
  var seconds = Math.floor(elapsedTime / 1000) % 60 // calculate seconds
  var minutes = Math.floor(elapsedTime / 1000 / 60) % 60 // calculate minutes
  var hours = Math.floor(elapsedTime / 1000 / 60 / 60) // calculate hours
  var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds) // format display time
  document.getElementById("stopwatch").innerHTML = displayTime // update the display
}
