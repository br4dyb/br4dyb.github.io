//Variables:
const OnlinePlayer1ScoreText = document.getElementById('OnlinePlayer1Score');
const OnlinePlayer2ScoreText = document.getElementById('OnlinePlayer2Score');
const OnlinePlayer1NameWrap = document.getElementById('GameInfoHeaderOnlinePlayer1Wrap');
const OnlinePlayer2NameWrap = document.getElementById('GameInfoHeaderOnlinePlayer2Wrap');
const OnlineMultiPlayerMsgText = document.getElementById('OnlineMultiPlayerMsgText');
    //Tables Cells:
    const OnlineMultiPlayerTblCell_1 = document.getElementById('OnlineMultiPlayerTblCell_1');
    const OnlineMultiPlayerTblCell_2 = document.getElementById('OnlineMultiPlayerTblCell_2');
    const OnlineMultiPlayerTblCell_3 = document.getElementById('OnlineMultiPlayerTblCell_3');
    const OnlineMultiPlayerTblCell_4 = document.getElementById('OnlineMultiPlayerTblCell_4');
    const OnlineMultiPlayerTblCell_5 = document.getElementById('OnlineMultiPlayerTblCell_5');
    const OnlineMultiPlayerTblCell_6 = document.getElementById('OnlineMultiPlayerTblCell_6');
    const OnlineMultiPlayerTblCell_7 = document.getElementById('OnlineMultiPlayerTblCell_7');
    const OnlineMultiPlayerTblCell_8 = document.getElementById('OnlineMultiPlayerTblCell_8');
    const OnlineMultiPlayerTblCell_9 = document.getElementById('OnlineMultiPlayerTblCell_9');
    const AllOnlineMultiPlayerTblCells = [OnlineMultiPlayerTblCell_1, OnlineMultiPlayerTblCell_2, OnlineMultiPlayerTblCell_3, OnlineMultiPlayerTblCell_4, OnlineMultiPlayerTblCell_5, OnlineMultiPlayerTblCell_6, OnlineMultiPlayerTblCell_7, OnlineMultiPlayerTblCell_8, OnlineMultiPlayerTblCell_9];
let OnlinePlr1_StartedFirst = true;
let OnlineCurrentPlayerTurn = 1; // <-- (Player)
let OnlineMultiGame_AvailableCells = [1,2,3,4,5,6,7,8,9]
let OnlinePlr1_CellsCollected = [];
let OnlinePlr2_CellsCollected = [];
let OnlinePlr1_Score = 0;
let OnlinePlr2_Score = 0;
const OnlinePlr1Color = '#3191e5';
const OnlinePlr2Color = '#a73acc';
// Already Defined:
    // RedCellColor = '#E45858';
    // YellowCellColor = '#CDD034';
    // GreenCellColor = '#62BD67';
    // WinningCombinations = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8,], [3,6,9,], [1,5,9,], [3,5,7,]];
let Online_GameEnded = false;
let Online_GameResetting = false;
let Online_GameLocked = false;

// Add Player 1's Turn Style to Start:
OnlinePlayer1NameWrap.style.border = '2.5px solid #3ba3ff';
OnlinePlayer2NameWrap.style.border = '2.5px solid #3ba3ff00';

// Show Game Message:
let OnlineGameMessageShown = false;
function OnlineShowGameMsg(MessageText, TextColor, MessageTimeMs){
    if(!OnlineGameMessageShown){
        //Show Message:
        OnlineGameMessageShown = true;
        OnlineMultiPlayerMsgText.classList.add('HiddenOpacity');
        OnlineMultiPlayerMsgText.innerText = MessageText;
        if(TextColor != null){OnlineMultiPlayerMsgText.style.color = TextColor;}else{OnlineMultiPlayerMsgText.style.color = 'white';}
        OnlineMultiPlayerMsgText.style.display = 'flex';
        setTimeout(() => {
            OnlineMultiPlayerMsgText.classList.add('ShownOpacity');
            OnlineMultiPlayerMsgText.classList.remove('HiddenOpacity');
        },150)
        
        

        //Hide Message:
        setTimeout(() => {
            OnlineMultiPlayerMsgText.classList.remove('ShownOpacity');
            OnlineMultiPlayerMsgText.classList.add('HiddenOpacity');
            
            setTimeout(() => {OnlineMultiPlayerMsgText.style.display = 'none'; OnlineGameMessageShown = false;}, 600)

        }, MessageTimeMs)
    }

}

