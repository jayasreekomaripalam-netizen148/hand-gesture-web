// ============================================
// HandPuzzle Pro
// Gesture Actions
// ============================================

let lastActionGesture = "";
let lastActionTime = 0;

const ACTION_COOLDOWN = 1200;


// ============================================
// PERFORM GESTURE ACTION
// ============================================

function performGestureAction(gesture) {

    if (!gesture) {
        return;
    }


    const now = Date.now();


    // Prevent repeated actions
    if (
        gesture === lastActionGesture &&
        now - lastActionTime < ACTION_COOLDOWN
    ) {

        return;

    }


    lastActionGesture =
        gesture;

    lastActionTime =
        now;


    console.log(
        "HandPuzzle Pro: Action:",
        gesture
    );


    switch (gesture) {


        // ====================================
        // 👍 THUMBS UP
        // ====================================

        case "👍 Thumbs Up":

            document.body.style.border =
                "5px solid green";

            console.log(
                "Action: START"
            );

            break;


        // ====================================
        // ✊ FIST
        // ====================================

        case "✊ Fist":

            document.body.style.border =
                "5px solid red";

            console.log(
                "Action: STOP"
            );

            break;


        // ====================================
        // ✌️ PEACE
        // ====================================

        case "✌️ Peace":

            console.log(
                "Action: NEXT"
            );

            showGestureMessage(
                "✌️ Next"
            );

            break;


        // ====================================
        // 🖐️ OPEN PALM
        // ====================================

        case "🖐️ Open Palm":

            document.body.style.border =
                "none";

            console.log(
                "Action: RESET"
            );

            break;


        // ====================================
        // 👋 WAVE
        // ====================================

        case "👋 Wave":

            console.log(
                "Action: WAVE"
            );

            showGestureMessage(
                "👋 Hello!"
            );

            break;


        // ====================================
        // 🤟 I LOVE YOU
        // ====================================

        case "🤟 I Love You":

            showGestureMessage(
                "🤟 I Love You"
            );

            break;


        // ====================================
        // 🤘 ROCK
        // ====================================

        case "🤘 Rock":

            showGestureMessage(
                "🤘 Rock!"
            );

            break;


        // ====================================
        // 👌 OK SIGN
        // ====================================

        case "👌 OK Sign":

            showGestureMessage(
                "👌 OK!"
            );

            break;


        // ====================================
        // 🤏 PINCH
        // ====================================

        case "🤏 Pinch":

            console.log(
                "Action: PINCH"
            );

            break;


        // ====================================
        // TWO-HAND GESTURES
        // ====================================

        case "🤜🤛 Fist Bump":

            showGestureMessage(
                "🤜🤛 Fist Bump!"
            );

            break;


        case "🤝 Handshake":

            showGestureMessage(
                "🤝 Handshake!"
            );

            break;


        case "🤲 Palms Together":

            showGestureMessage(
                "🤲 Palms Together"
            );

            break;


        case "🫶 Two-Hand Heart":

            showGestureMessage(
                "🫶 Heart ❤️"
            );

            break;


        case "👐 Hands Together":

            showGestureMessage(
                "👐 Hands Together"
            );

            break;


        case "🙌 Two Open Hands":

            showGestureMessage(
                "🙌 Great!"
            );

            break;


        default:

            console.log(
                "No action assigned:",
                gesture
            );

            break;

    }

}


// ============================================
// TEMPORARY MESSAGE
// ============================================

function showGestureMessage(message) {

    const messageBox =
        document.getElementById(
            "actionMessage"
        );


    if (!messageBox) {

        console.log(
            "HandPuzzle Pro:",
            message
        );

        return;

    }


    messageBox.textContent =
        message;

    messageBox.style.display =
        "block";


    clearTimeout(
        messageBox._hideTimer
    );


    messageBox._hideTimer =
        setTimeout(
            () => {

                messageBox.style.display =
                    "none";

            },
            1200
        );

}

