//Variables:
const OnlinePlayer1ScoreText = document.getElementById('OnlinePlayer1Score');
const OnlinePlayer2ScoreText = document.getElementById('OnlinePlayer2Score');
const OnlinePlayer1NameWrap = document.getElementById('GameInfoHeaderOnlinePlayer1Wrap');
const OnlinePlayer2NameWrap = document.getElementById('GameInfoHeaderOnlinePlayer2Wrap');
const OnlineMultiPlayerMsgText = document.getElementById('OnlineMultiPlayerMsgText');
const OnlineMultiPlayerGameStatusWrap = document.getElementById('OnlineGameStatusUpdateWrap');
const OpponentLeftGameMsgWrap = document.getElementById('OpponentLeftGameMsgWrap');
const RestartGameQuestionWrap = document.getElementById('RestartGameQuestionWrap');
const OnlineGameAgainVoteYes = document.getElementById('OnlineGameAgainVoteYes');
const OnlineGameAgainVoteNo = document.getElementById('OnlineGameAgainVoteNo');
const OnlinePlayAgainVoteTimeText = document.getElementById('OnlinePlayAgainVoteTimeText');
const OtherPlrVoteIcon = document.getElementById('OnlineOpponentPlayAgainVoteIcon');
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
let ThisClientPlayerNumber = 0; // <-- This player's number
let ThisClientName = 'Null'; // <-- This player's name
let ThisClientAlreadyVoted = false; // <-- This player's vote status for next game
let OnlineCurrentPlayerTurn = 1; // <-- Current player for next game move
let OnlinePlr1_CellsCollected = [];
let OnlinePlr2_CellsCollected = [];
let OnlinePlr1_Score = 0;
let OnlinePlr2_Score = 0;
let OnlinePlr1_Name = 0;
let OnlinePlr2_Name = 0;
let TimeForVoting = 32; //(s) -- add extra second(s) for timeouts
let OnlinePlr1_PlayAgainVote = null;
let OnlinePlr2_PlayAgainVote = null;
const OnlinePlr1Color = '#3191e5';
const OnlinePlr2Color = '#a73acc';
// Already Defined:
    // RedCellColor = '#E45858';
    // YellowCellColor = '#CDD034';
    // GreenCellColor = '#62BD67';
let Online_GameEnded = false;
let Online_GameLocked = true; // <-- Start Locked (only unlock for this clients turn)
let GameEndedDisplayed = false;

// Debugging:
let DebugGeneral = false;
let DebugFirebase = false;

// Add Player 1's Turn Style to Start: (first game only)
OnlinePlayer1NameWrap.style.border = '2.5px solid #3ba3ff';
OnlinePlayer2NameWrap.style.border = '2.5px solid #3ba3ff00';

// Add Document Visibility Listener [NOT COMPLETED! / BEING USED]:
document.onvisibilitychange = () => {

    if (document.visibilityState === 'hidden'){
        // console.info('Page Hidden!');

        // Wait for 30 secs to see if player has left the game, if returned cancel the game end
        // or else: end game if player does not return
    } else 
    if (document.visibilityState === 'visible'){
        // console.info('Page Shown!');

        // Cancel the "end game timer here"
    }
}

