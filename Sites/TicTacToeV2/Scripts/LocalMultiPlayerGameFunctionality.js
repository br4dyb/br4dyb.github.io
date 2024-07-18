//Variables:
const LocalPlayer1ScoreText = document.getElementById('LocalPlayer1Score');
const LocalPlayer2ScoreText = document.getElementById('LocalPlayer2Score');
const LocalPlayer1NameWrap = document.getElementById('GameInfoHeaderLocalPlayer1Wrap');
const LocalPlayer2NameWrap = document.getElementById('GameInfoHeaderLocalPlayer2Wrap');
const LocalMultiPlayerMsgText = document.getElementById('LocalMultiPlayerMsgText');
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
let LocalCurrentPlayerTurn = 1; // <-- (Player)
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
let Local_GameLocked = false;

// Add Player 1's Turn Style to Start:
LocalPlayer1NameWrap.style.border = '2.5px solid #3ba3ff';
LocalPlayer2NameWrap.style.border = '2.5px solid #3ba3ff00';


// Select Cell:
function LocalMultiPlayerSelectCell(Cell){
    // Check if Cell is Available & Game is still going:
    if(!Local_GameEnded && !Local_GameLocked){
        Local_GameLocked = true; // <-- Lock Game Table to Prevent Double Play
        if(Cell.classList.contains('CellTaken')){
            // Already Taken:
                Cell.style.background = RedCellColor;
                LocalShowGameMsg('Cell is Alreay Taken!', RedCellColor, 1100);
        }else{
            // Cell Available:
            Cell.classList.add('CellTaken');
            
            // Add to Current Player's Cells:
            if(LocalCurrentPlayerTurn === 1){
                // Player 1:
                Cell.style.background = LocalPlr1Color;
                const CellNumber = Cell.id.charAt(24);
                    //console.log(`Cell: ${CellNumber} | Taken By: Player 1`);
                // Add to Plr's Cells:
                LocalPlr1_CellsCollected.push(CellNumber);
                LocalPlr1_CellsCollected.sort();
                Cell.innerText = 'X';
                // Remove from Available Cells:
                const AvaialableCellIndex = LocalMultiGame_AvailableCells.lastIndexOf(Number(CellNumber));
                LocalMultiGame_AvailableCells.splice(AvaialableCellIndex, 1);
                    //console.log(`Available Cells: ${LocalMultiGame_AvailableCells}`);
                // Check for Win: (if not, next player's turn . . .)
                LocalMultiPlayerCheckWinner();

            }else if(LocalCurrentPlayerTurn === 2){
                // Player 2:
                Cell.style.background = LocalPlr2Color;
                const CellNumber = Cell.id.charAt(24);
                    //console.log(`Cell: ${CellNumber} | Taken By: Player 2`);
                // Add to Plr's Cells:
                LocalPlr2_CellsCollected.push(CellNumber);
                LocalPlr2_CellsCollected.sort();
                Cell.innerText = 'O';
                // Remove from Available Cells:
                const AvaialableCellIndex = LocalMultiGame_AvailableCells.lastIndexOf(Number(CellNumber));
                LocalMultiGame_AvailableCells.splice(AvaialableCellIndex, 1);
                    //console.log(`Available Cells: ${LocalMultiGame_AvailableCells}`);
                // Check for Win: (if not, next player's turn . . .)
                LocalMultiPlayerCheckWinner();

            }
        }

        // Reset Cell Background:
        setTimeout(() => {
            if(!Local_GameEnded){
                Cell.style.background = 'unset';
            }
        }, (850))
    }
}

// Show Game Message:
let LocalGameMessageShown = false;
function LocalShowGameMsg(MessageText, TextColor, MessageTimeMs){
    if(!LocalGameMessageShown){
        //Show Message:
        LocalGameMessageShown = true;
        LocalMultiPlayerMsgText.classList.add('HiddenOpacity');
        LocalMultiPlayerMsgText.innerText = MessageText;
        if(TextColor != null){LocalMultiPlayerMsgText.style.color = TextColor;}else{LocalMultiPlayerMsgText.style.color = 'white';}
        LocalMultiPlayerMsgText.style.display = 'flex';
        setTimeout(() => {
            LocalMultiPlayerMsgText.classList.add('ShownOpacity');
            LocalMultiPlayerMsgText.classList.remove('HiddenOpacity');
        },150)
        
        

        //Hide Message:
        setTimeout(() => {
            LocalMultiPlayerMsgText.classList.remove('ShownOpacity');
            LocalMultiPlayerMsgText.classList.add('HiddenOpacity');
            
            setTimeout(() => {LocalMultiPlayerMsgText.style.display = 'none'; LocalGameMessageShown = false;}, 600)

        }, MessageTimeMs)
    }

}

