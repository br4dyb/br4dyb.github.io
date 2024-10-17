// Page Elements:
const MenuButton = document.getElementById('MenuButton');
const FullNavArea = document.getElementById('FullNavArea');
const NavMenu = document.getElementById('NavMenu');
const RemainingNavSpace = document.getElementById('NavRemainingSpace');
const GamePausedTxt = document.getElementById('GamePausedTxt');

// Variables:
let NavDebug = true;
let DarkMode = true;
let NavOpen = false;

let LightBodyBackground = '#f0f0f0';
let DarkBodyBackground = '#1b1b1b';

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

function ToggleColorMode(){
    if(DarkMode){
        DarkMode = false;
        document.documentElement.style.setProperty('--BodyBackground', LightBodyBackground);
        // document.documentElement.style.setProperty('--BodyTextColor', 'black');
    }

    if(!DarkMode){
        DarkMode = true;
        document.documentElement.style.setProperty('--BodyBackground', DarkBodyBackground);
        // document.documentElement.style.setProperty('--BodyTextColor', 'white');
    }
}