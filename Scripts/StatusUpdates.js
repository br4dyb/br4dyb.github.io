// Elements:
GitHubStatusCell = document.getElementById('GitHubStatusCell');
UserAccountsStatusCell = document.getElementById('UserAccountsStatusCell');
FirebaseStatusCell = document.getElementById('FirebaseStatusCell');
GameLeaderboardsCell = document.getElementById('GameLeaderboardsCell');
ContactPortalStatusCell = document.getElementById('ContactPortalStatusCell');
let AllStatusCells = [GitHubStatusCell, UserAccountsStatusCell, FirebaseStatusCell, GameLeaderboardsCell, ContactPortalStatusCell];

let ErrorInformationFullWrap = document.getElementById('ErrorInformationFullWrap');
let AllSystemInfoWrap = document.getElementById('AllSystemInfoWrap');

// Variables:
let AllSystemsData = {Name: 'All Systems', Data: null}
let GitHubSystemData = {Name: 'GitHub', Data: null};
let UserAccountsSystemData = {Name: 'User Accounts', Data: null};
let FirebaseSystemData = {Name: 'Firebase Storage', Data: null};
let GameLeaderboardSystemData = {Name: 'Game Leaderboards', Data: null};
let ContactPortalSystemData = {Name: 'Contact Portal', Data: null};
let SystemsArray = [AllSystemsData, GitHubSystemData, UserAccountsSystemData, FirebaseSystemData, GameLeaderboardSystemData, ContactPortalSystemData];

let MainSystemOperational = true;

// Load Statuses:
function GetSystemStatuses() {
        // All Systems:
    db.collection('SystemStatus').doc('AllSystems').get().then((doc) => {
        if(doc.exists){
            AllSystemsData.Data = doc.data();
        }else{
            console.warn('Doc not Found!')
        }
    }).catch((error) => {
        console.warn('Error Getting System Status:');
        console.log(error);
    })

        // GitHub:
    db.collection('SystemStatus').doc('GitHub').get().then((doc) => {
        if(doc.exists){
            GitHubSystemData.Data = doc.data();
        }else{
            console.warn('Doc not Found!')
        }
    }).catch((error) => {
        console.warn('Error Getting System Status:');
        console.log(error);
    })

        // UserAccounts:
    db.collection('SystemStatus').doc('UserAccounts').get().then((doc) => {
        if(doc.exists){
            UserAccountsSystemData.Data = doc.data();
        }else{
            console.warn('Doc not Found!')
        }
    }).catch((error) => {
        console.warn('Error Getting System Status:');
        console.log(error);
    })

        // Firebase Storage:
    db.collection('SystemStatus').doc('FirebaseStorage').get().then((doc) => {
        if(doc.exists){
            FirebaseSystemData.Data = doc.data();
        }else{
            console.warn('Doc not Found!')
        }
    }).catch((error) => {
        console.warn('Error Getting System Status:');
        console.log(error);
    })

        // Game Leaderboards:
    db.collection('SystemStatus').doc('GameLeaderboards').get().then((doc) => {
        if(doc.exists){
            GameLeaderboardSystemData.Data = doc.data();
        }else{
            console.warn('Doc not Found!')
        }
    }).catch((error) => {
        console.warn('Error Getting System Status:');
        console.log(error);
    })

        // Contact Portal:
    db.collection('SystemStatus').doc('ContactPortal').get().then((doc) => {
        if(doc.exists){
            ContactPortalSystemData.Data = doc.data();
        }else{
            console.warn('Doc not Found!')
        }
    }).catch((error) => {
        console.warn('Error Getting System Status:');
        console.log(error);
    })

    setTimeout(() => {
        UpdateStatusTable();
    }, 1000);
    
}

document.addEventListener('DOMContentLoaded', GetSystemStatuses);

