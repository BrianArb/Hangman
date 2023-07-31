const input = require('prompt-sync')();
const words = ["python", "java", "swift", "javascript"];
const re = new RegExp(/[^a-z]/);
const menu = 'Type "play" to play the game, "results" to ' +
    'show the scoreboard, and "exit" to quit: ';
let wins = 0;
let losses = 0;
let guesses = String();
let numberOfTries = 8;
let runApp = true;

console.log("H A N G M A N");

while (runApp) {
    let menuItem = input(menu).trim();
    switch (menuItem) {
        case 'play':
            play();
            break;
        case 'results':
            console.log(`You won: ${wins} times.`);
            console.log(`You lost: ${losses} times.`);
            break;
        case 'exit':
            runApp = false;
            break;
        default:
            break;
    }
}
function validateInput(myGuess, wordToGuess) {
    if (myGuess.length !== 1) {
        console.log('Please, input a single letter.');
        return false;
    } else if (re.test(myGuess)) {
        console.log('Please, enter a lowercase letter from the English alphabet.');
        return false;
    } else if (guesses.includes(myGuess)) {
        console.log('You\'ve already guessed this letter.');
        return false;
    } else if (!wordToGuess.includes(myGuess)) {
        console.log('That letter doesn\'t appear in the word.');
        guesses += myGuess;
        numberOfTries--;
        return false;
    } else {
        guesses += myGuess;
    }
    return true;
}
function play() {
    let index = Math.floor(Math.random() * words.length);
    let wordToGuess = words[index];
    let wordGuessed = new Array(wordToGuess.length).fill('-');
    numberOfTries = 8;
    guesses = String();
    while (numberOfTries > 0) {
        console.log();
        console.log(wordGuessed.join(''));
        let myGuess = input("Input a letter: ").trim();
        if (!validateInput(myGuess, wordToGuess)) {
            continue;
        }
        for (let i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === myGuess) {
                wordGuessed[i] = myGuess;
            }
        }
        if (wordGuessed.join('') === wordToGuess) {
            numberOfTries = 0;
        }
    }
    if (wordGuessed.join('') === wordToGuess) {
        console.log(`You guessed the word ${wordToGuess}!`);
        console.log('You survived!');
        wins++;
    } else {
        console.log('\nYou lost!');
        losses++;
    }
}

