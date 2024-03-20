const AnswerProgressText = document.getElementById('AnswerProgressText');
const LetterGuessInput = document.getElementById('LetterGuessInput');

let DefaultDifficulty = 'Easy';
let GameDifficulty = DefaultDifficulty;

let GameAnswer;
let WordChoices = [
    "Pencil", 
    "Computer", 
    "School", 
    "House", 
    "Notebook", 
    "iPhone",
    "Water",
    "Television",
    "Crackers",
    "Spoon",
    "Garden"
];


function InitalizeGame() {
    let RandomIndex = Math.floor(Math.random() * WordChoices.length) + 1;
    GameAnswer = WordChoices[RandomIndex];
    console.log(`This game's answer is: ${GameAnswer}`);
    console.log(`Game Answer Length: ${GameAnswer.length}`);

    let InitText = ""

    for (let index = 1; index < (GameAnswer.length +1); index++) {
        console.log(index);
        InitText += ' _'
        console.log(InitText);
    }

    AnswerProgressText.innerText = InitText
}

function GuessALetter(letterGuess) {
    letterGuess = String(letterGuess).toLowerCase();
    console.log(`Letter Guessed!: ${letterGuess}`);

    let GameAnswerLowerCase = String(GameAnswer).toLowerCase();
    console.log(`GameAnswerLowerCase: ${GameAnswerLowerCase}`);

    let CorrectGuess = String(GameAnswerLowerCase).includes(letterGuess)
    console.log(`CorrectGuess: ${CorrectGuess}`);

    let AlreadyFoundIndex = []

    if(CorrectGuess) {
        CharIndex = String(GameAnswerLowerCase).indexOf(letterGuess) +1
        console.log(`CharIndex: ${CharIndex}`);
        
    };

    LetterGuessInput.value = null
}

// Initalize the game after the page loads:

    setTimeout(() => {
        InitalizeGame();
    }, 500);
