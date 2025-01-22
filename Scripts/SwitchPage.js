// Page Wraps:
let HomepageWrap = document.getElementById('HomepageContent');
let AllSitesWrap = document.getElementById('AllSitesFullWrap');
let SearchSitesWrap = document.getElementById('SearchSitesFullWrap');
let AccountWrap = document.getElementById('MyAccountFullWrap');
let ChangeLogWrap = document.getElementById('ChangeLogFullWrap');
let ContactUsWrap = document.getElementById('ContactUsFullWrap');
let HiddenSites = document.getElementById('HiddenSitesFullWrap');

// Variables:
let HomepageNavButton = document.getElementById('HomepageNavButton');
let CurrentView = HomepageWrap;

// Function(s):
function SwitchPage(NewPage){
    // Assign NewPage
    if(NewPage == 'AllSites'){
        NewPage = AllSitesWrap;
    }

    if(NewPage == 'SearchSites'){
        NewPage = SearchSitesWrap;
    }

    if(NewPage == 'Account'){
        NewPage = AccountWrap;
    }

    if(NewPage == 'ChangeLog'){
        NewPage = ChangeLogWrap;
    }

    if(NewPage == 'ContactUs'){
        NewPage = ContactUsWrap;
    }

    if(NewPage == 'HiddenSites'){
        NewPage = HiddenSites;
    }

    if(NewPage == 'Homepage'){
        NewPage = HomepageWrap;
        HomepageNavButton.classList.add('hidden');
    }else{
        HomepageNavButton.classList.remove('hidden');
    }

    // Chek for Aready Viewing this Page:
    if(CurrentView === NewPage){
        return
    }else{
    // Reset Scrollbar Position:
        document.documentElement.scrollTop = 0;  // For modern browsers
        document.body.scrollTop = 0;  // For older browsers

    // Animate in NewPage:
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
}