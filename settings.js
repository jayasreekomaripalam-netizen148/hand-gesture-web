const settings = {
    audio: true,
    history: true,
    confidence: true
};

function toggleAudio() {
    settings.audio = !settings.audio;
    console.log("Audio:", settings.audio);
}

function toggleHistory() {
    settings.history = !settings.history;

    const history = document.getElementById("history");

    if (settings.history) {
        history.style.display = "block";
    } else {
        history.style.display = "none";
    }
}

function toggleConfidence() {
    settings.confidence = !settings.confidence;
}

function getSettings() {
    return settings;
}
