// Elements:
const ChoiceInput = document.getElementById('ChoiceInput');
const AddChoiceButton = document.getElementById('AddChoiceButton');
const ChoicesContainer = document.getElementById('ChoicesContainer');
const NoChoicesYetTxt = document.getElementById('NoChoicesYetTxt');
const ResetChoicesButton = document.getElementById('ResetChoicesButton');
const GenerateChoiceButton = document.getElementById('GenerateChoiceButton');
const ChoiceCountTxt = document.getElementById('ChoiceCount');

let ChoiceArray = [];

// Enter KeyPress Event:
ChoiceInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      AddChoice();
    }
  });

// Functions:
function AddChoice(){
    let CurrentInput = ChoiceInput.value;
    let AddedChoicesArray = String(CurrentInput).split(',');

    ChoiceInput.value = '';

    function ApplyStyles(){
        NoChoicesYetTxt.classList.add('hidden');
        ResetChoicesButton.classList.remove('NonActiveResetButton')
        ResetChoicesButton.style.opacity = 1;
    }
    

    AddedChoicesArray.forEach(Choice => {
        Choice = Choice.trim()
        let newChoiceElm = document.createElement('div');
        newChoiceElm.classList.add('ChoiceObj')
        newChoiceElm.innerHTML = `
        <p class="ChoiceText"> ${Choice} </p> <p onclick="RemoveThisChoice(this)" class="RemoveChoiceButton">X</p>`;

        // Check for Duplicates:
        if(!ChoiceArray.includes(Choice) && Choice != ''){
            ChoicesContainer.appendChild(newChoiceElm);
            ChoiceArray.push(Choice)
            ApplyStyles();
        }

    });

    let ChoiceCount = ChoiceArray.length
    ChoiceCountTxt.innerText = `(${ChoiceCount})`;

}

function ResetChoices(){
    if(ChoiceArray.length != 0){
        ChoiceArray = [];
        NoChoicesYetTxt.classList.remove('hidden');
        ChoiceInput.value = '';
        ResetChoicesButton.style.opacity = .5;
        let ExisitingChoices = ChoicesContainer.querySelectorAll('.ChoiceObj');

        ExisitingChoices.forEach(Choice =>{
            Choice.remove();
        });
    }

    let ChoiceCount = ChoiceArray.length
    ChoiceCountTxt.innerText = `(${ChoiceCount})`;
}

function RemoveThisChoice(elm){
    let ChoiceText = elm.parentElement.querySelector('.ChoiceText').innerText.trim();
    let ChoiceIndex = ChoiceArray.indexOf(ChoiceText);

    if(ChoiceIndex != -1){
        ChoiceArray.splice(ChoiceIndex, 1);
        elm.parentElement.remove();

        if(ChoiceArray.length == 0){
            ResetChoicesButton.style.opacity = .5;
            NoChoicesYetTxt.classList.remove('hidden');
        }

        let ChoiceCount = ChoiceArray.length
        ChoiceCountTxt.innerText = `(${ChoiceCount})`;
    }
}

function RandomlyChoose(){
    let ChoicesQuantity = (ChoiceArray.length)

    if(ChoicesQuantity != 0){
        let RandomIndex = Math.floor(Math.random() * ChoicesQuantity);
        let RandomItem = ChoiceArray.at((RandomIndex - 1));

    console.log(`
        RandomItem: ${RandomItem}
        `);

        alert(RandomItem);

    }
    
}