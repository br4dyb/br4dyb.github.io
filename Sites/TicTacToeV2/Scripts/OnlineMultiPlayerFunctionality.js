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
let OnlineMultiGame_AvailableCells = [1,2,3,4,5,6,7,8,9]
let OnlinePlr1_StartedFirst = true;
let OnlineThisClientPlayer = 0; // <-- This player's number
let ThisClientName = 'Null'; // <-- This player's name
let OnlineCurrentPlayerTurn = 1; // <-- Current player for next game move
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
let Online_GameLocked = true; // <-- Start Locked (only unlock for this clients turn)

// Add Player 1's Turn Style to Start: (first game only)
OnlinePlayer1NameWrap.style.border = '2.5px solid #3ba3ff';
OnlinePlayer2NameWrap.style.border = '2.5px solid #3ba3ff00';

// Initialize OnlineMultiplayer (define variables / unlock for Player 1):
function InitializeOnlineMultiplayer(PlayerNumber, PlayerName){
    OnlineThisClientPlayer = PlayerNumber;
    ThisClientName = PlayerName;

    //Add Listener to Database:
    db.collection('TicTacToeGames').doc('AllGames').collection('StartedGames').doc(NewGameID)
    .onSnapshot((doc) => {

        console.info('Game Data Chnage Detected!')
        let ThisGameData = doc.data();

        // Show Last Game Play & Switch Current Player Turn:
        if(OnlineCurrentPlayerTurn === 1){
            
            let Player1sLastCell = document.getElementById(`OnlineMultiPlayerTblCell_${ThisGameData.Players.Player1.LastCellSelected}`);
            if(Player1sLastCell != null){
                Player1sLastCell.classList.add('CellTaken');
                Player1sLastCell.style.background = OnlinePlr1Color;
                Player1sLastCell.innerText = 'X';

                // Remove from Available Cells: (to later detect draw)
                const CellNumber = Player1sLastCell.id.charAt(25);
                const AvaialableCellIndex = OnlineMultiGame_AvailableCells.lastIndexOf(Number(CellNumber));
                OnlineMultiGame_AvailableCells.splice(AvaialableCellIndex, 1);

                // Reset Cell Background:
                setTimeout(() => {
                    if(!Online_GameEnded){
                        Player1sLastCell.style.background = 'unset';
                        OnlineCurrentPlayerTurn = ThisGameData.CurrentPlayersTurn;
                        OnlineMultiPlayerCheckWinner()
                        //Unlock for Next Player (client side):
                        if(!Online_GameEnded && OnlineThisClientPlayer === OnlineCurrentPlayerTurn){Online_GameLocked = false}
                    }
                }, (850))
            } else {
                // No Cell Last Selected but Need Next Player?:
                OnlineCurrentPlayerTurn = ThisGameData.CurrentPlayersTurn;
                        //Unlock for Next Player (client side):
                        if(OnlineThisClientPlayer === OnlineCurrentPlayerTurn){Online_GameLocked = false}
            }
        }else{
            if(OnlineCurrentPlayerTurn === 2){
                let Player2sLastCell = document.getElementById(`OnlineMultiPlayerTblCell_${ThisGameData.Players.Player2.LastCellSelected}`);
                if(Player2sLastCell != null){
                    Player2sLastCell.classList.add('CellTaken');
                    Player2sLastCell.style.background = OnlinePlr2Color;
                    Player2sLastCell.innerText = 'O';
    
                    // Remove from Available Cells: (to later detect draw)
                    const CellNumber = Player2sLastCell.id.charAt(25);
                    const AvaialableCellIndex = OnlineMultiGame_AvailableCells.lastIndexOf(Number(CellNumber));
                    OnlineMultiGame_AvailableCells.splice(AvaialableCellIndex, 1);
    
                    // Reset Cell Background:
                    setTimeout(() => {
                        if(!Online_GameEnded){
                            Player2sLastCell.style.background = 'unset';
                            OnlineCurrentPlayerTurn = ThisGameData.CurrentPlayersTurn;
                            OnlineMultiPlayerCheckWinner()
                            //Unlock for Next Player (client side):
                            if(!Online_GameEnded && OnlineThisClientPlayer === OnlineCurrentPlayerTurn){Online_GameLocked = false}
                        }
                    }, (850))
                } else {
                    // No Cell Last Selected but Need Next Player?:
                    OnlineCurrentPlayerTurn = ThisGameData.CurrentPlayersTurn;
                            //Unlock for Next Player (client side):
                            if(OnlineThisClientPlayer === OnlineCurrentPlayerTurn){Online_GameLocked = false}
                }
            }
        }

        
        
        
        // Update Each Player's Cells Collected:
        
        OnlinePlr1_CellsCollected = ThisGameData.Players.Player1.PlayerCellsCollected;
        if(OnlinePlr1_CellsCollected != null){
            // Cells Found in Array & Check for Win:
            console.log('Plr1 Cells:', OnlinePlr1_CellsCollected);
        }else{
            // No Cells Yet / Redefine as Array (prevent type error):
            OnlinePlr1_CellsCollected = [];
            console.log('Plr1 Cells:', OnlinePlr1_CellsCollected);
        }
       

        OnlinePlr2_CellsCollected = ThisGameData.Players.Player2.PlayerCellsCollected;
        if(OnlinePlr2_CellsCollected != null){
            // Cells Found in Array & Check for Win:
            console.log('Plr2 Cells:', OnlinePlr2_CellsCollected);
        }else{
            // No Cells Yet / Redefine as Array (prevent type error):
            OnlinePlr2_CellsCollected = [];
            console.log('Plr2 Cells:', OnlinePlr2_CellsCollected);
        }

    });

    //Unlock Game Cells for this client if it's their turn: (Already Above?)
    // if(OnlineThisClientPlayer === OnlineCurrentPlayerTurn){
    //     Online_GameLocked = false;
    // }
}

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


