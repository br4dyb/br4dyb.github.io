
const GameGrid = document.getElementById('FullGameTable');
const AllGameCells = GameGrid.querySelectorAll('td');

let PlayerPiece = "X"


function MakeAllCellsAvailable() {
    // Makes all cells available at game start:
    AllGameCells.forEach(element => {
        element.classList.toggle("AvailableCellArea");
        console.log(`Added "AvailableCellArea" for: ` + element.nodeName);
    });
}

function ComputerSelectCell() {
    if(PlayerPiece === "X") {
        let ComputerPiece = "O";
        let CurrentAvailableCells = GameGrid.querySelectorAll('td.AvailableCellArea');

        
        if(CurrentAvailableCells.length >= 1) {
            let randomIndex = Math.floor(Math.random() * CurrentAvailableCells.length);
            let RandomCellSelected = CurrentAvailableCells[randomIndex];
    
            RandomCellSelected.classList.remove('AvailableCellArea');
    
            RandomCellSelected.textContent = ComputerPiece;
            RandomCellSelected.style.background = "#FFBD33";
    
            setTimeout(() => {
                RandomCellSelected.style.background = 'unset';
            }, 500);
            
        }else if(CurrentAvailableCells.length === 0) {
            GameEnd();
        }

    } else if(PlayerPiece === "O"){
        let ComputerPiece = "X";

    }
}

let CoolDown = false

function CellSelected(GameCell) {
    // Check if selected cell is available:
    if(GameCell.classList.contains("AvailableCellArea") && CoolDown === false) {
        console.log(GameCell + `has been clicked!`);
        GameCell.classList.toggle("AvailableCellArea");
        GameCell.textContent = PlayerPiece

        setTimeout(() => { 
            ComputerSelectCell() 
        }, 1000)

    } else {
        GameCell.style.background = 'red'
        setTimeout(() => {
            GameCell.style.background = 'unset'
        }, 500);
    }

    
}


// On Page Load:
MakeAllCellsAvailable()