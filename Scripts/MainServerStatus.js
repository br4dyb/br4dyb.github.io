let MainServerStatus = sessionStorage.getItem('MainServerOnline');
let MainServerStatus_Debug = false;

let NoRedirect = false; // [IMPORTANT]: Set to FALSE before publishing

// Check for Session Storage:
if(MainServerStatus){
    // Found:
    if(MainServerStatus_Debug){console.log('MainServerStatus Found!')};
    CheckMainServerStatus();
}else{
    // Not Found:
    if(MainServerStatus_Debug){console.warn('MainServerStatus NOT Found!')};

    // Load & Create Storage:
    db.collection('SystemStatus').doc('Data').get().then(SystemStatusDataDoc => {
        let AllSystemsDocData = SystemStatusDataDoc.data();
        let MainSystemOnline = AllSystemsDocData.AllSystems.Operational;
        sessionStorage.setItem('MainServerOnline', MainSystemOnline);
        MainServerStatus = sessionStorage.getItem('MainServerOnline');
        CheckMainServerStatus();
    }).catch((error) => {
        console.warn('Error Getting MainSystemStatus:');
        console.log(error);
    })
}

function CheckMainServerStatus() {

    // Online:
    if(MainServerStatus === "true"){
        if(MainServerStatus_Debug){console.info('MainServer: Online')};
    }

    // Offline:
    if(MainServerStatus === "false" && !NoRedirect){
        if(MainServerStatus_Debug){console.warn('MainServer: Offline')};
        // Redirect:
        location.assign('/Pages/Offline.html');
        
    }
}

// Alert NoRedirect if true:
if(NoRedirect){
    console.error('[MainServerStatus]: NoRedirect is TRUE')
}