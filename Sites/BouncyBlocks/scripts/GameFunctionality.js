let FullGameStartOptionsWrap = document.getElementById('StartGameWrap');
let FullGameplayArea = document.getElementById('FullGameplayArea')
let SiteHeader = document.querySelector('header');

let GameStartedAlert = false; // For DeBugging :)

// Game Options - Constant:
let PlayerBirdSize = 50;

let ObsticleColor = '#000000';
let ObsticleFlyGap = (PlayerBirdSize + 15);
let ObsticleBetweenGap = 150;



function StartGame() {
    // Get Selected Game Option Variables:
    let SelectedDificulty = document.getElementById('DificultySelectedLabel').innerText;
    let SelectedPlrColor = document.getElementById('PlrColorSelector').value;
    
    // Hide Header and GameStart Area:
    SiteHeader.style.animation = 'hide-header 1s forwards ease-in-out';
    FullGameStartOptionsWrap.style.animation = 'opacity-out .5s forwards ease-in-out';

    // Show Full Game Area:
    FullGameplayArea.style.display = 'unset';
    FullGameplayArea.style.animation = 'opacity-out 1.5s alternate-reverse both ease-in-out';

    // Debug Alert:
    if(GameStartedAlert) {
        alert(`Game Started!:
            Dificulty: ${SelectedDificulty}
            Player Color: ${SelectedPlrColor}
        `);
    }

    // GameArea Heights:
    let FullGameAreaHeight = getComputedStyle(FullGameplayArea).height
    let HalfGameAreaHeight = (FullGameAreaHeight.replace('px','')/2);
    
    // Create Player Bird:
    let PlayerBird = document.createElement('canvas')
    PlayerBird.style.width = `${PlayerBirdSize +'px'}`;
    PlayerBird.style.height = `${PlayerBirdSize +'px'}`;
    PlayerBird.style.background = SelectedPlrColor;
    PlayerBird.style.borderRadius = '100%';
    PlayerBird.style.position = 'relative';
    PlayerBird.style.top = (HalfGameAreaHeight + 'px');
    PlayerBird.style.left = '20px';
        FullGameplayArea.appendChild(PlayerBird)



} // <-- End StartGame Function

// Jump Events: - Not Working?
    document.getElementById('FullGameplayArea').addEventListener('click', PlayerJump(this));

    function PlayerJump(e) {
        console.log('Bird Jump!');
}

// Script Load Msg:
// console.log(`[GameFunctionality] | Scripted Loaded In!`);
