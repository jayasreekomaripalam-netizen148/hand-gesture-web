// ============================================
// HandPuzzle Pro
// Virtual Mouse Controller
// ============================================

let cursor =
    document.getElementById(
        "virtualCursor"
    );


// ============================================
// CREATE CURSOR
// ============================================

if (!cursor) {

    cursor =
        document.createElement(
            "div"
        );

    cursor.id =
        "virtualCursor";

    cursor.style.position =
        "fixed";

    cursor.style.width =
        "20px";

    cursor.style.height =
        "20px";

    cursor.style.borderRadius =
        "50%";

    cursor.style.background =
        "red";

    cursor.style.left =
        "50%";

    cursor.style.top =
        "50%";

    cursor.style.transform =
        "translate(-50%, -50%)";

    cursor.style.pointerEvents =
        "none";

    cursor.style.zIndex =
        "99999";

    cursor.style.display =
        "block";

    document.body.appendChild(
        cursor
    );

}


// ============================================
// MOVE VIRTUAL CURSOR
// ============================================

function moveVirtualCursor(
    x,
    y
) {

    if (!cursor) {

        return;

    }


    // ========================================
    // Validate coordinates
    // ========================================

    if (
        typeof x !== "number" ||
        typeof y !== "number"
    ) {

        return;

    }


    // ========================================
    // Keep coordinates inside screen
    // ========================================

    x =
        Math.max(
            0,
            Math.min(
                1,
                x
            )
        );


    y =
        Math.max(
            0,
            Math.min(
                1,
                y
            )
        );


    const screenX =
        x *
        window.innerWidth;


    const screenY =
        y *
        window.innerHeight;


    cursor.style.left =
        screenX + "px";


    cursor.style.top =
        screenY + "px";

}


// ============================================
// SHOW CURSOR
// ============================================

function showVirtualCursor() {

    if (cursor) {

        cursor.style.display =
            "block";

    }

}


// ============================================
// HIDE CURSOR
// ============================================

function hideVirtualCursor() {

    if (cursor) {

        cursor.style.display =
            "none";

    }

}

