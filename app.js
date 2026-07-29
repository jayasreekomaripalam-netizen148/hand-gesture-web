const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gestureBox = document.getElementById("gesture");

const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});

hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
});

hands.onResults(onResults);

function onResults(results) {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.save();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    if (results.multiHandLandmarks &&
        results.multiHandLandmarks.length > 0) {

        gestureBox.innerHTML =
            "Hands Detected : " +
            results.multiHandLandmarks.length;

        results.multiHandLandmarks.forEach((landmarks) => {

            drawConnectors(
                ctx,
                landmarks,
                HAND_CONNECTIONS,
                {
                    color: "#00FF00",
                    lineWidth: 4
                }
            );

            drawLandmarks(
                ctx,
                landmarks,
                {
                    color: "#FF0000",
                    radius: 5
                }
            );

            if (typeof recogniseGesture === "function") {

                const gestureName =
                    recogniseGesture(landmarks);

                gestureBox.innerHTML = gestureName;

                if (typeof addGestureHistory === "function") {

                    addGestureHistory(gestureName);

                }

                if (typeof playGestureAudio === "function") {

                    playGestureAudio(gestureName);

                }

            }

        });

    } else {

        gestureBox.innerHTML = "No Hand Detected";

    }

    ctx.restore();

}

async function startCamera() {

    const camera = new Camera(video, {

        onFrame: async () => {

            await hands.send({
                image: video
            });

        },

        width: 1280,
        height: 720

    });
startCamera(hands, video);
}

startCamera();
