const SitesAvailable = [
    {name: 'Music', link: './music.html', icon: './favicon.ico'},
    {name: 'Bouncy Blocks', link: './BouncyBlocks/index.html', icon: './favicon.ico'},
];

const DirectoryWrap = document.getElementById('DirectoryWrap');

SitesAvailable.forEach(element => {
    
    let NoSpaceName = element.name.replace(/\s+/g, ''); // Remove all spaces from the name
    let NewDiv = document.createElement('div');
    NewDiv.classList = 'DirectoryCell Evenly_Flex';
    NewDiv.id = (NoSpaceName + '_DirectoryCell');
    NewDiv.onclick = function() {
        location.assign(element.link)
    }

    NewDiv.innerHTML = `
        <div class="DrctyTitle">
            <p class="DrctyTxtElm" style="text-align: center; width: 100%;"> ${element.name} </p>
        </div>

        <div class="DrctyImgWrap">
            <img src="${element.icon}" class="DrctyImgElm" >
        </div>

        <div class="DrctyBtn">
            <p class="DrctyTxtElm"> Visit </p>
        </div>
    `;

    DirectoryWrap.appendChild(NewDiv);


});