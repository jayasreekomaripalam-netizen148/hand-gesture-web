// ============================================
// HandPuzzle Pro
// Hand Landmark + Finger Drawing
// ============================================


// ============================================
// DRAW HAND LANDMARKS
// ============================================

function drawHand(landmarks) {

    if (
        !landmarks ||
        landmarks.length < 21
    ) {
        return;
    }


    // ========================================
    // Connections
    // ========================================

    if (
        typeof drawConnectors === "function"
    ) {

        drawConnectors(
            ctx,
            landmarks,
            HAND_CONNECTIONS,
            {
                color: "#00ff00",
                lineWidth: 3
            }
        );

    }


    // ========================================
    // Landmarks
    // ========================================

    if (
        typeof drawLandmarks === "function"
    ) {

        drawLandmarks(
            ctx,
            landmarks,
            {
                color: "#ff0000",
                lineWidth: 1,
                radius: 4
            }
        );

    }


    // ========================================
    // Finger Drawing
    // ========================================

    drawWithHand(landmarks);

}


// ============================================
// DRAWING CANVAS
// ============================================

let drawingCanvas =
    document.getElementById(
        "drawingCanvas"
    );


if (!drawingCanvas) {

    drawingCanvas =
        document.createElement(
            "canvas"
        );

    drawingCanvas.id =
        "drawingCanvas";

    drawingCanvas.style.position =
        "fixed";

    drawingCanvas.style.left =
        "0";

    drawingCanvas.style.top =
        "0";

    drawingCanvas.style.width =
        "100%";

    drawingCanvas.style.height =
        "100%";

    drawingCanvas.style.pointerEvents =
        "none";

    drawingCanvas.style.zIndex =
        "5";

    document.body.appendChild(
        drawingCanvas
    );

}


const drawingCtx =
    drawingCanvas.getContext(
        "2d"
    );


// ============================================
// DRAWING STATE
// ============================================

let isDrawing = false;

let lastX = 0;

let lastY = 0;

let brushColor = "#00ff00";

let brushSize = 8;


// ============================================
// RESIZE
// ============================================

function resizeDrawingCanvas() {

    const oldWidth =
        drawingCanvas.width;

    const oldHeight =
        drawingCanvas.height;


    drawingCanvas.width =
        window.innerWidth;

    drawingCanvas.height =
        window.innerHeight;


    // Reset drawing state after resize

    if (
        oldWidth !== drawingCanvas.width ||
        oldHeight !== drawingCanvas.height
    ) {

        isDrawing = false;

    }

}


window.addEventListener(
    "resize",
    resizeDrawingCanvas
);


resizeDrawingCanvas();


// ============================================
// DRAW WITH INDEX FINGER
// ============================================

function drawWithHand(
    landmarks
) {

    if (
        !landmarks ||
        landmarks.length < 21
    ) {

        isDrawing = false;

        return;

    }


    // ========================================
    // Index finger
    // ========================================

    const indexTip =
        landmarks[8];

    const indexPip =
        landmarks[6];


    // ========================================
    // Middle finger
    // ========================================

    const middleTip =
        landmarks[12];

    const middlePip =
        landmarks[10];


    const indexRaised =
        indexTip.y <
        indexPip.y;


    const middleRaised =
        middleTip.y <
        middlePip.y;


    // ========================================
    // DRAW MODE
    //
    // Index = UP
    // Middle = DOWN
    // ========================================

    if (
        indexRaised &&
        !middleRaised
    ) {

        const x =
            indexTip.x *
            window.innerWidth;


        const y =
            indexTip.y *
            window.innerHeight;


        // First point

        if (!isDrawing) {

            isDrawing = true;

            lastX = x;

            lastY = y;

            return;

        }


        // ====================================
        // Draw line
        // ====================================

        drawingCtx.beginPath();

        drawingCtx.moveTo(
            lastX,
            lastY
        );

        drawingCtx.lineTo(
            x,
            y
        );


        drawingCtx.strokeStyle =
            brushColor;

        drawingCtx.lineWidth =
            brushSize;

        drawingCtx.lineCap =
            "round";

        drawingCtx.lineJoin =
            "round";


        drawingCtx.stroke();


        lastX = x;

        lastY = y;


    } else {

        isDrawing = false;

    }

}


// ============================================
// CLEAR DRAWING
// ============================================

function clearDrawing() {

    if (!drawingCtx) {
        return;
    }


    drawingCtx.clearRect(
        0,
        0,
        drawingCanvas.width,
        drawingCanvas.height
    );


    isDrawing = false;

}


// ============================================
// SET BRUSH
// ============================================

function setBrushColor(
    color
) {

    if (
        typeof color === "string"
    ) {

        brushColor =
            color;

    }

}


// ============================================
// SET BRUSH SIZE
// ============================================

function setBrushSize(
    size
) {

    const value =
        Number(size);


    if (
        Number.isFinite(value) &&
        value > 0
    ) {

        brushSize =
            value;

    }

}
