let startTime, updatedTime, difference, tInterval;
let running = false;
let display = document.getElementById("display");
let lapsContainer = document.getElementById("laps");

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        document.getElementById("startBtn").disabled = true;
        document.getElementById("stopBtn").disabled = false;
        running = true;
    }
}

function stop() {
    if (running) {
        clearInterval(tInterval);
        document.getElementById("startBtn").disabled = false;
        document.getElementById("stopBtn").disabled = true;
        running = false;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerHTML = ${hours}:${minutes}:${seconds}:${milliseconds};
}

function reset() {
    clearInterval(tInterval);
    running = false;
    document.getElementById("startBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
    display.innerHTML = "00:00:00:00";
    lapsContainer.innerHTML = "";
    difference = 0;
}

function lap() {
    if (running) {
        let lapTime = display.innerHTML;
        let lapElement = document.createElement("div");
        lapElement.innerText = lapTime;
        lapsContainer.appendChild(lapElement);
    }
}
