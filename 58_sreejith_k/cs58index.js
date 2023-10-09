var cs58Letter;
var cs58Point = 0;
var cs58Highscore = 0;
var cs58Box = document;
var cs58Total = 0;
var cs58Time = getCs58Element('cs58timerbox').innerHTML;
var cs58Gamestate = 'stop';
var cs58Level = 3;
var cs58Alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

cs58InitGame();

function cs58InitGame() {
    cs58Highscore = localStorage.getItem('cs58keygame/highscore');
    cs58Level = localStorage.getItem('cs58keygame/level');

    if (cs58Level == null) {
        cs58Level = 3;
    }

    getCs58Element('cs58levelindicatior').innerHTML = "Difficulty :" + cs58Level;

    if (cs58Highscore == null) {
        cs58Highscore = 0;
    }

    getCs58Element('cs58Hscore').innerHTML = cs58Highscore;
    cs58Letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    getCs58Element("cs58parapart").innerHTML = cs58Letter;
    cs58AddListener();
    cs58ShowLevel();
}

function cs58AddListener() {
    cs58Box.addEventListener('keydown', function (event) {
        cs58Keypress(event);
    });
}

function cs58Keypress(event) {
    if (event.key == ' ' && cs58Gamestate == 'stop') {
        cs58Total = 0;
        getCs58Element('cs58timerbox').innerHTML = 100;
        cs58Point = 0;
        cs58RunTimer();
        cs58StartGame();
    } else if (cs58Alphabets.indexOf(event.key) > -1 && cs58Gamestate == 'play') {
        if (event.key == cs58Letter) {
            getCs58Element('cs58parapart').style.backgroundColor = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
            getCs58Element('cs58timerbox').innerHTML = 100;
            cs58Letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            getCs58Element("cs58parapart").innerHTML = cs58Letter;
            cs58Point = cs58Point + 1;
        } else {
            getCs58Element('cs58parapart').style.backgroundColor = 'rgb(255,0,0)';
            cs58Point = cs58Point - 1;
            if (cs58Point == -1) {
                cs58EndGame();
            }
        }
        getCs58Element('cs58score').innerHTML = cs58Point;
        cs58Total++;
    }
}

function cs58StartGame() {
    cs58Gamestate = 'play';
    getCs58Element('cs58score').innerHTML = cs58Point;
    cs58ShowParapart();
}

function cs58EndGame() {
    cs58Gamestate = 'stop';
    cs58SetEndInfo(cs58Point, cs58Total);
    cs58ShowEndScreen();
    if (cs58Point > getCs58Element('cs58Hscore').innerHTML) {
        getCs58Element('cs58Hscore').innerHTML = cs58Point;
        localStorage.setItem('cs58keygame/highscore', cs58Point);
    }
}

function getCs58Element(id) {
    return document.getElementById(id);
}

function cs58SetEndInfo() {
    getCs58Element('cs58pscore').innerHTML = cs58Point * cs58Level;
    getCs58Element('cs58paccuracy').innerHTML = 'Accuracy :' + Math.round((cs58Point / cs58Total) * 100) + '%';
    getCs58Element('cs58ptotal').innerHTML = 'Total :' + cs58Total;
    getCs58Element('cs58pwrong').innerHTML = 'wrong :' + ((cs58Total - cs58Point) / 2);
}

function cs58ShowParapart() {
    getCs58Element('cs58parapart').style.display = "block";
    getCs58Element('cs58gamestartintro').style.display = 'none';
    getCs58Element('cs58gamestate').style.display = "none";
}

function cs58ShowEndScreen() {
    getCs58Element('cs58parapart').style.display = "none";
    getCs58Element("cs58gamestartintro").style.display = "none";
    getCs58Element('cs58gamestate').style.display = "block";
    getCs58Element('cs58gamerestartintro').style.display = "block";
}

function cs58RunTimer() {
    var cs58SpeedLevel = 40 / cs58Level;
    const cs58TimeTimer = setInterval(cs58GameTimer, cs58SpeedLevel);

    function cs58GameTimer() {
        cs58Time = getCs58Element('cs58timerbox').innerHTML;
        if (cs58Time <= 0) {
            console.log('game ended');
            clearInterval(cs58TimeTimer);
            cs58EndGame();
        }
        if (cs58Time > 0) {
            cs58Time = cs58Time - 1;
            getCs58Element('cs58timeline').style.width = cs58Time + '%';
            getCs58Element('cs58timeline').style.backgroundColor = 'rgb(' + (100 - cs58Time) * 2.55 + ',' + cs58Time * 2.55 + ',0)';
        }
        getCs58Element('cs58timerbox').innerHTML = cs58Time;
    }
}

function cs58ShowLevel() {
    getCs58Element('cs58levelselector').addEventListener('change', function (event) {
        getCs58Element('cs58levelindicatior').innerHTML = "Difficulty :" + this.value;
        cs58Level = this.value;
        localStorage.setItem('cs58keygame/level', this.value);
    });
}
