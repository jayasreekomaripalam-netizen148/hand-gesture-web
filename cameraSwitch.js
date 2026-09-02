// ============================================
// HandPuzzle Pro
// Camera Switch Controller
// ============================================

let currentFacingMode = "user";


// ============================================
// SWITCH CAMERA
// ============================================

async function switchCamera() {

    const videoElement =
        document.getElementById("video");

    if (!videoElement) {

        console.error(
            "HandPuzzle Pro: Video element not found"
        );

        return;

    }


    try {

        console.log(
            "HandPuzzle Pro: Switching camera..."
        );


        // Stop current camera
        if (typeof stopCamera === "function") {

            stopCamera();

        } else if (videoElement.srcObject) {

            videoElement.srcObject
                .getTracks()
                .forEach(track => track.stop());

            videoElement.srcObject = null;

        }


        // Toggle camera
        currentFacingMode =
            currentFacingMode === "user"
                ? "environment"
                : "user";


        // Get new camera
        const stream =
            await navigator.mediaDevices.getUserMedia({

                video: {

                    facingMode: {
                        ideal: currentFacingMode
                    },

                    width: {
                        ideal: 1280
                    },

                    height: {
                        ideal: 720
                    }

                },

                audio: false

            });


        // Connect new stream
        videoElement.srcObject =
            stream;

        videoElement.muted =
            true;

        videoElement.autoplay =
            true;

        videoElement.playsInline =
            true;


        await videoElement.play();


        // Keep camera controller state synchronized
        if (typeof cameraStream !== "undefined") {

            cameraStream =
                stream;

        }

        if (typeof cameraRunning !== "undefined") {

            cameraRunning =
                true;

        }


        console.log(
            "HandPuzzle Pro: Camera switched to",
            currentFacingMode
        );


        const cameraButton =
            document.getElementById("cameraBtn");


        if (cameraButton) {

            cameraButton.textContent =
                currentFacingMode === "user"
                    ? "🔄 Front Camera"
                    : "🔄 Back Camera";

        }


        // Restart MediaPipe frame processing
        if (
            typeof hands !== "undefined" &&
            typeof processFrames === "function"
        ) {

            processFrames(
                hands,
                videoElement
            );

        }


    } catch (error) {

        console.error(
            "HandPuzzle Pro: Camera switch error:",
            error
        );


        const gestureElement =
            document.getElementById("gesture");


        if (gestureElement) {

            gestureElement.textContent =
                "❌ Camera Switch Error: " +
                error.name;

        }

    }

}


// ============================================
// INITIAL BUTTON
// ============================================

const cameraButton =
    document.getElementById("cameraBtn");


if (cameraButton) {

    cameraButton.addEventListener(
        "click",
        switchCamera
    );

} else {

    console.warn(
        "HandPuzzle Pro: cameraBtn not found"
    );

}

