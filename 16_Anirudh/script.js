let gameStarted = false;
let inventory = [];

function startGame() {
    gameStarted = true;
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('room').classList.remove('hidden');
}




function checkClue(clueNumber) {
    if (gameStarted) {
        const messageElement = document.getElementById('message');
        const successElement = document.getElementById('success');
        const inventoryList = document.getElementById('inventory-list');

        switch (clueNumber) {
            case 1:
                messageElement.textContent = 'You found a key! Look for the locked door.';
                animateClue(clueNumber);
                addToInventory('Key');
                break;
            case 2:
                messageElement.textContent = 'There is a hidden message on the wall. Decode it!';
                animateClue(clueNumber);
                break;
            case 3:
                messageElement.textContent = 'You discovered a secret compartment. Investigate further.';
                animateClue(clueNumber);
                break;
            // Add more clues as needed
            default:
                break;
        }

        if (clueNumber === 1) {
            successElement.classList.remove('hidden');
            document.getElementById('room').classList.add('hidden');
        }
    }
}


function animateClue(clueNumber) {
    const clueElement = document.querySelectorAll('.clue')[clueNumber - 1];
    clueElement.style.backgroundImage = `url("C:\Anirudh\door.jpeg")`;
    clueElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        clueElement.style.transform = 'scale(1)';
    }, 500);
}


function addToInventory(item) {
    inventory.push(item);

    const inventoryList = document.getElementById('inventory-list');
    const inventoryItem = document.createElement('li');
    inventoryItem.textContent = item;
    inventoryList.appendChild(inventoryItem);
}

function checkDoor() {
    if (gameStarted) {
        const messageElement = document.getElementById('message');
        const successElement = document.getElementById('success');

        messageElement.textContent = 'The door is locked. Use the key you found!';
        animateDoor();

        // Add logic to check if the player has the key in their inventory
        if (inventory.includes('Key')) {
            successElement.classList.remove('hidden');
            document.getElementById('room').classList.add('hidden');
        } else {
            messageElement.textContent = 'The door is locked. You need a key to open it.';
        }
    }
}

function animateDoor() {
    const doorElement = document.getElementById('door');
    doorElement.style.animation = 'doorOpen 2s ease-in-out';
    setTimeout(() => {
        doorElement.style.animation = 'none';
    }, 2000);
}
