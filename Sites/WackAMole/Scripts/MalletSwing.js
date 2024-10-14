const ClickableElement = document.getElementById('GrassBackground');

ClickableElement.addEventListener('mousedown', function() {
    // Add the swinging class on mouse down (click)
    ClickableElement.classList.add('Clicking');
  
    // Remove the swinging class after a short delay (to simulate swing)
    setTimeout(function() {
        ClickableElement.classList.remove('Clicking');
    }, 200); // Adjust delay as needed to match the swing effect
  });

function MoleSwing(elm){
    console.log(elm)
    elm.classList.add('Clicking');
  
    // Remove the swinging class after a short delay (to simulate swing)
    setTimeout(function() {
        elm.classList.remove('Clicking');
        elm.style.animation = "MoleHit .3s cubic-bezier(0.42, 0, 0.58, 1) 0s 1 forwards";
    }, 200); // Adjust delay a
}