const words = ["ferrari", "lamborghini", "ford", "hyundai", "bmw", "mercedes", "smart", "volkswagen", "alpine"];
let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;

const wordContainer = document.getElementById('word-container');
const message = document.getElementById('message');
const hangmanContainer = document.getElementById('hangman-container');
const keyboard = document.getElementById('keyboard');
const resetButton = document.getElementById('reset-button');

function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    displayWord();
    updateHangman();
    createKeyboard();
    message.textContent = "";
}

function displayWord() {
    wordContainer.innerHTML = selectedWord.split('').map(letter => 
        `<span class="letter">${guessedLetters.includes(letter) ? letter : '_'}</span>`
    ).join(' ');
}

function updateHangman() {
    hangmanContainer.innerHTML = `Wrong guesses: ${wrongGuesses}`;
}

function createKeyboard() {
    keyboard.innerHTML = '';
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(button);
    });
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter) || wrongGuesses >= 6) return;

    guessedLetters.push(letter);
    if (!selectedWord.includes(letter)) {
        wrongGuesses++;
    }

    displayWord();
    updateHangman();
    checkGameOver();
}

function checkGameOver() {
    const wordGuessed = selectedWord.split('').every(letter => guessedLetters.includes(letter));

    if (wordGuessed) {
        message.textContent = "Congratulations! You've guessed the word!";
        disableKeyboard();
    } else if (wrongGuesses >= 6) {
        message.textContent = `Game Over! The word was "${selectedWord}".`;
        disableKeyboard();
    }
}

function disableKeyboard() {
    document.querySelectorAll('.keyboard button').forEach(button => {
        button.disabled = true;
    });
}

resetButton.addEventListener('click', initGame);

initGame();
