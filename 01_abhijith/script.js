document.getElementById("cs01-btn").addEventListener("click", function() {
	var height_val = document.getElementById('cs01-height').value;
	var weight_val = document.getElementById('cs01-weight').value;
	var bmi = weight_val / (height_val / 100 * height_val / 100);
	var bmio = (bmi.toFixed(2));

	document.getElementById("cs01-result").innerHTML = "Your BMI is " + bmio;
});