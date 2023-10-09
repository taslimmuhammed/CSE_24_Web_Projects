var roundScore,
    activePlayer,
    globalScores;
var gamePlaying;

init();


function init() {
    roundScore = 0;
    activePlayer = 0;
    globalScores = [0, 0];
    gamePlaying = true;
    document.getElementsByClassName('dice')[0].style.display = 'none';
    document.getElementById('gsplayer-0').textContent = '0';
    document.getElementById('lsplayer-0').textContent = '0';
    document.getElementById('gsplayer-1').textContent = '0';
    document.getElementById('lsplayer-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'PLAYER 1';
    document.querySelector('#name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-panel-0').classList.remove('winner');
    document.querySelector('.player-panel-1').classList.remove('winner');
    document.querySelector('.player-panel-0').classList.remove('active');
    document.querySelector('.player-panel-1').classList.remove('active');
    document.querySelector('.player-panel-0').classList.add('active');


}

function nextPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    roundScore = 0;
    document.querySelector('#lsplayer-0').textContent = '0';
    document.querySelector('#lsplayer-1').textContent = '0';

    document.querySelector('.player-panel-0').classList.toggle('active');
    document.querySelector('.player-panel-1').classList.toggle('active');
    document.getElementsByClassName('dice')[0].style.display = 'none';

}



document.getElementsByClassName('btn-roll')[0].addEventListener('click', function() {
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        document.getElementsByClassName('dice')[0].src = 'img/dice-' + dice + '.png';
        document.getElementsByClassName('dice')[0].style.display = 'block';
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#lsplayer-' + activePlayer).textContent = roundScore;

        } else {
            document.querySelector('#gsplayer-' + activePlayer).textContent = 0;
            globalScores[activePlayer] = 0;
            nextPlayer();
        }
    }
})

document.getElementsByClassName('btn-hold')[0].addEventListener('click', function() {
    if (gamePlaying) {
        globalScores[activePlayer] += roundScore;
        document.querySelector('#gsplayer-' + activePlayer).textContent = globalScores[activePlayer];
        if (globalScores[activePlayer] >= 50) {
            document.getElementsByClassName('dice')[0].style.display = 'none';
            document.querySelector('.player-panel-' + activePlayer).classList.remove('active');
            document.querySelector('.player-panel-' + activePlayer).classList.add('winner');
            document.querySelector('#name-' + activePlayer).textContent = 'Winner !';
            var p = activePlayer + 1;
            alert('Player ' + p + ' won the game');
            gamePlaying = false;

        } else {
            nextPlayer();
        }
    }

})

document.getElementsByClassName('btn-new')[0].addEventListener('click', init);