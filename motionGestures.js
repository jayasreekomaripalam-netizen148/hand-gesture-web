// ============================================
// HandPuzzle Pro
// Motion Gesture Recognition
// ============================================

let previousHandX = null;
let previousHandY = null;

let movementHistory = [];

let lastWaveTime = 0;

const WAVE_COOLDOWN = 1200;


// ============================================
// DETECT MOTION GESTURE
// ============================================

function detectMotionGesture(hands) {

    if (
        !hands ||
        hands.length === 0
    ) {

        previousHandX = null;
        previousHandY = null;
        movementHistory = [];

        return null;

    }


    const hand =
        hands[0];


    if (
        !hand ||
        hand.length < 21
    ) {

        return null;

    }


    // Use wrist landmark
    const wrist =
        hand[0];


    const currentX =
        wrist.x;

    const currentY =
        wrist.y;


    // First frame
    if (
        previousHandX === null
    ) {

        previousHandX =
            currentX;

        previousHandY =
            currentY;

        return null;

    }


    const deltaX =
        currentX -
        previousHandX;


    const deltaY =
        currentY -
        previousHandY;


    previousHandX =
        currentX;

    previousHandY =
        currentY;


    // Ignore tiny movements
    if (
        Math.abs(deltaX) < 0.015 &&
        Math.abs(deltaY) < 0.015
    ) {

        return null;

    }


    // Store horizontal movement
    movementHistory.push({
        x: deltaX,
        y: deltaY,
        time: Date.now()
    });


    // Keep recent movement only
    if (
        movementHistory.length > 20
    ) {

        movementHistory.shift();

    }


    // Remove old movement
    const now =
        Date.now();


    movementHistory =
        movementHistory.filter(
            movement =>
                now - movement.time < 700
        );


    // ========================================
    // CHECK WAVE
    // ========================================

    let leftMovement = 0;
    let rightMovement = 0;


    movementHistory.forEach(
        movement => {

            if (
                movement.x < -0.015
            ) {

                leftMovement++;

            }


            if (
                movement.x > 0.015
            ) {

                rightMovement++;

            }

        }
    );


    const enoughMovement =
        movementHistory.length >= 6;


    const alternatingMovement =
        leftMovement >= 2 &&
        rightMovement >= 2;


    // ========================================
    // WAVE DETECTED
    // ========================================

    if (
        enoughMovement &&
        alternatingMovement &&
        now - lastWaveTime > WAVE_COOLDOWN
    ) {

        lastWaveTime =
            now;

        movementHistory = [];

        return "👋 Wave";

    }


    return null;

}

