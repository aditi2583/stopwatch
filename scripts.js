let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime + (Date.now() - startTime));
}

function startStop() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        startStopButton.textContent = 'Stop';
        running = true;
    } else {
        elapsedTime += Date.now() - startTime;
        clearInterval(timerInterval);
        startStopButton.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    startStopButton.textContent = 'Start';
    running = false;
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = formatTime(elapsedTime + (Date.now() - startTime));
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        laps.appendChild(lapItem);
    }
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
