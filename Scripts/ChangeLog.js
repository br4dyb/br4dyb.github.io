// Elements:
let ChangeLogGrid = document.getElementById('ChangeLogGrid');
let ChangeLog_NewEntryFullWrap = document.getElementById('CreateNew_ChangeLog_FullWrap');

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