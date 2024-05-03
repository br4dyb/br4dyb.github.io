let DificultySelectedLabel = document.getElementById('DificultySelectedLabel');

function DificultyChange(elm, value) {

    if(value == '0'){
        DificultySelectedLabel.innerText = 'Easy';
        DificultySelectedLabel.style.color = '#8ff573';
        DificultySelectedLabel.style.fontWeight = 'normal';
    }else if(value == '50'){
        DificultySelectedLabel.innerText = 'Medium';
        DificultySelectedLabel.style.color = '#eef573';
        DificultySelectedLabel.style.fontWeight = 'normal';
    }else if(value == '100'){
        DificultySelectedLabel.innerText = 'Hard';
        DificultySelectedLabel.style.color = '#f26257';
        DificultySelectedLabel.style.fontWeight = 'bolder';
    }else{
        console.warn(`[Dificulty Script]: ERROR! | value was not detected properly | value = ${value}`)
    }
}

// console.log(`[Dificulty Script]: LOADED! `)

DificultyChange(null, 0);