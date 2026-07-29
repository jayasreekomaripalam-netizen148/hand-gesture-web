const gestureText = document.getElementById("gesture");
const confidenceText = document.getElementById("confidence");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gestureText = document.getElementById("gesture");

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });

    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
      detectHands();
    };

  } catch (err) {
    gestureText.innerHTML = "Camera Permission Denied";
    console.error(err);
  }
}

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
hands.onResults((results)=>{

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.drawImage(
        results.image,
        0,
        0,
        canvas.width,
        canvas.height
    );


    if(results.multiHandLandmarks.length > 0){

        const landmarks = results.multiHandLandmarks[0];


        drawConnectors(
            ctx,
            landmarks,
            HAND_CONNECTIONS
        );


        drawLandmarks(
            ctx,
            landmarks
        );


        const result = recogniseGesture(landmarks);


        gestureText.innerText = result.name;

        confidenceText.innerText =
            result.confidence + "%";


    }

    else {

        gestureText.innerText =
        "No Hand Detected";

        confidenceText.innerText =
        "0%";

    }

});
hands.onResults((results) => {

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(video,0,0);

  if(results.multiHandLandmarks){

    gestureText.innerHTML =
      "Hands Detected : " + results.multiHandLandmarks.length;

    for(const landmarks of results.multiHandLandmarks){

      drawConnectors(ctx, landmarks, HAND_CONNECTIONS);
      drawLandmarks(ctx, landmarks);

    }

  }else{

    gestureText.innerHTML="No Hand";

  }

});

async function detectHands(){

  async function frame(){

    await hands.send({image:video});

    requestAnimationFrame(frame);

  }

  frame();

}

startCamera();
