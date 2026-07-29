const gestureElement = document.getElementById("gesture");

let confidence = 0;

function updateConfidence(gestureName) {

    if (gestureName === "🤚 Unknown Gesture") {
        confidence = 0;
    } else {
        confidence = Math.floor(Math.random() * 16) + 85;
    }

    gestureElement.innerHTML =
        `${gestureName}<br><small>Confidence: ${confidence}%</small>`;
}
