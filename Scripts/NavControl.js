console.log('NavControl Script Loaded!');

const NavToggleButton = document.getElementById('NavOpenIcon');
let FullNavWrap = document.getElementById('FullNavWrap')

NavToggleButton.onclick = function() {

    let CurrentDisplay = getComputedStyle(FullNavWrap).display
    console.log(`NavMenu's prev display: ` + CurrentDisplay)

    if (CurrentDisplay == 'none') {
        FullNavWrap.style.display = 'flex';

    } else {
        FullNavWrap.style.display = 'none';
    }
};