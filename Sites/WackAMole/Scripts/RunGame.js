// Elements:
const StartGameWrap = document.getElementById('StartGameWrap');
const FullGameArea = document.getElementById('FullGameArea');
const GameArea = document.getElementById('GameArea');
const Strike1Txt = document.getElementById('Strike1Txt');
const Strike2Txt = document.getElementById('Strike2Txt');
const Strike3Txt = document.getElementById('Strike3Txt');
const CapturedCountTxt = document.getElementById('CapturedCountTxt');
const FullGameOverWrap = document.getElementById('FullGameOverWrap');
const GameOverCapturedTxt = document.getElementById('GameOverCapturedTxt');
const GameOverBestScoreTxt = document.getElementById('GameOverBestScoreTxt');
const NewBestScoreAlert = document.getElementById('NewBestScoreAlert')

// Variables:
let GameRunning = false;
let GamePaused = false;

let SpawnRateTime = 1350; // (ms)
let TimeToCapture = 2300; // (ms)
let StrikeCount = 0; // 3 Max
let AllMoleCount = 1; // All Moles Spawned (total)
let CapturedMoleCount = 0; // Ammount of Moles Captured

// Functions:
let Debug_RunGame = false;

// Show Game Area & RunGame():
function StartGame(){
    // Hide StartGameWrap:
    StartGameWrap.style.opacity = 0;
    FullGameArea.style.display = 'flex';
    // Wait for Animation:
    setTimeout(() => {
        StartGameWrap.style.display = 'none';
        FullGameArea.style.opacity = 1;
        GameRunning = true;

        // Wait for Animation & RunGame():
        setTimeout(() => {
            RunGame();
        }, 650)   

    }, 550)
}

// Begin Game Process:
function RunGame(){

    // Show Pause Button:
    MenuButton.innerText = "pause_circle";

    // Spawn Moles:
    SpawnMole();
    
}

// Spawn Mole:
function SpawnMole(){
    // Check for GameEnded:
    if(GameRunning && !GamePaused){
        let NewMole = document.createElement('img');
        // Get Random Mole Placement:
        let TopPos = Math.floor((Math.random()*84));
        let RightPos = Math.floor((Math.random()*86));
        NewMole.classList.add('Mole')
        NewMole.id = `Mole_${AllMoleCount}`
        NewMole.src = './Images/Mole.png';
        NewMole.draggable = false;
        NewMole.style.top = TopPos+'%';
        NewMole.style.right = RightPos+'%';
        NewMole.style.opacity = 0;
        GameArea.appendChild(NewMole)
        NewMole.addEventListener('click', () => MoleSwing(NewMole));
    
        // Animate In:
        setTimeout(() => { NewMole.style.opacity = 0.95}, 50)

        // Set Capture Timer:
        setTimeout(() => CheckForCapture(NewMole), TimeToCapture);
        
        // Decrease Spawn Wait:
        if(SpawnRateTime > 400 && !GamePaused){
            SpawnRateTime -= 10;
        }else{ SpawnRateTime = 400}

        // Decrease Capture Time:
        if(TimeToCapture > 1300 && !GamePaused){
            TimeToCapture -= 10;
        }else{ TimeToCapture = 400}

        // Schedule Next Spawn:
        setTimeout(() => SpawnMole(), SpawnRateTime);
        AllMoleCount += 1;
    }
    
    if(GamePaused){
        if(Debug_RunGame){console.warn('Game is PAUSED!');};
        // Keep Checking for GamePaused:
        setTimeout(() => SpawnMole(), 1000);
    }

}

// Check for Mole Capture:
function CheckForCapture(MoleInQuestion){
    if(GameRunning && !GamePaused){
        if(MoleInQuestion.classList.contains('Captured')){
            // Mole was Captured!
            if(Debug_RunGame){console.info(`${MoleInQuestion.id} was Captured!!`)};
            MoleInQuestion.remove();
        } else{
            // Mole has Escaped!
            if(Debug_RunGame){console.warn(`${MoleInQuestion.id} was NOT Captured!!`)}
            MoleInQuestion.classList.add('Escaped');
            MoleInQuestion.style.zIndex = 2;
            MoleInQuestion.style.animation = "MoleEscape .4s cubic-bezier(0.42, 0, 0.58, 1)forwards";
            StrikeCount += 1;
            if(StrikeCount == 1){
                Strike1Txt.style.color = "red";
                Strike1Txt.style.opacity = 1;
                Strike1Txt.style.scale = 1.2;
            }
            if(StrikeCount == 2){
                Strike2Txt.style.color = "red";
                Strike2Txt.style.opacity = 1;
                Strike2Txt.style.scale = 1.2;
            }
            if(StrikeCount == 3){
                Strike3Txt.style.color = "red";
                Strike3Txt.style.opacity = 1;
                Strike3Txt.style.scale = 1.2;
                // GAME OVER!
                EndGame()
                
            }
        }
    }

    if(GamePaused){
        // MoleInQuestion.style.animation = "MoleEscape .4s cubic-bezier(0.42, 0, 0.58, 1)forwards";
        MoleInQuestion.style.opacity = 0;
        setTimeout(() => {MoleInQuestion.remove();}, 450);
    }
    
}