// Check for Winner:
function LocalMultiPlayerCheckWinner(){
    
    WinningCombinations.forEach(WinningCombination => {
        // Check for Player 1 Win:
        if(WinningCombination.every(Cell => LocalPlr1_CellsCollected.includes(String(Cell)))){
                //console.info('Player 1 has won!');
                LocalShowGameMsg('Player 1 has Won!', GreenCellColor, 1750);
           LocalPlr1_Score += 1;
           LocalPlayer1ScoreText.innerText = `Player 1: ${LocalPlr1_Score}`;
           Local_GameEnded = true;
           WinningCombination.forEach(WinningCellNumber => {
                let CellToStyle = document.getElementById(`LocalMultiPlayerTblCell_${WinningCellNumber}`);
                CellToStyle.style.background = GreenCellColor;
           });
           LocalPlayer1NameWrap.style.border = `2px solid ${GreenCellColor}`;

            // Reset Game:
            setTimeout(() => {
                LocalMultiPlayerGameReset()
            }, 2000)
           
        }

        // Check for Player 2 Win:
        if(WinningCombination.every(Cell => LocalPlr2_CellsCollected.includes(String(Cell)))){
                //console.info('Player 2 has won!');
                LocalShowGameMsg('Player 2 has Won!', GreenCellColor, 1750);
            LocalPlr2_Score += 1;
            LocalPlayer2ScoreText.innerText = `Player 2: ${LocalPlr2_Score}`;
            Local_GameEnded = true;
           WinningCombination.forEach(WinningCellNumber => {
                let CellToStyle = document.getElementById(`LocalMultiPlayerTblCell_${WinningCellNumber}`);
                CellToStyle.style.background = GreenCellColor;
           });
           LocalPlayer2NameWrap.style.border = `2px solid ${GreenCellColor}`;

           // Reset Game:
           setTimeout(() => {
                LocalMultiPlayerGameReset()
           }, 2000)

        }

    });

    // If Draw Game / No Cells Left:
    if(LocalMultiGame_AvailableCells.length === 0){
        //console.info('No Player Won! / Draw');
        LocalShowGameMsg('Game was a Draw!', YellowCellColor, 1750);
        
        // Reset Game:
        setTimeout(() => {
            LocalMultiPlayerGameReset()
       }, 2000)
    }

    // If no Winner, Next Player's Turn:
    setTimeout(() => {
        if(!Local_GameEnded){
            if(LocalCurrentPlayerTurn === 1){
                LocalCurrentPlayerTurn = 2;
                LocalPlayer1NameWrap.style.border = '2.5px solid #3ba3ff00';
                LocalPlayer2NameWrap.style.border = '2.5px solid #3ba3ff';
                Local_GameLocked = false;
            }else{
                LocalCurrentPlayerTurn = 1;
                LocalPlayer1NameWrap.style.border = '2.5px solid #3ba3ff';
                LocalPlayer2NameWrap.style.border = '2.5px solid #3ba3ff00';
                Local_GameLocked = false;
            }
        }
    }, 350)

}

// Reset Game:
function LocalMultiPlayerGameReset(){
    if(!Local_GameResetting){
        Local_GameResetting = true;
        AllLocalMultiPlayerTblCells.forEach(Cell => {
            Cell.classList.remove('CellTaken');
            Cell.innerText = '';
            Cell.style.background = 'unset';
        })
        LocalPlr1_CellsCollected = [];
        LocalPlr2_CellsCollected = [];
        LocalMultiGame_AvailableCells = [1,2,3,4,5,6,7,8,9];

        // Let Other Player Start the Next Game:
        if(LocalPlr1_StartedFirst){
            LocalPlr1_StartedFirst = false
            LocalCurrentPlayerTurn = 2
            LocalPlayer1NameWrap.style.border = '2.5px solid #3ba3ff00';
            LocalPlayer2NameWrap.style.border = '2.5px solid #3ba3ff';
        }else{
            LocalPlr1_StartedFirst = true
            LocalCurrentPlayerTurn = 1
            LocalPlayer1NameWrap.style.border = '2.5px solid #3ba3ff';
            LocalPlayer2NameWrap.style.border = '2.5px solid #3ba3ff00';
        }

        // Finish Game Reset:
        setTimeout(() => {
            Local_GameEnded = false;
            Local_GameResetting = false;
            Local_GameLocked = false;
        }, 500)
    }
    
}
