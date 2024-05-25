const MainBodyWrap = document.getElementById('AllSitesArea');
const NavBodyWrap = document.getElementById('NavPageArea');
const SearchBodyWrap = document.getElementById('SearchResultsArea');

let HomePage = 'nav';
let CurPage = 'nav'; // [allSites, nav, search] <-- available

function OpenPage(RequestedPage) {
    if(RequestedPage === 'allSites') {
        MainBodyWrap.classList.remove('hidden');
        NavBodyWrap.classList.add('hidden');
        SearchBodyWrap.classList.add('hidden');
        CurPage = 'allSites';
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
        OpenPage('allSites');
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