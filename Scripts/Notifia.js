function newNotifia(messageText, options = {}){
    // Default Options:
    const { color = "#2196f3", textColor = 'white', duration = 3500 } = options;

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

    // Create the notification element
    const notification = document.createElement("div");
    notification.className = `notifia-notification`;
    notification.style.cssText = `
        background-color: ${color === "error" ? "#f56262" : color === "success" ? "#4caf50" : color};
        color: ${textColor};
        padding: 10px 20px;
        margin: 0px 5px 5px 5px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
        transition: .33s;
        opacity: 0;
        width: fit-content;
    `;
    notification.innerHTML = messageText;

    // Add the notification to the container
    container.appendChild(notification);

    // Animate in:
    setTimeout(() => {
        notification.style.opacity = 1;
    }, 50)

    // Remove the notification after the specified duration
    setTimeout(() => {
        notification.style.opacity = 0;
        setTimeout(() => {
            notification.remove();
        }, 350)
        
        if (container.childElementCount === 0) {
            container.remove();
        }
    }, duration);

}