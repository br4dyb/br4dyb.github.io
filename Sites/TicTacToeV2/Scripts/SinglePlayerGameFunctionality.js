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
let SinglePlr_AvailableCells = [1,2,3,4,5,6,7,8,9]
let SinglePlr_CellsCollected = [];
let SinglePlrComputer_CellsCollected = [];
let SinglePlr_TableLocked = false;


function SinglePlayerSelectCell(SinglePlr_CellSelected){

    // Check if Cell is Already Taken:
    if(SinglePlr_CellSelected.classList.contains("CellTaken")){
        // Cell is Already Taken:
        SinglePlr_CellSelected.style.background = RedCellColor;
        setTimeout(() => {
            // Reset Background:
            SinglePlr_CellSelected.style.background = 'unset';
        }, 850);
    }else{
        // Cell is Available:

        // Check for TableLock:
        if(SinglePlr_TableLocked){
            SinglePlr_CellSelected.style.background = YellowCellColor;
            console.warn('Slow Down!');
        }else{
            // Lock Table to Prevent Doubble Play & Wait for Computer:
                SinglePlr_TableLocked = true;
            // Add CellTaken Class and Update Appearance:
            SinglePlr_CellSelected.style.background = GreenCellColor;
            SinglePlr_CellSelected.classList.add('CellTaken');
            SinglePlr_CellSelected.innerText = SinglePlayerPiece;

            // Add Cell to 'Player's Pieces':
            let SinglePlr_CellNumberSelected = SinglePlr_CellSelected.id.charAt(20); // Get Cell Number
            SinglePlr_CellsCollected.push(SinglePlr_CellNumberSelected); // Add to Players Cell Array
            SinglePlr_CellsCollected.sort(); // Sort Player's Cell Array

            console.info(`Player's Cells: ${SinglePlr_CellsCollected}`);

            // Remove Cell Selected from 'Avaialable Cells':
            let AvaialableCellIndex = SinglePlr_AvailableCells.lastIndexOf(Number(SinglePlr_CellNumberSelected)); // Get Index of Cell in Available Cells
            SinglePlr_AvailableCells.splice(AvaialableCellIndex, 1); // Remove Selected Cell from AvailableCells Array

            //console.info(`Avaialable Cells: ${SinglePlr_AvailableCells}`);

            // Computer's Turn:
            setTimeout(() => {
                // Check for available cells:
                if(SinglePlr_AvailableCells.length > 0){
                    ComputerGameMove();
                } else{console.warn('Out of Cells! Computer can not move!')}
               
            }, 1250);
            
        }
        
        setTimeout(() => {
            // Reset Background:
            SinglePlr_CellSelected.style.background = 'unset';
        }, 850);
    }
    
}

// Computer Cell Selection:
    // Add a "Table Lock" state where the user has to wait for the computer to select a cell!
    function ComputerGameMove(){
        // Get Random Available Cell:
        let SinglePlayerComputerCellSelectedIndex = Math.floor((Math.random() * (SinglePlr_AvailableCells.length)));
        let ComputerCellSelected = document.getElementById(`SinglePlayerTblCell_${SinglePlr_AvailableCells[SinglePlayerComputerCellSelectedIndex]}`) 

        // Change Availabilty and Style:
        ComputerCellSelected.style.background = YellowCellColor;
        ComputerCellSelected.classList.add('CellTaken');
        ComputerCellSelected.innerText = SinglePlayerComputerPiece;

        // Add Cell to 'Computers's Pieces':
        let SinglePlrComputer_CellNumberSelected = ComputerCellSelected.id.charAt(20); // Get Cell Number
        SinglePlrComputer_CellsCollected.push(SinglePlrComputer_CellNumberSelected); // Add to Players Cell Array
        SinglePlrComputer_CellsCollected.sort(); // Sort Player's Cell Array

        console.info(`Computers's Cells: ${SinglePlrComputer_CellsCollected}`);

        // Remove Cell Selected from 'Avaialable Cells':
        AvaialableCellIndex = SinglePlr_AvailableCells.lastIndexOf(Number(SinglePlrComputer_CellNumberSelected)); // Get Index of Cell in Available Cells
        SinglePlr_AvailableCells.splice(AvaialableCellIndex, 1); // Remove Selected Cell from AvailableCells Array

        //console.info(`Avaialable Cells: ${SinglePlr_AvailableCells}`);

        setTimeout(() => {
            // Reset Background:
            ComputerCellSelected.style.background = 'unset';
        }, 850);



        // Unlock Table for Next Move:
        setTimeout(() => {
            SinglePlr_TableLocked = false;
        }, (650));
    }


// Check for Win Function: