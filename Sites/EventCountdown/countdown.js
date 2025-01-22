// Elements:
const countdownPanel = document.getElementById('countdownPanel');

// let targetDate = 'Feb 22th 2025'

function ShowUpdate(){
    let curDate = new Date(); // Current local date/time
    let targetDate = new Date(2025, 1, 22); // Target local date/time

    // Get the time difference in milliseconds
    let timeDifference = targetDate.getTime() - curDate.getTime();
    // console.log('Difference (ms):', timeDifference);

    // Convert the difference into various units
    let timeDifferenceSecs = Math.floor(timeDifference / 1000);
    let timeDifferenceMins = Math.floor(timeDifferenceSecs / 60);
    let timeDifferenceHrs = Math.floor(timeDifferenceMins / 60);
    let timeDifferenceDays = Math.floor(timeDifferenceHrs / 24);

    timeDifferenceHrs %= 24; // Remaining hours after full days
    timeDifferenceMins %= 60; // Remaining minutes after full hours
    timeDifferenceSecs %= 60; // Remaining seconds after full minutes

    // Log the results
    // console.log('Days:', timeDifferenceDays);
    // console.log('Hours:', timeDifferenceHrs);
    // console.log('Minutes:', timeDifferenceMins);
    // console.log('Seconds:', timeDifferenceSecs);

    // Optional: Display in your countdown panel
    countdownPanel.innerHTML = `
        <p>${timeDifferenceDays} days,</p>
        <p>${timeDifferenceHrs} hours,</p>
        <p>${timeDifferenceMins} minutes,</p>
        <p>${timeDifferenceSecs} seconds</p>
    `;
}

let countdownInterval = setInterval(() => {
    ShowUpdate();
}, 1000);

ShowUpdate();

function launchConfetti() {
    confetti({
        particleCount: 1000,
        spread: 400,
        origin: { x: 0, y: -0.1 }, // Center of the screen
        angle: 270,
        gravity: 0.6,
        decay: 0.9,
        scalar: 1,
        shapes: ['circle', 'square'],
        ticks: 300
    });
    confetti({
        particleCount: 1000,
        spread: 400,
        origin: { x: 1, y: -0.1 }, // Center of the screen
        angle: 270,
        gravity: 0.6,
        decay: 0.9,
        scalar: 1,
        shapes: ['circle', 'square'],
        ticks: 300
    });

    tsParticles.load({
        id: "tsparticles",
        options: {
    "fullScreen": {
    "zIndex": 1
    },
    "particles": {
    "number": {
    "value": 0
    },
    "color": {
    "value": [
      "#00FFFC",
      "#FC00FF",
      "#fffc00"
    ]
    },
    "shape": {
    "type": "triangle",
    "options": {}
    },
    "opacity": {
    "value": {
      "min": 0,
      "max": 1
    },
    "animation": {
      "enable": true,
      "speed": 2,
      "startValue": "max",
      "destroy": "min"
    }
    },
    "size": {
    "value": {
      "min": 2,
      "max": 4
    }
    },
    "links": {
    "enable": false
    },
    "life": {
    "duration": {
      "sync": true,
      "value": 5
    },
    "count": 1
    },
    "move": {
    "enable": true,
    "gravity": {
      "enable": true,
      "acceleration": 10
    },
    "speed": {
      "min": 10,
      "max": 20
    },
    "decay": 0.1,
    "direction": "none",
    "straight": false,
    "outModes": {
      "default": "destroy",
      "top": "none"
    }
    },
    "rotate": {
    "value": {
      "min": 0,
      "max": 360
    },
    "direction": "random",
    "move": true,
    "animation": {
      "enable": true,
      "speed": 60
    }
    },
    "tilt": {
    "direction": "random",
    "enable": true,
    "move": true,
    "value": {
      "min": 0,
      "max": 360
    },
    "animation": {
      "enable": true,
      "speed": 60
    }
    },
    "roll": {
    "darken": {
      "enable": true,
      "value": 25
    },
    "enable": true,
    "speed": {
      "min": 15,
      "max": 25
    }
    },
    "wobble": {
    "distance": 30,
    "enable": true,
    "move": true,
    "speed": {
      "min": -15,
      "max": 15
    }
    }
    },
    "emitters": {
    "life": {
    "count": 20,
    "duration": 0.1,
    "delay": 0.4
    },
    "rate": {
    "delay": 0.1,
    "quantity": 150
    },
    "size": {
    "width": 0,
    "height": 0
    }
    }
    }
    });



}

setTimeout(() => {launchConfetti()},2000)


