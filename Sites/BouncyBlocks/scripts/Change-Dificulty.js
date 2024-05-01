let DificultyDisplayText = document.getElementById('DificultySelectedLabel');

function DificultyChange(elm, value) {
    console.log(`ChangeEvent - Fired! | [1st Arg]: ${elm} | [2nd Arg]: ${value}`);

    if(value == '0'){
        DificultySelectedLabel.innerText = 'Easy';
    }else if(value == '50'){
        DificultySelectedLabel.innerText = 'Medium';
    }else if(value == '100'){
        DificultySelectedLabel.innerText = 'Hard';
    }else{
        console.warn(`[Dificulty Script]: ERROR! | value was not detected properly | value = ${value}`)
    }
}

console.log(`[Dificulty Script]: LOADED! `)