const cs48targetNumber = Math.floor(Math.random() * 100) + 1;
let cs48attempts = 0;

function checkGuess() {
    const cs48guess = parseInt(document.getElementById("cs48guess").value);

    if (isNaN(cs48guess) || cs48guess < 1 || cs48guess > 100) {
        setMessage("Please enter a valid number between 1 and 100.");
        return;
    }

    cs48attempts++;

    if (cs48guess === cs48targetNumber) {
        setMessage(`Congratulations! You guessed the correct number ${cs48targetNumber} in ${cs48attempts} attempts.`);
    } else if (cs48guess < cs48targetNumber) {
        setMessage("Try a higher number.");
    } else {
        setMessage("Try a lower number.");
    }

    document.getElementById("cs48guess").value = "";
}

function setMessage(msg) {
    document.getElementById("cs48message").textContent = msg;
}
