function cs031CalculateSquare() {
    let cs031_numberInput = document.getElementById("cs031-numberInput").value;
    let cs031_result = document.getElementById("cs031-result");

    if (cs031_numberInput !== "") {
        let cs031_square = parseInt(cs031_numberInput) * parseInt(cs031_numberInput);
        cs031_result.textContent = "The square of " + cs031_numberInput + " is: " + cs031_square;
    } else {
        cs031_result.textContent = "Please enter a valid number.";
    }
}
