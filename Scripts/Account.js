// Elements:
const LoginUserWrap = document.getElementById('AccountLoginPanel');
const CreateUserWrap = document.getElementById('AccountCreatePanel');
const SubmitErrorMsg = document.getElementById('AccountSubmitErrorMsg');
const MyAccountPanel = document.getElementById('MyAccountPanel');
const ChangeAccountPicturePanel = document.getElementById('ChangeAccountPicturePanel');
const DeleteAccountConfirmPanel = document.getElementById('DeleteAccountConfirmPanel');

const MyAccount_Username = document.getElementById('MyAccount_Username');
const MyAccount_Image = document.getElementById('MyAccount_Image');
const MyAccount_Email = document.getElementById('MyAccount_Email');
const MyAccount_UID = document.getElementById('MyAccount_UID');

//Inputs:
const AccountLogin_EmailInput = document.getElementById('AccountLogin_EmailInput');
const AccountLogin_PasswordInput = document.getElementById('AccountLogin_PasswordInput');
const AccountCreate_UsernameInput = document.getElementById('AccountCreate_UsernameInput');
const AccountCreate_EmailInput = document.getElementById('AccountCreate_EmailInput');
const AccountCreate_PasswordInput = document.getElementById('AccountCreate_PasswordInput');

// Variables:
let Account_Debug = false;
let CurrentSignInType = 'Sign In';
let CurrentUser = null;
let CurrentUserName = 'null';
let CurrentUserEmail = 'null';
let CurrentUserPicture = null;

// TO DO:
    // -- Finish ChangePicture Function
        // -- Update and Confirm Image Url as Entered?
    // -- Finish Delete Account Function
        // -- Try to figure out ReCredential()ing the account?
    // -- Update New/Existing Users to FIRESTORE:
        // -- Create and Utilize the AdminUser flag

// AuthState Observer:
firebase.auth().onAuthStateChanged((user) => {
    if(user){
        // Signed In:
        if(Account_Debug){console.info('User is Signed In!')};
            // Assign Variables:
        CurrentUser = user;
        CurrentUserEmail = CurrentUser.email;
        CurrentUserName = CurrentUser.displayName;
        CurrentUserPicture = CurrentUser.photoURL;
            // Debug:
        if(Account_Debug){
            console.log('Email:',CurrentUserEmail);
            console.log('DisplayName:',CurrentUserName);
            console.log('PhotoURL:',CurrentUserPicture);
        }
            // Update MyAccount Panel:
        MyAccount_Username.innerText = CurrentUserName;
        MyAccount_Image.src = CurrentUserPicture;
        MyAccount_Email.innerText = 'Email: ' + CurrentUser.email;
        MyAccount_UID.innerText = 'UID: ' + CurrentUser.uid;
            // Show Account Panel:
        LoginUserWrap.style.opacity = 0;
        CreateUserWrap.style.opacity = 0;
        setTimeout(() => {
            LoginUserWrap.classList.add('hidden');
            CreateUserWrap.classList.add('hidden');
            MyAccountPanel.style.opacity = 0;
            MyAccountPanel.classList.remove('hidden')
            setTimeout(() => {
                MyAccountPanel.style.opacity = 1;
            }, 50)
        }, 350);
    }else{
        // Signed Out:
        if(Account_Debug){console.info('User is Signed Out!')};
        CurrentUser = null;
        CurrentUserEmail = null;
        CurrentUserName = null;
        CurrentUserPicture = null;

        // Show Login Panel:
        MyAccountPanel.style.opacity = 0;
        setTimeout(() => {
            MyAccountPanel.classList.add('hidden');
            LoginUserWrap.style.opacity = 0;
            LoginUserWrap.classList.remove('hidden')
            setTimeout(() => {
                LoginUserWrap.style.opacity = 1;
                CurrentSignInType = 'Sign In';
            }, 50)
        }, 350);
    }
});

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

        }
    }

    
}

function SubmitSignIn(){

    auth.signInWithEmailAndPassword(AccountLogin_EmailInput.value, AccountLogin_PasswordInput.value)
    .then((userCredential) => {
        // Signed in
    })
    .catch((error) => {
        var errorCode = error.code;

        if(errorCode == 'auth/invalid-credential'){
            ShowSubmitError('Invalid Credentials, Try Again!');

        }else{if(errorCode == 'auth/credential-already-in-use'){
            ShowSubmitError('Credential Already Used, Try Again!');

        }else{if(errorCode == 'auth/email-already-in-use'){
            ShowSubmitError('Email Already Used, Try Again!');

        }else{if(errorCode == 'auth/invalid-email'){
            ShowSubmitError('Invalid Email, Try Again!');

        }else{if(errorCode == 'auth/wrong-password'){
            ShowSubmitError('Invalid Password, Try Again!');

        }else{
            ShowSubmitError('Unknown Error, Try Again!');
            console.warn('Error Loggin In:');
            console.log(errorCode);
            console.log(error.message);
        }}}}}
    });

}

function SubmitCreateAccount(){
    firebase.auth().createUserWithEmailAndPassword(AccountCreate_EmailInput.value, AccountCreate_PasswordInput.value)
    .then((userCredential) => {
    // Signed in 
        userCredential.user.updateProfile({
            displayName: AccountCreate_UsernameInput.value,
            photoURL: "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg"
          }).then(() => {
            // Update successful
            MyAccount_Username.innerText = AccountCreate_UsernameInput.value;
            MyAccount_Image.src = "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg";
          }).catch((error) => {
            // An error occurred
            console.warn('An Error Occured Updating the Profile:');
            console.log(error);
          });
    })
    .catch((error) => {
    var errorCode = error.code;
        if(errorCode == 'auth/invalid-credential'){
            ShowSubmitError('Invalid Credentials, Try Again!');

        }else{
        if(errorCode == 'auth/credential-already-in-use'){
            ShowSubmitError('Credential Already Used, Try Again!');

        }else{
        if(errorCode == 'auth/email-already-in-use'){
            ShowSubmitError('Email Already Used, Try Again!');

        }else{
        if(errorCode == 'auth/invalid-email'){
            ShowSubmitError('Invalid Email, Try Again!');

        }else{
        if(errorCode == 'auth/wrong-password'){
            ShowSubmitError('Invalid Password, Try Again!');

        }else{
            ShowSubmitError('Unknown Error, Try Again!');
            console.warn('Error Loggin In:');
            console.log(errorCode);
            console.log(error.message);
        }}}}}
        
        
        
        
    });
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
    // console.info('Attempting to Log Out!')
    // Sign out user
    auth.signOut()
    .then(() => {
    // console.log("User signed out successfully");
    })
    .catch((error) => {
    console.error("Error signing out:", error);
    });
}
