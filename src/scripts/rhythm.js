var red = document.getElementById('red');

function createPulse(){
    let pulse = document.createElement('div');
    pulse.classList.add('pulseRed');
    pulse.style.left = '100%';
    red.appendChild(pulse);
}
createPulse();