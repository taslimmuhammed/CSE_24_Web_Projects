const instagramAccounts = [
    { name: 'Instagram', followers: 658 },{ name: 'Christiano Ronaldo', followers: 607 },
    { name: 'Lionel Messi', followers: 488 },{ name: 'Selena Gomez', followers: 430 },
    { name: 'Kylie Jenner', followers: 400 },{ name: 'Dwayne Johnson', followers: 392 },
    { name: 'Ariana Grande', followers: 380 },{ name: 'Kim Kardashian', followers: 364 },
    { name: 'Beyonce', followers: 318 },{ name: 'Khloe Kardashian', followers: 312 },
    { name: 'Nike', followers: 305 },{ name: 'Kendall Jenner', followers: 294 },{ name: 'Justion Bieber', followers: 293 },
    { name: 'National Geographic', followers: 283 },{ name: 'Taylor Swift', followers: 273 }, { name: 'Virat Kohli', followers: 260 },
    { name: 'Jennifer Lopez', followers: 252 },{ name: 'Nicki Minaj', followers: 227 },{ name: 'Kourtney Kardashian', followers: 224 },
    { name: 'Miley Cyrus', followers: 215 }, { name: 'Neymar', followers: 215 },
    { name: 'Katy Perry', followers: 206 },{ name: 'Zendaya', followers: 185 },{ name: 'Kevin Hart', followers: 179 },
    { name: 'Cardi B', followers: 168 },{ name: 'LeBron James', followers: 158 },{ name: 'Demi Lovato', followers: 157 },
    { name: 'Rihanna', followers: 152 },{ name: 'Real Madrid', followers: 147 },{ name: 'Chris Brown', followers: 144 },
];
function getRandomAccount() {
    return instagramAccounts[Math.floor(Math.random() * instagramAccounts.length)];
}
let cs09score = 0;
document.getElementById("cs09message4").textContent = cs09score;

let account1 = getRandomAccount();
let account2 = getRandomAccount();

while (account2 === account1) {
account2 = getRandomAccount();
}

document.getElementById("cs09message1").textContent = account1.name;
document.getElementById("cs09message2").textContent = account2.name;

function checkGuess() {

    if (account1.followers>account2.followers) {
        document.getElementById("cs09message3").textContent = "Correct Answer";
        cs09score++;
        document.getElementById("cs09message4").textContent = cs09score;
        
    }
    else
    {
        document.getElementById("cs09message3").textContent = "Wrong Answer";
        cs09score=0;
    
        document.getElementById("cs09message4").textContent = cs09score;
    }
    account1 = getRandomAccount();
    account2 = getRandomAccount();

    while (account2 === account1) {
    account2 = getRandomAccount();
    }

    document.getElementById("cs09message1").textContent = account1.name;
    document.getElementById("cs09message2").textContent = account2.name;
}

function checkGuess2() {
    if (account2.followers>account1.followers) 
    {
        document.getElementById("cs09message3").textContent = "Correct Answer";
        cs09score++;
        document.getElementById("cs09message4").textContent = cs09score;
    }
    else
    {
        document.getElementById("cs09message3").textContent = "Wrong Answer";
        cs09score=0;

        document.getElementById("cs09message4").textContent = cs09score;
    }
    account1 = getRandomAccount();
    account2 = getRandomAccount();

    while (account2 === account1) {
    account2 = getRandomAccount();
    }

    document.getElementById("cs09message1").textContent = account1.name;
    document.getElementById("cs09message2").textContent = account2.name;
    
}
