let SearchBodyArea = document.getElementById('SearchResultsArea');
let NavPageArea = document.getElementById('NavPageArea');
let NoResultsText = document.getElementById('NoSiteSearchResultsText');

let ConsoleDebug = false; 

let SearchInputElement = document.getElementById('SiteSearchInput');
let ClearButton = document.getElementById('ClearInputButton');


function ClearSearchBar(){
    SearchInputElement.value = '';
    ClearButton.classList.add('hidden');

    let AvailableSites = SearchBodyArea.querySelectorAll('.SiteCellWrap');
    AvailableSites.forEach(Site => {
        Site.classList.remove('hidden');
    })

    NoResultsText.classList.add('hidden');
}

function ToggleClearButton(){

    if(SearchInputElement.value === ''){
        ClearButton.classList.add('hidden');
    }else{
        ClearButton.classList.remove('hidden');
    }
}

function SubmitSiteSearch(event){
    event.preventDefault();
    
    let SearchValue = document.getElementById('SiteSearchInput').value;

    if(SearchValue === '' || SearchValue === ' '){
        ClearSearchBar();
        return;
    }
    

    let FilteredSearch = SearchValue.toLowerCase().trim();

    let SearchArray = FilteredSearch.split(' ');

    let AvailableSites = SearchBodyArea.querySelectorAll('.SiteCellWrap');
    let SearchFound = false;

    if(ConsoleDebug){
        console.log('Search Submitted:');
        console.log(FilteredSearch);
        console.log(SearchArray);
    }

    AvailableSites.forEach(element => {
        element.classList.add('hidden');
        
        let SiteTags = element.dataset.tags.split(',');

        SearchArray.forEach(SearchTag => {
            SiteTags.forEach(SiteTag => {
                SiteTag = SiteTag.toLowerCase().trim();
                if(SiteTag.includes(SearchTag)){
                    element.classList.remove('hidden');
                    SearchFound = true;
                }
            });
        });
    });

    if(!SearchFound){
        if(ConsoleDebug) {console.log('No Search Results Found . . .')}
        NoResultsText.classList.remove('hidden');
    } else{
        NoResultsText.classList.add('hidden');
    }
}
