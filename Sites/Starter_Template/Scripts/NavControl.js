let MainNav = document.querySelector('nav');
let MainNavList = document.getElementById('MainNavWrap');
let ExtraNavList1 = document.getElementById('Extra1NavWrap');
let FullBodyWrap = document.getElementById('FullBodyWrap');

let CloseClickElements = [
    // FullBodyWrap,
    document.getElementById('Header-Sec-2'),
    document.getElementById('Header-Sec-3'),
    document.getElementById('ClickOffNavWrap'),
    document.querySelector('footer'),
    //document.querySelector('header'),
]

// Initally Hide Full Nav Display:
MainNav.style.display = 'none';

// Function to Toggle Full Nav Display:
function ToggleNav() {
    if(MainNav.style.display == 'none'){
        // Show
        
        MainNav.style.display = 'flex';
        MainNavList.style.display = 'flex';

        MainNav.style.animation = 'OpenNav .7s forwards 1 ease-in-out';
        MainNavList.style.animation = 'OpenNav .7s forwards 1 ease-in-out';
        //MainNav.style.animationPlayState = 'running';

    } else {
        // Hide
        MainNav.style.animation = 'CloseNav .7s forwards 1 ease-in-out';
        //MainNav.style.animationPlayState = 'running';


        // After animation ends, hide the navigation
        MainNav.addEventListener('animationend', function() {
            MainNav.style.display = 'none';
            ExtraNavList1.style.display = 'none';
        }, {once: true});

       
    }
}

// Function to Toggle Extra Nav Display 1:
function ToggleExtraNav1() {
    if(ExtraNavList1.style.display == 'none'){
        MainNavList.style.display = 'none';
        ExtraNavList1.style.display = 'flex';
        ExtraNavList1.style.animation = 'OpenNav .7s forwards 1 ease-in-out';
    } else {
        MainNavList.style.display = 'flex';
        ExtraNavList1.style.display = 'none';
        ExtraNavList1.style.animation = 'CloseNav .7s forwards 1 ease-in-out';
        MainNavList.style.animation = 'OpenNav .7s forwards 1 ease-in-out';
    }
}


// If other element is clicked, hide nav:
CloseClickElements.forEach(element => {
    element.onclick = function(){
        if(MainNav.style.display == 'flex'){
           ToggleNav()
        }
    }
});
