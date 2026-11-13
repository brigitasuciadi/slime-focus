console.log("Hello, Slime Focus!");
	let focusDuration = 25;
	let shortBreakDuration = 5;
	let longBreakDuration = 15;
console.log(focusDuration);
console.log(shortBreakDuration);
console.log(longBreakDuration);

const timerDisplay = document.getElementById("timer-display");
let totalSeconds = focusDuration * 60;

function updateTimerDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    const formattedTime = formattedMinutes + ":" + formattedSeconds;

    timerDisplay.textContent = formattedTime;
}

let timerInterval;
updateTimerDisplay();
const startButton = document.querySelector(".main-controls button");

startButton.addEventListener("click", function() {
    if (timerInterval) {
        pauseTimer();
        startButton.textContent = "Resume";
    } else {
        startTimer();
        startButton.textContent = "Pause";
    }
});

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

const resetButton = document.querySelectorAll(".main-controls button")[1];

function resetTimer() {
    pauseTimer();

    if (currentMode === "pomodoro") {
        totalSeconds = focusDuration * 60;
    } else if (currentMode === "shortBreak") {
        totalSeconds = shortBreakDuration * 60;
    } else if (currentMode === "longBreak") {
        totalSeconds = longBreakDuration * 60;
    }

    updateTimerDisplay();
    startButton.textContent = "Start";
}

resetButton.addEventListener("click", function() {
    resetTimer();
});

const modeButtons = document.querySelectorAll(".timer-modes button");
let currentMode = "pomodoro";

function changeMode(mode) {
    pauseTimer();
    currentMode = mode;

    if (mode === "pomodoro") {
        totalSeconds = focusDuration * 60;
    } else if (mode === "shortBreak") {
        totalSeconds = shortBreakDuration * 60;
    } else if (mode === "longBreak") {
        totalSeconds = longBreakDuration * 60;
    }

    updateTimerDisplay();
    startButton.textContent = "Start";
}

modeButtons[0].addEventListener("click", function() {
    changeMode("pomodoro");
});

modeButtons[1].addEventListener("click", function() {
    changeMode("shortBreak");
});

modeButtons[2].addEventListener("click", function() {
    changeMode("longBreak");
});

function startTimer() {
    if (timerInterval) {
        return;
    }

    timerInterval = setInterval(function() {
        totalSeconds--;

        if (totalSeconds <= 0) {
            totalSeconds = 0;
            updateTimerDisplay();
            pauseTimer();
            startButton.textContent = "Start";
            return;
        }

        updateTimerDisplay();
    }, 1000);
}

const editButton = document.querySelectorAll(".main-controls button")[2];
const editPopup = document.querySelector(".edit-popup");

editButton.addEventListener("click", function() {
    pomodoroInput.value = focusDuration;
    shortBreakInput.value = shortBreakDuration;
    longBreakInput.value = longBreakDuration;

    editPopup.style.display = "flex";
});

const cancelButton = document.querySelector(".popup-content button:first-of-type");
const saveButton = document.querySelector(".popup-content button:last-of-type");

cancelButton.addEventListener("click", function() {
    editPopup.style.display = "none";
});

const pomodoroInput = document.getElementById("pomodoro-input");
const shortBreakInput = document.getElementById("short-break-input");
const longBreakInput = document.getElementById("long-break-input");

saveButton.addEventListener("click", function() {
    const newFocusDuration = Number(pomodoroInput.value);
    const newShortBreakDuration = Number(shortBreakInput.value);
    const newLongBreakDuration = Number(longBreakInput.value);
if (
    pomodoroInput.value.trim() === "" ||
    shortBreakInput.value.trim() === "" ||
    longBreakInput.value.trim() === "" ||
    !Number.isInteger(newFocusDuration) ||
    !Number.isInteger(newShortBreakDuration) ||
    !Number.isInteger(newLongBreakDuration) ||
    newFocusDuration <= 0 ||
    newShortBreakDuration <= 0 ||
    newLongBreakDuration <= 0
) {
    alert("Please enter a valid whole number greater than 0!");
    return;
}

focusDuration = newFocusDuration;
shortBreakDuration = newShortBreakDuration;
longBreakDuration = newLongBreakDuration;

changeMode(currentMode);
editPopup.style.display = "none";
});