// Select Cell Function: [V. 2]
function OnlineMultiPlayerSelectCell(Cell) {
    // Check if Cell is Available & Game is still going/unlocked:
    if(!Online_GameEnded && !Online_GameLocked && OnlineThisClientPlayer === OnlineCurrentPlayerTurn){
        // Move Accepted:
        Online_GameLocked = true; // <-- Lock Game Table to Prevent Double Play

        if(Cell.classList.contains('CellTaken')){
            // Already Taken:
                Cell.style.background = RedCellColor;
                OnlineShowGameMsg('Cell is Alreay Taken!', RedCellColor, 1100);

                // Unlock to Try Again:
                setTimeout(() => {
                    Online_GameLocked = false;
                }, 350)

                // Reset Cell Background:
                setTimeout(() => {
                    if(!Online_GameEnded){
                        Cell.style.background = 'unset';
                    }
                }, (850))
        }else{
            // Cell Available:
            Cell.classList.add('CellTaken');
            const CellNumber = Cell.id.charAt(25);
            
            // Add to Current Player's Cells:
            if(OnlineCurrentPlayerTurn === 1){
                // Player 1
                OnlinePlr1_CellsCollected.push(CellNumber);

                db.collection('TicTacToeGames').doc('AllGames').collection('StartedGames').doc(NewGameID).update({
                    'Players.Player1.PlayerCellsCollected' : OnlinePlr1_CellsCollected,
                    'Players.Player1.LastCellSelected' : CellNumber,
                    CurrentPlayersTurn : 2,
                    LastMoveTime : Date()
                }).then(() => {
                    console.info('Player Pieces Updated in Database!');
                }).catch((error) => {
                    console.warn('Error updating player pieces!');
                    console.log(error);
                })

            }else if(OnlineCurrentPlayerTurn === 2){
                // Player 2:
                OnlinePlr2_CellsCollected.push(CellNumber);
                
                db.collection('TicTacToeGames').doc('AllGames').collection('StartedGames').doc(NewGameID).update({
                    'Players.Player2.PlayerCellsCollected' : OnlinePlr2_CellsCollected,
                    'Players.Player2.LastCellSelected' : CellNumber,
                    CurrentPlayersTurn : 1,
                    LastMoveTime : Date()
                }).then(() => {
                    console.info('Player Pieces Updated in Database!');
                }).catch((error) => {
                    console.warn('Error updating player pieces!');
                    console.log(error);
                })

            }
        }

    }else{
        // Move Unaccepted:
        // Send Slow Down Msg if Game is Locked (not this player's turn yet!):
        if(Online_GameLocked){
            OnlineShowGameMsg('Not Your Turn!', RedCellColor, 1100);

            Cell.style.background = RedCellColor;

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
    
        // // If no Winner, Next Player's Turn:
        // setTimeout(() => {
        //     if(!Online_GameEnded){
        //         if(OnlineCurrentPlayerTurn === 1){
        //             OnlineCurrentPlayerTurn = 2;
        //             OnlinePlayer1NameWrap.style.border = '2.5px solid #3ba3ff00';
        //             OnlinePlayer2NameWrap.style.border = '2.5px solid #3ba3ff';
        //             Online_GameLocked = false;
        //         }else{
        //             OnlineCurrentPlayerTurn = 1;
        //             OnlinePlayer1NameWrap.style.border = '2.5px solid #3ba3ff';
        //             OnlinePlayer2NameWrap.style.border = '2.5px solid #3ba3ff00';
        //             Online_GameLocked = false;
        //         }
        //     }
        // }, 350)

}