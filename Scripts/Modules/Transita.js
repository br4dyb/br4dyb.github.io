// Main Transition Func:
function transita(framesOut, framesIn, duration){

    // console.log(duration*1000)

    if(framesOut)
    framesOut.forEach(frame => {
        frame.style.transition = duration + 's ease';
        frame.style.opacity = 0;
    });
    if(framesIn)
    framesIn.forEach(frame => {
        frame.style.transition = duration + 's ease';
        frame.style.display = 'none';
        frame.style.opacity = 0;
    });
    
    

    // Wait for Transition Out:
    setTimeout(() => {
        framesOut.forEach(frame => {
            frame.style.display = 'none';
        });
        framesIn.forEach(frame => {
            frame.style.display = 'flex';
        });

        
        // Small Delay:
        setTimeout(() => {
            framesIn.forEach(frame => {
                frame.style.opacity = 1;
            });
        }, 1);

    }, ((duration * 1000)-350));

}


const Wrap1 = document.getElementById('TestWrap1');
const Wrap2 = document.getElementById('TestWrap2');

setTimeout(() => {
    transita([Wrap2], [Wrap1], .55);
}, 1000);
