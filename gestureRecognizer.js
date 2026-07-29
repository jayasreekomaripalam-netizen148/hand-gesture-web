function fingerExtended(landmarks, tip, pip) {
    return landmarks[tip].y < landmarks[pip].y;
}

function recogniseGesture(landmarks) {

    const thumb = landmarks[4].x < landmarks[3].x;

    const index = fingerExtended(landmarks, 8, 6);
    const middle = fingerExtended(landmarks, 12, 10);
    const ring = fingerExtended(landmarks, 16, 14);
    const pinky = fingerExtended(landmarks, 20, 18);

    if (index && middle && ring && pinky) {
        return "🖐️ Open Palm";
    }

    if (!index && !middle && !ring && !pinky) {
        return "✊ Fist";
    }

    if (index && middle && !ring && !pinky) {
        return "✌️ Peace";
    }

    if (index && !middle && !ring && !pinky) {
        return "☝️ Pointing Up";
    }

    if (thumb && !index && !middle && !ring && !pinky) {
        return "👍 Thumbs Up";
    }

    return "🤚 Unknown Gesture";
}
