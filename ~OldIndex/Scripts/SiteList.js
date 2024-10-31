let SitesToPopulate = [
    {Name: 'WackAMole', Img: './Images/favicon.ico', Link: './Sites/WackAMole/index.html', Tags: 'game, wack, a, mole, fun', Featured: false, New: true},
    {Name: 'Bouncy Blocks', Img: './Images/favicon.ico', Link: './Sites/BouncyBlocks/index.html', Tags: 'game, flappy, bird, fun, bouncy, blocks', Featured: false, New: false},
    {Name: 'Rock Papper Scissors', Img: './Images/favicon.ico', Link: './Sites/RockPaperScissors/index.html', Tags: 'game, fun, rock, paper, scissors', Featured: true, New: true},
    {Name: 'Tic Tac Toe', Img: './Images/favicon.ico', Link: './Sites/TicTacToe/index.html', Tags: 'game, tic, tac, toe, fun', Featured: false, New: false},
    {Name: 'Tic Tac Toe v2', Img: './Sites/TicTacToeV2/FavIcon.ico', Link: './Sites/TicTacToeV2/index.html', Tags: 'game, tic, tac, toe, fun', Featured: false, New: true},
    {Name: 'Hangman', Img: './Images/favicon.ico', Link: './Sites/Hangman/index.html', Tags: 'game, fun, hang, man, hangman', Featured: false, New: false},
    
    
    {Name: 'Site Template', Img: './Images/favicon.ico', Link: './Sites/Starter_Template/index.html', Tags: 'site, template, starter, html, css', Featured: false, New: false},

    // {Name: 'SITE_NAME', Img: './Images/favicon.ico', Link: './Sites/_SITE_PATH', Tags: 'SITE_TAGS', Featured: false, New: false},
];

let SitesGridElement = document.getElementById('AllSitesGrid');
let FeaturedSiteGrid = document.getElementById('FeaturedSitesGrid');
let SearchSiteGrid = document.getElementById('SearchSitesGrid');

SitesToPopulate.forEach(Site => {
    let NewCell = document.createElement('main');
    NewCell.className = "SiteCellWrap";
    NewCell.dataset.tags = Site.Tags;
    NewCell.innerHTML = `

        <div class="SiteCellTitleWrap">
            <div class="SiteTagsWrap hidden">
                <p class="NewSiteTag hidden"> New! </p>
                <p class="FeaturedSiteTag hidden"> Featured! </p>
            </div>
            <h3 class="SiteCellTitle"> ${Site.Name} </h3>
            
        </div>
        <img class="SiteCellImage" src=${Site.Img}> </img>
        <a href=${Site.Link}> <button> Visit </button> </a>
   
    `;

    
        let FeatureThisSite = false;

        if(Site.New === true){
            let TagsWrap = NewCell.querySelector('.SiteTagsWrap');
            TagsWrap.classList.remove('hidden');
            let NewTag = TagsWrap.querySelector('.NewSiteTag');
            NewTag.classList.remove('hidden');
            FeatureThisSite = true;
        }
        if(Site.Featured === true){
            let TagsWrap = NewCell.querySelector('.SiteTagsWrap');
            TagsWrap.classList.remove('hidden');
            let FeaturedTag = TagsWrap.querySelector('.FeaturedSiteTag');
            FeaturedTag.classList.remove('hidden');
            FeatureThisSite = true;
        }

        setTimeout(() => {
            if(FeatureThisSite){
                FeaturedSiteGrid.appendChild(NewCell);
                let SiteImage = NewCell.querySelector('img');
                SiteImage.style.marginTop = '10%';
            } else{
                SitesGridElement.appendChild(NewCell);
            }

            let NewSearchCell = document.createElement('main');
            NewSearchCell.className = "SiteCellWrap";
            NewSearchCell.dataset.tags = Site.Tags;
            NewSearchCell.innerHTML = NewCell.innerHTML
            SearchSiteGrid.appendChild(NewSearchCell)
        }, 50);

});