let cs37_playerText = document.getElementById('cs37_playerText')
let cs37_restartBtn = document.getElementById('cs37_restartBtn')
let cs37_boxes = Array.from(document.getElementsByClassName('cs37_box'))

let cs37_winnerIndicator = getComputedStyle(document.body).getPropertyValue('--cs37-winning-blocks')

const cs37_O_TEXT = "O"
const cs37_X_TEXT = "X"
let cs37_currentPlayer = cs37_X_TEXT
let cs37_spaces = Array(9).fill(null)


const cs37_startGame = () => {
    cs37_boxes.forEach(cs37_box => cs37_box.addEventListener('click', cs37_boxClicked))
}

function cs37_boxClicked(e) {
    const id = e.target.id

    if(!cs37_spaces[id])
    {
        cs37_spaces[id] = cs37_currentPlayer
        cs37_playSymbolPlacementSound();
        e.target.innerText = cs37_currentPlayer

        

        if(cs37_playerHasWon() !==false){
            cs37_playerText.innerHTML = `${cs37_currentPlayer} has won!`
            let cs37_winning_blocks = cs37_playerHasWon()

            cs37_winning_blocks.map( cs37_box => cs37_boxes[cs37_box].style.backgroundColor=cs37_winnerIndicator)
            return
        }

        cs37_currentPlayer = cs37_currentPlayer == cs37_X_TEXT ? cs37_O_TEXT : cs37_X_TEXT
    }
    else{
        cs37_playwrong();
    }
}

const cs37_winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function cs37_playerHasWon() {
    for (const cs37_condition of cs37_winningCombos) {
        let [cs37_a, cs37_b, cs37_c] = cs37_condition

        if(cs37_spaces[cs37_a] && (cs37_spaces[cs37_a] == cs37_spaces[cs37_b] && cs37_spaces[cs37_a] == cs37_spaces[cs37_c])) {
            cs37_playWinSound();
            return [cs37_a,cs37_b,cs37_c]
        }
    }
    return false
}
function cs37_playWinSound() {
    let cs37_winSound = document.getElementById('cs37_winSound');
    cs37_winSound.play();
}
function cs37_playwrong() {
    let cs37_wrong = document.getElementById('cs37_wrong');
    cs37_wrong.play();
}
function cs37_playSymbolPlacementSound() {
    var cs37_symbolPlacementSound = document.getElementById('cs37_symbolPlacementSound');
    cs37_symbolPlacementSound.play();
}


cs37_restartBtn.addEventListener('click', cs37_restart)

function cs37_restart() {
    cs37_spaces.fill(null)

    cs37_boxes.forEach( cs37_box => {
        cs37_box.innerText = ''
        cs37_box.style.backgroundColor=''
    })

    cs37_playerText.innerHTML = 'Tic Tac Toe'

    cs37_currentPlayer = cs37_X_TEXT
}

cs37_startGame()