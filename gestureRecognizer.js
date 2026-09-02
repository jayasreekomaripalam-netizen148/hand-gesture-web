// ============================================
// HandPuzzle Pro
// Single Hand Gesture Recognizer
// ============================================

// Distance between two landmarks
function landmarkDistance(a, b) {

    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.sqrt(
        dx * dx +
        dy * dy
    );
}


// ============================================
// FINGER STATE
// ============================================

function fingerExtended(landmarks, tip, pip) {

    return landmarks[tip].y < landmarks[pip].y;

}


// ============================================
// THUMB STATE
// ============================================

function thumbExtended(landmarks) {

    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const thumbIp = landmarks[3];

    return landmarkDistance(
        thumbTip,
        wrist
    ) >
    landmarkDistance(
        thumbIp,
        wrist
    );

}


// ============================================
// RECOGNIZE GESTURE
// ============================================

function recogniseGesture(landmarks) {

    if (
        !landmarks ||
        landmarks.length < 21
    ) {

        return "🤚 Unknown Gesture";

    }


    const index =
        fingerExtended(
            landmarks,
            8,
            6
        );

    const middle =
        fingerExtended(
            landmarks,
            12,
            10
        );

    const ring =
        fingerExtended(
            landmarks,
            16,
            14
        );

    const pinky =
        fingerExtended(
            landmarks,
            20,
            18
        );

    const thumb =
        thumbExtended(
            landmarks
        );


    // ========================================
    // 🖐️ OPEN PALM
    // ========================================

    if (
        thumb &&
        index &&
        middle &&
        ring &&
        pinky
    ) {

        return "🖐️ Open Palm";

    }


    // ========================================
    // ✊ FIST
    // ========================================

    if (
        !index &&
        !middle &&
        !ring &&
        !pinky
    ) {

        return "✊ Fist";

    }


    // ========================================
    // ✌️ PEACE / VICTORY
    // ========================================

    if (
        index &&
        middle &&
        !ring &&
        !pinky
    ) {

        return "✌️ Peace";

    }


    // ========================================
    // ☝️ POINTING UP
    // ========================================

    if (
        index &&
        !middle &&
        !ring &&
        !pinky
    ) {

        return "☝️ Pointing Up";

    }


    // ========================================
    // 👍 THUMBS UP
    // ========================================

    if (
        thumb &&
        !index &&
        !middle &&
        !ring &&
        !pinky
    ) {

        if (
            landmarks[4].y <
            landmarks[3].y
        ) {

            return "👍 Thumbs Up";

        }

    }


    // ========================================
    // 🤟 I LOVE YOU
    // ========================================

    if (
        thumb &&
        index &&
        !middle &&
        !ring &&
        pinky
    ) {

        return "🤟 I Love You";

    }


    // ========================================
    // 🤘 ROCK
    // ========================================

    if (
        !thumb &&
        index &&
        !middle &&
        !ring &&
        pinky
    ) {

        return "🤘 Rock";

    }


    // ========================================
    // 👌 OK SIGN
    // ========================================

    const thumbIndexDistance =
        landmarkDistance(
            landmarks[4],
            landmarks[8]
        );

    if (
        thumbIndexDistance < 0.08 &&
        middle &&
        ring &&
        pinky
    ) {

        return "👌 OK Sign";

    }


    // ========================================
    // 🤏 PINCH
    // ========================================

    if (
        thumbIndexDistance < 0.06
    ) {

        return "🤏 Pinch";

    }


    // ========================================
    // DEFAULT
    // ========================================

    return "🤚 Unknown Gesture";

}

