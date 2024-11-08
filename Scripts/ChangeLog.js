// Elements:
const ChangeLogGrid = document.getElementById('ChangeLogGrid');
const ChangeLog_NewEntryFullWrap = document.getElementById('CreateNew_ChangeLog_FullWrap');
    // Inputs:
    const ChangeLog_InputVersion = document.getElementById('ChangeLog_InputVersion');
    const ChangeLog_InputDetails = document.getElementById('ChangeLog_InputDetails');
    const ChangeLog_InputDate = document.getElementById('ChangeLog_InputDate');

// Variables:

let ChangeLogLoaded = false;
let ChangeLog_Debug = true;


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
        if(ChangeLog_Debug){console.info('ChangeLog Loading!');}

        // Reset ChangeLogGrid:
        ChangeLogGrid.innerHTML = `
        <!-- Header Row: -->
        <tr class="ChangeLog_Row">
            <th class="ChnageLog_HeadingCell"> Version: </th>
            <th class="ChnageLog_HeadingCell"> Changes: </th>
            <th class="ChnageLog_HeadingCell"> Date: </th>
        </tr>

        <!-- Content Rows: -->`;

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

                let NewRowElement = document.createElement('tr')
                NewRowElement.classList.add('ChangeLog_Row');
                NewRowElement.innerHTML = `
                    <td class="ChnageLog_ContentCell"> ${entry.Version} </td>
                    <td class="ChnageLog_ContentCell textAlignLeft"> ${entry.Details} </td>
                    <td class="ChnageLog_ContentCell"> ${entry.Date} </td>`;

                ChangeLogGrid.appendChild(NewRowElement);

            });
            // console.log('-----------------');
            

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