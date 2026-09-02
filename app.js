// ============================================
// HandPuzzle Pro
// Main Application
// ============================================


// ============================================
// HTML ELEMENTS
// ============================================

const video =
    document.getElementById("video");

const canvas =
    document.getElementById("canvas");

const gestureBox =
    document.getElementById("gesture");

const confidenceBox =
    document.getElementById("confidence");

const ctx =
    canvas.getContext("2d");


// ============================================
// STATE
// ============================================

let lastGesture = "";

let lastGestureTime = 0;

const gestureCooldown = 700;


// ============================================
// MEDIAPIPE HANDS
// ============================================

const hands =
    new Hands({

        locateFile: (file) => {

            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;

        }

    });


hands.setOptions({

    maxNumHands: 2,

    modelComplexity: 1,

    minDetectionConfidence: 0.7,

    minTrackingConfidence: 0.7

});


// ============================================
// MEDIAPIPE CALLBACK
// ============================================

hands.onResults(onResults);


// ============================================
// DISTANCE
// ============================================

function distanceBetween(a, b) {

    if (!a || !b) {

        return 999;

    }

    const dx =
        a.x - b.x;

    const dy =
        a.y - b.y;

    return Math.sqrt(
        dx * dx +
        dy * dy
    );

}


// ============================================
// OPEN HAND
// ============================================

function isOpenHand(hand) {

    if (
        !hand ||
        hand.length < 21
    ) {

        return false;

    }

    return (

        hand[8].y < hand[6].y &&

        hand[12].y < hand[10].y &&

        hand[16].y < hand[14].y &&

        hand[20].y < hand[18].y

    );

}


// ============================================
// FIST
// ============================================

function isFist(hand) {

    if (
        !hand ||
        hand.length < 21
    ) {

        return false;

    }

    return (

        hand[8].y > hand[6].y &&

        hand[12].y > hand[10].y &&

        hand[16].y > hand[14].y &&

        hand[20].y > hand[18].y

    );

}


// ============================================
// TWO-HAND GESTURES
// ============================================

function recogniseTwoHands(hand1, hand2) {

    if (
        !hand1 ||
        !hand2 ||
        hand1.length < 21 ||
        hand2.length < 21
    ) {

        return null;

    }


    const palmDistance =
        distanceBetween(
            hand1[9],
            hand2[9]
        );


    const wristDistance =
        distanceBetween(
            hand1[0],
            hand2[0]
        );


    const open1 =
        isOpenHand(hand1);

    const open2 =
        isOpenHand(hand2);


    const fist1 =
        isFist(hand1);

    const fist2 =
        isFist(hand2);


    // ========================================
    // 🤜🤛 FIST BUMP
    // ========================================

    if (
        fist1 &&
        fist2 &&
        palmDistance < 0.25
    ) {

        return "🤜🤛 Fist Bump";

    }


    // ========================================
    // 🤝 HANDSHAKE
    // ========================================

    if (
        !open1 &&
        !open2 &&
        wristDistance < 0.25 &&
        palmDistance < 0.18
    ) {

        return "🤝 Handshake";

    }


    // ========================================
    // 🤲 PALMS TOGETHER
    // ========================================

    if (
        open1 &&
        open2 &&
        palmDistance < 0.14
    ) {

        return "🤲 Palms Together";

    }


    // ========================================
    // 🫶 TWO-HAND HEART
    // ========================================

    const thumbDistance =
        distanceBetween(
            hand1[4],
            hand2[4]
        );


    if (
        thumbDistance < 0.12 &&
        palmDistance < 0.25
    ) {

        return "🫶 Two-Hand Heart";

    }


    // ========================================
    // 👐 / 🙌 OPEN HANDS
    // ========================================

    if (
        open1 &&
        open2
    ) {

        if (
            palmDistance < 0.22
        ) {

            return "👐 Hands Together";

        }

        return "🙌 Two Open Hands";

    }


    return null;

}


// ============================================
// PROCESS GESTURE
// ============================================