// #######################################################
// This whole thing is wrong lol.... this is essentially coded for a local multiplayer with online data saves...?
// Need to adjust the code with snapshot listeners to prevent and update plays for other player...
// #######################################################

// Select Cell Function:
function OnlineMultiPlayerSelectCell(Cell) {
    // Check if Cell is Available & Game is still going/unlocked:
    if(!Online_GameEnded && !Online_GameLocked){
        Online_GameLocked = true; // <-- Lock Game Table to Prevent Double Play
        if(Cell.classList.contains('CellTaken')){
            // Already Taken:
                Cell.style.background = RedCellColor;
                OnlineShowGameMsg('Cell is Alreay Taken!', RedCellColor, 1100);
                setTimeout(() => {
                    Online_GameLocked = false;
                }, 350)
        }else{
            // Cell Available:
            Cell.classList.add('CellTaken');
            
            // Add to Current Player's Cells:
            if(OnlineCurrentPlayerTurn === 1){
                // Player 1:
                Cell.style.background = OnlinePlr1Color;
                const CellNumber = Cell.id.charAt(25);
                    //console.log(`Cell: ${CellNumber} | Taken By: Player 1`);
                // Add to Plr's Cells:
                OnlinePlr1_CellsCollected.push(CellNumber);
                OnlinePlr1_CellsCollected.sort();
                Cell.innerText = 'X';
                // Remove from Available Cells:
                const AvaialableCellIndex = OnlineMultiGame_AvailableCells.lastIndexOf(Number(CellNumber));
                OnlineMultiGame_AvailableCells.splice(AvaialableCellIndex, 1);
                    //console.log(`Available Cells: ${OnlineMultiGame_AvailableCells}`);
                // Check for Win: (if not, next player's turn . . .)

                db.collection('TicTacToeGames').doc('AllGames').collection('StartedGames').doc(NewGameID).update({
                    'Players.Player1.PlayerCellsCollected' : OnlinePlr1_CellsCollected,
                    LastMoveTime : Date()
                }).then(() => {
                    console.info('Player Pieces Updated in Database!');
                    OnlineMultiPlayerCheckWinner();
                }).catch((error) => {
                    console.warn('Error updating player pieces!');
                    console.log(error);
                })

            }else if(OnlineCurrentPlayerTurn === 2){
                // Player 2:
                Cell.style.background = OnlinePlr2Color;
                const CellNumber = Cell.id.charAt(25);
                    //console.log(`Cell: ${CellNumber} | Taken By: Player 2`);
                // Add to Plr's Cells:
                OnlinePlr2_CellsCollected.push(CellNumber);
                OnlinePlr2_CellsCollected.sort();
                Cell.innerText = 'O';
                // Remove from Available Cells:
                const AvaialableCellIndex = OnlineMultiGame_AvailableCells.lastIndexOf(Number(CellNumber));
                OnlineMultiGame_AvailableCells.splice(AvaialableCellIndex, 1);
                    //console.log(`Available Cells: ${OnlineMultiGame_AvailableCells}`);
                // Check for Win: (if not, next player's turn . . .)
                
                db.collection('TicTacToeGames').doc('AllGames').collection('StartedGames').doc(NewGameID).update({
                    'Players.Player2.PlayerCellsCollected' : OnlinePlr2_CellsCollected,
                    LastMoveTime : Date()
                }).then(() => {
                    console.info('Player Pieces Updated in Database!');
                    OnlineMultiPlayerCheckWinner();
                }).catch((error) => {
                    console.warn('Error updating player pieces!');
                    console.log(error);
                })

            }
        }

        // Reset Cell Background:
        setTimeout(() => {
            if(!Online_GameEnded){
                Cell.style.background = 'unset';
            }
        }, (850))
    }else{
        // Send Slow Down Msg if Game is Locked:
        if(Online_GameLocked){
            OnlineShowGameMsg('Slow Down!', YellowCellColor, 1100);

            Cell.style.background = YellowCellColor;

            // Reset Cell Background:
            setTimeout(() => {
                if(!Online_GameEnded){
                    Cell.style.background = 'unset';
                }
            }, (850))
        }
    }
}

