// Elements:
const fullBodyWrap = document.getElementById('fullBodyWrap');
const header = document.getElementById('header');
const fullGameWrap = document.getElementById('fullGameWrap');
const playerBird = document.getElementById('playerBird');


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
        }, 250);
    }, 350)


}

function BirdJump(){
    let currentBirdHeight = getComputedStyle(playerBird).y
    let newBirdHeight = Number(currentBirdHeight.replace(' px', '').trim()) + 25;

}
