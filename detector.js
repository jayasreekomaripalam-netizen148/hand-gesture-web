const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let detector;

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "user",
      width: 1280,
      height: 720
    }
  });

  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      video.play();
      resolve(video);
    };
  });
}

async function createDetector() {

  detector = await handPoseDetection.createDetector(
    handPoseDetection.SupportedModels.MediaPipeHands,
    {
      runtime: "tfjs",
      modelType: "full",
      maxHands: 2
    }
  );

}

async function detectHands() {

  const hands = await detector.estimateHands(video);

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.drawImage(video,0,0,canvas.width,canvas.height);

  if(hands.length>0){

      hands.forEach(hand=>{

          hand.keypoints.forEach(point=>{

              ctx.beginPath();
              ctx.arc(point.x,point.y,5,0,2*Math.PI);
              ctx.fillStyle="#00ff00";
              ctx.fill();

          });

      });

  }

  requestAnimationFrame(detectHands);

}

async function startDetector(){

    await setupCamera();

    await createDetector();

    detectHands();

}

startDetector();