// Initialize OnlineMultiplayer (define variables / unlock for Player 1):
let ThisGameData; // <-- Most Recent Game Data Snapshot
function InitializeOnlineMultiplayer(PlayerNumber, PlayerName){
    ThisClientPlayerNumber = PlayerNumber;
    ThisClientName = PlayerName;
    

    //Add Listener to Database:
    db.collection('TicTacToeGames').doc('AllGames').collection('StartedGames').doc(NewGameID)
    .onSnapshot((doc) => {

        if(DebugFirebase) {console.info('Game Data Chnage Detected!');}

        ThisGameData = doc.data();

        // Assign Plr Name Variables:
        if(ThisGameData.Players.Player1.Name != "TBD"){
            OnlinePlr1_Name = ThisGameData.Players.Player1.Name;
        }
        if(ThisGameData.Players.Player2.Name != "TBD"){
            OnlinePlr2_Name = ThisGameData.Players.Player2.Name;
        }

        // Show Last Game Play & Switch Current Player Turn:
        if(OnlineCurrentPlayerTurn === 1 & ThisGameData.Players.Player1.LastCellSelected != 0){
            
            let Player1sLastCell = document.getElementById(`OnlineMultiPlayerTblCell_${ThisGameData.Players.Player1.LastCellSelected}`);
            if(Player1sLastCell != null){
                Player1sLastCell.classList.add('CellTaken');
                Player1sLastCell.style.background = OnlinePlr1Color;
                Player1sLastCell.innerText = 'X';

                // Remove from Available Cells: (to later detect draw)
                let CellNumber = Player1sLastCell.id.charAt(25);
                let AvaialableCellIndex = OnlineMultiGame_AvailableCells.lastIndexOf(Number(CellNumber));
                OnlineMultiGame_AvailableCells.splice(AvaialableCellIndex, 1);

                // Double Check all Cells are Assigned:
                ThisGameData.Players.Player1.PlayerCellsCollected.forEach((cellCollectedNumber) =>{
                    let PlayerCell = document.getElementById(`OnlineMultiPlayerTblCell_${cellCollectedNumber}`);
                    PlayerCell.classList.add('CellTaken');
                    //PlayerCell.style.background = OnlinePlr1Color;
                    PlayerCell.innerText = 'X';
                    // Remove from Available Cells if Found:
                    let AvaialableCellIndex = OnlineMultiGame_AvailableCells.lastIndexOf(Number(cellCollectedNumber));
                    if(AvaialableCellIndex != -1){
                        OnlineMultiGame_AvailableCells.splice(AvaialableCellIndex, 1);
                    }
                    
                })

                // Reset Cell Background:
                setTimeout(() => {
                    if(!Online_GameEnded){
                        Player1sLastCell.style.background = 'unset';
                        OnlineCurrentPlayerTurn = ThisGameData.CurrentPlayersTurn;
                        OnlinePlayer1NameWrap.style.border = '2.5px solid #3ba3ff00';
                        OnlinePlayer2NameWrap.style.border = '2.5px solid #3ba3ff';
                        //Unlock for Next Player (client side):
                        if(!Online_GameEnded && ThisClientPlayerNumber === OnlineCurrentPlayerTurn){Online_GameLocked = false}
                    }
                }, (850))
            } else {
                // No Cell Last Selected but Need Next Player?:
                OnlineCurrentPlayerTurn = ThisGameData.CurrentPlayersTurn;
                        //Unlock for Next Player (client side):
                        if(ThisClientPlayerNumber === OnlineCurrentPlayerTurn){Online_GameLocked = false}
            }
        } else{
            if(OnlineCurrentPlayerTurn === 2 && ThisGameData.Players.Player2.LastCellSelected != 0){
                let Player2sLastCell = document.getElementById(`OnlineMultiPlayerTblCell_${ThisGameData.Players.Player2.LastCellSelected}`);
                if(Player2sLastCell != null){
                    Player2sLastCell.classList.add('CellTaken');
                    Player2sLastCell.style.background = OnlinePlr2Color;
                    Player2sLastCell.innerText = 'O';
    
                    // Remove from Available Cells: (to later detect draw)
                    const CellNumber = Player2sLastCell.id.charAt(25);
                    const AvaialableCellIndex = OnlineMultiGame_AvailableCells.lastIndexOf(Number(CellNumber));
                    OnlineMultiGame_AvailableCells.splice(AvaialableCellIndex, 1);

                    // Double Check all Cells are Assigned:
                    ThisGameData.Players.Player1.PlayerCellsCollected.forEach((cellCollectedNumber) =>{
                        let PlayerCell = document.getElementById(`OnlineMultiPlayerTblCell_${cellCollectedNumber}`);
                        PlayerCell.classList.add('CellTaken');
                        //PlayerCell.style.background = OnlinePlr1Color;
                        PlayerCell.innerText = 'X';
                        // Remove from Available Cells if Found:
                        let AvaialableCellIndex = OnlineMultiGame_AvailableCells.lastIndexOf(Number(cellCollectedNumber));
                        if(AvaialableCellIndex != -1){
                            OnlineMultiGame_AvailableCells.splice(AvaialableCellIndex, 1);
                        }
                    
                    })
    
                    // Reset Cell Background:
                    setTimeout(() => {
                        if(!Online_GameEnded){
                            Player2sLastCell.style.background = 'unset';
                            OnlineCurrentPlayerTurn = ThisGameData.CurrentPlayersTurn;
                            OnlinePlayer1NameWrap.style.border = '2.5px solid #3ba3ff';
                            OnlinePlayer2NameWrap.style.border = '2.5px solid #3ba3ff00';
                            //Unlock for Next Player (client side):
                            if(!Online_GameEnded && ThisClientPlayerNumber === OnlineCurrentPlayerTurn){Online_GameLocked = false}
                        }
                    }, (850))
                } else {
                    // No Cell Last Selected but Need Next Player?:
                    OnlineCurrentPlayerTurn = ThisGameData.CurrentPlayersTurn;
                            //Unlock for Next Player (client side):
                            if(ThisClientPlayerNumber === OnlineCurrentPlayerTurn){Online_GameLocked = false}
                }
            }
        }

        // Update Each Player's Cells Collected:
        OnlinePlr1_CellsCollected = ThisGameData.Players.Player1.PlayerCellsCollected;
        if(OnlinePlr1_CellsCollected != null){
            // Cells Found in Array:
        }else{
            // No Cells Yet / Redefine as Array (prevent type error):
            OnlinePlr1_CellsCollected = [];
        }
       
        OnlinePlr2_CellsCollected = ThisGameData.Players.Player2.PlayerCellsCollected;
        if(OnlinePlr2_CellsCollected != null){
            // Cells Found in Array:

        }else{
            // No Cells Yet / Redefine as Array (prevent type error):
            OnlinePlr2_CellsCollected = [];
        }

        // Check Win:
        if(!Online_GameEnded){
            OnlineMultiPlayerCheckWinner();
        }

        // Check for Play Again Votes:
        let OnlinePlr1PlayAgainVote = ThisGameData.Players.Player1.PlayAgainVote;
        let OnlinePlr2PlayAgainVote = ThisGameData.Players.Player2.PlayAgainVote;

        if(ThisClientPlayerNumber === 1){

            if(OnlinePlr2PlayAgainVote == true){
                OtherPlrVoteIcon.innerText = 'check_circle';
                OtherPlrVoteIcon.style.color = '#41d261';
                OnlinePlr2_PlayAgainVote = true;
            }

            if(OnlinePlr2PlayAgainVote == false){
                OtherPlrVoteIcon.innerText = 'cancel';
                OtherPlrVoteIcon.style.color = '#ed7666';
                OnlinePlr2_PlayAgainVote = false;
            }

            if(OnlinePlr2PlayAgainVote == null){
                OtherPlrVoteIcon.innerText = 'circle';
                OtherPlrVoteIcon.style.color = 'white';
                OnlinePlr2_PlayAgainVote = null;
            }
        }

        if(ThisClientPlayerNumber === 2){

            if(OnlinePlr1PlayAgainVote == true){
                OtherPlrVoteIcon.innerText = 'check_circle';
                OtherPlrVoteIcon.style.color = '#41d261';
                OnlinePlr1_PlayAgainVote = true;
            }

            if(OnlinePlr1PlayAgainVote == false){
                OtherPlrVoteIcon.innerText = 'cancel';
                OtherPlrVoteIcon.style.color = '#ed7666';
                OnlinePlr1_PlayAgainVote = false;
            }

            if(OnlinePlr1PlayAgainVote == null){
                OtherPlrVoteIcon.innerText = 'circle';
                OtherPlrVoteIcon.style.color = 'white';
                OnlinePlr1_PlayAgainVote = null;
            }
        }
        
        // Check for Game Canceled:
        if(ThisGameData.GameCanceled === true && !GameEndedDisplayed){
            console.info('This game has been canceled!')
            GameEndedDisplayed = true;

            // Show Notification Wrap:
            OnlineMultiPlayerGameStatusWrap.style.display = 'flex';
            RestartGameQuestionWrap.style.display = 'none';
            OpponentLeftGameMsgWrap.style.display = 'flex';
            // OnlineMultiPlayerGameStatusWrap.classList.add('HiddenOpacity');

            setTimeout(() => {
                OnlineMultiPlayerGameStatusWrap.classList.remove('HiddenOpacity'); 
                OnlineMultiPlayerGameStatusWrap.classList.add('ShownOpacity');
            }, 650)
        }

        // End Voting Early if Both Players Voted Yes:
        if(Online_GameEnded && OnlinePlr1PlayAgainVote && OnlinePlr2PlayAgainVote){
            if(DebugGeneral){console.info('[Voting Ended]: Both Players Voted to Keep Playing!')};

            // Stop Countdown:
            clearInterval(WaitForVotesInterval);
            // Check Votes:
            CheckFinalVotes();
        }
    });
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


// Select Cell Function:
function OnlineMultiPlayerSelectCell(Cell) {
    // Check if Cell is Available & Game is still going/unlocked:
    if(!Online_GameEnded && !Online_GameLocked && ThisClientPlayerNumber === OnlineCurrentPlayerTurn){
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
                    LastMoveTime : new Date()
                }).then(() => {
                    if(DebugFirebase) {console.info('Player Pieces Updated in Database!');}
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
                    LastMoveTime : new Date()
                }).then(() => {
                    if(DebugFirebase) {console.info('Player Pieces Updated in Database!');}
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

// Check for Win Function:
function OnlineMultiPlayerCheckWinner(){

    // Check for Winning Combinations:
    WinningCombinations.forEach(WinningCombination => {
        // Check for Player 1 Win:
        if(WinningCombination.every(Cell => OnlinePlr1_CellsCollected.includes(String(Cell)))){
                //console.info('Player 1 has won!');
                OnlineShowGameMsg(`${OnlinePlr1_Name} has Won!`, GreenCellColor, 1750);
            OnlinePlr1_Score += 1;
            OnlinePlayer1ScoreText.innerText = OnlinePlr1_Score;
            Online_GameEnded = true;
            Online_GameLocked = true;
            WinningCombination.forEach(WinningCellNumber => {
                let CellToStyle = document.getElementById(`OnlineMultiPlayerTblCell_${WinningCellNumber}`);
                // CellToStyle.style.background = GreenCellColor;
                CellToStyle.classList.add('WinningCell');
            });
            OnlinePlayer1NameWrap.style.border = `2px solid ${GreenCellColor}`;

            // Reset Game:
            setTimeout(() => {
                OnlineMultiPlayerGameEnd()
            }, 2000)
            
        }

        // Check for Player 2 Win:
        if(WinningCombination.every(Cell => OnlinePlr2_CellsCollected.includes(String(Cell)))){
                //console.info('Player 2 has won!');
                OnlineShowGameMsg(`${OnlinePlr2_Name} has Won!`, GreenCellColor, 1750);
            OnlinePlr2_Score += 1;
            OnlinePlayer2ScoreText.innerText = OnlinePlr2_Score;
            Online_GameEnded = true;
            Online_GameLocked = true;
            WinningCombination.forEach(WinningCellNumber => {
                let CellToStyle = document.getElementById(`OnlineMultiPlayerTblCell_${WinningCellNumber}`);
                // CellToStyle.style.background = GreenCellColor;
                CellToStyle.classList.add('WinningCell');
            });
            OnlinePlayer2NameWrap.style.border = `2px solid ${GreenCellColor}`;

            // Reset Game:
            setTimeout(() => {
                OnlineMultiPlayerGameEnd()
            }, 2000)

        }

    });

    // If Draw Game / No Cells Left:
    if(OnlineMultiGame_AvailableCells.length === 0){
        //console.info('No Player Won! / Draw');
        OnlineShowGameMsg('Game was a Draw!', YellowCellColor, 1750);
        Online_GameEnded = true;
        Online_GameLocked = true;
        
        // Reset Game:
        setTimeout(() => {
            OnlineMultiPlayerGameEnd()
        }, 2000)
    }

}

// Current Game End Function:
function OnlineMultiPlayerGameEnd(){
    // Reset Vars:
    OnlinePlr1_CellsCollected = [];
    OnlinePlr2_CellsCollected = [];
    OnlineMultiGame_AvailableCells = [1,2,3,4,5,6,7,8,9]
    Player1Vote = false;
    Player2Vote = false;
    ThisClientAlreadyVoted = false;
    OnlinePlayAgainVoteTimeText.innerText = `Time Left: 30(s)`
    OnlineGameAgainVoteYes.classList.add('OnlineGameAgainVoteYes');
    OnlineGameAgainVoteNo.classList.add('OnlineGameAgainVoteNo');
    OnlineGameAgainVoteYes.style.padding = '';
    OnlineGameAgainVoteYes.style.opacity = '';
    OnlineGameAgainVoteYes.style.scale = '';
    OnlineGameAgainVoteYes.style.background = '';
    OnlineGameAgainVoteNo.style.padding = '';
    OnlineGameAgainVoteNo.style.opacity = '';
    OnlineGameAgainVoteNo.style.scale = '';
    OnlineGameAgainVoteNo.style.background = '';


    let NextPlayerStartFirst;
    if(OnlinePlr1_StartedFirst){
        NextPlayerStartFirst = 2;
        OnlinePlr1_StartedFirst = false;
    }else{
        NextPlayerStartFirst = 1;
        OnlinePlr1_StartedFirst = true;
    }

    // Get Voting Times:
    let CurrentTime = new Date();
    let EndVoteTimeUTC = new Date(CurrentTime.getTime() + TimeForVoting * 1000)
    console.log('Current Time: ', CurrentTime.toUTCString());
    console.log('End Vote Time: ', EndVoteTimeUTC.toUTCString());

    // Update Database:
    db.collection('TicTacToeGames').doc('AllGames').collection('StartedGames').doc(NewGameID).update({
        'Players.Player1.PlayerCellsCollected' : [],
        'Players.Player1.PlayAgainVote' : false,
        'Players.Player1.LastCellSelected' : 0,
        'Players.Player2.PlayerCellsCollected' : [],
        'Players.Player2.PlayAgainVote' : false,
        'Players.Player2.LastCellSelected' : 0,
        'CurrentPlayersTurn' : NextPlayerStartFirst,
        'EndVoteTime' : EndVoteTimeUTC
    }).then(() => {
        if(DebugFirebase) {console.log('Reset Database for Next Game!');}
    }).catch((error) => {
        console.warn('Error for Reset Database for Next Game!');
        console.log(error);
    })

    // Start Vote Timer:
    setTimeout(() => { WaitForVotesTimer() }, 1000)
    

    // Show Continue Playing Decision:
    setTimeout(() => {

        // Clear Game Table:
        AllOnlineMultiPlayerTblCells.forEach((cell) => {
            cell.innerText = '';
            cell.classList.remove('CellTaken');
            cell.classList.remove('WinningCell');
            cell.classList.add('GameTblCell');
            cell.style.background = '';
        })


        // Show Question Wrap:
        OnlineMultiPlayerGameStatusWrap.style.display = 'flex';
        RestartGameQuestionWrap.style.display = 'flex';
        OpponentLeftGameMsgWrap.style.display = 'none';
        OnlineMultiPlayerGameStatusWrap.classList.add('HiddenOpacity');

        setTimeout(() => {
            OnlineMultiPlayerGameStatusWrap.classList.remove('HiddenOpacity'); 
            OnlineMultiPlayerGameStatusWrap.classList.add('ShownOpacity');
        }, 650)

    }, 500);
}

// Vote to Play Again Function:
function OnlinePlayAgainVoteYes(){

    if(ThisClientPlayerNumber === 1 && !ThisClientAlreadyVoted){
        db.collection('TicTacToeGames').doc('AllGames').collection('StartedGames').doc(NewGameID).update({
            'Players.Player1.PlayAgainVote' : true,
            'Players.Player1.Score' : OnlinePlr1_Score
        }).then(() => {
            if(DebugGeneral) {console.log('Player 1 Voted to Play Again!');}
            ThisClientAlreadyVoted = true;
        }).catch((error) => {
            console.warn('Error Occured: Player 1 Vote to Play Again?');
            console.log(error);
            alert(`An Error Occured:
                ${error.code}`);
        })
    }

    if(ThisClientPlayerNumber === 2 && !ThisClientAlreadyVoted){
        db.collection('TicTacToeGames').doc('AllGames').collection('StartedGames').doc(NewGameID).update({
            'Players.Player2.PlayAgainVote' : true,
            'Players.Player2.Score' : OnlinePlr2_Score
        }).then(() => {
            if(DebugGeneral) {console.log('Player 2 Voted to Play Again!');}
            ThisClientAlreadyVoted = true;
        }).catch((error) => {
            console.warn('Error Occured: Player 2 Vote to Play Again?');
            console.log(error);
            alert(`An Error Occured:
                ${error.code}`);
        })
    }

    OnlineGameAgainVoteYes.style.background = '#41d261';
    OnlineGameAgainVoteYes.style.padding = '5px 10px';
    OnlineGameAgainVoteYes.style.opacity = '.5';
    OnlineGameAgainVoteYes.style.scale = '1.1';
    OnlineGameAgainVoteNo.style.opacity = '.5';


    OnlineGameAgainVoteYes.classList.remove('OnlineGameAgainVoteYes');
    OnlineGameAgainVoteNo.classList.remove('OnlineGameAgainVoteNo');
    
}

// Vote to NOT Play Again Function:
function OnlinePlayAgainVoteNo(){
    if(ThisClientPlayerNumber === 1 && !ThisClientAlreadyVoted){
        db.collection('TicTacToeGames').doc('AllGames').collection('StartedGames').doc(NewGameID).update({
            'Players.Player1.PlayAgainVote' : false,
            'Players.Player1.Score' : OnlinePlr1_Score
        }).then(() => {
            if(DebugGeneral) {console.log('Player 1 Voted to NOT Play Again!');}
            ThisClientAlreadyVoted = true;
        }).catch((error) => {
            console.warn('Error Occured: Player 1 Vote to NOT Play Again?');
            console.log(error);
            alert(`An Error Occured:
                ${error.code}`);
        })
    }

    if(ThisClientPlayerNumber === 2 && !ThisClientAlreadyVoted){
        db.collection('TicTacToeGames').doc('AllGames').collection('StartedGames').doc(NewGameID).update({
            'Players.Player2.PlayAgainVote' : false,
            'Players.Player2.Score' : OnlinePlr2_Score
        }).then(() => {
            if(DebugGeneral) {console.log('Player 2 Voted to NOT Play Again!');}
            ThisClientAlreadyVoted = true;
        }).catch((error) => {
            console.warn('Error Occured: Player 2 Vote to NOT Play Again?');
            console.log(error);
            alert(`An Error Occured:
                ${error.code}`);
        })
    }

    OnlineGameAgainVoteNo.style.background = '#ed7666';
    OnlineGameAgainVoteNo.style.padding = '5px 10px';
    OnlineGameAgainVoteNo.style.opacity = '.5';
    OnlineGameAgainVoteNo.style.scale = '1.1';
    OnlineGameAgainVoteYes.style.opacity = '.5';


    OnlineGameAgainVoteYes.classList.remove('OnlineGameAgainVoteYes');
    OnlineGameAgainVoteNo.classList.remove('OnlineGameAgainVoteNo');
}

// Timer for Play Again Vote
function WaitForVotesTimer(){
    // Reset Time Left Color:
    OnlinePlayAgainVoteTimeText.style.color = '#CDD034';

    // Countdown / Check Voting Time:
    WaitForVotesInterval = setInterval(() => {
        
        // Get Available Voting Time:
        let CurrentTime = new Date();
        let VotingEndingTime = ThisGameData.EndVoteTime.toDate();
        let AvaialbleTime = Math.floor(VotingEndingTime - CurrentTime);
        let AvaialbleTimeSecs = Math.floor(AvaialbleTime / 1000);

        let OnlineVotingTime = AvaialbleTimeSecs
        if(DebugGeneral) {console.log(`Time left to Vote: ${OnlineVotingTime}`);};

        // Remove 1s every second:
        if(OnlineVotingTime >> 0){
            // setTimeout(() => {
                OnlinePlayAgainVoteTimeText.innerText = `Time Left: ${OnlineVotingTime}(s)`
                if(OnlineVotingTime < 4){
                    OnlinePlayAgainVoteTimeText.style.color = 'red';
                }
            // }, 1000)
        }

        // End Interval if Out of Time:
        if(OnlineVotingTime <= 0){
            clearInterval(WaitForVotesInterval);
            if(DebugGeneral) {console.log('Voting Time has Ended!');}
            CheckFinalVotes();
        }

    }, (1000));
}

// Check Votes to Restart Game:
function CheckFinalVotes(){
    // Check Final Votes:
    let Player1Vote = ThisGameData.Players.Player1.PlayAgainVote;
    let Player2Vote = ThisGameData.Players.Player2.PlayAgainVote;
    if(DebugGeneral){console.log('Player 1 Vote:', Player1Vote);};
    if(DebugGeneral){console.log('Player 2 Vote:', Player2Vote);};

    if(Player1Vote === false || Player2Vote === false){
        console.warn('Game Canceled!');

        //Update Database:
        db.collection('TicTacToeGames').doc('AllGames').collection('StartedGames').doc(NewGameID).update({
            GameCanceled : true,
            GameEnded : new Date()
        }).then(() => {
            // Success
        }).catch((error) => {
            console.warn('An Error Occured When Canceling the Game!')
            console.log(error)
        })
    }

    // If Playing Again:
    if(Player1Vote === true && Player2Vote === true){
        console.info('Game will Continue!');
        GameEndedDisplayed = false;
        // Hide Voting Wrap:
        OnlineMultiPlayerGameStatusWrap.style.display = 'flex';
        RestartGameQuestionWrap.style.display = 'none';
        OpponentLeftGameMsgWrap.style.display = 'none';

        setTimeout(() => {
            OnlineMultiPlayerGameStatusWrap.classList.remove('ShownOpacity'); 
            OnlineMultiPlayerGameStatusWrap.classList.add('HiddenOpacity');
            setTimeout(() => {

                // Reset Player Votes in Database:
                db.collection('TicTacToeGames').doc('AllGames').collection('StartedGames').doc(NewGameID).update({
                    'Players.Player1.PlayAgainVote' : false,
                    'Players.Player2.PlayAgainVote' : false
                }).then(() => {
                    // Success
                }).catch((error) => {
                    console.warn('An Error Occured When Resseting Player Votes!')
                    console.log(error)
                })

                // Unlock for Client Players Turn:
                Online_GameEnded = false;
                OnlineCurrentPlayerTurn = ThisGameData.CurrentPlayersTurn;
                if(ThisClientPlayerNumber === ThisGameData.CurrentPlayersTurn){
                    Online_GameLocked = false;
                }
                // Fully Hide Voting Wrap:
                OnlineMultiPlayerGameStatusWrap.style.display = 'none';

                // Update Players Turn Style in Scoreboard:
                if(ThisGameData.CurrentPlayersTurn === 1){
                    OnlinePlayer1NameWrap.style.border = '2.5px solid #3ba3ff';
                    OnlinePlayer2NameWrap.style.border = '2.5px solid #3ba3ff00';
                }
                if(ThisGameData.CurrentPlayersTurn === 2){
                    OnlinePlayer1NameWrap.style.border = '2.5px solid #3ba3ff00';
                    OnlinePlayer2NameWrap.style.border = '2.5px solid #3ba3ff';
                }
            }, 650);
            
        }, 650)
    }
}