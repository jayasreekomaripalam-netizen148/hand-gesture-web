// ============================================
// HandPuzzle Pro
// Confidence Display
// ============================================

const confidenceElement =
    document.getElementById("confidence");


// ============================================
// UPDATE CONFIDENCE
// ============================================

function updateConfidence(gestureName) {

    if (!confidenceElement) {
        return;
    }


    // ========================================
    // NO HAND
    // ========================================

    if (
        !gestureName ||
        gestureName === "No Hand Detected"
    ) {

        confidenceElement.textContent =
            "Confidence: 0%";

        return;

    }


    // ========================================
    // UNKNOWN
    // ========================================

    if (
        gestureName === "🤚 Unknown Gesture"
    ) {

        confidenceElement.textContent =
            "Confidence: 20%";

        return;

    }


    // ========================================
    // MOTION GESTURE
    // ========================================

    if (
        gestureName === "👋 Wave"
    ) {

        confidenceElement.textContent =
            "Confidence: 90%";

        return;

    }


    // ========================================
    // TWO-HAND GESTURES
    // ========================================

    if (
        gestureName === "🤜🤛 Fist Bump" ||
        gestureName === "🤝 Handshake" ||
        gestureName === "🤲 Palms Together" ||
        gestureName === "🫶 Two-Hand Heart" ||
        gestureName === "👐 Hands Together" ||
        gestureName === "🙌 Two Open Hands"
    ) {

        confidenceElement.textContent =
            "Confidence: 90%";

        return;

    }


    // ========================================
    // NORMAL SINGLE-HAND GESTURES
    // ========================================

    confidenceElement.textContent =
        "Confidence: 95%";

}

