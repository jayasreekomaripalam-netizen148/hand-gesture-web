const captureBtn = document.getElementById("captureBtn");

captureBtn.addEventListener("click", captureScreenshot);

function captureScreenshot() {

    const screenshotCanvas = document.createElement("canvas");

    screenshotCanvas.width = canvas.width;
    screenshotCanvas.height = canvas.height;

    const screenshotCtx = screenshotCanvas.getContext("2d");

    screenshotCtx.drawImage(canvas, 0, 0);

    const image = screenshotCanvas.toDataURL("image/png");

    const link = document.createElement("a");

    const date = new Date();

    const fileName =
        "gesture_" +
        date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, "0") + "-" +
        String(date.getDate()).padStart(2, "0") + "_" +
        String(date.getHours()).padStart(2, "0") + "-" +
        String(date.getMinutes()).padStart(2, "0") + "-" +
        String(date.getSeconds()).padStart(2, "0") +
        ".png";

    link.href = image;
    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}
