//Variables:
const SinglePlr_GameTable = document.getElementById('SinglePlayerTable');
const PlayerScoreText = document.getElementById('SinglePlayerScore');
const ComputerScoreText = document.getElementById('SinglePlayerComputerScore');
    //Tables Cells:
    const SinglePlayerTblCell_1 = document.getElementById('SinglePlayerTblCell_1');
    const SinglePlayerTblCell_2 = document.getElementById('SinglePlayerTblCell_2');
    const SinglePlayerTblCell_3 = document.getElementById('SinglePlayerTblCell_3');
    const SinglePlayerTblCell_4 = document.getElementById('SinglePlayerTblCell_4');
    const SinglePlayerTblCell_5 = document.getElementById('SinglePlayerTblCell_5');
    const SinglePlayerTblCell_6 = document.getElementById('SinglePlayerTblCell_6');
    const SinglePlayerTblCell_7 = document.getElementById('SinglePlayerTblCell_7');
    const SinglePlayerTblCell_8 = document.getElementById('SinglePlayerTblCell_8');
    const SinglePlayerTblCell_9 = document.getElementById('SinglePlayerTblCell_9');
    const AllSinglePlayerTblCells = [SinglePlayerTblCell_1, SinglePlayerTblCell_2, SinglePlayerTblCell_3, SinglePlayerTblCell_4, SinglePlayerTblCell_5, SinglePlayerTblCell_6, SinglePlayerTblCell_7, SinglePlayerTblCell_8, SinglePlayerTblCell_9];
const RedCellColor = '#E45858';
const YellowCellColor = '#CDD034';
const GreenCellColor = '#62BD67';
const WinningCombinations = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8,], [3,6,9,], [1,5,9,], [3,5,7,]];
let SinglePlr_CellsCollected = [];
let SinglePlrComputer_CellsCollected = [];
let SinglePlr_TableLocked = false;


function SinglePlayerSelectCell(SinglePlr_CellSelected){
    //DeBug:
    console.log('Cell Chosen:')
    console.log(SinglePlr_CellSelected);

    //Check if Cell is Already Taken:
    if(SinglePlr_CellSelected.classList.contains("CellTaken")){
        //Cell is Already Taken:
        SinglePlr_CellSelected.style.background = RedCellColor;
        setTimeout(() => {
            //Reset Background:
            SinglePlr_CellSelected.style.background = 'unset';
        }, 850);
    }else{
        //Cell is Available:

        //Check for TableLock:
        if(SinglePlr_TableLocked){
            SinglePlr_CellSelected.style.background = YellowCellColor;
        }else{
            // Lock Table to Prevent Doubble Play:
                SinglePlr_TableLocked = true;
            SinglePlr_CellSelected.style.background = GreenCellColor;
            SinglePlr_CellSelected.classList.add('CellTaken');
            SinglePlr_CellSelected.innerText = SinglePlayerPiece;
            // Add Cell to 'Player's Pieces':
            let SinglePlr_CellNumberSelected = SinglePlr_CellSelected.id.charAt(20);
            SinglePlr_CellsCollected.push(SinglePlr_CellNumberSelected)
            console.warn(`Current Player's Cells: ${SinglePlr_CellsCollected}`)

            // Unlock Table for Next Move: *MAKE SURE THIS GOES IN A SEPERATE FUNCTION TO PREVENT MULTIPLE TRIGGERS!*
            // Most likely should be moved to "Computers Move" function later . . .
            setTimeout(() => {
                SinglePlr_TableLocked = false;
            }, (1500));
        }
        
        setTimeout(() => {
            //Reset Background:
            SinglePlr_CellSelected.style.background = 'unset';
        }, 850);
    }

    // Computer Cell Selection:
        // Add a "Table Lock" state where the user has to wait for the computer to select a cell!

        
    // Check for Win:
    
    
}