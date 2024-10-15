// Page Elements:
const MenuButton = document.getElementById('MenuButton');
const FullNavArea = document.getElementById('FullNavArea');
const NavMenu = document.getElementById('NavMenu');
const RemainingNavSpace = document.getElementById('NavRemainingSpace');
const GamePausedTxt = document.getElementById('GamePausedTxt');

// Variables:
let ConsoleDebug = true;
let NavOpen = false;

// Functions:

function OpenNav(){
    if(!NavOpen){
        NavOpen = true;
        // MenuButton Animation:
        MenuButton.style.animation = 'MenuClick 1s ease 0s both';
        // Reset Animation:
        setTimeout(() => {
            MenuButton.style.animation = 'unset';
        }, 2550);

        // Open Nav (after button animation):
        setTimeout(() => {
            FullNavArea.style.display = 'flex';
            setTimeout(() => { // Wait for FullNav to Open
                NavMenu.style.left = '0px';
                RemainingNavSpace.style.opacity = '.5';
            }, 360);
        }, 100);
        
        if(GameRunning){
            // console.info('Pausing Game!');
            GamePaused = true;
            GamePausedTxt.style.display = 'flex';
            GamePausedTxt.style.opacity = 1;
        }

    }
    
}


function CloseNav(){
    // Animate Out:
    NavMenu.style.left = '-250px';
    RemainingNavSpace.style.opacity = '0';

    // Wait for Animation:
    setTimeout(() => {
        FullNavArea.style.display = 'none';
        NavOpen = false;
    }, 500);

    // Unpause Game if Paused:
    if(GamePaused){
        // console.info('Unpausing Game!');
        GamePaused = false;
        GamePausedTxt.style.opacity = 0;
        setTimeout(() => {
            GamePausedTxt.style.display = 'none';
        }, 400);
    }
}