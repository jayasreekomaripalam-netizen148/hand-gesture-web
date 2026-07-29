let currentFacingMode = "user";

async function switchCamera() {

    currentFacingMode =
        currentFacingMode === "user"
        ? "environment"
        : "user";

    if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
    }

    const stream = await navigator.mediaDevices.getUserMedia({

        video: {

            facingMode: currentFacingMode,
            width: 1280,
            height: 720

        }

    });

    video.srcObject = stream;

}
