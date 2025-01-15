function newNotifia(messageText, options = {}){
    // Default Options:
    const { 
        background = "#2196f3", 
        textColor = 'white', 
        textAlign = 'start',
        fontFamily = 'Arial, sans-serif',
        fontSize = '14px', 
        duration = 3500, 
        closeButton = true,
    } = options;

    // Create notification container if it doesn't exist
    let container = document.getElementById("notifia-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "notifia-container";
        container.style.cssText = `
            position: fixed;
            bottom: 0px;
            right: 0px;
            z-index: 10000;
            transition: .33s;
            display: flex;
            align-items: end;
            flex-direction: column;
        `;
        document.body.appendChild(container);
    }

    // Create the notification wrap element
    const notificationWrap = document.createElement("div");
    notificationWrap.className = `notifia-notificationWrap`;
    notificationWrap.style.cssText = `
        background-color: ${background === "error" ? "#f56262" : background === "success" ? "#4caf50" : background};
        color: ${textColor};
        margin: 0px 5px 5px 5px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
        transition: .33s;
        opacity: 0;
        width: fit-content;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: stretch;
        position: relative;
        overflow: hidden;
    `;

    // Create the notification left right wrap element
    const notificationWrapLeftRight = document.createElement("div");
    notificationWrapLeftRight.className = `notifia-notificationWrapLeftRight`;
    notificationWrapLeftRight.style.cssText = `
        background-color: ${background === "error" ? "#f56262" : background === "success" ? "#4caf50" : background};
        padding: 2px;
        bottom-padding: 0px
        font-family: Arial, sans-serif;
        width: fit-content;
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        position: relative;
    `;

    // Create the notification side wrap element
    const notificationSideWrap = document.createElement("div");
    notificationSideWrap.className = 'notifia-notificationSideWrap';
    notificationSideWrap.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        flex-grow: 1;
        font-family: Arial, sans-serif !important;
        padding: 2px;
        gap: 8px;
    `;

    // Create the notification close wrap element
    const notificationCloseButton = document.createElement("div");
    notificationCloseButton.className = 'notifia-notificationCloseButton';
    notificationCloseButton.style.cssText = `
        display: flex;
        font-family: Arial, sans-serif !important;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: rgb(185, 44, 44);
        font-size: 8px;
        height: 15px;
        width: 15px;
        color: white;
        border-radius: 50px;
        border: 1px solid rgba(0,0,0,.5);
        text-shadow: 0px, 0px, 5px, purple;
        cursor: pointer;
        transition: .33s;
    `;

    // Inject dynamic hover styles
    const buttonHoverStyle = document.createElement("style");
    buttonHoverStyle.innerHTML = `
        .notifia-notificationCloseButton:hover {
            background: rgb(137, 9, 9) !important;
        }
    `;
    document.head.appendChild(buttonHoverStyle);
    notificationCloseButton.innerText = 'X';
    notificationCloseButton.addEventListener('click', function(e){
        closeNotifia(e.target);
    })
    
    // Create the notification timer element
    const notificationCloseTimer = document.createElement("p");
    notificationCloseTimer.className = 'notifia-notificationCloseTimer';
    notificationCloseTimer.style.cssText = `
        font-family: Arial, sans-serif !important;
        font-size: 9px;
        color: ${textColor};
        opacity: .5;
    `;
    notificationCloseTimer.innerText = 's';

    // Create the notification timer progress element
    const notificationCloseTimerProgress = document.createElement("div");
    notificationCloseTimerProgress.className = 'notifia-notificationCloseTimerProgress';
    notificationCloseTimerProgress.style.cssText = `
        background: rgba(0,0,0,.5);
        width: 100%;
        height: 4px;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        border-top-right-radius: 5px;
        margin: 0px; padding: 0px;
        transition: .5s ease !important;
    `;
    notificationCloseTimerProgress.innerText = '';

    // Create the notification text element
    const notificationTextWrap = document.createElement("div");
    notificationTextWrap.className = 'notifia-notificationTextWrap';
    notificationTextWrap.style.cssText = `
        color: ${textColor};
        padding: 2.5px;
        bottom-padding: 0px
        font-family: ${fontFamily} !important;
        font-size: ${fontSize};
        text-align: ${textAlign};
        flex-direction: row;
        align-self: center;
    `;
    notificationTextWrap.innerHTML = messageText;

    // Add Button & Timer to side wrap:
    if(closeButton){
        notificationSideWrap.appendChild(notificationCloseButton);
    }else{
        notificationSideWrap.style.justifyContent = 'end';
    }
    notificationSideWrap.appendChild(notificationCloseTimer);

    // Add Content to Notification:
    notificationWrapLeftRight.appendChild(notificationTextWrap);
    notificationWrapLeftRight.appendChild(notificationSideWrap);
    notificationWrap.appendChild(notificationWrapLeftRight);
    notificationWrap.appendChild(notificationCloseTimerProgress);
    
    // Add the notification to the container
    container.appendChild(notificationWrap);

    // Animate in:
    setTimeout(() => {
        notificationWrap.style.opacity = 1;
    }, 50)

    // Remove the notification after/if specified duration
    if(duration != 'infinite'){
        // Countdown:
        let OrginalDuration = Math.floor((duration/1000));
        let SecondsDuration = Math.floor((duration/1000));
        notificationCloseTimer.innerText = SecondsDuration + 's';
        let CountdownInterval = setInterval(() => {
            SecondsDuration -= 1;

            notificationCloseTimer.innerText = SecondsDuration + 's';
            let RemainingPercent = ((SecondsDuration/OrginalDuration) * 100) + '%';

            notificationCloseTimerProgress.style.width = RemainingPercent;
            if(SecondsDuration <= 0){
                clearInterval(CountdownInterval);
            }
        }, 1000);

        // Close Timeout:
        setTimeout(() => {
            notificationWrap.style.opacity = 0;
            setTimeout(() => {
                notificationWrap.remove();
                if (container.childElementCount == 0) {
                    container.remove();
                }
            }, 350)
        
        }, duration);
    }else{
        // Infinite Notification:
        notificationCloseTimer.remove();
        notificationCloseTimerProgress.remove()
        notificationTextWrap.style.paddingBottom = '2px';
    }

}

function closeNotifia(clickElm){
    const Notif = clickElm.parentElement.parentElement.parentElement;

    Notif.style.opacity = 0;
            setTimeout(() => {
                Notif.remove();
                if (container.childElementCount == 0) {
                    container.remove();
                }
            }, 350)
    
}