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
const VerifyEmailButton = document.getElementById('VerifyEmailButton');
const AccountEmailNotVerifiedMsg = document.getElementById('AccountEmailNotVerifiedMsg')
const EmailVerificationSentMsg = document.getElementById('EmailVerificationSentMsg');

//Inputs:
const AccountLogin_EmailInput = document.getElementById('AccountLogin_EmailInput');
const AccountLogin_PasswordInput = document.getElementById('AccountLogin_PasswordInput');
const AccountCreate_UsernameInput = document.getElementById('AccountCreate_UsernameInput');
const AccountCreate_EmailInput = document.getElementById('AccountCreate_EmailInput');
const AccountCreate_PasswordInput = document.getElementById('AccountCreate_PasswordInput');
const ConfirmDelete_PasswordInput = document.getElementById('ConfirmDelete_PasswordInput');

// Variables:
let Account_Debug = true;
let CurrentSignInType = 'Sign In';
let CurrentUser = null;
let CurrentUserName = null;
let CurrentUserEmail = null;
let CurrentUserPicture = null;

// TO DO:
    // -- Finish ChangePicture Function
        // -- Update and Confirm Image Url as Entered?

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
            // Check for Email Verified:
            if(user.emailVerified){
                console.info('email verified!')
                VerifyEmailButton.classList.add('hidden');
                AccountEmailNotVerifiedMsg.classList.add('hidden');
            }else{
                console.info('email NOT verified!')
            }

            // Debug:
        if(Account_Debug){
            console.log('Email:',CurrentUserEmail);
            console.log('DisplayName:',CurrentUserName);
            console.log('PhotoURL:',CurrentUserPicture);
        }

            // Update MyAccount Panel:
        MyAccount_Username.innerText = CurrentUserName;
        if(MyAccount_Image != null){MyAccount_Image.src = CurrentUserPicture;}
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

        if (errorCode === 'auth/invalid-credential') {
            ShowSubmitError('Invalid Credentials, Try Again!');
        } else if (errorCode === 'auth/credential-already-in-use') {
            ShowSubmitError('Credential Already Used, Try Again!');
        } else if (errorCode === 'auth/email-already-in-use') {
            ShowSubmitError('Email Already Used, Try Again!');
        } else if (errorCode === 'auth/invalid-email') {
            ShowSubmitError('Invalid Email, Try Again!');
        } else if (errorCode === 'auth/wrong-password') {
            ShowSubmitError('Invalid Password, Try Again!');
        } else if (errorCode === 'auth/missing-password'){
            ShowSubmitError('Please Enter Your Password!');
        } else {
            ShowSubmitError('Unknown Error, Try Again!');
            console.warn('Error Logging In:');
            console.log(errorCode);
            console.log(error.message);
        }
    });

}

function SubmitCreateAccount(){
    firebase.auth().createUserWithEmailAndPassword(AccountCreate_EmailInput.value, AccountCreate_PasswordInput.value)
    .then((userCredential) => {
    // Signed in 
        // Update User Variables:
            CurrentUserName = AccountCreate_UsernameInput.value;
            CurrentUserPicture = "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg";
        // Update Profile in Auth:
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
        // Send Verification Email:
        firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
            // Email verification sent!
            // Show Alert:
            setTimeout(() => {ShowEmailVerificationSentMsg();}, 1500)
        }).catch((error) => {
            ShowSubmitError('Verification Email was not Sent, Try Again Later!');
        })
    })
    .catch((error) => {
        var errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
            ShowSubmitError('Invalid Credentials, Try Again!');
        } else if (errorCode === 'auth/credential-already-in-use') {
            ShowSubmitError('Credential Already Used, Try Again!');
        } else if (errorCode === 'auth/email-already-in-use') {
            ShowSubmitError('Email Already Used, Try Again!');
        } else if (errorCode === 'auth/invalid-email') {
            ShowSubmitError('Invalid Email, Try Again!');
        } else if (errorCode === 'auth/wrong-password') {
            ShowSubmitError('Invalid Password, Try Again!');
        } else if (errorCode === 'auth/missing-password'){
            ShowSubmitError('Please Enter Your Password!');
        } else {
            ShowSubmitError('Unknown Error, Try Again!');
            console.warn('Error Creating Account:');
            console.log(errorCode);
            console.log(error.message);
        }
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

function ShowEmailVerificationSentMsg(){
    EmailVerificationSentMsg.style.opacity = 0;
    EmailVerificationSentMsg.classList.remove('hidden');
    setTimeout(() => {
        EmailVerificationSentMsg.style.opacity = 1;
    }, 380)

    // Hide After Wait:
    setTimeout(() => {
        EmailVerificationSentMsg.style.opacity = 0;
        setTimeout(() => {
            EmailVerificationSentMsg.classList.add('hidden');
        }, 350);
    }, 3350)
}

function ResendEmailVerification(){
    // Send Verification Email:
    firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
        // Email verification sent!
        // Show Alert:
        ShowEmailVerificationSentMsg()
    }).catch((error) => {
        console.warn('Verification Email NOT Sent:');
        console.log(error);
        ShowSubmitError('Verification Email was not Sent, Try Again Later!');
    })
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

function ConfirmDeleteAccount() {
    // Get Credentials
    let credential = firebase.auth.EmailAuthProvider.credential(
        CurrentUserEmail,
        ConfirmDelete_PasswordInput.value
    );
    
    CurrentUser.reauthenticateWithCredential(credential).then(() => {
        // User re-authenticated
        if(Account_Debug){console.log('Re-Authenticated!')};
        CurrentUser.delete().then(() => {
            // User deleted.
            if(Account_Debug){console.info('User Deleted!')}
            // Go back to SignIn Panel:
            DeleteAccountConfirmPanel.style.opacity = 0;
            setTimeout(() => {
                DeleteAccountConfirmPanel.classList.add('hidden');
            }, 350);
          }).catch((error) => {
            console.warn('An Error Occured - Deleting Account:')
            console.log(error)
          });
    }).catch((error) => {
        // Handle errors
        console.warn('Not Authenticated!');
        console.log(error);

        var errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
            ShowSubmitError('Invalid Credentials, Try Again!');
        } else if (errorCode === 'auth/credential-already-in-use') {
            ShowSubmitError('Credential Already Used, Try Again!');
        } else if (errorCode === 'auth/email-already-in-use') {
            ShowSubmitError('Email Already Used, Try Again!');
        } else if (errorCode === 'auth/invalid-email') {
            ShowSubmitError('Invalid Email, Try Again!');
        } else if (errorCode === 'auth/wrong-password') {
            ShowSubmitError('Invalid Password, Try Again!');
        } else if (errorCode === 'auth/missing-password'){
            ShowSubmitError('Please Enter Your Password!');
        } else {
            ShowSubmitError('Unknown Error, Try Again!');
            console.warn('Error Logging In:');
            console.log(errorCode);
            console.log(error.message);
        }
    });
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
