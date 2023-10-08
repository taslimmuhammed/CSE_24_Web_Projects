// Calling showTime function at every second
setInterval(showTime, 1000);

// Defining showTime funcion

function showTime() {
	// Getting current time and date
	let time = new Date();
	let hour = time.getHours();
	let minutes = time.getMinutes();
	let seconds = time.getSeconds();
	am_pm = "AM";

	// Setting time for 12 Hrs format
	if (hour >= 12) {
		if (hour > 12) hour -= 12;
		am_pm = "PM";
	} else if (hour == 0) {
		hour = 12;
		am_pm = "AM";
	}

	hour =
		hour < 10 ? "0" + hour : hour;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	let Time =
		hour +
		":" +
		minutes +
		":" +
		seconds +
		am_pm;

	// Displaying the time
	document.getElementById(
		"clock64"
	).innerHTML = Time;
}

//showTime();
