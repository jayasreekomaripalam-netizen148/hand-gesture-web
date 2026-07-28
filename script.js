const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gestureText = document.getElementById("gesture");

const hands = new Hands({
  locateFile: (file) =>
    `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});

const estimator = new fp.GestureEstimator(knownGestures);

hands.onResults(async (results) => {

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {

    for (const landmarks of results.multiHandLandmarks) {

      drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 4
      });

      drawLandmarks(ctx, landmarks, {
        color: "#FF0000",
        radius: 5
      });

      const prediction = await estimator.estimate(landmarks, 7.5);

      if (prediction.gestures.length > 0) {

        prediction.gestures.sort((a, b) => b.score - a.score);

        gestureText.innerHTML =
          prediction.gestures[0].name;

      } else {

        gestureText.innerHTML = "Unknown";

      }

    }

  } else {

    gestureText.innerHTML = "No Hand";

  }

});

const camera = new Camera(video, {

  onFrame: async () => {

    await hands.send({
      image: video
    });

  },

  width: 640,
  height: 480

});

camera.start();
