// Elements:
const LandingSearchBar = document.getElementById('LandingSearchInput');
const LandingSearchAutoCompleteWrap = document.getElementById('LandingSearchInputAutoComplete');
const SearchSitesSearchBar = document.getElementById('SearchSitesInput');
const SearchSitesAutoCompleteWrap = document.getElementById('SearchSitesInputAutoComplete');
SearchSitesGird = SearchSitesGrid // Already Defined
const NoSearchResultsFound = document.getElementById('NoSearchResultsFound');


let CurrentSearchInput;
let CurrentAutoCompleteWrap;

// Variables:
let SearchableTags = [];
let AvaialbleSearchTags = [];
let SearchableTagFound = false;    

// Functions:
function SearchAutoComplete(inputElement){

    // Assign Current Elements:
    if(inputElement == 'HomepageSearch'){
        CurrentSearchInput = LandingSearchBar;
        CurrentAutoCompleteWrap = LandingSearchAutoCompleteWrap;
    }

    if(inputElement == 'SearchSitesSearch'){
        CurrentSearchInput = SearchSitesSearchBar;
        CurrentAutoCompleteWrap = SearchSitesAutoCompleteWrap;
    }

    let SearchValue = CurrentSearchInput.value;
    // Reset Variables for each search:
    SearchableTagFound = false;
    AvaialbleSearchTags = [];
    
    if(SearchValue == ''){
        // Search is Empty:
        CurrentAutoCompleteWrap.style.display = 'none';
    }else{
        // Check Search for AutoComplete Tags:
        CurrentAutoCompleteWrap.style.display = 'flex';
        CurrentAutoCompleteWrap.innerHTML = '';

        // Format Strings:
        let FilteredSearchValue = SearchValue.toLowerCase().trim();
        let SearchedArray = FilteredSearchValue.split(' ');

        // Add Current Input as Option:
        let NewSearchableTagElm = document.createElement('p');
        NewSearchableTagElm.classList.add('AutoCompleteOption');
        let PrettyFormatOption = String(SearchValue);
        let FirstChar = PrettyFormatOption.charAt(0)
        let FirstCharUpper = FirstChar.toUpperCase()
        PrettyFormatOption = PrettyFormatOption.replace(FirstChar, FirstCharUpper)
        NewSearchableTagElm.innerText = PrettyFormatOption;
        NewSearchableTagElm.onclick= () => SubmitSiteSearch(SearchValue)
        CurrentAutoCompleteWrap.appendChild(NewSearchableTagElm);
        

        // Check each word for SearchableTags:
        SearchedArray.forEach(SearchedTag => {
            SearchableTags.forEach(SearchableTag => {

                let FilteredSearchableTag = SearchableTag.toLowerCase().trim();

                if(FilteredSearchableTag.includes(SearchedTag)){

                    let NewSearchableTagElm = document.createElement('p');
                    NewSearchableTagElm.classList.add('AutoCompleteOption');
                    NewSearchableTagElm.innerText = SearchableTag;
                    NewSearchableTagElm.onclick= () => SubmitSiteSearch(SearchableTag)
        
                    // Check for Duplicates:
                    if(!AvaialbleSearchTags.includes(SearchableTag)){
                        AvaialbleSearchTags.push(SearchableTag);
                        CurrentAutoCompleteWrap.appendChild(NewSearchableTagElm);
                    }
                    // Set Results to Found:
                    SearchableTagFound = true;
                }

            });
        });
    }

    // Hide AutoComplete if no Tag Found:
    // if(!SearchableTagFound){
    //     // Set Results to NOT Found:
    //     CurrentAutoCompleteWrap.style.display = 'none';
    // }

}

function SubmitSiteSearch(SearchValue){
    if(CurrentView != SearchSitesWrap){
        SwitchPage('SearchSites');
    }

    // Update Search Input Elements:
    SearchSitesSearchBar.value = SearchValue;
    SearchSitesAutoCompleteWrap.style.display = 'none';
    LandingSearchBar.value = '';
    LandingSearchAutoCompleteWrap.style.display = 'none';

    // console.info('Searching for:');
    // console.log(SearchValue);

    // Perform Search:

    let ResultFound = false;
    let SearchableSites = SearchSitesGrid.querySelectorAll('.SiteCell');
    let SearchableResources = SearchSitesGrid.querySelectorAll('.ExtraResources');

    // Check Each Site:
    SearchableSites.forEach(Site => {
        Site.classList.add('hidden'); // Initally Hide until Searched for
        NoSearchResultsFound.classList.add('hidden');
        
        let SiteTags = String(Site.dataset.SiteTags)
        SiteTags = SiteTags.split(',') // Convert to Array

        // Check Each Tag:
        SiteTags.forEach(Tag => {
            // Format Strings:
            Tag = String(Tag.trim());
            Tag = Tag.toLowerCase();
            SearchValue = SearchValue.trim();
            SearchValue = SearchValue.toLowerCase();

            if(Tag.includes(SearchValue)){
                // Result Found:
                ResultFound = true;
                Site.classList.remove('hidden')
            }
        })

        if(!ResultFound){
            // No Results Found:
            NoSearchResultsFound.classList.remove('hidden');
        }

    });
}