let ElementToUpdate;
function UpdateStatusTable() {
    SystemsArray.forEach(SystemData => {

        GetSystemName();

        function GetSystemName(){

            if(SystemData.Name === 'All Systems' && SystemData.Data.Operational === false){
                console.warn('All Systems: NOT OPERATIONAL!')
                MainSystemOperational = false;
                AllSystemInfoWrap.classList.remove('hidden')

                // Set Each Cell to NonOperational!
                AllStatusCells.forEach(Cell => {
                    Cell.classList.remove('Operational', 'Limited');
                    Cell.classList.add('NonOperational');
                    Cell.innerHTML = `
                <div class="FlexAlignCenterRow"> <span class="material-symbols-rounded OfflineIcon"> Warning </span> Non Operational </div>`;
                })

            }if(MainSystemOperational){

                // Assign MainSystemOnline SessionStorage:
                sessionStorage.setItem('MainServerOnline', 'true');

                // Update Each System:
                if(SystemData.Name === 'GitHub'){
                    ElementToUpdate = GitHubStatusCell;
                    UpdateSystemInformation();
                }
    
                if(SystemData.Name === 'User Accounts'){
                    ElementToUpdate = UserAccountsStatusCell;
                    UpdateSystemInformation();
                }
    
                if(SystemData.Name === 'Firebase Storage'){
                    ElementToUpdate = FirebaseStatusCell;
                    UpdateSystemInformation();
                }
    
                if(SystemData.Name === 'Game Leaderboards'){
                    ElementToUpdate = GameLeaderboardsCell;
                    UpdateSystemInformation();
                }
    
                if(SystemData.Name === 'Contact Portal'){
                    ElementToUpdate = ContactPortalStatusCell;
                    UpdateSystemInformation();
                }
            }
            
        }
        

        function UpdateSystemInformation(){
            // console.log('Updating:', SystemData.Name )
            // console.log(SystemData.Data)

            // System Offline:
            if(SystemData.Data.NonOperational){
                ElementToUpdate.classList.remove('Limited', 'Operational');
                ElementToUpdate.classList.add('NonOperational');
                ElementToUpdate.innerHTML = `
                    <div class="FlexAlignCenterRow"> <span class="material-symbols-rounded OfflineIcon"> Warning </span> Non Operational </div> 
                    <p onclick='GetIssueDetails("${SystemData.Name}")' class="ErrorDetails"> More Information </p>`;
            }else{
            // System Limited:
            if(SystemData.Data.Limited){
                ElementToUpdate.classList.remove('NonOperational', 'Operational');
                ElementToUpdate.classList.add('Limited');
                ElementToUpdate.innerHTML = `
                    <div class="FlexAlignCenterRow"> <span class="material-symbols-rounded"> Exclamation </span> Limited Usage </div> 
                    <p onclick='GetIssueDetails("${SystemData.Name}")' class="ErrorDetails"> More Information </p>`;
            }else{
            // System Online:
            if(SystemData.Data.Operational){
                ElementToUpdate.classList.remove('NonOperational', 'Limited');
                ElementToUpdate.classList.add('Operational');
                ElementToUpdate.innerHTML = `
                <div class="FlexAlignCenterRow"> <span class="material-symbols-rounded"> Check </span> Operational </div> `;
            }
            }}
        }
        

    })
}

function GetIssueDetails(SystemName) {
    let SystemIssueDataObject = SystemsArray.find(system => system.Name === SystemName);
    let SystemIssueData = SystemIssueDataObject.Data;

    let SystemErrorInfoName = document.getElementById('SystemErrorInfoName');
    let SystemErrorInfoDesc = document.getElementById('SystemErrorInfoDesc');
    let SystemErrorInfoReportDate = document.getElementById('SystemErrorInfoReportDate');

    // Update Information:
    SystemErrorInfoName.innerText = SystemIssueDataObject.Name;
    SystemErrorInfoDesc.innerText = SystemIssueData.IssueDetails.Desc;
    SystemErrorInfoReportDate.innerText = SystemIssueData.IssueDetails.ReportedDate;

    // Show Details Wrap:
    ErrorInformationFullWrap.style.opacity = 0;
    ErrorInformationFullWrap.classList.remove('hidden');
    setTimeout(() => {
        ErrorInformationFullWrap.style.opacity = 1;
    }, 450)

}

function CloseIssueDetails(){
    ErrorInformationFullWrap.style.opacity = 0;
    setTimeout(() => {
        ErrorInformationFullWrap.classList.add('hidden');
    }, 450)
}