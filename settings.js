// ============================================
// HandPuzzle Pro
// Settings Controller
// ============================================

const settings = {

    audio: true,

    history: true,

    confidence: true

};


// ============================================
// TOGGLE AUDIO
// ============================================

function toggleAudio() {

    settings.audio =
        !settings.audio;


    if (settings.audio) {

        if (
            typeof enableAudio ===
            "function"
        ) {

            enableAudio();

        }

    } else {

        if (
            typeof disableAudio ===
            "function"
        ) {

            disableAudio();

        }

    }


    console.log(
        "Audio:",
        settings.audio
    );

}


// ============================================
// TOGGLE HISTORY
// ============================================

function toggleHistory() {

    settings.history =
        !settings.history;


    const historyElement =
        document.getElementById(
            "history"
        );


    if (historyElement) {

        historyElement.style.display =
            settings.history
                ? "block"
                : "none";

    }


    console.log(
        "History:",
        settings.history
    );

}


// ============================================
// TOGGLE CONFIDENCE
// ============================================

function toggleConfidence() {

    settings.confidence =
        !settings.confidence;


    const confidenceElement =
        document.getElementById(
            "confidence"
        );


    if (confidenceElement) {

        confidenceElement.style.display =
            settings.confidence
                ? "block"
                : "none";

    }


    console.log(
        "Confidence:",
        settings.confidence
    );

}


// ============================================
// GET SETTINGS
// ============================================

function getSettings() {

    return {
        ...settings
    };

}

