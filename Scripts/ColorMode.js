const LightDarkModeButton = document.getElementById('LightDarkModeButton')
let LightBodyBackground = '#e1dfdf';
let DarkBodyBackground = '#1b1b1b';

let DarkMode = true;


function ToggleColorMode(){

    if(DarkMode){
        DarkMode = false;
        localStorage.setItem('ColorMode', 'Light');

        if(LightDarkModeButton){LightDarkModeButton.innerHTML = '<span class="material-symbols-rounded NavLinkIcon"> invert_colors </span> Dark Mode';}
        document.documentElement.style.setProperty('--BodyBackground', LightBodyBackground);
        document.documentElement.style.setProperty('--TextColor', 'black');
    }else{
        if(!DarkMode){
            DarkMode = true;
            localStorage.setItem('ColorMode', 'Dark');

            if(LightDarkModeButton){LightDarkModeButton.innerHTML = '<span class="material-symbols-rounded NavLinkIcon"> invert_colors </span> Light Mode';}
            document.documentElement.style.setProperty('--BodyBackground', DarkBodyBackground);
            document.documentElement.style.setProperty('--TextColor', 'white');
        }
    }

    
}

// Gave Previous Saved Color Mode:
let ColorModeSave = localStorage.getItem('ColorMode');

// No Previous Save:
if(ColorModeSave === null){
    // console.info('No Previous ColorMode Saved!')
    // Set to Default (dark):
    localStorage.setItem('ColorMode', 'Dark');
}

// Previous Save Found:
if(ColorModeSave != null){
    if(ColorModeSave === 'Light'){
        DarkMode = false;
        if(LightDarkModeButton){LightDarkModeButton.innerHTML = '<span class="material-symbols-rounded NavLinkIcon"> invert_colors </span> Dark Mode';}
        document.documentElement.style.setProperty('--BodyBackground', LightBodyBackground);
        document.documentElement.style.setProperty('--TextColor', 'black');
    }

    if(ColorModeSave === 'Dark'){
        DarkMode = true;
        if(LightDarkModeButton){LightDarkModeButton.innerHTML = '<span class="material-symbols-rounded NavLinkIcon"> invert_colors </span> Light Mode';}
        document.documentElement.style.setProperty('--BodyBackground', DarkBodyBackground);
        document.documentElement.style.setProperty('--TextColor', LightBodyBackground);
    }
}

