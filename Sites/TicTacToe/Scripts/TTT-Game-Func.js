
const GameGrid = document.getElementById('FullGameTable');
const AllGameCells = GameGrid.querySelectorAll('td');
const WinningCombinations = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]] ;

let PlayerPiece = "X";

let ComputerScore = 0
let PlayerScore = 0

let ComputerOwnedCells = [];
let PlayerOwnedCells = [];

let CoolDown = false;
let GameOver = false;
let Debug = false;


function MakeAllCellsAvailable() {
    // Makes all cells available at game start:
    AllGameCells.forEach(element => {
        element.classList.toggle("AvailableCellArea");
            let cellId = element.id;
            let cellNumber = parseInt(cellId.split('_')[1]);
            // element.textContent = cellNumber
    }); 
}

function ResetGameBoard() {
    // Reset Player Owned Pieces:
     ComputerOwnedCells = [];
     PlayerOwnedCells = [];
    // Makes all cells available at game start:
    AllGameCells.forEach(element => {
            let cellId = element.id;
            let cellNumber = parseInt(cellId.split('_')[1]);
            element.textContent = "";
            element.style = '';
            element.classList.add("AvailableCellArea");
    }); 
    GameOver = false
    console.log("Game Restarted! | Player's Turn!")
}

function RandomCellForComputer(PieceToAssign) {
    let CurrentAvailableCells = GameGrid.querySelectorAll('td.AvailableCellArea');
    
    if(CurrentAvailableCells.length >= 1) {
        let randomIndex = Math.floor(Math.random() * CurrentAvailableCells.length);
        let RandomCellSelected = CurrentAvailableCells[randomIndex];

        RandomCellSelected.classList.remove('AvailableCellArea');

        let cellId = RandomCellSelected.id;
        let cellNumber = parseInt(cellId.split('_')[1]);

        ComputerOwnedCells.push(cellNumber); // Add selected cell to ComputerOwnedCells

        if (Debug) {
            console.log(`[Computer]: has selected cell ${cellNumber}!`);
            console.log(`[ComputerOwnedCells]: ${ComputerOwnedCells.toString()}`);
        }

        RandomCellSelected.textContent = PieceToAssign;
        RandomCellSelected.style.background = "#FFBD33";

        setTimeout(() => {
            RandomCellSelected.style.background = 'unset';

            // Check if computer has won
            if (checkWinner(ComputerOwnedCells)) {
                console.log("Computer wins!");
                ComputerScore += 1
                console.log(`[SCOREBOARD]: Player: [${PlayerScore}] | Computer: [${ComputerScore}]`);

                setTimeout(() => {
                    ResetGameBoard()
                }, 3000);

            } else {
                if (Debug) {
                    console.log("Computer did not win . . .")
                }
            }

        }, 500);


    }else if(CurrentAvailableCells.length === 0) {
        console.warn("All Cells have been used | No Player Won!");
        GameOver = true;

        setTimeout(() => {
            ResetGameBoard()
        }, 3000);
    }
}

function ComputerSelectCell() {
    
    if(GameOver) {
        if(Debug) {console.warn('Game has already eneded! | Prevented computers next move!')}
        return
    } else {

        if(PlayerPiece === "X") {
             let ComputerPiece = "O";
             RandomCellForComputer(ComputerPiece)

        } else if(PlayerPiece === "O"){
             let ComputerPiece = "X";
             RandomCellForComputer(ComputerPiece)
        }
    }
}



function CellSelected(GameCell) {

    if(GameOver) {
        console.warn("This game has already ended! | Preventing Player Move! ")
    } else {
        //Reset CoolDown for each click:
            setTimeout(() => {
                CoolDown = false;
                if(Debug) {console.log(`[CoolDown]: ${CoolDown.valueOf()}`); }
            }, 1200);
    
        // Check if selected cell is available:
        if(GameCell.classList.contains("AvailableCellArea") && CoolDown === false) {
            CoolDown = true;

            if(Debug){console.warn(`[CoolDown]: ${CoolDown.valueOf()}`);}
            if(Debug) {console.log(GameCell.id + ` has been clicked!`);}

            GameCell.classList.toggle("AvailableCellArea");
            GameCell.textContent = PlayerPiece
    
            let cellId = GameCell.id;
            let cellNumber = parseInt(cellId.split('_')[1]);
    
            PlayerOwnedCells.push(cellNumber); // Add selected cell to PlayerOwnedCells
    
           if (Debug) {
             console.log(`[Player]: Cell ${cellNumber} has been clicked!`);
             console.log(`[PlayerOwnedCells]: ${PlayerOwnedCells.toString()}`);
           }
    
            // Check if player has won
            if (checkWinner(PlayerOwnedCells)) {
                console.log("Player wins!");
                PlayerScore += 1
                console.log(`[SCOREBOARD]: Player: [${PlayerScore}] | Computer: [${ComputerScore}]`);
    
                setTimeout(() => {
                    ResetGameBoard()
                }, 3000);
    
            } else {
                if(Debug){console.log("Player did not win . . .")}
            }
    
            setTimeout(() => { 
                ComputerSelectCell() 
            }, 1000);
    
        } else {
            GameCell.style.background = '#E06262'
            setTimeout(() => {
                GameCell.style.background = 'unset'
            }, 500);
        }

    }

    
}

function checkWinner(cellsOwned) {
    // Iterate over the WinningCombinations array
    for (let i = 0; i < WinningCombinations.length; i++) {
        let combination = WinningCombinations[i];
        let count = 0;

        // Check if all cells in the current winning combination are owned by the player/computer
        for (let j = 0; j < combination.length; j++) {
            if (cellsOwned.includes(combination[j])) {
                count++;
            }
        }
        // If all cells in the combination are owned, return true (win)
        if (count === 3) {
            for (let c = 0; c < combination.length; c++) {
                
                let CellToEdit_Id = ("GameCell_" + combination[c])
                document.getElementById(CellToEdit_Id).style.background = "#9AE062"
            }

            GameOver = true
            // GameEnd()
            return true;
            
        }
    }
    // Check if all cells have been used/played on:
    let CurrentAvailableCells = GameGrid.querySelectorAll('td.AvailableCellArea');
    if (CurrentAvailableCells.length === 0) {
        console.warn("All Cells have been used | No Player Won!");
        GameOver = true;

        setTimeout(() => {
            ResetGameBoard()
        }, 3000);
    }

    // If no winning combination is found, return false (no win)
    return false;
}




// On Page Load:
MakeAllCellsAvailable()
console.log(`[SCOREBOARD]: Player: [${PlayerScore}] | Computer: [${ComputerScore}]`);