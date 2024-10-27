// Elements:
const LandingSearchBar = document.getElementById('LandingSearchInput');
const LandingSearchAutoCompleteWrap = document.getElementById('SearchInputAutoComplete');

// Variables:
let SearchableTags = ['games', 'fun', 'example'];
function LandingSearchAutoComplete(){
    let LandingSearchValue = LandingSearchBar.value;
    console.log('Input Registered');
    
    if(LandingSearchValue == ''){
        console.info('Search Empty');
        LandingSearchAutoCompleteWrap.style.display = 'none';
    }else{
        console.log(LandingSearchValue);
        LandingSearchAutoCompleteWrap.style.display = 'flex';
    }
}