// ============================================
// HandPuzzle Pro
// Utility Functions
// ============================================


// ============================================
// MIDPOINT
// ============================================

function midpoint(
    point1,
    point2
) {

    return {

        x:
            (point1.x + point2.x) / 2,

        y:
            (point1.y + point2.y) / 2

    };

}


// ============================================
// FINGER OPEN
// ============================================

function fingerOpen(
    landmarks,
    tip,
    pip
) {

    if (
        !landmarks ||
        !landmarks[tip] ||
        !landmarks[pip]
    ) {

        return false;

    }


    return (
        landmarks[tip].y <
        landmarks[pip].y
    );

}


// ============================================
// THUMB OPEN
// ============================================

function thumbOpen(
    landmarks
) {

    if (
        !landmarks ||
        !landmarks[4] ||
        !landmarks[3]
    ) {

        return false;

    }


    return (
        landmarks[4].x <
        landmarks[3].x
    );

}


// ============================================
// ANGLE
// ============================================

function calculateAngle(
    a,
    b,
    c
) {

    if (
        !a ||
        !b ||
        !c
    ) {

        return 0;

    }


    const ab = {

        x:
            a.x - b.x,

        y:
            a.y - b.y

    };


    const cb = {

        x:
            c.x - b.x,

        y:
            c.y - b.y

    };


    const dot =
        ab.x * cb.x +
        ab.y * cb.y;


    const magAB =
        Math.sqrt(
            ab.x * ab.x +
            ab.y * ab.y
        );


    const magCB =
        Math.sqrt(
            cb.x * cb.x +
            cb.y * cb.y
        );


    if (
        magAB === 0 ||
        magCB === 0
    ) {

        return 0;

    }


    let value =
        dot /
        (magAB * magCB);


    value =
        Math.max(
            -1,
            Math.min(
                1,
                value
            )
        );


    return Math.acos(
        value
    );

}


// ============================================
// CLAMP
// ============================================

function clamp(
    value,
    min,
    max
) {

    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );

}


// ============================================
// TIMESTAMP
// ============================================

function timestamp() {

    return new Date()
        .toLocaleTimeString();

}

