// Elements:
const ChoiceInput = document.getElementById('ChoiceInput');
const AddChoiceButton = document.getElementById('AddChoiceButton');
const ChoicesContainer = document.getElementById('ChoicesContainer');
const NoChoicesYetTxt = document.getElementById('NoChoicesYetTxt');
const ResetChoicesButton = document.getElementById('ResetChoicesButton');
const GenerateChoiceButton = document.getElementById('GenerateChoiceButton');

let ChoiceArray = [];


function AddChoice(){
    let CurrentInput = ChoiceInput.value;
    let AddedChoicesArray = String(CurrentInput).split(',');

    console.log(`
        CurrentInput: ${CurrentInput}
        AddedChoicesArray: ${AddedChoicesArray}`)

    AddedChoicesArray.forEach(Choice => {
        Choice.trim()
        let newChoiceElm = document.createElement('div');
        newChoiceElm.classList.add('ChoiceObj')
        newChoiceElm.innerHTML = `
        ${Choice} <p class="RemoveChoiceButton">X</p>`;

        ChoicesContainer.appendChild(newChoiceElm);
        ChoiceArray.push(Choice)
    });
}