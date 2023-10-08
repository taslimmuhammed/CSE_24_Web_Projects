const btn = document.querySelector('.cs29-btn');
const code = document.querySelector('.cs29-code');
const input = document.querySelector('.cs29-input');

btn.addEventListener('click', generate);

function generate() {
	const data = input.value;
	const URL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`;
	code.src = URL;
	setTimeout(() => {
		alert("Successfully Generated QR");
	}, 400);
}

