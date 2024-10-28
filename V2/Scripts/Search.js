// Elements:
const LandingSearchBar = document.getElementById('LandingSearchInput');
const LandingSearchAutoCompleteWrap = document.getElementById('SearchInputAutoComplete');

// Variables:
let SearchableTags = ['Example'];
let AvaialbleSearchTags = [];
let SearchableTagFound = false;
        

// Functions:
function LandingSearchAutoComplete(){
    let LandingSearchValue = LandingSearchBar.value;
    // Reset Variables for each search:
    SearchableTagFound = false;
    AvaialbleSearchTags = [];
    
    if(LandingSearchValue == ''){
        // Search is Empty:
        LandingSearchAutoCompleteWrap.style.display = 'none';
    }else{
        // Check Search for AutoComplete Tags:
        LandingSearchAutoCompleteWrap.style.display = 'flex';
        LandingSearchAutoCompleteWrap.innerHTML = '';

        // Format Strings:
        let FilteredSearchValue = LandingSearchValue.toLowerCase().trim();
        let SearchedArray = FilteredSearchValue.split(' ');

        // Check each word for SearchableTags:
        SearchedArray.forEach(SearchedTag => {
            SearchableTags.forEach(SearchableTag => {
                SearchableTag = SearchableTag.toLowerCase().trim();

                if(SearchableTag.includes(SearchedTag)){
                    let NewSearchableTagElm = document.createElement('p');
                    NewSearchableTagElm.classList.add('AutoCompleteOption');
                    let FirstChar = SearchableTag.charAt(0);
                    let FirstCharUpper = FirstChar.toUpperCase();
                    SearchableTag = SearchableTag.replace(FirstChar, FirstCharUpper);
                    NewSearchableTagElm.innerText = SearchableTag;
        
                    // Check for Duplicates:
                    if(!AvaialbleSearchTags.includes(SearchableTag)){
                        AvaialbleSearchTags.push(SearchableTag);
                        LandingSearchAutoCompleteWrap.appendChild(NewSearchableTagElm);
                    }
                    // Set Results to Found:
                    SearchableTagFound = true;
                }

            });
        });
    }

    // Hide AutoComplete if no Tag Found:
    if(!SearchableTagFound){
        // Set Results to NOT Found:
        LandingSearchAutoCompleteWrap.style.display = 'none';
    }

}