function newNotifia(messageText, options = {}){
    // Default Options:
    const { background = "#2196f3", textColor = 'white', duration = 3500 } = options;

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
    notificationWrap.className = `notifia-notification`;
    notificationWrap.style.cssText = `
        background-color: ${background === "error" ? "#f56262" : background === "success" ? "#4caf50" : background};
        color: ${textColor};
        padding: 5px;
        margin: 0px 5px 5px 5px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
        transition: .33s;
        opacity: 0;
        width: fit-content;
        display: flex;
        justify-content: space-between:
        align-items: center;
        flex-direction: row;
        gap: 5px;
    `;

    // Create the notification side wrap element
    const notificationSideWrap = document.createElement("div");
    notificationSideWrap.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        min-height: 45px;
        font-family: Arial, sans-serif !important;
    `;

    // Create the notification close wrap element
    const notificationCloseButton = document.createElement("div");
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
        border: 1px solid black;
        border-radius: 3px;
        cursor: pointer;
    `;
    notificationCloseButton.innerText = 'X';

    // Create the notification timer element
    const notificationCloseTimer = document.createElement("p");
    notificationCloseTimer.style.cssText = `
        font-family: Arial, sans-serif !important;
        font-size: 8px;
        color: ${textColor};
    `;
    notificationCloseTimer.innerText = '10';

    // Create the notification text element
    const notificationTextWrap = document.createElement("div");
    notificationTextWrap.style.cssText = `
        color: ${textColor};
        padding: 5px;
        font-family: Arial, sans-serif;
        flex-direction: row;
    `;
    notificationTextWrap.innerHTML = messageText;

    // Add Button & Timer to side wrap:
    notificationSideWrap.appendChild(notificationCloseButton);
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
        setTimeout(() => {
            notificationWrap.style.opacity = 0;
            setTimeout(() => {
                notificationWrap.remove();
            }, 350)
            
            if (container.childElementCount === 0) {
                container.remove();
            }
        }, duration);
    }

}