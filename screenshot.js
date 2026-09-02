// ============================================
// HandPuzzle Pro
// Screenshot Controller
// ============================================

const captureButton =
    document.getElementById("captureBtn");


// ============================================
// CAPTURE SCREENSHOT
// ============================================

function captureScreenshot() {

    if (!canvas) {

        console.error(
            "HandPuzzle Pro: Canvas not found"
        );

        return;

    }


    if (
        canvas.width === 0 ||
        canvas.height === 0
    ) {

        console.warn(
            "HandPuzzle Pro: Canvas is empty"
        );

        return;

    }


    const screenshotCanvas =
        document.createElement("canvas");


    screenshotCanvas.width =
        canvas.width;

    screenshotCanvas.height =
        canvas.height;


    const screenshotContext =
        screenshotCanvas.getContext("2d");


    // Draw the current camera/landmark canvas
    screenshotContext.drawImage(
        canvas,
        0,
        0,
        canvas.width,
        canvas.height
    );


    const image =
        screenshotCanvas.toDataURL(
            "image/png"
        );


    const link =
        document.createElement("a");


    const now =
        new Date();


    const fileName =
        "HandPuzzle_Pro_" +
        now.getFullYear() +
        "-" +
        String(
            now.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            now.getDate()
        ).padStart(2, "0") +
        "_" +
        String(
            now.getHours()
        ).padStart(2, "0") +
        "-" +
        String(
            now.getMinutes()
        ).padStart(2, "0") +
        "-" +
        String(
            now.getSeconds()
        ).padStart(2, "0") +
        ".png";


    link.href = image;

    link.download =
        fileName;


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    console.log(
        "HandPuzzle Pro: Screenshot saved:",
        fileName
    );

}


// ============================================
// BUTTON
// ============================================

if (captureButton) {

    captureButton.addEventListener(
        "click",
        captureScreenshot
    );

} else {

    console.warn(
        "HandPuzzle Pro: captureBtn not found"
    );

}
