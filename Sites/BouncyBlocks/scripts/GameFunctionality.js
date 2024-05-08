let FullGameStartOptionsWrap = document.getElementById('StartGameWrap');
let FullGameplayArea = document.getElementById('FullGameplayArea')
let SiteHeader = document.querySelector('header');
let StartGameButton = document.getElementById('StartGameButton')


let GameStartedAlert = false; // For DeBugging :)
let GameStarted = false;
let BirdJumping = false;
let PlayerBird;

let ObsticleCount = 0;
let PlayerScore = 0;

// Game Options - Constant:
let PlayerBirdSize = 50; //(px)
let BirdJumpStrength = 50; //(px)

let ObsticleColor = '#000000';
let ObsticleWidth = '10'; //(vw)
let ObsticleFlyGap = (PlayerBirdSize + 100); //(px)
let ObsticleBetweenGap = 20; //(vw)
let ObsticleMoveSpeed = '15s'; //(seconds)

let GravityTime = 90; //(ms)
let GravityDistanceX = 10;//(px)
let GravityDistanceY = 19;//(px)


// Jump Listeners:
document.addEventListener('DOMContentLoaded', function() {

    //GameArea Click:
        document.getElementById('FullGameplayArea').addEventListener('click', PlayerJump(this));

    //Spacebar Key Press:
    document.addEventListener('keydown', function(event) {
      // Check if the pressed key is the space bar
      if (event.keyCode === 32 || event.key === ' ') {
        PlayerJump('Keypress');
      }

      if (event.keyCode === 13 || event.key === 'Enter') {
        if(GameStarted === false){
            StartGame();
        }
      }

    });
  });


// Gravity/Game Loops:
let gravityInterval;
let ObsticleSpawnLoop;

// Start the game loop when the game starts
function startGameLoop() {
    gravityInterval = setInterval(applyGravity, GravityTime);
    //console.log('Applying Gravity');
}

// Stop the game loop when the game ends
function stopGameLoop() {
    clearInterval(gravityInterval);
    clearInterval(ObsticleSpawnLoop);
}


// Check Collisions:
function checkCollisions() {
    // Get bird position
    let birdRect = PlayerBird.getBoundingClientRect();

    // Get all obstacle wraps
    let obstacleWraps = document.querySelectorAll('.ObsticleWrap');
    let FlyPassAreas = document.querySelectorAll('.FlyPassArea');

    // Check collision with each obstacle
    obstacleWraps.forEach(obstacleWrap => {
        let obstacleWrapRect = obstacleWrap.getBoundingClientRect();

        // Check if the bird overlaps with the obstacle wrap
        if (birdRect.right > obstacleWrapRect.left && 
            birdRect.left < obstacleWrapRect.right &&
            birdRect.bottom > obstacleWrapRect.top &&
            birdRect.top < obstacleWrapRect.bottom) {
            console.warn(`GAME ENDED! | Bird Hit an Obstacle!`);

            stopGameLoop();
            GameStarted = false;
            alert('Game Over!');
            location.reload();
        }

    });

    // Check collision with fly through area
    FlyPassAreas.forEach(FlyArea => {
        let FlyAreaRect = FlyArea.getBoundingClientRect();

        // Check if the bird overlaps with the obstacle wrap
        if (birdRect.right > FlyAreaRect.left && 
            birdRect.left < FlyAreaRect.right &&
            birdRect.bottom > FlyAreaRect.top &&
            birdRect.top < FlyAreaRect.bottom) {

                FlyArea.className = 'PassedFlyArea';
            //console.info(`Score Increased! | Bird flew passed an Obstacle!`);

            PlayerScore = (PlayerScore+1);
            console.info(`Score: `+PlayerScore)
            document.getElementById('ScoreTextDisplay').innerText = PlayerScore
        }

    });
}

// Function to apply gravity to the player bird
function applyGravity() {
    if (GameStarted) {
        let FullGameAreaHeight = getComputedStyle(FullGameplayArea).height
        let CurHeight = parseInt(getComputedStyle(PlayerBird).top);
        let NewHeight = (CurHeight + GravityDistanceY) + 'px';

        // Check for Bird already jumping:
        if(BirdJumping == false){
            PlayerBird.style.top = NewHeight;
            checkCollisions();
        }
       

        // Check for Bird Hit the Ground:
        if(parseInt(NewHeight) >= (parseInt(FullGameAreaHeight)-(PlayerBirdSize-10))) {
            //console.info(`Attempted Height: ${parseInt(NewHeight)}`)
            //console.info(`Full GameArea Height: ${(parseInt(FullGameAreaHeight)-PlayerBirdSize)}`)
            console.warn(`GAME ENDED! | Bird Hit the Ground!`)
            
                //End Game:
                            // ### RE-ENABLE BELOW VVV ###
                stopGameLoop();
                GameStarted = false;
                alert('Game Over!');
                location.reload();

        }

        // Move Bird to Middle:
        
        let CurX = parseInt(getComputedStyle(PlayerBird).left);
        let NewX = (CurX + GravityDistanceX) + 'px';

        if(parseInt(NewX) < (parseInt(getComputedStyle(FullGameplayArea).width)/2) ){
            PlayerBird.style.left = NewX;
        }else{
            //console.info('Bird is already in middle!')
        }

        
    }
}

