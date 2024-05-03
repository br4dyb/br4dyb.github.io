let FullGameStartOptionsWrap = document.getElementById('StartGameWrap');
let SiteHeader = document.querySelector('header');


console.log(`[GameFunctionality] | Scripted Loaded In!`);


function StartGame() {
    let SelectedDificulty = document.getElementById('DificultySelectedLabel').innerText;
    let SelectedPlrColor = document.getElementById('PlrColorSelector').value;
    
    SiteHeader.style.animation = 'hide-header 1s forwards ease-in-out';
    FullGameStartOptionsWrap.style.animation = 'opacity-out .5s forwards ease-in-out';
    

    // alert(`Game Started!:
    //     Dificulty: ${SelectedDificulty}
    //     Player Color: ${SelectedPlrColor}
    // `);


}