function OnlineMultiPlayerCheckWinner(){
    console.info('Win Check Functionality Not Completed Yet!');

    // Get Each Players Selected Cells from Database:
    db.collection('TicTacToeGames').doc('AllGames').collection('StartedGames').doc(NewGameID).get().then((doc) => {
        OnlinePlr1_CellsCollected = doc.data().Players.Player1.PlayerCellsCollected;
        if(OnlinePlr1_CellsCollected != null){
            console.log('Plr 1 Cells: ', OnlinePlr1_CellsCollected);
        }else{
            OnlinePlr1_CellsCollected = [];
        }
       

        OnlinePlr2_CellsCollected = doc.data().Players.Player2.PlayerCellsCollected;
        if(OnlinePlr2_CellsCollected != null){
            console.log('Plr 2 Cells: ', OnlinePlr2_CellsCollected);
        }else{
            OnlinePlr2_CellsCollected = [];
        }

        // Check for Winning Combinations:
        WinningCombinations.forEach(WinningCombination => {
            // Check for Player 1 Win:
            if(WinningCombination.every(Cell => OnlinePlr1_CellsCollected.includes(String(Cell)))){
                    //console.info('Player 1 has won!');
                    OnlineShowGameMsg('Player 1 has Won!', GreenCellColor, 1750);
               OnlinePlr1_Score += 1;
               OnlinePlayer1ScoreText.innerText = OnlinePlr1_Score;
               Online_GameEnded = true;
               WinningCombination.forEach(WinningCellNumber => {
                    let CellToStyle = document.getElementById(`OnlineMultiPlayerTblCell_${WinningCellNumber}`);
                    CellToStyle.style.background = GreenCellColor;
               });
               OnlinePlayer1NameWrap.style.border = `2px solid ${GreenCellColor}`;
    
                // Reset Game:
                setTimeout(() => {
                    OnlineMultiPlayerGameReset()
                }, 2000)
               
            }
    
            // Check for Player 2 Win:
            if(WinningCombination.every(Cell => OnlinePlr2_CellsCollected.includes(String(Cell)))){
                    //console.info('Player 2 has won!');
                    OnlineShowGameMsg('Player 2 has Won!', GreenCellColor, 1750);
                OnlinePlr2_Score += 1;
                OnlinePlayer2ScoreText.innerText = OnlinePlr2_Score;
                Online_GameEnded = true;
               WinningCombination.forEach(WinningCellNumber => {
                    let CellToStyle = document.getElementById(`OnlineMultiPlayerTblCell_${WinningCellNumber}`);
                    CellToStyle.style.background = GreenCellColor;
               });
               OnlinePlayer2NameWrap.style.border = `2px solid ${GreenCellColor}`;
    
               // Reset Game:
               setTimeout(() => {
                    OnlineMultiPlayerGameReset()
               }, 2000)
    
            }
    
        });
    
        // If Draw Game / No Cells Left:
        if(OnlineMultiGame_AvailableCells.length === 0){
            //console.info('No Player Won! / Draw');
            OnlineShowGameMsg('Game was a Draw!', YellowCellColor, 1750);
            
            // Reset Game:
            setTimeout(() => {
                OnlineMultiPlayerGameReset()
           }, 2000)
        }
    
        // If no Winner, Next Player's Turn:
        setTimeout(() => {
            if(!Online_GameEnded){
                if(OnlineCurrentPlayerTurn === 1){
                    OnlineCurrentPlayerTurn = 2;
                    OnlinePlayer1NameWrap.style.border = '2.5px solid #3ba3ff00';
                    OnlinePlayer2NameWrap.style.border = '2.5px solid #3ba3ff';
                    Online_GameLocked = false;
                }else{
                    OnlineCurrentPlayerTurn = 1;
                    OnlinePlayer1NameWrap.style.border = '2.5px solid #3ba3ff';
                    OnlinePlayer2NameWrap.style.border = '2.5px solid #3ba3ff00';
                    Online_GameLocked = false;
                }
            }
        }, 350)
    

    }).catch((error) => {
        console.warn(`Error retriving player's collected cells!`);
        console.log(error);
    })


}