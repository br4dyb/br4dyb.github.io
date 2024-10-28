// Elements:
const LandingSearchBar = document.getElementById('LandingSearchInput');
const LandingSearchAutoCompleteWrap = document.getElementById('SearchInputAutoComplete');

// Variables:
let SearchableTags = ['example'];
let AvaialbleSearchTags = [];
let SearchableTagFound = false;
        

// Functions:
function LandingSearchAutoComplete(){
    let LandingSearchValue = LandingSearchBar.value;
    SearchableTagFound = false;
    
    if(LandingSearchValue == ''){
        // console.info('Search Empty');
        LandingSearchAutoCompleteWrap.style.display = 'none';
    }else{
        // Check Search for AutoComplete Tags:
        LandingSearchAutoCompleteWrap.style.display = 'flex';
        LandingSearchAutoCompleteWrap.innerHTML = '';

        let FilteredSearchValue = LandingSearchValue.toLowerCase().trim();

        let SearchedArray = FilteredSearchValue.split(' ');

        SearchedArray.forEach(SearchedTag => {
            SearchableTags.forEach(SearchableTag => {
                SearchableTag = SearchableTag.toLowerCase().trim();
                if(SearchableTag.includes(SearchedTag)){
                    let NewSearchableTagElm = document.createElement('p');
                    NewSearchableTagElm.classList.add('AutoCompleteOption');
                    NewSearchableTagElm.innerText = SearchableTag;
                    LandingSearchAutoCompleteWrap.appendChild(NewSearchableTagElm);
                    SearchableTagFound = true;
                }
            });
        });
    }

    // Hide AutoComplete if no Tag Found:
    if(!SearchableTagFound){
        LandingSearchAutoCompleteWrap.style.display = 'none';
    }

}