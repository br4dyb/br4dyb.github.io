const MainBodyWrap = document.getElementById('FullBodyWrap');
const NavBodyWrap = document.getElementById('NavPageArea');
const SearchBodyWrap = document.getElementById('SearchResultsArea');

let HomePage = 'nav';
let CurPage = 'nav'; // [main, nav, search] <-- available

function OpenPage(RequestedPage) {
    if(RequestedPage === 'main') {
        MainBodyWrap.classList.remove('hidden');
        NavBodyWrap.classList.add('hidden');
        SearchBodyWrap.classList.add('hidden');
        CurPage = 'main';
    } else 
    if(RequestedPage === 'nav') {
        MainBodyWrap.classList.add('hidden');
        NavBodyWrap.classList.remove('hidden');
        SearchBodyWrap.classList.add('hidden');
        CurPage = 'nav';
    } else 
    if(RequestedPage === 'search') {
        MainBodyWrap.classList.add('hidden');
        NavBodyWrap.classList.add('hidden');
        SearchBodyWrap.classList.remove('hidden');
        CurPage = 'search';
    } else{
        console.error(`Requested Page Error!
        Attempted: ${RequestedPage}`);
    }
}

function ToggleNavPage() {
    if(CurPage !== 'nav'){
        OpenPage('nav');
    } else {
        OpenPage(HomePage);
    }
};

function ToggleSearchPage() {
    if(CurPage !== 'search'){
        OpenPage('search');
    } else {
        OpenPage(HomePage);
    }
}


OpenPage(CurPage);