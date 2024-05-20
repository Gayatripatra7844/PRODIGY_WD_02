let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', () => {
    if (!running) {
        start();
    } else {
        stop();
    }
});

resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 100);
        startStopBtn.textContent = 'Stop';
        startStopBtn.classList.remove('btn-success');
        startStopBtn.classList.add('btn-warning');
        running = true;
    }
}

function stop() {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('btn-warning');
    startStopBtn.classList.add('btn-success');
    running = false;
}

function reset() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    display.textContent = '00:00:00.0';
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('btn-warning');
    startStopBtn.classList.add('btn-success');
    laps.innerHTML = '';
    lapCounter = 0;
}

function lap() {
    if (running) {
        const li = document.createElement('li');
        li.textContent = `Lap ${++lapCounter}: ${display.textContent}`;
        li.classList.add('list-group-item');
        laps.appendChild(li);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const time = new Date(difference);
    const minutes = ('0' + time.getUTCMinutes()).slice(-2);
    const seconds = ('0' + time.getUTCSeconds()).slice(-2);
    const milliseconds = ('00' + time.getUTCMilliseconds()).slice(-3, -1);
    display.textContent = `${minutes}:${seconds}.${milliseconds}`;
}
