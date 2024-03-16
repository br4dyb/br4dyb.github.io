
const GameGrid = document.getElementById('FullGameTable');
const AllGameCells = GameGrid.querySelectorAll('td');

let PlayerPiece = "O"


function MakeAllCellsAvailable() {
    // Makes all cells available at game start:
    AllGameCells.forEach(element => {
        element.classList.toggle("AvailableCellArea");
        console.log(`Added "AvailableCellArea" for: ` + element.nodeName);
    });
}

function CellSelected(GameCell) {
    // Check if selected cell is available:
    if(GameCell.classList.contains("AvailableCellArea")) {
        console.log(GameCell + `has been clicked! / function ran!`);
        GameCell.classList.toggle("AvailableCellArea");
        GameCell.textContent = PlayerPiece
    } else {
        GameCell.style.background = 'red'
        setTimeout(() => {
            GameCell.style.background = 'unset'
        }, 500);
    }

    
}


// On Page Load:
MakeAllCellsAvailable()