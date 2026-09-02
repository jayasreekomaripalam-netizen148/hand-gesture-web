// ============================================
// HandPuzzle Pro
// Full Screen Controller
// ============================================

const fullscreenButton =
    document.getElementById("fullscreenBtn");


// ============================================
// UPDATE BUTTON TEXT
// ============================================

function updateFullscreenButton() {

    if (!fullscreenButton) {
        return;
    }

    if (document.fullscreenElement) {

        fullscreenButton.textContent =
            "🗗 Exit Full Screen";

    } else {

        fullscreenButton.textContent =
            "⛶ Full Screen";

    }

}


// ============================================
// FULL SCREEN BUTTON
// ============================================

if (fullscreenButton) {

    fullscreenButton.addEventListener(
        "click",
        async () => {

            try {

                if (!document.fullscreenElement) {

                    await document.documentElement.requestFullscreen();

                } else {

                    await document.exitFullscreen();

                }

            } catch (error) {

                console.error(
                    "HandPuzzle Pro: Fullscreen error:",
                    error
                );

            }

            updateFullscreenButton();

        }
    );

} else {

    console.warn(
        "HandPuzzle Pro: fullscreenBtn not found"
    );

}


// ============================================
// DETECT FULL SCREEN CHANGES
// ============================================

document.addEventListener(
    "fullscreenchange",
    updateFullscreenButton
);


// ============================================
// INITIAL BUTTON STATE
// ============================================

updateFullscreenButton();

