const AnswerProgressText = document.getElementById('AnswerProgressText');
const LetterGuessInput = document.getElementById('LetterGuessInput');
const HangmanArea = document.getElementById('HangmanArea');

let DefaultDifficulty = 'Easy';
let GameDifficulty = DefaultDifficulty;

let IncorrectGuessCount;

let GameAnswer;
let GameAnswerLowerCase;
let RemainingGameAnswer;
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
    "Garden",
    "Clipboard",
    "Cardboard",
    "Juice",
    "Sunflower",
    "Lightbulb",
    "Skateboard",
    "Automobile",
];

const hangmanArt = [
`
    +---+
    |   |
        |
        |
        |
        |
=========
`,
`
    +---+
    |   |
    O   |
        |
        |
        |
=========
`,
`
    +---+
    |   |
    O   |
    |   |
        |
        |
=========
`,
`
    +---+
    |   |
    O   |
   /|   |
        |
        |
=========
`,
`
    +---+
    |   |
    O   |
   /|\\  |
        |
        |
=========
`,
`
    +---+
    |   |
    O   |
   /|\\  |
   /    |
        |
=========
`,
`
    +---+
    |   |
    O   |
   /|\\  |
   / \\  |
        |
=========
`
];


function InitalizeGame() {
    let RandomIndex = Math.floor(Math.random() * WordChoices.length) + 1;
    GameAnswer = WordChoices[RandomIndex];
    GameAnswerLowerCase = String(GameAnswer).toLowerCase();
    RemainingGameAnswer = GameAnswerLowerCase
    console.log(`This game's answer is: ${GameAnswer}`);
    console.log(`Game Answer Length: ${GameAnswer.length}`);

    HangmanArea.style.color = 'white'
    AnswerProgressText.innerHTML = ``;
    IncorrectGuessCount = 0;

    for (let index = 1; index < (GameAnswer.length +1); index++) {
        //console.log(index);
        let newP = document.createElement('p');
        newP.classList = "Answer-Letters";
        newP.id = `${index}_Letter_of_Word`;
        newP.textContent = '_';
        AnswerProgressText.appendChild(newP);
    }

    HangmanArea.innerText = hangmanArt[IncorrectGuessCount]

}


function GuessALetter(event, letterGuess) {

    if(event){
        //console.warn('EVENT!')
        event.preventDefault();
    }
    

    letterGuess = String(letterGuess).toLowerCase();
    console.log(`Letter Guessed!: ${letterGuess}`);
    
    console.log(`GameAnswerLowerCase: ${GameAnswerLowerCase}`);

    let CorrectGuess = false;

    if (letterGuess !== '') {
        for (let index = 0; index < GameAnswerLowerCase.length; index++) {
            if (GameAnswerLowerCase[index] === letterGuess) {
                CorrectGuess = true;
                RemainingGameAnswer = RemainingGameAnswer.replace(letterGuess, '');
                console.warn(`Letter Removed | ArrayIndex: ${index}`);
                let UnderscoresArray = AnswerProgressText.querySelectorAll('p');
                UnderscoresArray[index].innerText = letterGuess;
            }
        }
        if(CorrectGuess !== true){
            IncorrectGuessCount += 1;
            console.warn(`Guessed Incorrectly! | Count: ${IncorrectGuessCount}`);
            
            if (IncorrectGuessCount >= 6) {
                console.warn('GAME OVER | Out of guesses!')
                HangmanArea.innerText = hangmanArt[6];
                let AnswerLetters = AnswerProgressText.querySelectorAll('p');
                AnswerLetters.forEach(element => {
                    element.remove()
                });
                let NewText = document.createElement('p')
                NewText.innerText = GameAnswer
                NewText.style.color = 'red'
                HangmanArea.style.color = 'red'
                AnswerProgressText.appendChild(NewText)

                setTimeout(() => {
                    InitalizeGame();
                }, 2500);

            } else {
                HangmanArea.innerText = hangmanArt[IncorrectGuessCount];
            }
                
        }else {
            console.log('Guessed Correctly!')
        }
    }

    if (RemainingGameAnswer === '') {
        let WordIndex = WordChoices.indexOf(GameAnswer)
        WordChoices.splice(WordIndex, 1)
        console.log(WordChoices)
        console.warn("GAME OVER | PLAYER WON!!");

        let AnswerLetters = AnswerProgressText.querySelectorAll('p');
        AnswerLetters.forEach(element => {
            element.style.color = 'limegreen'
        });
        
        setTimeout(() => {
            InitalizeGame();
        }, 2500);
    }

    LetterGuessInput.value = null;
}


// Initalize the game after the page loads:

    setTimeout(() => {
        InitalizeGame();
    }, 500);
