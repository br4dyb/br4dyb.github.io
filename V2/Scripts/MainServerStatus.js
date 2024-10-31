let MainServerStatus = sessionStorage.getItem('MainServerOnline');
let MainServerStatus_Debug = false;

// Check for Session Storage:
if(MainServerStatus){
    // Found:
    if(MainServerStatus_Debug){console.log('MainServerStatus Found!')};
    CheckMainServerStatus();
}else{
    // Not Found:
    if(MainServerStatus_Debug){console.warn('MainServerStatus NOT Found!')};

    // Load & Create Storage:
    db.collection('SystemStatus').doc('AllSystems').get().then(AllSystemsDoc => {
        let AllSystemsDocData = AllSystemsDoc.data();
        let MainSystemOnline = AllSystemsDocData.Operational;
        sessionStorage.setItem('MainServerOnline', MainSystemOnline);
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
    if(MainServerStatus === "false"){
        if(MainServerStatus_Debug){console.warn('MainServer: Offline')};
        // Redirect:
        sessionStorage.clear('MainServerOnline');
        location.assign('/Pages/Offline.html')
    }
}