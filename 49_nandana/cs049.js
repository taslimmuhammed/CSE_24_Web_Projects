
const cs049_cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const cs049_deck = [...cs049_cardValues, ...cs049_cardValues, ...cs049_cardValues, ...cs049_cardValues];

function cs049_shuffleDeck() {
    for (let cs049_i = cs049_deck.length - 1; cs049_i > 0; cs049_i--) {
        const cs049_j = Math.floor(Math.random() * (cs049_i + 1));
        [cs049_deck[cs049_i], cs049_deck[cs049_j]] = [cs049_deck[cs049_j], cs049_deck[cs049_i]];
    }
}

const cs049_playerHand = [];
const cs049_dealerHand = [];


function cs049_dealInitialCards() {
    cs049_playerHand.push(cs049_deck.pop());
    cs049_dealerHand.push(cs049_deck.pop());
    cs049_playerHand.push(cs049_deck.pop());
    cs049_dealerHand.push(cs049_deck.pop());
}

function cs049_calculateScore(hand) {
    let cs049_score = 0;
    let cs049_hasAce = false;
    for (const card of hand) {
        if (card === 'A') {
            cs049_score += 11;
            cs049_hasAce = true;
        } else if (card === 'K' || card === 'Q' || card === 'J') {
            cs049_score += 10;
        } else {
            cs049_score += parseInt(card);
        }
    }
    if (cs049_hasAce && cs049_score > 21) {
        cs049_score -= 10;
    }
    return cs049_score;
}

function cs049_startGame() {
    cs049_shuffleDeck();
    cs049_dealInitialCards();
    cs049_updateUI();
}

function cs049_updateUI() {
    document.getElementById('player-score').innerHTML= cs049_calculateScore(cs049_playerHand);
    document.getElementById('dealer-score').innerHTML= '';
    document.getElementById('player-hand').innerHTML= cs049_playerHand;
    if(cs049_dealerHand.length!=0)
    document.getElementById('dealer-hand').innerHTML= cs049_dealerHand[0]+' ?';
}


function cs049_hit() {
    cs049_playerHand.push(cs049_deck.pop());
    cs049_updateUI();
    if (cs049_calculateScore(cs049_playerHand) > 21) {
        cs049_endGame();
    }
}

function cs049_stand() {
    while (cs049_calculateScore(cs049_dealerHand) < 17) {
        cs049_dealerHand.push(cs049_deck.pop());
        cs049_updateUI();
    }
    cs049_endGame();
}

function cs049_endGame() {
    const cs049_playerScore = cs049_calculateScore(cs049_playerHand);
    const cs049_dealerScore = cs049_calculateScore(cs049_dealerHand); 
    document.getElementById('dealer-score').innerHTML= cs049_calculateScore(cs049_dealerHand);
    document.getElementById('dealer-hand').innerHTML= cs049_dealerHand;
    let message = '';
    if(cs049_dealerHand.length===2 && cs049_dealerScore===21){
        message = 'BlackJack!! Dealer wins';
    }else if(cs049_playerHand.length===2 && cs049_playerScore===21){
        message = 'BlackJack!! Player wins';
    }else if (cs049_playerScore > 21) {
        message = 'Player busts. Dealer wins!';
    } else if (cs049_dealerScore > 21 || cs049_playerScore > cs049_dealerScore) {
        message = 'Player wins!';
    } else if (cs049_playerScore < cs049_dealerScore) {
        message = 'Dealer wins!';
    } else {
        message = 'It\'s a tie!';
    }
    document.getElementById('message').innerHTML=message;
}

function cs049_playAgain() {
    cs049_playerHand.length = 0;
    cs049_dealerHand.length = 0;
    document.getElementById('message').innerHTML='';
    document.getElementById('dealer-hand').innerHTML= '';
    cs049_updateUI();
}

document.getElementById('deal-button').addEventListener('click', cs049_startGame);
document.getElementById('hit-button').addEventListener('click', cs049_hit);
document.getElementById('stand-button').addEventListener('click', cs049_stand);
document.getElementById('play-again').addEventListener('click', cs049_playAgain);
cs049_playAgain();