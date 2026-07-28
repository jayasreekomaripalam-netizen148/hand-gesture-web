const video = document.getElementById("video");

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });

    video.srcObject = stream;
  } catch (error) {
    alert("Camera access denied or not available.");
    console.error(error);
  }
}

startCamera();
