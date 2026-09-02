// ============================================
// HandPuzzle Pro
// Audio Feedback
// ============================================

let audioEnabled = true;
let lastAudioGesture = "";

let audioContext = null;


// ============================================
// GET AUDIO CONTEXT
// ============================================

function getAudioContext() {

    if (!audioContext) {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {

            return null;

        }

        audioContext =
            new AudioContext();

    }

    return audioContext;

}


// ============================================
// RESUME AUDIO
// ============================================

async function resumeAudio() {

    const context =
        getAudioContext();

    if (!context) {

        return;

    }

    if (
        context.state === "suspended"
    ) {

        try {

            await context.resume();

        } catch (error) {

            console.warn(
                "Audio resume failed:",
                error
            );

        }

    }

}


// ============================================
// BEEP
// ============================================

function playBeep(
    frequency = 800,
    duration = 120
) {

    if (!audioEnabled) {

        return;

    }


    const context =
        getAudioContext();


    if (!context) {

        return;

    }


    resumeAudio();


    const oscillator =
        context.createOscillator();


    const gainNode =
        context.createGain();


    oscillator.connect(
        gainNode
    );


    gainNode.connect(
        context.destination
    );


    oscillator.type =
        "sine";


    oscillator.frequency.value =
        frequency;


    gainNode.gain.setValueAtTime(
        0.2,
        context.currentTime
    );


    oscillator.start();


    oscillator.stop(
        context.currentTime +
        duration / 1000
    );

}


// ============================================
// GESTURE AUDIO
// ============================================

function playGestureAudio(
    gestureName
) {

    if (!gestureName) {

        return;

    }


    if (
        gestureName ===
        lastAudioGesture
    ) {

        return;

    }


    lastAudioGesture =
        gestureName;


    switch (
        gestureName
    ) {


        case "👍 Thumbs Up":

            playBeep(
                900,
                120
            );

            break;


        case "✌️ Victory":

            playBeep(
                750,
                120
            );

            break;


        case "✊ Fist":

            playBeep(
                600,
                120
            );

            break;


        case "👎 Thumbs Down":

            playBeep(
                500,
                120
            );

            break;


        case "🖐️ Open Palm":

            playBeep(
                1000,
                150
            );

            break;


        case "👆 Move Up":

            playBeep(
                1000,
                100
            );

            break;


        case "👇 Move Down":

            playBeep(
                500,
                100
            );

            break;


        case "👈 Move Left":

            playBeep(
                700,
                100
            );

            break;


        case "👉 Move Right":

            playBeep(
                850,
                100
            );

            break;


        case "👌 OK Sign":

            playBeep(
                850,
                120
            );

            break;


        case "🤏 Pinch":

            playBeep(
                800,
                100
            );

            break;


        case "🫶 Heart":

            playBeep(
                1100,
                180
            );

            break;


        case "🤘 Rock":

            playBeep(
                950,
                120
            );

            break;


        case "🤟 I Love You":

            playBeep(
                1050,
                150
            );

            break;


        case "🤙 Call Me":

            playBeep(
                700,
                150
            );

            break;


        case "👏 Clap":

            playBeep(
                1200,
                80
            );

            break;


        default:

            playBeep(
                700,
                100
            );

            break;

    }

}


// ============================================
// ENABLE AUDIO
// ============================================

function enableAudio() {

    audioEnabled =
        true;


    resumeAudio();

}


// ============================================
// DISABLE AUDIO
// ============================================

function disableAudio() {

    audioEnabled =
        false;

}


// ============================================
// RESET AUDIO GESTURE
// ============================================

function resetAudioGesture() {

    lastAudioGesture =
        "";

}

