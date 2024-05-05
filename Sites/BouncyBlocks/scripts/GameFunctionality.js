let FullGameStartOptionsWrap = document.getElementById('StartGameWrap');
let FullGameplayArea = document.getElementById('FullGameplayArea')
let SiteHeader = document.querySelector('header');

let GameStartedAlert = false; // For DeBugging :)
let GameStarted = false;
let BirdJumping = false;

// Game Options - Constant:
let PlayerBirdSize = 50; //(px)
let BirdJumpStrength = 50; //(px)

let ObsticleColor = '#000000';
let ObsticleFlyGap = (PlayerBirdSize + 15); //(px)
let ObsticleBetweenGap = 150; //(px)

let GravityTime = 200; //(ms)
let GravityDistanceX = 10;//(px)
let GravityDistanceY = 15;//(px)


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
    });
  });


// Gravity/Game Loops:
let gravityInterval;

// Start the game loop when the game starts
function startGameLoop() {
    gravityInterval = setInterval(applyGravity, GravityTime);
    //console.log('Applying Gravity');
}

// Stop the game loop when the game ends
function stopGameLoop() {
    clearInterval(gravityInterval);
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
        }
       

        // Check for Bird Hit the Ground:
        if(parseInt(NewHeight) >= (parseInt(FullGameAreaHeight)-(PlayerBirdSize-10))) {
            console.info(`Attempted Height: ${parseInt(NewHeight)}`)
            console.info(`Full GameArea Height: ${(parseInt(FullGameAreaHeight)-PlayerBirdSize)}`)
            console.warn(`GAME ENDED! | Bird Hit the Ground!`)
            stopGameLoop();
            GameStarted = false;


                alert('Game Over!');
                location.reload();

        }

        // Move Bird to Middle:
        
        let CurX = parseInt(getComputedStyle(PlayerBird).left);
        let NewX = (CurX + GravityDistanceX) + 'px';

        if(parseInt(NewX) < (parseInt(getComputedStyle(FullGameplayArea).width)/2.5) ){
            PlayerBird.style.left = NewX;
        }else{
            //console.info('Bird is already in middle!')
        }

        
    }
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
    let PlayerBird = document.createElement('canvas')
    PlayerBird.id = "PlayerBird"
    PlayerBird.style.width = `${PlayerBirdSize +'px'}`;
    PlayerBird.style.height = `${PlayerBirdSize +'px'}`;
    PlayerBird.style.background = SelectedPlrColor;
    PlayerBird.style.borderRadius = '100%';
    PlayerBird.style.position = 'relative';
    PlayerBird.style.top = (HalfGameAreaHeight + 'px');
    PlayerBird.style.left = '20px';
        FullGameplayArea.appendChild(PlayerBird);

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
            console.trace(`Jump Accepted`);
            

            let CurHeight = getComputedStyle(PlayerBird).top.replace('px', '');

            if(CurHeight >> 0) {
                let NewHeight = (CurHeight - BirdJumpStrength) + 'px';
                BirdJumping = true;
                
                //Stop at Sky:
                if(parseInt(NewHeight) >= 0){
                    PlayerBird.style.top = NewHeight;
                    BirdJumping = false;
                } else{
                    console.info('Bird Hit the Sky!')
                    BirdJumping = false;
                }

                
            }



        }
        
    } // <-- End PlayerJump Function

// Script Load Msg:
// console.log(`[GameFunctionality] | Scripted Loaded In!`);
