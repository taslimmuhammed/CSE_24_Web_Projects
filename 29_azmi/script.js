const btn = document.querySelector('.cs29-btn');
const code = document.querySelector('.cs29-code');
const input = document.querySelector('.cs29-input');
const qr = document.querySelector('#qrcode');

const qrcode = new QRCode("qrcode");

btn.addEventListener('click', generate);

function generate() {
	const data = input.value;
	qrcode.makeCode(data);
}

