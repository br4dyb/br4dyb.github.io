const NavMenu = document.getElementById('NavList');
const OpenNavMenuBttn = document.getElementById('OpenNavButton');

function OpenNavMenu() {

   if(NavMenu.style.display == 'none') {
    NavMenu.style.display = 'Flex'
    OpenNavMenuBttn.style.display = 'none'
   } else {
    NavMenu.style.display = 'none'
    OpenNavMenuBttn.style.display = 'block'
   }

};

const MainNavMenu = document.getElementById('MainNavLinksList');
const MoreNavMenu = document.getElementById('MoreNavLinksList');

function OpenMoreNavLinks() {

   if(MainNavMenu.style.display == 'none') {
      MainNavMenu.style.display = 'Block'
      MoreNavMenu.style.display = 'none'
     } else {
      MainNavMenu.style.display = 'none'
      MoreNavMenu.style.display = 'Block'
     }

};