function CreateObsticleWraps() {
        setTimeout(() => {
            CreateObsticles()


            ObsticleSpawnLoop = setInterval(CreateObsticles, 2500);

        }, 100);
}

function CreateObsticles() {
    ObsticleCount = (ObsticleCount+1);
    //console.log(`Obsticle Count: ` + ObsticleCount)
    let ObsticleWrap = document.createElement('div');
    let ObsticleTop = document.createElement('canvas');
    let ObsticleFlyGapArea = document.createElement('canvas');
    let ObsticleBottom = document.createElement('canvas');
    let FullObsticle = [ObsticleTop, ObsticleFlyGapArea, ObsticleBottom]

    ObsticleTop.className = 'ObsticleWrap';
    ObsticleBottom.className = 'ObsticleWrap';
    ObsticleWrap.style.display = 'flex';
    ObsticleWrap.style.flexDirection = 'column';

    //ObsticleWrap.style.gap = (ObsticleFlyGap + 'px');
    
    ObsticleFlyGapArea.style.height = (ObsticleFlyGap + 'px');
    ObsticleFlyGapArea.style.background = 'none';
    ObsticleFlyGapArea.id = `Obsticle_${ObsticleCount}`
    ObsticleFlyGapArea.className = 'FlyPassArea';

    ObsticleWrap.style.height = 'fit-content';
    ObsticleWrap.style.width = (ObsticleWidth + 'vw');

    ObsticleWrap.style.position = 'absolute';
    ObsticleWrap.style.top = '-10px'
    ObsticleWrap.style.left = '100%'

    ObsticleWrap.style.animation = `move-obsticle forwards ${ObsticleMoveSpeed}`

        FullGameplayArea.appendChild(ObsticleWrap);

        ObsticleTop.style.height = ((Math.random()*60)+'vh')
            ObsticleTop.style.backgroundColor = ObsticleColor;
            ObsticleBottom.style.backgroundColor = ObsticleColor;
        ObsticleBottom.style.height = '200vh';
        ObsticleTop.style.borderRadius = '10px';
        ObsticleBottom.style.borderRadius = '10px';

    FullObsticle.forEach(elm => {
        elm.style.boxSizing = 'content-box'
        //elm.style.backgroundColor = ObsticleColor;
        
        elm.style.width = '50px';
        ObsticleWrap.appendChild(elm);
    });

    ObsticleWrap.addEventListener('animationend', function(params) {
        ObsticleWrap.remove();
    })


}

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
    PlayerBird = document.createElement('canvas');
    PlayerBird.id = "PlayerBird";
    PlayerBird.style.width = `${PlayerBirdSize +'px'}`;
    PlayerBird.style.height = `${PlayerBirdSize +'px'}`;
    PlayerBird.style.background = SelectedPlrColor;
    PlayerBird.style.borderRadius = '100%';
    PlayerBird.style.position = 'relative';
    PlayerBird.style.top = (HalfGameAreaHeight + 'px');
    PlayerBird.style.left = '20px';
    PlayerBird.style.zIndex = '20';
    PlayerBird.style.boxSizing = 'content-box'
        FullGameplayArea.appendChild(PlayerBird);
        CreateObsticleWraps()

    GameStarted = true;
    startGameLoop();
} // <-- End StartGame Function

// Jump Events:
    

    function PlayerJump(e) {
        
        //DeBugging:
        function JumpDebug() {
            console.log('Bird Jump!');
            console.log(`'e': ${e}`);
            console.log(`'e.id': ${e.id}`);
        } //JumpDebug();

        //Check Jump Conditions:
        if((e.id == "FullGameplayArea" || e == "Keypress") && GameStarted) {
            //console.trace(`Jump Accepted`);
            

            let CurHeight = getComputedStyle(PlayerBird).top.replace('px', '');

            if(CurHeight >> 0) {
                let NewHeight = (CurHeight - BirdJumpStrength) + 'px';
                BirdJumping = true;
                
                //Stop at Sky:
                if(parseInt(NewHeight) >= 0){
                    PlayerBird.style.top = NewHeight;
                    checkCollisions();
                    setTimeout(() => {
                        BirdJumping = false;
                    }, GravityTime);
                } else{
                    console.info('Bird Hit the Sky!')
                    checkCollisions();
                    BirdJumping = false;
                }

                
            }



        }
        
    } // <-- End PlayerJump Function

// Script Load Msg:
// console.log(`[GameFunctionality] | Scripted Loaded In!`);
