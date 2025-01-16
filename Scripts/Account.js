// Elements:
const LoginUserWrap = document.getElementById('AccountLoginPanel');
const CreateUserWrap = document.getElementById('AccountCreatePanel');
const SubmitErrorMsg = document.getElementById('AccountSubmitErrorMsg');
const MyAccountPanel = document.getElementById('MyAccountPanel');
const ManageAccountPanel = document.getElementById('ManageAccountPanel');
const ConfirmPassword_ManageAccountWrap = document.getElementById('ConfirmPassword_ManageAccountWrap');
const ManageAccountOptionButtonsWrap = document.getElementById('ManageAccountOptionButtonsWrap');
const ChangeAccountPicturePanel = document.getElementById('ChangeAccountPicturePanel');
const DeleteAccountConfirmPanel = document.getElementById('DeleteAccountConfirmPanel');
const ChangeAccountEmailPanel = document.getElementById('ChangeAccountEmailPanel');
const ChangeAccountPasswordPanel = document.getElementById('ChangeAccountPasswordPanel');

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
const ManageAccount_PasswordConfrimInput = document.getElementById('ManageAccount_PasswordConfrimInput');
const ManageAccount_ImageInput = document.getElementById('ManageAccount_ImageInput');
const ManageAccount_EmailInput = document.getElementById('ManageAccount_EmailInput');
const ManageAccount_NewPasswordInput = document.getElementById('ManageAccount_NewPasswordInput');

// Variables:
let Account_Debug = false;
let CurrentSignInType = 'Sign In';
let CurrentUser = auth.currentUser;
let CurrentUserUID = null;
let CurrentUserName = null;
let CurrentUserEmail = null;
let CurrentUserPicture = null;
let AdminCookie = null;

// TO DO:
    // -- Fix Not Allowed Error When Updating User's Email
//

// AuthState Observer:
firebase.auth().onAuthStateChanged((user) => {
    if(user){
        // Signed In:
            if(Account_Debug){console.info('User is Signed In!')};
        
        // Assign Variables:
            CurrentUser = user;
            CurrentUserUID = user.uid;
            CurrentUserEmail = CurrentUser.email;
            CurrentUserName = CurrentUser.displayName;
            CurrentUserPicture = CurrentUser.photoURL;

        // Check for Email Verified:
            if(user.emailVerified){
                if(Account_Debug){console.info('email verified!');}
                VerifyEmailButton.classList.add('hidden');
                AccountEmailNotVerifiedMsg.classList.add('hidden');
            }else{
                if(Account_Debug){console.info('email NOT verified!');}
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

        // CheckForAdmin:
            CheckForAdmin();

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

        // Remove Admin Flag / Abilities (if exists):
        CheckForAdmin();
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
            newNotifia('Invalid Credentials, Try Again!',{background: 'error', duration: 5000});
        } else if (errorCode === 'auth/credential-already-in-use') {
            newNotifia('Credential Already Used, Try Again!',{background: 'error', duration: 5000});
        } else if (errorCode === 'auth/email-already-in-use') {
            newNotifia('Email Already Used, Try Again!',{background: 'error', duration: 5000});
        } else if (errorCode === 'auth/invalid-email') {
            newNotifia('Invalid Email, Try Again!',{background: 'error', duration: 5000});
        } else if (errorCode === 'auth/wrong-password') {
            newNotifia('Invalid Password, Try Again!',{background: 'error', duration: 5000});
        } else if (errorCode === 'auth/missing-password'){
            newNotifia('Please Enter Your Password!',{background: 'error', duration: 5000});
        } else {
            newNotifia('Unknown Error, Try Again!',{background: 'error', duration: 5000});
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
            CurrentUser = userCredential.user;
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

        
        // Add New User to Database:
            db.collection('Users').doc(userCredential.user.uid).set({
                AdminUser : false,
                Email : userCredential.user.email,
                DisplayName : AccountCreate_UsernameInput.value,
                AccountCreatedDate : userCredential.user.metadata.creationTime
            }).then(() => {
                if(Account_Debug){console.info('User added to database!');}
            }).catch((error) => {
                console.warn('Error adding new user to database:');
                newNotifia('Error Updating to Database! <br> View console for more info!',{background: 'error', duration: 5000});
                console.log(error);
            })

        // Send Verification Email:
            AccountEmailNotVerifiedMsg.classList.remove('hidden');
            VerifyEmailButton.classList.add('hidden');

            firebase.auth().currentUser.sendEmailVerification()
            .then(() => {
                // Email verification sent!
                // Show Alert:
                newNotifia('Please check your email to verify your account!',{duration: 'infinite'});
            }).catch((error) => {
                newNotifia('Verification Email was not Sent, Try Again Later!',{background: 'error', duration: 5000});
                console.log(error)
            })
    })
    .catch((error) => {
        var errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
            newNotifia('Invalid Credentials, Try Again!',{background: 'error', duration: 5000});
        } else if (errorCode === 'auth/credential-already-in-use') {
            newNotifia('Credential Already Used, Try Again!',{background: 'error', duration: 5000});
        } else if (errorCode === 'auth/email-already-in-use') {
            newNotifia('Email Already Used, Try Again!',{background: 'error', duration: 5000});
        } else if (errorCode === 'auth/invalid-email') {
            newNotifia('Invalid Email, Try Again!',{background: 'error', duration: 5000});
        } else if (errorCode === 'auth/wrong-password') {
            newNotifia('Invalid Password, Try Again!',{background: 'error', duration: 5000});
        } else if (errorCode === 'auth/missing-password'){
            newNotifia('Please Enter Your Password!',{background: 'error', duration: 5000});
        } else {
            newNotifia('Unknow Error, Try Again',{background: 'error', duration: 5000});
            console.warn('Error Creating Account:');
            console.log(errorCode);
            console.log(error.message);
        }
    });
}

