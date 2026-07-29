// Audio Feedback Module

let audioEnabled = true;
let lastGesture = "";

const audioContext =
    new (window.AudioContext || window.webkitAudioContext)();

function playBeep(frequency = 800, duration = 120) {

    if (!audioEnabled) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);

    oscillator.start();

    oscillator.stop(audioContext.currentTime + duration / 1000);
}

function playGestureAudio(gestureName) {

    if (!gestureName) return;

    if (gestureName === lastGesture) return;

    lastGesture = gestureName;

    switch (gestureName) {

        case "👍 Thumbs Up":
            playBeep(900, 120);
            break;

        case "✌️ Peace":
            playBeep(750, 120);
            break;

        case "✊ Fist":
            playBeep(600, 120);
            break;

        case "🖐️ Open Palm":
            playBeep(1000, 150);
            break;

        case "👋 Wave":
            playBeep(850, 180);
            break;

        default:
            playBeep(700, 100);

    }

}

function enableAudio() {

    audioEnabled = true;

}

function disableAudio() {

    audioEnabled = false;

}
