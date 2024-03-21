const AnswerProgressText = document.getElementById('AnswerProgressText');
const LetterGuessInput = document.getElementById('LetterGuessInput');

let DefaultDifficulty = 'Easy';
let GameDifficulty = DefaultDifficulty;

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


function InitalizeGame() {
    let RandomIndex = Math.floor(Math.random() * WordChoices.length) + 1;
    GameAnswer = WordChoices[RandomIndex];
    GameAnswerLowerCase = String(GameAnswer).toLowerCase();
    RemainingGameAnswer = GameAnswerLowerCase
    console.log(`This game's answer is: ${GameAnswer}`);
    console.log(`Game Answer Length: ${GameAnswer.length}`);

    AnswerProgressText.innerHTML = ``;

    for (let index = 1; index < (GameAnswer.length +1); index++) {
        //console.log(index);
        let newP = document.createElement('p');
        newP.classList = "Answer-Letters";
        newP.id = `${index}_Letter_of_Word`;
        newP.textContent = '_';
        AnswerProgressText.appendChild(newP);
    }


}

// function GuessALetter(letterGuess) {
//     letterGuess = String(letterGuess).toLowerCase();
//     console.log(`Letter Guessed!: ${letterGuess}`);
    
//     console.log(`GameAnswerLowerCase: ${GameAnswerLowerCase}`);

//     let CorrectGuess = String(GameAnswerLowerCase).includes(letterGuess)

//     let AlreadyFoundIndex = []

//     if(CorrectGuess && letterGuess !== '') {
        
//         for (let index = 0; index < (GameAnswerLowerCase.length +1); index++) {
//             CharIndex = String(GameAnswerLowerCase).indexOf(letterGuess) +1
//             if(GameAnswerLowerCase[index] == letterGuess) {
//                 RemainingGameAnswer = String(RemainingGameAnswer).replace(letterGuess, '');
//                 console.warn(`Letter Removed | CharIndex: ${CharIndex} | ArrayIndex: ${index}`)
//                 let UnderscoresArray = AnswerProgressText.querySelectorAll('p')
//                 UnderscoresArray[CharIndex-1].innerText = letterGuess
//             }else {
//                 console.log(`Letter not found at: ArrayIndex: ${index} or CharIndex: ${CharIndex} `)
//             }
//             //console.log(`CharIndex: ${CharIndex}`);
//             //console.log(`CorrectGuess: ${CorrectGuess}`);

            
//             console.log(`RemainingGameAnswer: ${RemainingGameAnswer}`);
            
//         }

//         if(RemainingGameAnswer == '') {
//             console.warn("GAME OVER | PLAYER WON!!")
//         }

//     };

//     LetterGuessInput.value = null
// }

function GuessALetter(event, letterGuess) {

    if(event){
        console.warn('EVENT!')
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
