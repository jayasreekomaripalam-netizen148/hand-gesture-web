let camera = null;

async function startCamera(hands, video) {

    camera = new Camera(video, {

        onFrame: async () => {

            await hands.send({
                image: video
            });

        },

        width: 1280,
        height: 720

    });

    camera.start();

}

function stopCamera() {

    if (!camera) return;

    const stream = video.srcObject;

    if (stream) {

        stream.getTracks().forEach(track => {

            track.stop();

        });

    }

}

function restartCamera(hands, video) {

    stopCamera();

    startCamera(hands, video);

}