function ResendEmailVerification(){
    // Send Verification Email:
    firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
        // Email verification sent!
        // Show Alert:
        newNotifia('Please check your email to verify your account!',{background: 'success', duration: 10000});
    }).catch((error) => {
        console.warn('Verification Email NOT Sent:');
        console.log(error);
        newNotifia('Verification Email was not Sent, Try Again Later!',{background: 'error', duration: 10000});
    })
}

function OpenManageAccount(){
    // Update Panel Elements:
    document.getElementById('ManageMyAccount_Username').innerText = CurrentUserName;
    document.getElementById('ManageMyAccount_Email').innerText = CurrentUserEmail;
    document.getElementById('ManageMyAccount_Image').src = CurrentUserPicture;
    MyAccountPanel.style.opacity = 0;
    ManageAccountPanel.style.opacity = 0;
    ConfirmPassword_ManageAccountWrap.classList.remove('hidden');
    ConfirmPassword_ManageAccountWrap.style.opacity = 1;
    ManageAccountOptionButtonsWrap.classList.add('hidden');
    setTimeout(() => {
        ManageAccountPanel.classList.remove('hidden');
        MyAccountPanel.classList.add('hidden');
        setTimeout(() => {ManageAccountPanel.style.opacity = 1;}, 50)
    }, 350);
}

