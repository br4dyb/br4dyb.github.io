let GameArea = document.getElementById('GameArea');

document.addEventListener('DOMContentLoaded', function(){
    console.info('Content Loaded...');
    let ComputedStyle = getComputedStyle(GameArea);
    let Height = ComputedStyle.Width;
    GameArea.style.Height = Height;
    console.log(`Width is: ${Height}`);
})