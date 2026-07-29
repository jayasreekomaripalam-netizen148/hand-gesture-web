// Utility Functions

function distance(point1, point2) {

    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;

    return Math.sqrt(dx * dx + dy * dy);

}

function midpoint(point1, point2) {

    return {

        x: (point1.x + point2.x) / 2,
        y: (point1.y + point2.y) / 2

    };

}

function fingerOpen(landmarks, tip, pip) {

    return landmarks[tip].y < landmarks[pip].y;

}

function thumbOpen(landmarks) {

    return landmarks[4].x < landmarks[3].x;

}

function calculateAngle(a, b, c) {

    const ab = {
        x: a.x - b.x,
        y: a.y - b.y
    };

    const cb = {
        x: c.x - b.x,
        y: c.y - b.y
    };

    const dot = ab.x * cb.x + ab.y * cb.y;

    const magAB = Math.sqrt(ab.x * ab.x + ab.y * ab.y);
    const magCB = Math.sqrt(cb.x * cb.x + cb.y * cb.y);

    return Math.acos(dot / (magAB * magCB));

}

function clamp(value, min, max) {

    return Math.max(min, Math.min(max, value));

}

function timestamp() {

    return new Date().toLocaleTimeString();

}
