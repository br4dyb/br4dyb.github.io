//Variables:
const LocalMultiPlayer_GameTable = document.getElementById('');
const LocalPlayer1ScoreText = document.getElementById('');
const LocalPlayer2ScoreText = document.getElementById('');
const LocalPlayer1NameWrap = document.getElementById('');
const LocalPlayer2NameWrap = document.getElementById('');
    //Tables Cells:
    const LocalMultiPlayerTblCell_1 = document.getElementById('LocalMultiPlayerTblCell_1');
    const LocalMultiPlayerTblCell_2 = document.getElementById('LocalMultiPlayerTblCell_2');
    const LocalMultiPlayerTblCell_3 = document.getElementById('LocalMultiPlayerTblCell_3');
    const LocalMultiPlayerTblCell_4 = document.getElementById('LocalMultiPlayerTblCell_4');
    const LocalMultiPlayerTblCell_5 = document.getElementById('LocalMultiPlayerTblCell_5');
    const LocalMultiPlayerTblCell_6 = document.getElementById('LocalMultiPlayerTblCell_6');
    const LocalMultiPlayerTblCell_7 = document.getElementById('LocalMultiPlayerTblCell_7');
    const LocalMultiPlayerTblCell_8 = document.getElementById('LocalMultiPlayerTblCell_8');
    const LocalMultiPlayerTblCell_9 = document.getElementById('LocalMultiPlayerTblCell_9');
    const AllLocalMultiPlayerTblCells = [LocalMultiPlayerTblCell_1, LocalMultiPlayerTblCell_2, LocalMultiPlayerTblCell_3, LocalMultiPlayerTblCell_4, LocalMultiPlayerTblCell_5, LocalMultiPlayerTblCell_6, LocalMultiPlayerTblCell_7, LocalMultiPlayerTblCell_8, LocalMultiPlayerTblCell_9];
let LocalPlr1_StartedFirst = true;
let LocalCurrentPlayerTurn = 2; // <-- (Player)
let LocalMultiGame_AvailableCells = [1,2,3,4,5,6,7,8,9]
let LocalPlr1_CellsCollected = [];
let LocalPlr2_CellsCollected = [];
let LocalPlr1_Score = 0;
let LocalPlr2_Score = 0;
const LocalPlr1Color = '#3191e5';
const LocalPlr2Color = '#a73acc';
// Already Defined:
    // RedCellColor = '#E45858';
    // YellowCellColor = '#CDD034';
    // GreenCellColor = '#62BD67';
    // WinningCombinations = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8,], [3,6,9,], [1,5,9,], [3,5,7,]];
let Local_GameEnded = false;
let Local_GameResetting = false;


// Select Cell:
function LocalMultiPlayerSelectCell(Cell){
    // Check if Cell is Available:
    if(Cell.classList.contains('CellTaken')){
        // Already Taken:
        Cell.style.background = RedCellColor;
    }else{
        // Cell Available:
        Cell.classList.add('CellTaken');
        
        // Add to Current Player's Cells:
        if(LocalCurrentPlayerTurn === 1){
            // Player 1:
            Cell.style.background = LocalPlr1Color;
            const CellNumber = Cell.id.charAt(24);
                console.log(`Cell: ${CellNumber} | Taken By: Player 1`);
            // Add to Plr's Cells:
            LocalPlr1_CellsCollected.push(CellNumber);
            LocalPlr1_CellsCollected.sort();
            Cell.innerText = 'X';
            // Remove from Available Cells:
            const AvaialableCellIndex = LocalMultiGame_AvailableCells.lastIndexOf(Number(CellNumber));
            LocalMultiGame_AvailableCells.splice(AvaialableCellIndex, 1);
                console.log(`Available Cells: ${LocalMultiGame_AvailableCells}`);
            // Check for Win: (if not, next player's turn . . .)
            LocalCurrentPlayerTurn = 2; // <-- Remove this later into check win func. . . 

        }else if(LocalCurrentPlayerTurn === 2){
            // Player 2:
            Cell.style.background = LocalPlr2Color;
            const CellNumber = Cell.id.charAt(24);
                console.log(`Cell: ${CellNumber} | Taken By: Player 2`);
            // Add to Plr's Cells:
            LocalPlr2_CellsCollected.push(CellNumber);
            LocalPlr2_CellsCollected.sort();
            Cell.innerText = 'O';
            // Remove from Available Cells:
            const AvaialableCellIndex = LocalMultiGame_AvailableCells.lastIndexOf(Number(CellNumber));
            LocalMultiGame_AvailableCells.splice(AvaialableCellIndex, 1);
                console.log(`Available Cells: ${LocalMultiGame_AvailableCells}`);
            // Check for Win: (if not, next player's turn . . .)
            LocalCurrentPlayerTurn = 1; // <-- Remove this later into check win func. . . 

        }
    }

    // Reset Cell Background:
    setTimeout(() => {
        Cell.style.background = 'unset';
    }, (850))
}
