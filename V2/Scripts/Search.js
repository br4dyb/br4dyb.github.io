// Elements:
const LandingSearchBar = document.getElementById('LandingSearchInput');
const LandingSearchAutoCompleteWrap = document.getElementById('LandingSearchInputAutoComplete');
const SearchSitesSearchBar = document.getElementById('SearchSitesInput');
const SearchSitesAutoCompleteWrap = document.getElementById('SearchSitesInputAutoComplete');



let CurrentSearchInput;
let CurrentAutoCompleteWrap;

// Variables:
let SearchableTags = [];
let AvaialbleSearchTags = [];
let SearchableTagFound = false;

// Custom Tags:
let CustomTags = [
    {TagNames: ['My Account', 'Account'], Link: 'OpenMyAccount()'},
];
CustomTags.forEach(Tag => {
    Tag.TagNames.forEach(CustomTagName => {
        SearchableTags.push(CustomTagName)
    })
})
        

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

        // Check each word for SearchableTags:
        SearchedArray.forEach(SearchedTag => {
            SearchableTags.forEach(SearchableTag => {

                let FilteredSearchableTag = SearchableTag.toLowerCase().trim();

                if(FilteredSearchableTag.includes(SearchedTag)){

                    let NewSearchableTagElm = document.createElement('p');
                    NewSearchableTagElm.classList.add('AutoCompleteOption');
                    NewSearchableTagElm.innerText = SearchableTag;
        
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
    if(!SearchableTagFound){
        // Set Results to NOT Found:
        CurrentAutoCompleteWrap.style.display = 'none';
    }

}