// ============================================
// HandPuzzle Pro
// Camera Controller
// ============================================

let cameraStream = null;
let cameraRunning = false;


// ============================================
// START CAMERA
// ============================================

async function startCamera(hands, video) {

    try {

        console.log(
            "HandPuzzle Pro: Starting camera..."
        );


        if (!hands) {

            throw new Error(
                "MediaPipe Hands object missing"
            );

        }


        if (!video) {

            throw new Error(
                "Video element missing"
            );

        }


        // ====================================
        // CAMERA PERMISSION
        // ====================================

        cameraStream =
            await navigator.mediaDevices.getUserMedia({

                video: {

                    facingMode: "user",

                    width: {
                        ideal: 1280
                    },

                    height: {
                        ideal: 720
                    }

                },

                audio: false

            });


        // ====================================
        // CONNECT STREAM
        // ====================================

        video.srcObject =
            cameraStream;


        video.style.display =
            "block";

        video.style.visibility =
            "visible";

        video.style.opacity =
            "1";


        video.muted =
            true;

        video.autoplay =
            true;

        video.playsInline =
            true;


        // ====================================
        // START VIDEO
        // ====================================

        await video.play();


        cameraRunning =
            true;


        console.log(
            "HandPuzzle Pro: Camera started"
        );


        // ====================================
        // START FRAME LOOP
        // ====================================

        processFrames(
            hands,
            video
        );


    } catch (error) {

        console.error(
            "HandPuzzle Pro: Camera error:",
            error
        );


        const gesture =
            document.getElementById(
                "gesture"
            );


        if (gesture) {

            gesture.textContent =
                "❌ Camera Error: " +
                error.name;

        }

    }

}


// ============================================
// PROCESS CAMERA FRAMES
// ============================================

async function processFrames(
    hands,
    video
) {

    if (!cameraRunning) {

        return;

    }


    try {

        // ====================================
        // VIDEO READY
        // ====================================

        if (

            video.readyState >= 2 &&

            video.videoWidth > 0 &&

            video.videoHeight > 0

        ) {


            // =================================
            // SEND FRAME TO MEDIAPIPE
            // =================================

            await hands.send({

                image: video

            });

        }


    } catch (error) {

        console.error(
            "HandPuzzle Pro: MediaPipe frame error:",
            error
        );

    }


    // ========================================
    // NEXT FRAME
    // ========================================

    if (cameraRunning) {

        requestAnimationFrame(
            () =>
                processFrames(
                    hands,
                    video
                )
        );

    }

}


// ============================================
// STOP CAMERA
// ============================================

function stopCamera() {

    console.log(
        "HandPuzzle Pro: Stopping camera..."
    );


    cameraRunning =
        false;


    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(
                track => {

                    track.stop();

                }
            );


        cameraStream =
            null;

    }


    const video =
        document.getElementById(
            "video"
        );


    if (video) {

        video.srcObject =
            null;

    }


    console.log(
        "HandPuzzle Pro: Camera stopped"
    );

}


// ============================================
// RESTART CAMERA
// ============================================

async function restartCamera(
    hands,
    video
) {

    stopCamera();


    await startCamera(
        hands,
        video
    );

}
