const ShouldDebug = false //Set this to true for Debug statements in console!

const RockBtn = document.getElementById('SelRock');
const PaperBtn = document.getElementById('SelPaper');
const ScissorsBtn = document.getElementById('SelScissors');
const SelectionButtons = [RockBtn, PaperBtn, ScissorsBtn];

let UserScore = 0
let ComputerScore = 0

function showNotification(TitleCont, TextCont, NotifTimeMS, IconColor, IconHtml) {
    Swal.fire({
        // icon: 'info',
        iconHtml: IconHtml,
        iconColor: IconColor,
        title: TitleCont,
        text: TextCont,
        padding: '10px',
        toast: 'false',
        color: 'white',
        background: 'grey',
        position: 'bottom-end',
        timer: NotifTimeMS,
        timerProgressBar: 'true',
        showConfirmButton: false,
        showCancelButton: false,
        confirmButtonText: 'Close',
    });
}

SelectionButtons.forEach(element => {
	element.addEventListener("click", function(event) {
        SelUserChoice(event.target.textContent);
    });
});

function SelUserChoice(UserChoice) {
    document.getElementById('PlayerChoice').textContent = UserChoice;

    // Get Computer's Choice:
    GetComputerChoice(UserChoice);
}

function GetComputerChoice(UserChoice) {
    let NumChoice = Math.floor(Math.random() * 3) + 1;
    let ComputerChoice = "null";

    if (NumChoice === 1) {
		ComputerChoice = "Rock";
		document.getElementById('ComputerChoice').textContent = ComputerChoice;
		
	} else if (NumChoice === 2) {
		ComputerChoice = "Paper"
		document.getElementById('ComputerChoice').textContent = ComputerChoice;

	} else if (NumChoice === 3) {
		ComputerChoice = "Scissors"
		document.getElementById('ComputerChoice').textContent = ComputerChoice;
	}

	// Compute Winner:
	ComputeWinner(UserChoice, ComputerChoice);
}

function ComputeWinner(UserChoice, ComputerChoice) {
    var ThisGameResult = "?";

    // Trim whitespace and convert to lowercase for comparison
    UserChoice = UserChoice.trim().toLowerCase();
    ComputerChoice = ComputerChoice.trim().toLowerCase();

    // Debugging:
        if(ShouldDebug) {
            console.log("Compute Winner Func Ran!");
            console.log("UserChoice Passed = " + UserChoice);
            console.log("ComputerChoice Passed = " + ComputerChoice);
        }

    if(UserChoice === "rock" && ComputerChoice === "paper") {
        ThisGameResult = "You Lose!";
    } else if(UserChoice === "rock" && ComputerChoice === "scissors") {
        ThisGameResult = "You Win!";
    } else if(UserChoice === "paper" && ComputerChoice === "rock") {
        ThisGameResult = "You Win!";
    } else if(UserChoice === "paper" && ComputerChoice === "scissors") {
        ThisGameResult = "You Lose!";
    } else if(UserChoice === "scissors" && ComputerChoice === "rock") {
        ThisGameResult = "You Lose!";
    } else if(UserChoice === "scissors" && ComputerChoice === "paper") {
        ThisGameResult = "You Win!";
    } else if(UserChoice === ComputerChoice) {
        ThisGameResult = "It's a Draw!";
    } else {
        console.warn("The if statements found no winner?!");
    }

    if (ThisGameResult === "You Lose!") {
        document.getElementById(`GameResult`).style.color = "red"
        document.getElementById(`GameResult`).textContent = ThisGameResult
        ComputerScore = ComputerScore += 1
        showNotification("Computer got a Point!", null, 1000, 'red', '&#10060;')
    } else if (ThisGameResult === "You Win!") {
        document.getElementById(`GameResult`).style.color = "limegreen"
        document.getElementById(`GameResult`).textContent = ThisGameResult
        UserScore = UserScore += 1
        showNotification("You got a Point!", null, 1000, 'yellowgreen', '&#127941;')
    } else if (ThisGameResult === "It's a Draw!") {
        document.getElementById(`GameResult`).style.color = "yellow"
        document.getElementById(`GameResult`).textContent = ThisGameResult
        UserScore = UserScore += 1
        ComputerScore = ComputerScore += 1
        showNotification("You Tied!", null, 1000, 'orange', '&#127941;')
    }

        console.log("User Score: " + UserScore)
        console.log("Computer Score: " + ComputerScore)
        document.getElementById('UserScore').textContent = UserScore
        document.getElementById('ComputerScore').textContent = ComputerScore
    
        if(UserScore > ComputerScore) {
            document.getElementById('UserScore').style.color = "limegreen"
            document.getElementById('ComputerScore').style.color = "red"
        } else if(UserScore < ComputerScore) {
            document.getElementById('UserScore').style.color = "red"
            document.getElementById('ComputerScore').style.color = "limegreen"
        } else if(UserScore === ComputerScore) {
            document.getElementById('UserScore').style.color = "yellow"
            document.getElementById('ComputerScore').style.color = "yellow"
        }
}

