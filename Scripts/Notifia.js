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
        padding: 2px;
        margin: 0px 5px 5px 5px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
        transition: .33s;
        opacity: 0;
        width: fit-content;
        display: flex;
        justify-content: space-between;
        align-items: stretch;
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
        background: black;
        font-size: 8px;
        height: 15px;
        width: 15px;
        color: white;
        border-radius: 3px;
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
    `;
    notificationCloseTimer.innerText = 's';

    // Create the notification text element
    const notificationTextWrap = document.createElement("div");
    notificationTextWrap.className = 'notifia-notificationTextWrap';
    notificationTextWrap.style.cssText = `
        color: ${textColor};
        padding: 2.5px;
        font-family: ${fontFamily} !important;
        font-size: ${fontSize};
        text-align: ${textAlign};
        flex-direction: row;
        align-self: center;
    `;
    notificationTextWrap.innerHTML = messageText;

    // Add Button & Timer to side wrap:
    if(closeButton){notificationSideWrap.appendChild(notificationCloseButton);}else{
        notificationSideWrap.style.justifyContent = 'end';
    }
    notificationSideWrap.appendChild(notificationCloseTimer);

    // Add Close Wrap to Notification:
    notificationWrap.appendChild(notificationTextWrap);
    notificationWrap.appendChild(notificationSideWrap);



    // Add the notification to the container
    container.appendChild(notificationWrap);

    // Animate in:
    setTimeout(() => {
        notificationWrap.style.opacity = 1;
    }, 50)

    // Remove the notification after/if specified duration
    if(duration != 'infinite'){
        // Countdown:
        let SecondsDuration = Math.floor((duration/1000))
        notificationCloseTimer.innerText = SecondsDuration + 's'
        CountdownInterval = setInterval(() => {
            SecondsDuration -= 1
            notificationCloseTimer.innerText = SecondsDuration + 's'
        }, 1000);

        // Close Timeout:
        setTimeout(() => {
            notificationWrap.style.opacity = 0;
            setTimeout(() => {
                notificationWrap.remove();
            }, 350)
            
            if (container.childElementCount === 0) {
                container.remove();
            }
        }, duration);
    }else{
        notificationCloseTimer.remove()
    }

}

function closeNotifia(clickElm){
    const Notif = clickElm.parentElement.parentElement;

    Notif.style.opacity = 0;
            setTimeout(() => {
                Notif.remove();
            }, 350)
    
}