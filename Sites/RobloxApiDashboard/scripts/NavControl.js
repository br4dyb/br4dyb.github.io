// Page Elements:
const MenuButton = document.getElementById('menuButton');
const FullNavArea = document.getElementById('fullNavArea');
const NavMenu = document.getElementById('NavMenu');
const RemainingNavSpace = document.getElementById('NavRemainingSpace');

// Variables:
let NavDebug = false;
let NavOpen = false;

// Functions:

function OpenNav(){
    if(!NavOpen){
        NavOpen = true;

        // // MenuButton Animation:
        // MenuButton.style.animation = 'MenuClick 1s ease 0s both';
        // // Reset Animation:
        // setTimeout(() => {
        //     MenuButton.style.animation = 'unset';
        // }, 2550);

        // Open Nav (after button animation):
        // setTimeout(() => {
            FullNavArea.style.display = 'flex';
            setTimeout(() => { // Wait for FullNav to Open
                NavMenu.style.left = '0px';
                RemainingNavSpace.style.opacity = '.5';
            }, 250);
        // }, 100);

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
}