// Background & Mole Hit:
const GrassBackground = document.getElementById('GrassBackground');
GrassBackground.addEventListener('mousedown', function() {
    // Add the swinging class on mouse down (click)
    GrassBackground.classList.add('Clicking');
  
    // Remove the swinging class after a short delay (to simulate swing)
    setTimeout(function() {
        GrassBackground.classList.remove('Clicking');
    }, 200); // Adjust delay as needed to match the swing effect
  });

function MoleSwing(elm){
    if(!elm.classList.contains('Escaped') && !elm.classList.contains('Captured') && GameRunning){
        elm.classList.add('Clicking');
        elm.classList.add('Captured');
        elm.style.zIndex = 2;
        CapturedMoleCount += 1;
        CapturedCountTxt.innerText = `Moles Captured: ${CapturedMoleCount}`;
    
        // Remove the swinging class after a short delay (to simulate swing)
        setTimeout(function() {
            elm.classList.remove('Clicking');
            elm.style.animation = "MoleHit .3s cubic-bezier(0.42, 0, 0.58, 1) 0s 1 forwards";
        }, 200); // Adjust delay a
    }
    
}

// End Game:
function EndGame(){
    GameRunning = false;
    MenuButton.innerText = "Menu";

    // Show Captured in this game:
    GameOverCapturedTxt.innerText = `Moles Captured: ${CapturedMoleCount}`;

    // Get Best Score:
    let BestScore = localStorage.getItem('BestScore');
    if (BestScore === null) {
        // No BestScore yet, so set it
        localStorage.setItem('BestScore', CapturedMoleCount);
        GameOverBestScoreTxt.innerText = `Best Score: ${CapturedMoleCount}`;
    } else {
        // Best Score Exists:
        BestScore = Number(BestScore);
        if (BestScore < CapturedMoleCount) {
            // New best score!:
            localStorage.setItem('BestScore', CapturedMoleCount);
            GameOverBestScoreTxt.innerText = `Best Score: ${CapturedMoleCount}`;
            NewBestScoreAlert.style.display = 'flex';
        } else{
            // Didn't beat best score:
            NewBestScoreAlert.style.display = 'none';
            GameOverBestScoreTxt.innerText = `Best Score: ${BestScore}`;
        }
    }

    // Show Game Over Wrap:
    FullGameOverWrap.style.display = 'flex';
    setTimeout(() => {
        FullGameOverWrap.style.opacity = 1;
        FullGameArea.style.opacity = 0;
    }, 350)
}

// Restart Game:
function RestartGame(){
    SpawnRateTime = 1350; // (ms)
    TimeToCapture = 2300; // (ms)
    StrikeCount = 0; // 3 Max
    AllMoleCount = 1; // All Moles Spawned (total)
    CapturedMoleCount = 0; // Ammount of Moles Captured

    // Clear Any Leftover Moles:
    let LeftoverMoles = FullGameArea.querySelectorAll('.Mole');
    LeftoverMoles.forEach(element => {
        element.remove();
    });

    Strike1Txt.style.color = "white";
    Strike1Txt.style.opacity = .5;
    Strike1Txt.style.scale = 1;
    Strike2Txt.style.color = "white";
    Strike2Txt.style.opacity = .5;
    Strike2Txt.style.scale = 1;
    Strike3Txt.style.color = "white";
    Strike3Txt.style.opacity = .5;
    Strike3Txt.style.scale = 1;

    CapturedCountTxt.innerText = `Moles Captured: 0`;

    GamePaused = false;
    GameEnded = false;
    GameRunning = true;

    // Hide GameOver Wrap and Show Game:
    FullGameOverWrap.style.opacity = 0;
    FullGameArea.style.display = 'flex';
    setTimeout(() => {
        FullGameOverWrap.style.display = 'none';
        FullGameArea.style.opacity = 1;
        MenuButton.innerText = 'pause_circle';
        // Spawn Mole:
        setTimeout(() => {
            SpawnMole();
        }, 1000);
    }, 365);
}