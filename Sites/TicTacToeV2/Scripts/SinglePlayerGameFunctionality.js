//Variables:
const SinglePlr_GameTable = document.getElementById('SinglePlayerTable');
const PlayerScoreText = document.getElementById('SinglePlayerScore');
const ComputerScoreText = document.getElementById('SinglePlayerComputerScore');
const ScoreboardPlayerNameWrap = document.getElementById('GameInfoHeaderYouWrap');
const ScoreboardComputerNameWrap = document.getElementById('GameInfoHeaderComputerWrap');
const SinglePlayerMsgText = document.getElementById('SinglePlayerMsgText');
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
let SinglePlr_PlrStartedFirst = true;
let SinglePlr_AvailableCells = [1,2,3,4,5,6,7,8,9]
let SinglePlr_CellsCollected = [];
let SinglePlrComputer_CellsCollected = [];
let SinglePlr_TableLocked = false;
let SinglePlr_GameEnded = false;
let SinglePlr_GameResetting = false;
let SinglePlr_PlrScore = 0;
let SinglePlr_ComputerScore = 0;



                ScoreboardPlayerNameWrap.style.border = '2.5px solid #3ba3ff';

// Show Game Message:
let SinglePlayerGameMessageShown = false;
function SinglePlayerShowGameMsg(MessageText, TextColor, MessageTimeMs){
    if(!SinglePlayerGameMessageShown){
        //Show Message:
        SinglePlayerGameMessageShown = true;
        SinglePlayerMsgText.classList.add('HiddenOpacity');
        SinglePlayerMsgText.innerText = MessageText;
        if(TextColor != null){SinglePlayerMsgText.style.color = TextColor;}else{SinglePlayerMsgText.style.color = 'white';}
        SinglePlayerMsgText.style.display = 'flex';
        setTimeout(() => {
            SinglePlayerMsgText.classList.add('ShownOpacity');
            SinglePlayerMsgText.classList.remove('HiddenOpacity');
        },150)
        
        

        //Hide Message:
        setTimeout(() => {
            SinglePlayerMsgText.classList.remove('ShownOpacity');
            SinglePlayerMsgText.classList.add('HiddenOpacity');
            
            setTimeout(() => {SinglePlayerMsgText.style.display = 'none'; SinglePlayerGameMessageShown = false;}, 600)

        }, MessageTimeMs)
    }

}


// Player Cell Selection:
function SinglePlayerSelectCell(SinglePlr_CellSelected){

    // Check if Cell is Already Taken:
    if(SinglePlr_CellSelected.classList.contains("CellTaken")){
        // Cell is Already Taken:
        SinglePlr_CellSelected.style.background = RedCellColor;
        SinglePlayerShowGameMsg('Cell is Already Taken!', RedCellColor, 1100);
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
            SinglePlayerShowGameMsg('Slow Down!', YellowCellColor, 850);
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

            //console.info(`Player's Cells: ${SinglePlr_CellsCollected}`);

            // Remove Cell Selected from 'Avaialable Cells':
            let AvaialableCellIndex = SinglePlr_AvailableCells.lastIndexOf(Number(SinglePlr_CellNumberSelected)); // Get Index of Cell in Available Cells
            SinglePlr_AvailableCells.splice(AvaialableCellIndex, 1); // Remove Selected Cell from AvailableCells Array

            //console.info(`Avaialable Cells: ${SinglePlr_AvailableCells}`);

            // Check for Winner:
            SinglePlr_WinnerCheck();

            // Computer's Turn:
            setTimeout(() => {
                // Check for available cells:
                if(SinglePlr_AvailableCells.length > 0 && !SinglePlr_GameEnded){

                    // Add Computer's Turn Style to Scoreboard:
                    ScoreboardComputerNameWrap.style.border = '2.5px solid #3ba3ff';
                    ScoreboardPlayerNameWrap.style.border = '2.5px solid #3ba3ff00';

                    // Small 'Human Like' Wait for Computer's Turn:
                    setTimeout(() => {
                        ComputerGameMove();
                    }, 1250);
                    
                };
               
            }, 200);
            
        }
        
        setTimeout(() => {
            // Reset Background:
            if(!SinglePlr_GameEnded){
                SinglePlr_CellSelected.style.background = 'unset';
            }
        }, 850);
    }
    
}

