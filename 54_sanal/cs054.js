let cs054_screen = document.getElementById('cs054_screen');
let cs054_buttons = document.querySelectorAll('button');
let cs054_screenValue = '';
for (let cs054_item of  cs054_buttons) {
    cs054_item.addEventListener('click', (e) => {
        cs054_buttonText = e.target.innerText;
        console.log('Button text is ', cs054_buttonText);
        if (cs054_buttonText == 'X') {
            cs054_buttonText = '*';
            cs054_screenValue += cs054_buttonText;
            cs054_screen.value = cs054_screenValue;
        }
        else if (cs054_buttonText == 'C') {
            cs054_screenValue = "";
            cs054_screen.value = cs054_screenValue;
        }
        else if (cs054_buttonText == '=') {
            cs054_screen.value = eval(cs054_screenValue);
        }
        else {
            cs054_screenValue += cs054_buttonText;
            cs054_screen.value = cs054_screenValue;
        }

    })
}

