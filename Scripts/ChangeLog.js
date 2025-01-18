// Elements:
const ChangeLogEntriesContainer = document.getElementById('ChangeLogEntriesContainer');
const ChangeLog_NewEntryFullWrap = document.getElementById('CreateNew_ChangeLog_FullWrap');
    // Inputs:
    const ChangeLog_InputVersion = document.getElementById('ChangeLog_InputVersion');
    const ChangeLog_InputDetails = document.getElementById('ChangeLog_InputDetails');
    const ChangeLog_InputDate = document.getElementById('ChangeLog_InputDate');

// Variables:

let ChangeLogLoaded = false;
let ChangeLog_Debug = false;


// Functions:

function OpenChnageLogNewEntry(){

    // Update Inputs:
    const today = new Date(); 
    // Format date to 'M/D/YY'
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${String(today.getFullYear()).slice(-2)}`;
    // Set the value to the formatted date
    ChangeLog_InputDate.value = formattedDate;

    ChangeLog_InputVersion.value = SiteVersion;

    ChangeLog_NewEntryFullWrap.style.opacity = 0;
    ChangeLog_NewEntryFullWrap.classList.remove('hidden');
    setTimeout(() => {
        ChangeLog_NewEntryFullWrap.style.opacity = 1;
    }, 100);
}

function CloseChnageLogNewEntry(){
    ChangeLog_NewEntryFullWrap.style.opacity = 0;
    setTimeout(() => {
        ChangeLog_NewEntryFullWrap.classList.add('hidden');
    }, 360);
}

function AddChangeLogEntry(){
    let VersionNumber = ChangeLog_InputVersion.value;
    let VersionDetails = ChangeLog_InputDetails.value;
    let VersionDate = ChangeLog_InputDate.value;
    let sanitizedVersion = VersionNumber.replace(/\./g, '_');
    ChangeLogLoaded = false;

    db.collection('ChangeLog').doc('Data').update({
        [sanitizedVersion] : {Version : VersionNumber, Details: VersionDetails, Date : VersionDate}
    
    }).then(() => {
        // console.info('Doc Set!')
        CloseChnageLogNewEntry();

        setTimeout(() => {
            InitiateChangeLog();
        }, 1000);

    }).catch((error) => {
        console.warn('Upload Unsuccessful');
        console.log(error);

    })
}

function InitiateChangeLog(){

    if(!ChangeLogLoaded){

        ChangeLogLoaded = true;
        if(ChangeLog_Debug){console.info('Fetching ChangeLog Data!');}

        // Reset ChangeLogGrid:
        ChangeLogEntriesContainer.innerHTML = ``;

        // Get ChnageLog Data:
        db.collection('ChangeLog').doc('Data').get().then((docRef) => {

            let ChangeLogData = docRef.data();
            let EachVersionArray = Object.values(ChangeLogData);

            // Sort EachVersionArray by version number
            EachVersionArray.sort((a, b) => {
                // Split version numbers by dots, then compare each part as integers
                let aParts = a.Version.split('.').map(Number);
                let bParts = b.Version.split('.').map(Number);

                for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
                    let aNum = aParts[i] || 0; // Default to 0 if part is missing
                    let bNum = bParts[i] || 0;

                    if (aNum !== bNum) {
                        return bNum - aNum;
                    }
                }
                return 0;
            });


            EachVersionArray.forEach((entry) => {
                // console.log('-----------------');
                // console.log(`Version: ${entry.Version}`);
                // console.log(`Date: ${entry.Date}`);
                // console.log(`Details: ${entry.Details}`);

                let NewEntryElm = document.createElement('div');
                NewEntryElm.classList.add('ChangeLog_EntryWrap', 'box-shadow-light', 'text-shadow-dark');
                NewEntryElm.innerHTML = `
                    <div class="EntryVersionNumber">
                        ${entry.Version}
                    </div>
                        
                    <p class="EntryDetails">
                        ${entry.Details}
                    </p>
    
                    <div class="EntryDate">
                        ${entry.Date}
                    </div>`;

                ChangeLogEntriesContainer.appendChild(NewEntryElm);

            });
            

        }).catch((error) => {
            console.warn('Error:')
            console.log(error)
        })

    } else{
        if(ChangeLog_Debug){console.info('ChangeLog Already Loaded!');}
    }
}

// InitiateChangeLog()
// Only Fire when Viewing ^^