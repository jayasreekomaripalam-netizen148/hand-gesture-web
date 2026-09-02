// ============================================
// HandPuzzle Pro
// Gesture History
// ============================================


const historyList =
    document.getElementById(
        "history"
    );


let gestureHistory = [];


// ============================================
// ADD GESTURE
// ============================================

function addGestureHistory(
    gestureName
) {

    if (!gestureName) {

        return;

    }


    // ========================================
    // Prevent duplicate consecutive gestures
    // ========================================

    if (

        gestureHistory.length > 0 &&

        gestureHistory[
            gestureHistory.length - 1
        ] === gestureName

    ) {

        return;

    }


    // ========================================
    // Add
    // ========================================

    gestureHistory.push(
        gestureName
    );


    // ========================================
    // Maximum 30
    // ========================================

    if (
        gestureHistory.length > 30
    ) {

        gestureHistory.shift();

    }


    // ========================================
    // Update UI
    // ========================================

    renderGestureHistory();

}


// ============================================
// RENDER HISTORY
// ============================================

function renderGestureHistory() {

    if (!historyList) {

        return;

    }


    historyList.innerHTML =
        "";


    [
        ...gestureHistory
    ]
        .reverse()
        .forEach(
            (gesture) => {

                const item =
                    document.createElement(
                        "li"
                    );


                const time =
                    new Date()
                        .toLocaleTimeString();


                item.textContent =
                    `${time} — ${gesture}`;


                historyList.appendChild(
                    item
                );

            }
        );

}


// ============================================
// CLEAR HISTORY
// ============================================

function clearGestureHistory() {

    gestureHistory = [];


    if (historyList) {

        historyList.innerHTML =
            "";

    }

}