function ManageAccountConfirmPassword(){
    // Get Credentials
    let credential = firebase.auth.EmailAuthProvider.credential(
        CurrentUserEmail,
        ManageAccount_PasswordConfrimInput.value
    );
    
    CurrentUser.reauthenticateWithCredential(credential).then(() => {
        // User re-authenticated
        if(Account_Debug){console.log('Re-Authenticated!')};
        // Show Manage Account Options:
        ConfirmPassword_ManageAccountWrap.style.opacity = 0;
        setTimeout(() => {
            ConfirmPassword_ManageAccountWrap.classList.add('hidden');
            ManageAccountOptionButtonsWrap.style.opacity = 0;
            ManageAccountOptionButtonsWrap.classList.remove('hidden');
            setTimeout(() => {ManageAccountOptionButtonsWrap.style.opacity = 1;}, 50)
        }, 350);
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

function BackToAccountPanel(){
    ManageAccountPanel.style.opacity = 0;
    setTimeout(() => {
        ManageAccountPanel.classList.add('hidden');
        MyAccountPanel.style.opacity = 0;
        MyAccountPanel.classList.remove('hidden');
        setTimeout(() => {MyAccountPanel.style.opacity = 1;}, 50)
    },350)
}

function BackToManagePanel(){
    ChangeAccountPicturePanel.style.opacity = 0;
    DeleteAccountConfirmPanel.style.opacity = 0;
    ChangeAccountEmailPanel.style.opacity = 0;
    ChangeAccountPasswordPanel.style.opacity = 0;
    setTimeout(() => {
        ChangeAccountPicturePanel.classList.add('hidden');
        DeleteAccountConfirmPanel.classList.add('hidden');
        ChangeAccountEmailPanel.classList.add('hidden');
        ChangeAccountPasswordPanel.classList.add('hidden');
        ManageAccountPanel.style.opacity = 0;
        ManageAccountPanel.classList.remove('hidden');
        setTimeout(() => {ManageAccountPanel.style.opacity = 1;}, 50)
    },350)
}

function ShowChangeAccountEmail(){
    document.getElementById('ManageAccountEmail_Username').innerText = CurrentUserName;
    document.getElementById('ManageAccountEmail_Image').src = CurrentUserPicture;
    document.getElementById('ManageAccountEmail_OldEmail').innerText = `Email: ${CurrentUserEmail}`;
    ManageAccountPanel.style.opacity = 0;
    setTimeout(() => {
        ManageAccountPanel.classList.add('hidden');
        ChangeAccountEmailPanel.style.opacity = 0;
        ChangeAccountEmailPanel.classList.remove('hidden');
        setTimeout(() => {ChangeAccountEmailPanel.style.opacity = 1;}, 50)
    },350)
}

function SubmitAccountEmail(){
    let newEmail = ManageAccount_EmailInput.value;
    firebase.auth().currentUser.updateEmail(newEmail).then(() => {
        // Update successful
        CurrentUserEmail = newEmail;
        BackToAccountPanel();
      }).catch((error) => {
        // An error occurred
        if(error.code === 'auth/invalid-email'){
            newNotifia('Invalid Email, Try Again!',{background: 'error', duration: 5000});
        } else if(error.code === 'auth/operation-not-allowed'){
            newNotifia('Not Allowed, Contact Us!',{background: 'error', duration: 5000});
            console.log(error);
        } else{
            newNotifia('An Error Occured!',{background: 'error', duration: 5000});
            console.warn(`Couldn't Update Email:`);
            console.log(error);
        }
      });
}

function ShowChangeAccountPassword(){
    document.getElementById('ManageAccountPassword_Username').innerText = CurrentUserName;
    document.getElementById('ManageAccountPassword_Image').src = CurrentUserPicture;
    document.getElementById('ManageAccountPassword_Email').innerText = `Email: ${CurrentUserEmail}`;
    ManageAccountPanel.style.opacity = 0;
    setTimeout(() => {
        ManageAccountPanel.classList.add('hidden');
        ChangeAccountPasswordPanel.style.opacity = 0;
        ChangeAccountPasswordPanel.classList.remove('hidden');
        setTimeout(() => {ChangeAccountPasswordPanel.style.opacity = 1;}, 50)
    },350)
}

function SubmitAccountPassword(){
    let newPassword = ManageAccount_NewPasswordInput.value;
    CurrentUser.updatePassword(newPassword).then(() => {
        // Update successful
        newNotifia('Your password has been changed!',{background: 'success', duration: 5000});
        BackToManagePanel();
      }).catch((error) => {
        // An error occurred
        if(error.code === 'auth/operation-not-allowed'){
            ShowSubmitError('Not Allowed, Contact Us!');
            newNotifia('Not Allowed! <br> Please Contact Us',{background: 'error', duration: 10000});
        } else{
            newNotifia('An Error Occured!',{background: 'error', duration: 5000});
            console.warn(`Couldn't Update Password:`);
            console.log(error);
        }
      });
}

function ShowChangeAccountPicture(){
    document.getElementById('MyAccountPicture_Username').innerText = CurrentUserName;
    document.getElementById('MyAccountPicture_Image').src = CurrentUserPicture;
    ManageAccountPanel.style.opacity = 0;
    setTimeout(() => {
        ManageAccountPanel.classList.add('hidden');
        ChangeAccountPicturePanel.style.opacity = 0;
        ChangeAccountPicturePanel.classList.remove('hidden');
        setTimeout(() => {ChangeAccountPicturePanel.style.opacity = 1;}, 50)
    },350)
}

function TestAccountPicture() {
    let MyAccountPicture_Image = document.getElementById('MyAccountPicture_Image');
    let NewImageURL = ManageAccount_ImageInput.value;

    // Regular expression to check for common image file extensions
    let imagePattern = /\.(jpeg|jpg|png|gif)$/i;
    
    if (imagePattern.test(NewImageURL)) {
        MyAccountPicture_Image.src = NewImageURL;
    } else {
        MyAccountPicture_Image.src = CurrentUserPicture;
    }
}

function SubmitAccountPicture(){
    let MyAccountPicture_Image = document.getElementById('MyAccountPicture_Image');
    let NewImageURL = ManageAccount_ImageInput.value;

    // Regular expression to check for common image file extensions
    let imagePattern = /\.(jpeg|jpg|png|gif)$/i;
    
    if (imagePattern.test(NewImageURL)) {
        MyAccountPicture_Image.src = NewImageURL;
        CurrentUser.updateProfile({
            photoURL: NewImageURL
          }).then(() => {
            // Update successful
            newNotifia('Photo Update Successful!',{background: 'success', duration: 3000});
            CurrentUserPicture = NewImageURL;
            MyAccount_Image.src = NewImageURL;
            MyAccountPicture_Image.src = NewImageURL;
            document.getElementById('ManageMyAccount_Image').src = NewImageURL;
            document.getElementById('MyAccountDelete_Image').src = NewImageURL;
            document.getElementById('ManageAccountEmail_Image').src = NewImageURL;
            document.getElementById('ManageAccountPassword_Image').src = NewImageURL;

            // Go Back to Manage Account:
            ChangeAccountPicturePanel.style.opacity = 0;
            setTimeout(() => {
                ChangeAccountPicturePanel.classList.add('hidden');
                ManageAccountPanel.style.opacity = 0;
                ManageAccountPanel.classList.remove('hidden');
                setTimeout(() => {ManageAccountPanel.style.opacity = 1;}, 50)
            },350)

          }).catch((error) => {
            // An error occurred
            newNotifia('Error Updating Photo!',{background: 'error', duration: 3000});
            console.warn('An Error Occured Updating the Profile:');
            console.log(error);
          });
    } else {
        MyAccountPicture_Image.src = CurrentUserPicture;
        newNotifia('Please Enter a Valid Image!',{background: 'error', duration: 3000});
    }
}

function BeginDeleteAccount(){
    document.getElementById('MyAccountDelete_Username').innerText = CurrentUserName;
    document.getElementById('MyAccountDelete_Image').src = CurrentUserPicture;
    ManageAccountPanel.style.opacity = 0;
    setTimeout(() => {
        ManageAccountPanel.classList.add('hidden');
        DeleteAccountConfirmPanel.style.opacity = 0;
        DeleteAccountConfirmPanel.classList.remove('hidden');
        setTimeout(() => {DeleteAccountConfirmPanel.style.opacity = 1;}, 50)
    },350)
}

function ConfirmDeleteAccount() {
    // Delete UserDoc:
    db.collection('Users').doc(CurrentUserUID).delete().then(() => {
        // UserDoc Deleted!
        if(Account_Debug){console.info('UserDoc has been delted!')}
    }).catch((error) => {
        console.warn('Error Deleting UserDoc:');
        console.log(error);
    })

    // Delete Auth User:
    CurrentUser.delete().then(() => {
        // User deleted:
            if(Account_Debug){console.info('User Deleted!')}
            newNotifia('Successfully Deleted Account!',{background: 'error', duration: 5000})
        // Go back to SignIn Panel:
            DeleteAccountConfirmPanel.style.opacity = 0;
            setTimeout(() => {
                DeleteAccountConfirmPanel.classList.add('hidden');
            }, 350);
        }).catch((error) => {
        // Error:
            ShowSubmitError('Could Not Delete Account, Try Again!');
            console.warn('An Error Occured - Deleting Account:')
            console.log(error)
        });
}

function LogOutAccount(){
    // console.info('Attempting to Log Out!')
    // Sign out user
    auth.signOut()
    .then(() => {
    // console.log("User signed out successfully");
    newNotifia('Successfully Logged Out!',{background: 'error', duration: 3000})
    })
    .catch((error) => {
    console.error("Error signing out:", error);
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


// Admin Users:

function CheckForAdmin(){
    if(CurrentUser != null){
        let AdminCookieFound = false;
        let NonAdminCookieConfirmed = false;

        // Search Cookies:
        let docCookies = document.cookie.split(';')
        docCookies.forEach(cookie => {
            cookie = cookie.split('=');
            if(cookie[0] === 'AdminUser_SECURE'){
                AdminCookieFound = true;
                AdminCookie = cookie
            }
            if(cookie[0] === 'NonAdminUser_SECURE'){
                if(cookie[1] === auth.currentUser.uid){
                    NonAdminCookieConfirmed = true;
                }
                
            }
        });

        // Cookie Found:
        if(AdminCookieFound || NonAdminCookieConfirmed){
            // Confirmed Non Admin:
            if(NonAdminCookieConfirmed){
                if(Account_Debug){console.warn('This user is a NON ADMIN! [cookie confirmed]');}
            }

            // Admin Cookie Found:
            if(AdminCookieFound){
                // Confirm Admin User from Cookie:
                if(AdminCookie[1] === auth.currentUser.uid){
                    // Matching User:
                    if(Account_Debug){console.info('This user is an Admin! [cookie confirmed]');}
                    newNotifia('Welcome back! <br> You are an Admin User.',{background: 'success', duration: 5000})
                    ShowAdminAbilities()
                }else{
                    // Different User found in cookie - check datatbase for cur user:
                    CheckDatabaseForAdmin()
                }
            }
        }else{
            // No Cookie Found:
            CheckDatabaseForAdmin()
        }

    }else{
        // Not Logged In - Hide Abilities:
        ShowAdminAbilities();
    }
}

function CheckDatabaseForAdmin(){
    if(Account_Debug){console.info('Searching Database for Admin Flag!')}
    db.collection('Users').doc(CurrentUserUID).get().then((UserDoc) => {
        if(UserDoc.exists){
            let UserData = UserDoc.data();
            if(UserData.AdminUser){
                // Admin User:
                if(Account_Debug){console.info('Admin User!');}
                // Get the expiration date:
                let curDate = new Date();
                curDate.setDate(curDate.getDate() + 365);
                let cookieExpiration = curDate.toUTCString();
                // Create Admin Cookie:
                document.cookie = `AdminUser_SECURE=${CurrentUser.uid}; expires=${cookieExpiration}; path=/`;
                CheckForAdmin()
            }else{
                // Non Admin User:
                if(Account_Debug){console.info('Non Admin User!');}
                // Get the expiration date:
                let curDate = new Date();
                curDate.setDate(curDate.getDate() + 14);
                let cookieExpiration = curDate.toUTCString();
                // Create NON-Admin Cookie:
                document.cookie = `NonAdminUser_SECURE=${CurrentUser.uid}; expires=${cookieExpiration}; path=/`;
                CheckForAdmin()
            }
        }
    }).catch((error) => {
        console.warn('Cannot get user doc:');
        console.log(error);
    })
}

function ShowAdminAbilities(){

    // Search Cookies:
    let docCookies = document.cookie.split(';')
    docCookies.forEach(cookie => {
        cookie = cookie.split('=');
        if(cookie[0] === 'AdminUser_SECURE'){
            AdminCookie = cookie
        }
    });

    if(AdminCookie != null && auth.currentUser != null){
        if(AdminCookie[1] === auth.currentUser.uid){
            // Add Badge:
            MyAccount_Username.innerHTML = `${CurrentUserName} <span class="material-symbols-rounded AdminUserIcon" title="Admin"> gavel </span>`;
            // Show Admin Abilities:
            document.getElementById('NewChangeLogEntryButton').classList.remove('hidden');
            document.getElementById('AdminResourcesWrap').classList.remove('hidden');
        }
    }else{
        if(Account_Debug){console.info('NonAdmin User! - Removing Abilities!')}
        document.getElementById('NewChangeLogEntryButton').classList.add('hidden');
        document.getElementById('AdminResourcesWrap').classList.add('hidden');
    }
}