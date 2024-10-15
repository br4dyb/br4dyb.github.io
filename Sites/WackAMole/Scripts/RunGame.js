// Elements:
const StartGameWrap = document.getElementById('StartGameWrap');
const FullGameArea = document.getElementById('FullGameArea');
const GameArea = document.getElementById('GameArea');
const Strike1Txt = document.getElementById('Strike1Txt');
const Strike2Txt = document.getElementById('Strike2Txt');
const Strike3Txt = document.getElementById('Strike3Txt');
const CapturedCountTxt = document.getElementById('CapturedCountTxt');
const GameVersionTxt = document.getElementById('GameVersionTxt');

// Variables:
let GameVersion = '1.1.3c'
let GameRunning = false;

let SpawnRateTime = 1350; // (ms)
let TimeToCapture = 2300; // (ms)
let StrikeCount = 0; // 3 Max
let AllMoleCount = 1; // All Moles Spawned (total)
let CapturedMoleCount = 0; // Ammount of Moles Captured

// Functions:
let Debug_RunGame = true;

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

    // Spawn Moles:
    SpawnMole();
    
}

// Spawn Mole:
function SpawnMole(){
    // Check for GameEnded:
    if(GameRunning){
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
        if(SpawnRateTime > 400){
            SpawnRateTime -= 10;
        }else{ SpawnRateTime = 400}

        // Decrease Capture Time:
        if(TimeToCapture > 1300){
            TimeToCapture -= 10;
        }else{ TimeToCapture = 400}

        // Schedule Next Spawn:
        setTimeout(() => SpawnMole(), SpawnRateTime);
        AllMoleCount += 1;
    }
    
}

// Check for Mole Capture:
function CheckForCapture(MoleInQuestion){
    if(GameRunning){
        if(MoleInQuestion.classList.contains('Captured')){
            // Mole was Captured!
            if(Debug_RunGame){console.info(`${MoleInQuestion.id} was Captured!!`)};
            MoleInQuestion.remove();
        } else{
            if(Debug_RunGame){console.warn(`${MoleInQuestion.id} was NOT Captured!!`)}
            MoleInQuestion.classList.add('Escaped');
            MoleInQuestion.style.animation = "MoleEscape 1.3s cubic-bezier(0.42, 0, 0.58, 1) 0s 1 forwards";
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
                GameRunning = false;
                setTimeout(() => {alert('Game has Ended! Too many moles escaped. . .')}, 750)
            }
        }
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
    if(!elm.classList.contains('Escaped')){
        elm.classList.add('Clicking');
        elm.classList.add('Captured');
        CapturedMoleCount += 1;
        CapturedCountTxt.innerText = `Moles Captured: ${CapturedMoleCount}`;
    
        // Remove the swinging class after a short delay (to simulate swing)
        setTimeout(function() {
            elm.classList.remove('Clicking');
            elm.style.animation = "MoleHit .3s cubic-bezier(0.42, 0, 0.58, 1) 0s 1 forwards";
        }, 200); // Adjust delay a
    }
    
}

// Update Version in Nav:
GameVersionTxt.innerText = `Version: ${GameVersion}`