// Computer Cell Selection:
function ComputerGameMove(){
    // Check if Game has Already Ended:
    if(!SinglePlr_GameEnded){
        // Get Random Available Cell:
        let SinglePlayerComputerCellSelectedIndex = Math.floor((Math.random() * (SinglePlr_AvailableCells.length)));
        let ComputerCellSelected = document.getElementById(`SinglePlayerTblCell_${SinglePlr_AvailableCells[SinglePlayerComputerCellSelectedIndex]}`);

        // Change Availabilty and Style:
        ComputerCellSelected.style.background = YellowCellColor;
        ComputerCellSelected.classList.add('CellTaken');
        ComputerCellSelected.innerText = SinglePlayerComputerPiece;

        // Add Cell to 'Computers's Pieces':
        let SinglePlrComputer_CellNumberSelected = ComputerCellSelected.id.charAt(20); // Get Cell Number
        SinglePlrComputer_CellsCollected.push(SinglePlrComputer_CellNumberSelected); // Add to Players Cell Array
        SinglePlrComputer_CellsCollected.sort(); // Sort Player's Cell Array

        //console.info(`Computers's Cells: ${SinglePlrComputer_CellsCollected}`);

        // Remove Cell Selected from 'Avaialable Cells':
        AvaialableCellIndex = SinglePlr_AvailableCells.lastIndexOf(Number(SinglePlrComputer_CellNumberSelected)); // Get Index of Cell in Available Cells
        SinglePlr_AvailableCells.splice(AvaialableCellIndex, 1); // Remove Selected Cell from AvailableCells Array

        //console.info(`Avaialable Cells: ${SinglePlr_AvailableCells}`);

        setTimeout(() => {
            // Reset Background:
            if(!SinglePlr_GameEnded){
                ComputerCellSelected.style.background = 'unset';
            }
        }, 850);



        // Unlock Table for Next Move:
        setTimeout(() => {
            SinglePlr_TableLocked = false;
            // Check for Winner:
            SinglePlr_WinnerCheck();
        }, (300));

        // If computer has not won add Player's Turn style to Scoreboard:
        setTimeout(() => {
            if(!SinglePlr_GameEnded){
                ScoreboardComputerNameWrap.style.border = '2.5px solid #3ba3ff00';
                ScoreboardPlayerNameWrap.style.border = '2.5px solid #3ba3ff';
            }
        }, 500);


    }else{
        // Game has Already Ended!
        console.log('Game has already ended! Computer cannot move.');
    }
}


// Check for Win Function:
function SinglePlr_WinnerCheck() {
    WinningCombinations.forEach((WinningCells) => {
        if (WinningCells.every(cell => SinglePlr_CellsCollected.includes(String(cell)))) {
            // Player has Won!
            console.log('Player Won!');
            console.log('Winning Combination:', WinningCells);
            SinglePlayerShowGameMsg('You Won!', GreenCellColor, 1350);
            SinglePlr_TableLocked = true;
            SinglePlr_GameEnded = true;
            // Update ScoreBoard:
            SinglePlr_PlrScore = (SinglePlr_PlrScore + 1);
            PlayerScoreText.innerText = `${SinglePlr_PlrScore}`;
            ScoreboardPlayerNameWrap.style.border = `2.5px solid ${GreenCellColor}`;
            // Show Winning Combination:
            WinningCells.forEach(CellNumber => {
                let CellToStyle = document.getElementById(`SinglePlayerTblCell_${CellNumber}`);
                CellToStyle.style.background = GreenCellColor;
            });
        } else if(WinningCells.every(cell => SinglePlrComputer_CellsCollected.includes(String(cell)))){
            // Computer has Won!
            console.log('Computer Won!');
            SinglePlayerShowGameMsg('Computer Won!', RedCellColor, 1350);
            console.log('Winning Combination:', WinningCells);
            SinglePlr_TableLocked = true;
            SinglePlr_GameEnded = true;
            // Update ScoreBoard:
            SinglePlr_ComputerScore = (SinglePlr_ComputerScore + 1);
            ComputerScoreText.innerText = `${SinglePlr_ComputerScore}`;
            ScoreboardComputerNameWrap.style.border = `2.5px solid ${RedCellColor}`;
            // Show Winning Combination:
            WinningCells.forEach(CellNumber => {
                let CellToStyle = document.getElementById(`SinglePlayerTblCell_${CellNumber}`);
                CellToStyle.style.background = RedCellColor;
            });
        } else if(!SinglePlr_GameEnded && SinglePlr_AvailableCells.length == 0){
            // Game was a Draw!
            //console.log('Nobody Won! Out of Cells!');
            SinglePlayerShowGameMsg('Game was a Draw!', YellowCellColor, 1350);
            SinglePlr_TableLocked = true;
            SinglePlr_GameEnded = true;
        }
    });

        // Reset Game if Needed:
        if(SinglePlr_GameEnded && !SinglePlr_GameResetting){
            setTimeout(() => {
                
                    SinglePlr_GameResetting = true;
                    SinglePlr_ResetGame();
                
            },(2000))
        }
}

// Reset Game Function:
function SinglePlr_ResetGame(){
    //console.log('Resetting Game . . .')

    AllSinglePlayerTblCells.forEach((Cell) => {
        Cell.classList.remove('CellTaken');
        Cell.innerText = '';
        Cell.style.background = 'unset';
    })

    setTimeout(() => {
        SinglePlr_CellsCollected = [];
        SinglePlrComputer_CellsCollected = [];
        SinglePlr_AvailableCells = [1,2,3,4,5,6,7,8,9];
        SinglePlr_GameResetting = false;
        SinglePlr_GameEnded = false;

        // Player started last game, Computer will go first:
        if(SinglePlr_PlrStartedFirst){
            SinglePlr_TableLocked = true;
                ScoreboardComputerNameWrap.style.border = '2.5px solid #3ba3ff';
                ScoreboardPlayerNameWrap.style.border = '2.5px solid #3ba3ff00';
                SinglePlr_PlrStartedFirst = false;
            ComputerGameMove();
        }else{
            ScoreboardComputerNameWrap.style.border = '2.5px solid #3ba3ff00';
            ScoreboardPlayerNameWrap.style.border = '2.5px solid #3ba3ff';
            SinglePlr_TableLocked = false;
            SinglePlr_PlrStartedFirst = true;
        }

    }, 500)
}
