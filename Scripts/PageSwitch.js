// Page Wraps:
let HomepageWrap = document.getElementById('HomepageContent');
let AllSitesWrap = document.getElementById('AllSitesFullWrap');
let SearchSitesWrap = document.getElementById('SearchSitesFullWrap');

// Variables:
let HomepageNavButton = document.getElementById('HomepageNavButton');
let CurrentView = HomepageWrap;

// Function(s):
function SwitchPage(NewPage){
    if(NewPage == 'AllSites'){
        NewPage = AllSitesWrap;
    }

    if(NewPage == 'SearchSites'){
        NewPage = SearchSitesWrap;
    }

    if(NewPage == 'Homepage'){
        NewPage = HomepageWrap;
        HomepageNavButton.classList.add('hidden');
    }else{
        HomepageNavButton.classList.remove('hidden');
    }

    CurrentView.style.opacity = 0;
        setTimeout(() => { 
            CurrentView.classList.add('hidden') 
            NewPage.style.opacity = 0;
            NewPage.classList.remove('hidden')
            CurrentView = NewPage;
            setTimeout(() => {
                NewPage.style.opacity = 1;
            }, 50);
        }, 400);
}