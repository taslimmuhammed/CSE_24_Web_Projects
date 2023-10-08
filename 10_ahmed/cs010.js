document.addEventListener("DOMContentLoaded", function() {
    const minutesInput = document.getElementById("cs10-minutesInput");
    const secondsInput = document.getElementById("cs10-secondsInput");
    const startButton = document.getElementById("cs10-startButton");
    const resetButton = document.getElementById("cs10-resetButton");
    const timerDisplay = document.getElementById("cs10-timerDisplay");

    let countdownInterval;

    startButton.addEventListener("click", function() {
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        const totalTimeInSeconds = minutes * 60 + seconds;

        if (totalTimeInSeconds > 0) {
            startCountdown(totalTimeInSeconds);
        }
    });

    resetButton.addEventListener("click", function() {
        clearInterval(countdownInterval);
        timerDisplay.textContent = "00:00";
    });

    function startCountdown(totalTimeInSeconds) {
        let timeRemaining = totalTimeInSeconds;
        displayTime(timeRemaining);

        countdownInterval = setInterval(function() {
            timeRemaining--;

            if (timeRemaining >= 0) {
                displayTime(timeRemaining);
            } else {
                clearInterval(countdownInterval);
            }
        }, 1000);
    }

    function displayTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        const formattedTime = `${padZero(minutes)}:${padZero(seconds)}`;
        timerDisplay.textContent = formattedTime;
    }

    function padZero(number) {
        return number < 10 ? `0${number}` : number;
    }
});