function processGesture(gestureName) {

    if (!gestureName) {

        return;

    }


    // ========================================
    // DISPLAY
    // ========================================

    if (gestureBox) {

        gestureBox.textContent =
            gestureName;

    }


    // ========================================
    // CONFIDENCE
    // ========================================

    if (
        typeof updateConfidence ===
        "function"
    ) {

        updateConfidence(
            gestureName
        );

    }


    // ========================================
    // COOLDOWN
    // ========================================

    const now =
        Date.now();


    if (
        gestureName === lastGesture &&
        now - lastGestureTime <
        gestureCooldown
    ) {

        return;

    }


    lastGesture =
        gestureName;

    lastGestureTime =
        now;


    // ========================================
    // HISTORY
    // ========================================

    if (
        typeof addGestureHistory ===
        "function"
    ) {

        addGestureHistory(
            gestureName
        );

    }


    // ========================================
    // AUDIO
    // ========================================

    if (
        typeof playGestureAudio ===
        "function"
    ) {

        playGestureAudio(
            gestureName
        );

    }


    // ========================================
    // ACTION
    // ========================================

    if (
        typeof performGestureAction ===
        "function"
    ) {

        performGestureAction(
            gestureName
        );

    }

}


// ============================================
// MEDIAPIPE RESULTS
// ============================================

function onResults(results) {

    if (
        !video ||
        !canvas ||
        !ctx
    ) {

        return;

    }


    if (
        !video.videoWidth ||
        !video.videoHeight
    ) {

        return;

    }


    // ========================================
    // CANVAS SIZE
    // ========================================

    canvas.width =
        video.videoWidth;

    canvas.height =
        video.videoHeight;


    // ========================================
    // CLEAR LANDMARK CANVAS
    // ========================================

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // ========================================
    // GET HANDS
    // ========================================

    const detectedHands =
        results.multiHandLandmarks || [];


    console.log(
        "HandPuzzle Pro: Hands =",
        detectedHands.length
    );


    // ========================================
    // NO HAND
    // ========================================

    if (
        detectedHands.length === 0
    ) {

        if (gestureBox) {

            gestureBox.textContent =
                "No Hand Detected";

        }


        if (
            typeof updateConfidence ===
            "function"
        ) {

            updateConfidence(
                "No Hand Detected"
            );

        }


        return;

    }


    // ========================================
    // TWO-HAND GESTURE
    // ========================================

    if (
        detectedHands.length === 2
    ) {

        const twoHandGesture =
            recogniseTwoHands(
                detectedHands[0],
                detectedHands[1]
            );


        if (twoHandGesture) {

            processGesture(
                twoHandGesture
            );

        }


        // Draw both hands

        detectedHands.forEach(
            (landmarks) => {

                if (
                    typeof drawHand ===
                    "function"
                ) {

                    drawHand(
                        landmarks
                    );

                }

            }
        );


        return;

    }


    // ========================================
    // SINGLE HAND
    // ========================================

    const landmarks =
        detectedHands[0];


    // ========================================
    // DRAW LANDMARKS
    // ========================================

    if (
        typeof drawHand ===
        "function"
    ) {

        drawHand(
            landmarks
        );

    }


    // ========================================
    // VIRTUAL CURSOR
    // ========================================

    if (
        typeof moveVirtualCursor ===
        "function" &&
        landmarks[8]
    ) {

        moveVirtualCursor(

            landmarks[8].x,

            landmarks[8].y

        );

    }


    // ========================================
    // SINGLE-HAND GESTURE
    // ========================================

    if (
        typeof recogniseGesture ===
        "function"
    ) {

        const gesture =
            recogniseGesture(
                landmarks
            );


        console.log(
            "HandPuzzle Pro: Gesture =",
            gesture
        );


        processGesture(
            gesture
        );

    }


    // ========================================
    // MOTION GESTURE
    // ========================================

    if (
        typeof detectMotionGesture ===
        "function"
    ) {

        const motion =
            detectMotionGesture(
                detectedHands
            );


        if (motion) {

            processGesture(
                motion
            );

        }

    }

}


// ============================================
// START APPLICATION
// ============================================

console.log(
    "===================================="
);

console.log(
    "HandPuzzle Pro"
);

console.log(
    "Application starting..."
);

console.log(
    "===================================="
);


if (
    typeof startCamera ===
    "function"
) {

    startCamera(
        hands,
        video
    );

} else {

    console.error(
        "HandPuzzle Pro: startCamera() missing"
    );


    if (gestureBox) {

        gestureBox.textContent =
            "❌ Camera Controller Missing";

    }

}
