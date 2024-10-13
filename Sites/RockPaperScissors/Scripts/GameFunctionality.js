// Variables:
const Rock_Button = document.getElementById('Rock_Button');
const Paper_Button = document.getElementById('Paper_Button');
const Scissors_Button = document.getElementById('Scissors_Button');
const ComputersHandImg = document.getElementById('Computer_Hand');
const WinnerMsgTxt = document.getElementById('WinnerMsg');
const PlayerScoreTxt = document.getElementById('PlayerScoreTxt');
const ComputerScoreTxt = document.getElementById('ComputerScoreTxt');

let PlayerScore = 0;
let ComputerScore = 0;

let PlayerHandBusy = false;
let PlayerHand;
let ComputerHand;

const Debug = true;

// Choose Hand Function:
function ChooseHand(elm){

    //Check for Busy Hand:
    if(!PlayerHandBusy){

        PlayerHandBusy = true;

        //Get Player Hand:
        function GetPlrHand(){
            if(elm.id == "Rock_Button"){ return "Rock"};
            if(elm.id == "Paper_Button"){ return "Paper"};
            if(elm.id == "Scissors_Button"){ return "Scissors"};
        }

        if(Debug){console.log('Player is: ',GetPlrHand())};
        PlayerHand = GetPlrHand();

        //Apply Styles:
        Rock_Button.classList.remove('HandButton');
        Paper_Button.classList.remove('HandButton');
        Scissors_Button.classList.remove('HandButton');
        let PlrHandButtonToStyle = document.getElementById(`${PlayerHand}_Button`);
        PlrHandButtonToStyle.style.boxShadow = "0px 0px 15px #ddff64";

        //Get Computer Hand:
            ComputersHandImg.style.animation = 'ComputerHandLoading 2s infinite forwards, handButtonAnim .8s infinite forwards';
            ComputersHandImg.src = "./Images/rock_emoji.png";
            setTimeout(() => {
                ComputersHandImg.src = "./Images/paper_emoji.png";
            }, 500);
            setTimeout(() => {
                ComputersHandImg.src = "./Images/scissors_emoji.png";
            }, 1000);

            let ComputerRandChoice = Math.floor(Math.random()*3)
            console.log(ComputerRandChoice) 

            // Wait for Choosing Anim and Show Computer Hand:
           setTimeout(() => {
            ComputersHandImg.style.animation = 'unset';

            // Apply Image:
            if(ComputerRandChoice == 0){
                ComputerHand = "Rock";
                ComputersHandImg.src = "./Images/rock_emoji.png";
                ComputersHandImg.style.boxShadow = "0px 0px 15px #ddff64";
            }
            if(ComputerRandChoice == 1){
                ComputerHand = "Paper";
                ComputersHandImg.src = "./Images/paper_emoji.png";
                ComputersHandImg.style.boxShadow = "0px 0px 15px #ddff64";
            }
            if(ComputerRandChoice == 2){
                ComputerHand = "Scissors";
                ComputersHandImg.src = "./Images/scissors_emoji.png";
                ComputersHandImg.style.boxShadow = "0px 0px 15px #ddff64";
            }

            setTimeout(() => {
                //Check Winner:
                CheckWinner();
            }, 350)


           }, 1500);
            
    }

}

// Check Winner Function:
function CheckWinner(){
    if(PlayerHand == "Rock" && ComputerHand == "Rock"){
        //Draw
        WinnerMsgTxt.innerText = "Draw Game!"
        WinnerMsgTxt.style.color = "#ddff64"
    }
    if(PlayerHand == "Paper" && ComputerHand == "Paper"){
        //Draw
        WinnerMsgTxt.innerText = "Draw Game!"
        WinnerMsgTxt.style.color = "#ddff64"
    }
    if(PlayerHand == "Scissors" && ComputerHand == "Scissors"){
        //Draw
        WinnerMsgTxt.innerText = "Draw Game!"
        WinnerMsgTxt.style.color = "#ddff64"
    }

    if(PlayerHand == "Rock" && ComputerHand == "Scissors"){
        //Player Won!
        WinnerMsgTxt.innerText = "You Won!"
        WinnerMsgTxt.style.color = "#47d484"
        PlayerScore += 1;
        PlayerScoreTxt.innerText = `You: ${PlayerScore}`;
    }
    if(PlayerHand == "Rock" && ComputerHand == "Paper"){
        //Computer Won!
        WinnerMsgTxt.innerText = "Computer Won!"
        WinnerMsgTxt.style.color = "#d44747"
        ComputerScore += 1;
        ComputerScoreTxt.innerText = `You: ${ComputerScore}`;
    }

    if(PlayerHand == "Paper" && ComputerHand == "Scissors"){
        //Computer Won!
        WinnerMsgTxt.innerText = "Computer Won!"
        WinnerMsgTxt.style.color = "#d44747"
        ComputerScore += 1;
        ComputerScoreTxt.innerText = `You: ${ComputerScore}`;
    }
    if(PlayerHand == "Paper" && ComputerHand == "Rock"){
        //Player Won!
        WinnerMsgTxt.innerText = "You Won!"
        WinnerMsgTxt.style.color = "#47d484"
        PlayerScore += 1;
        PlayerScoreTxt.innerText = `You: ${PlayerScore}`;
    }

    if(PlayerHand == "Scissors" && ComputerHand == "Paper"){
        //Player Won!
        WinnerMsgTxt.innerText = "You Won!"
        WinnerMsgTxt.style.color = "#47d484"
        PlayerScore += 1;
        PlayerScoreTxt.innerText = `You: ${PlayerScore}`;
    }
    if(PlayerHand == "Scissors" && ComputerHand == "Rock"){
        //Computer Won!
        WinnerMsgTxt.style.color = "#d44747"
        WinnerMsgTxt.innerText = "Computer Won!"
        ComputerScore += 1;
        ComputerScoreTxt.innerText = `You: ${ComputerScore}`;
    }

    setTimeout(() => {
        WinnerMsgTxt.style.opacity = 1;
    }, 100)

    setTimeout(() => {
        ResetGame();
        WinnerMsgTxt.style.opacity = 0;
    }, 1350);
}

// Reset Game Function:
function ResetGame(){
    ComputersHandImg.style.boxShadow = 'unset';
    Rock_Button.style.boxShadow = 'unset';
    Paper_Button.style.boxShadow = 'unset';
    Scissors_Button.style.boxShadow = 'unset';
    Rock_Button.classList.add("HandButton");
    Paper_Button.classList.add("HandButton");
    Scissors_Button.classList.add("HandButton");
    PlayerHandBusy = false
}