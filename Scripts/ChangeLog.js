// Elements:
const ChangeLogGrid = document.getElementById('ChangeLogGrid');
const ChangeLog_NewEntryFullWrap = document.getElementById('CreateNew_ChangeLog_FullWrap');
    // Inputs:
    const ChangeLog_InputVersion = document.getElementById('ChangeLog_InputVersion');
    const ChangeLog_InputDetails = document.getElementById('ChangeLog_InputDetails');
    const ChangeLog_InputDate = document.getElementById('ChangeLog_InputDate');

// Functions:

function LoadChangeLogData(){

}

function OpenChnageLogNewEntry(){
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

function ChangeLogSubmitNewEntry(){

}