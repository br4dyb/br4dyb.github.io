// Elements:
const fullBodyWrap = document.getElementById('fullBodyWrap');
const header = document.getElementById('header');
const fullGameWrap = document.getElementById('fullGameWrap');
let playerBird = document.getElementById('playerBird');

// Variables:

let birdJumpPower = 40;
let gravityPullPower = 35;
let birdJumping = false;


function StartGame(){
    // Show Game:
    header.style.top = '-20%';
    fullBodyWrap.style.opacity = 0;
    fullGameWrap.style.opacity = 0;
    setTimeout(() => {
        fullBodyWrap.classList.add('hidden');
        fullGameWrap.classList.remove('hidden');
        setTimeout(() => {
            fullGameWrap.style.opacity = 1;

            setTimeout(() => {StartGameLoop()}, 500)

        }, 250);
    }, 350)


}

function StartGameLoop(){
    setInterval(() => {ApplyGravity()}, 350)
}

function BirdJump(){
    if(!birdJumping){
        birdJumping = true;
        let currentBirdHeight = parseInt(getComputedStyle(playerBird).bottom);
        let newBirdHeight = (currentBirdHeight + birdJumpPower);

        // Check for Sky Hit:
        if(parseInt(getComputedStyle(playerBird).top) > birdJumpPower){
            playerBird.style.bottom = newBirdHeight + 'px';
        }else{
            playerBird.style.top ='5 px';
        }

        setTimeout(() => {birdJumping = false;}, 300);
    }

    if(birdJumping){
        playerBird.style.color = 'yellow';
    }
}

function ApplyGravity(){

    if(!birdJumping){
        let currentBirdHeight = parseInt(getComputedStyle(playerBird).bottom);
        let newBirdHeight = (currentBirdHeight - gravityPullPower);

        // Pull bird down:
        if(parseInt(getComputedStyle(playerBird).bottom) > gravityPullPower){
            playerBird.style.bottom = newBirdHeight + 'px';
        } 
        
        // Hit the ground:
        if(parseInt(getComputedStyle(playerBird).bottom) <= gravityPullPower){
            playerBird.style.bottom = '5px';
            playerBird.style.background = 'red';
        }
    }

    
}
