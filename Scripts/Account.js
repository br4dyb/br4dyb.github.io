// Elements:
const LoginUserWrap = document.getElementById('AccountLoginPanel');
const CreateUserWrap = document.getElementById('AccountCreatePanel');
const SubmitErrorMsg = document.getElementById('AccountSubmitErrorMsg');
const MyAccountPanel = document.getElementById('MyAccountPanel');
const ChangeAccountPicturePanel = document.getElementById('ChangeAccountPicturePanel');
const DeleteAccountConfirmPanel = document.getElementById('DeleteAccountConfirmPanel');
const MyAccount_Username = document.getElementById('MyAccount_Username');

    //Inputs:
const AccountLogin_EmailInput = document.getElementById('AccountLogin_EmailInput');
const AccountLogin_PasswordInput = document.getElementById('AccountLogin_PasswordInput');
const AccountCreate_UsernameInput = document.getElementById('AccountCreate_UsernameInput');
const AccountCreate_EmailInput = document.getElementById('AccountCreate_EmailInput');
const AccountCreate_PasswordInput = document.getElementById('AccountCreate_PasswordInput');

// Variables:
let Account_Debug = true;
let CurrentSignInType = 'Sign In';
let CurrentUser = null;
let CurrentUserName = 'null';
let CurrentUserEmail = 'null';
let CurrentUserPicture = null;


// Functions:
function SwitchSignInType(){
    if(CurrentSignInType === 'Sign In'){
        CurrentSignInType = 'Create';
        LoginUserWrap.style.opacity = 0;
        setTimeout(() => {
            LoginUserWrap.classList.add('hidden');
            CreateUserWrap.style.opacity = 0;
            CreateUserWrap.classList.remove('hidden')
            setTimeout(() => {CreateUserWrap.style.opacity = 1;}, 200)
        }, 400);
        console.log('SignInType:',CurrentSignInType);
    }else{
        if(CurrentSignInType === 'Create'){
            CurrentSignInType = 'Sign In';
            CreateUserWrap.style.opacity = 0;
            setTimeout(() => {
                CreateUserWrap.classList.add('hidden');
                LoginUserWrap.style.opacity = 0;
                LoginUserWrap.classList.remove('hidden')
                setTimeout(() => {LoginUserWrap.style.opacity = 1;}, 200)
            }, 400);
            console.log('SignInType:',CurrentSignInType);
        }
    }

    
}

function SubmitSignIn(){
    console.info('SignIn Attempt:')
    console.log('Email:',AccountLogin_EmailInput.value);
    console.log('Password:',AccountLogin_PasswordInput.value);
    ShowSubmitError('Server Error: 1500');
}

function SubmitCreateAccount(){
    console.info('Create Account Attempt:')
    console.log('Username:',AccountCreate_UsernameInput.value);
    console.log('Email:',AccountCreate_EmailInput.value);
    console.log('Password:',AccountCreate_PasswordInput.value);
    ShowSubmitError('Server Error: 1500');
}

function ShowSubmitError(ErrorMsg){
    SubmitErrorMsg.innerText = ErrorMsg;
    SubmitErrorMsg.style.opacity = 0;
    SubmitErrorMsg.classList.remove('hidden');
    setTimeout(() => {SubmitErrorMsg.style.opacity = 1;}, 150)

    // Hide after wait:
    setTimeout(() => {
        SubmitErrorMsg.style.opacity = 0;
        setTimeout(() => {SubmitErrorMsg.classList.remove('hidden'); SubmitErrorMsg.innerText = '%ERROR%';}, 350)
    }, 1500);
}

function BackToAccountPanel(){
    ChangeAccountPicturePanel.style.opacity = 0;
    DeleteAccountConfirmPanel.style.opacity = 0;
    setTimeout(() => {
        ChangeAccountPicturePanel.classList.add('hidden');
        DeleteAccountConfirmPanel.classList.add('hidden');
        MyAccountPanel.style.opacity = 0;
        MyAccountPanel.classList.remove('hidden');
        setTimeout(() => {MyAccountPanel.style.opacity = 1;}, 50)
    },350)
}

function ChangeAccountPicture(){
    document.getElementById('MyAccountPicture_Username').innerText = CurrentUserName;
    document.getElementById('MyAccountPicture_Image').src = CurrentUserPicture;
    MyAccountPanel.style.opacity = 0;
    setTimeout(() => {
        MyAccountPanel.classList.add('hidden');
        ChangeAccountPicturePanel.style.opacity = 0;
        ChangeAccountPicturePanel.classList.remove('hidden');
        setTimeout(() => {ChangeAccountPicturePanel.style.opacity = 1;}, 50)
    },350)
}

function BeginDeleteAccount(){
    document.getElementById('MyAccountDelete_Username').innerText = CurrentUserName;
    document.getElementById('MyAccountDelete_Image').src = CurrentUserPicture;
    MyAccountPanel.style.opacity = 0;
    setTimeout(() => {
        MyAccountPanel.classList.add('hidden');
        DeleteAccountConfirmPanel.style.opacity = 0;
        DeleteAccountConfirmPanel.classList.remove('hidden');
        setTimeout(() => {DeleteAccountConfirmPanel.style.opacity = 1;}, 50)
    },350)
}

function LogOutAccount(){
    console.info('Attempting to Log Out!')
}
