// Elements:
const GameArea = document.getElementById('GameArea');
const Strike1Txt = document.getElementById('Strike1Txt');
const Strike2Txt = document.getElementById('Strike2Txt');
const Strike3Txt = document.getElementById('Strike3Txt');
const InterMoleCole = '<img class="Mole" onclick="MoleSwing(this)" src="./Images/Mole.png" draggable="false">';

// Variables:
let GameRunning = false;
let StrikeCount = 0;

// Functions:
let Debug_GameRun = true;

function StartGame(){
    // Get Random Mole Placement:
    let TopPos = Math.floor((Math.random()*84));
    let RightPos = Math.floor((Math.random()*86));

    if(Debug_GameRun){console.info(
        `Random Mole Placement:
        TopPos: ${TopPos}
        RightPos: ${RightPos}`)
    }

    // Spawn Mole:
    let NewMole = document.createElement('img');
    NewMole.classList.add('Mole')
    NewMole.src = './Images/Mole.png';
    NewMole.draggable = false;
    NewMole.style.top = TopPos+'%';
    NewMole.style.right = RightPos+'%';
    NewMole.style.opacity = 0.95;
    // NewMole.addEventListener('click', MoleSwing(this)); << Move this function to this file!
    GameArea.appendChild(NewMole)

}