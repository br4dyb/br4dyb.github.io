
const GameGrid = document.getElementById('FullGameTable');
const AllGameCells = GameGrid.querySelectorAll('td');

let PlayerPiece = "X";

let ComputerOwnedCells = [];
let PlayerOwnedCells = [];


function MakeAllCellsAvailable() {
    // Makes all cells available at game start:
    AllGameCells.forEach(element => {
        element.classList.toggle("AvailableCellArea");
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

            let cellId = RandomCellSelected.id;
            let cellNumber = parseInt(cellId.split('_')[1]);

            ComputerOwnedCells.push(cellNumber); // Add selected cell to ComputerOwnedCells

            console.log(`[Computer]: has selected cell ${cellNumber}!`);
            console.log(`[ComputerOwnedCells]: ${ComputerOwnedCells.toString()}`);
    
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

let CoolDown = false;

function CellSelected(GameCell) {

    setTimeout(() => {
        CoolDown = false;
        console.log(`[CoolDown]: ${CoolDown.valueOf()}`);
    }, 1200);

    // Check if selected cell is available:
    if(GameCell.classList.contains("AvailableCellArea") && CoolDown === false) {

        CoolDown = true;
        console.warn(`[CoolDown]: ${CoolDown.valueOf()}`);

        console.log(GameCell.id + ` has been clicked!`);
        GameCell.classList.toggle("AvailableCellArea");
        GameCell.textContent = PlayerPiece

        let cellId = GameCell.id;
        let cellNumber = parseInt(cellId.split('_')[1]);

        PlayerOwnedCells.push(cellNumber); // Add selected cell to PlayerOwnedCells

        console.log(`[Player]: Cell ${cellNumber} has been clicked!`);
        console.log(`[PlayerOwnedCells]: ${PlayerOwnedCells.toString()}`);

        setTimeout(() => { 
            ComputerSelectCell() 
        }, 1000);

    } else {
        GameCell.style.background = '#E06262'
        setTimeout(() => {
            GameCell.style.background = 'unset'
        }, 500);
    }

    
}


// On Page Load:
MakeAllCellsAvailable()