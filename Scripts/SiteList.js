const SitesArray = [
    {Name: 'WackAMole', Link: '/Sites/WackAMole/index.html', Img: '/favicon.ico', Tags: 'Game, Fun, Wack A Mole', Featured: false, New: false},
    {Name: 'BouncyBlocks', Link: '/Sites/BouncyBlocks/index.html', Img: '/favicon.ico', Tags: 'Game, Fun, Bouncy Blocks', Featured: false, New: false},
    {Name: 'Rock Paper Scissors', Link: '/Sites/RockPaperScissors/index.html', Img: '/favicon.ico', Tags: 'Game, Fun, Rock Paper Scissors', Featured: false, New: false},
    {Name: 'Tic Tac Toe', Link: '/Sites/TicTacToeV2/index.html', Img: '/favicon.ico', Tags: 'Game, Fun, Tic Tac Toe', Featured: true, New: false},
    {Name: 'Hangman', Link: '/Sites/Hangman/index.html', Img: '/favicon.ico', Tags: 'Game, Fun, Hangman', Featured: false, New: false},
    {Name: 'Random Generator', Link: '/Sites/RandomGenerator/index.html', Img: '/favicon.ico', Tags: 'Random, Generator, Useful, Tools', Featured: false, New: true},
    {Name: 'SkyScope', Link: '/Sites/SkyScope/index.html', Img: '/favicon.ico', Tags: 'Sky, Scope, Weather, Information, Conditions, Useful, Tools', Featured: false, New: true},
]

const HiddenSitesArray = [
    {Name: 'SkyLine', Link: '/Sites/SkyLine/index.html'},
    {Name: 'EventCountdown', Link: '/Sites/EventCountdown/index.html'},
]

// Elements:
const HomepageFeaturedSiteGrid = document.getElementById('HomepageFeaturedSiteGrid');
const AllSitesGrid = document.getElementById('AllSitesGrid');
const SearchSitesGrid = document.getElementById('SearchSitesGrid');
const HiddenSitesList = document.getElementById('HiddenSitesList');

// Load Sites:
SitesArray.forEach(Site => {
    // Create New Listing Element(s):
    let AllSitesListing = document.createElement('div');
    AllSitesListing.classList.add('SiteCell', 'box-shadow-dark');
    AllSitesListing.dataset.SiteTags = Site.Tags;
    AllSitesListing.innerHTML = `
        <div class="SiteTagWrap HideTag"> 
        <p class="FeaturedSiteTag HideTag text-shadow-dark box-shadow"> Featured</p> 
        <p class="NewSiteTag HideTag text-shadow-dark box-shadow"> New</p>
        </div>
        <h4 class="SiteCellName text-shadow-dark"> ${Site.Name} </h4>
        <img class="SiteCellImg" src="${Site.Img}" draggable="false">
        <button class="VisitSiteButton text-shadow-dark" onclick=location.assign('${Site.Link}')> Visit </button>`;

    let SearchSitesListing = document.createElement('div');
    SearchSitesListing.classList.add('SiteCell', 'box-shadow-dark');
    SearchSitesListing.dataset.SiteTags = Site.Tags;
    SearchSitesListing.innerHTML = `
        <div class="SiteTagWrap HideTag"> 
        <p class="FeaturedSiteTag HideTag text-shadow-dark box-shadow"> Featured</p> 
        <p class="NewSiteTag HideTag text-shadow-dark box-shadow"> New</p>
        </div>
        <h4 class="SiteCellName text-shadow-dark"> ${Site.Name} </h4>
        <img class="SiteCellImg" src="${Site.Img}" draggable="false">
        <button class="VisitSiteButton text-shadow-dark" onclick=location.assign('${Site.Link}')> Visit </button>`;


    let FeaturedSiteListing = document.createElement('div');
    FeaturedSiteListing.classList.add('SiteCell', 'box-shadow-dark');
    FeaturedSiteListing.dataset.SiteTags = Site.Tags;
    FeaturedSiteListing.innerHTML = `
        <div class="SiteTagWrap HideTag"> 
        <p class="FeaturedSiteTag HideTag text-shadow-dark box-shadow"> Featured</p> 
        <p class="NewSiteTag HideTag text-shadow-dark box-shadow"> New</p>
        </div>
        <h4 class="SiteCellName text-shadow-dark"> ${Site.Name} </h4>
        <img class="SiteCellImg" src="${Site.Img}" draggable="false">
        <button class="VisitSiteButton text-shadow-dark" onclick=location.assign('${Site.Link}')> Visit </button>`;

    let AllListings = [AllSitesListing, SearchSitesListing, FeaturedSiteListing];

    // Site is Featured:
    if(Site.Featured){
        // Add Site Tag:
        AllListings.forEach(SiteToFeature => {
            let SiteTagWrap = SiteToFeature.querySelector('.SiteTagWrap')
            SiteToFeature.querySelector('.SiteCellName').classList.add('TagMargin')
            SiteTagWrap.classList.remove('HideTag');
            SiteTagWrap.classList.add('ShowTag');
            SiteTagWrap.querySelector('.FeaturedSiteTag').classList.remove('HideTag');
            SiteTagWrap.querySelector('.FeaturedSiteTag').classList.add('ShowTag');
        });
    }

    // Site is New:
    if(Site.New){
        // Add Site Tag:
        AllListings.forEach(SiteToFeature => {
            let SiteTagWrap = SiteToFeature.querySelector('.SiteTagWrap')
            SiteToFeature.querySelector('.SiteCellName').classList.add('TagMargin')
            SiteTagWrap.classList.remove('HideTag');
            SiteTagWrap.classList.add('ShowTag');
            SiteTagWrap.querySelector('.NewSiteTag').classList.remove('HideTag');
            SiteTagWrap.querySelector('.NewSiteTag').classList.add('ShowTag');
        });
    }

    // Show on Homepage if Featured/New:
    if(Site.Featured || Site.New){
        HomepageFeaturedSiteGrid.appendChild(FeaturedSiteListing);
    }
    
    // Add to All/Search Sites:
    AllSitesGrid.appendChild(AllSitesListing)
    SearchSitesGrid.appendChild(SearchSitesListing)

    // Add SiteTags to SearchableTag Array:
    ThisSiteTags = Site.Tags.split(',')
    ThisSiteTags.forEach(Tag => {
        Tag = Tag.trim();
        // Check for Duplicate Tags:
        if(!SearchableTags.includes(Tag)){
            SearchableTags.push(Tag);
        }
    })
});

// Load Hidden Sites:
HiddenSitesArray.forEach(Site => {
    let NewSiteListing = document.createElement('div');
    NewSiteListing.classList.add('HiddenSiteButton');
    NewSiteListing.innerText = Site.Name;
    NewSiteListing.addEventListener('click', function(e){
        location.assign(Site.Link)
    });
    HiddenSitesList.appendChild(NewSiteListing);
})