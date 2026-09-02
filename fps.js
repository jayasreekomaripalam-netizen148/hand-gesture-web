// ============================================
// HandPuzzle Pro
// FPS Counter
// ============================================

let fpsElement =
    document.getElementById("fpsCounter");


// ============================================
// CREATE FPS ELEMENT
// ============================================

if (!fpsElement) {

    fpsElement =
        document.createElement("div");

    fpsElement.id =
        "fpsCounter";

    fpsElement.style.position =
        "fixed";

    fpsElement.style.top =
        "10px";

    fpsElement.style.right =
        "10px";

    fpsElement.style.padding =
        "10px";

    fpsElement.style.background =
        "#111";

    fpsElement.style.color =
        "#00ff00";

    fpsElement.style.borderRadius =
        "8px";

    fpsElement.style.fontSize =
        "16px";

    fpsElement.style.zIndex =
        "9999";

    fpsElement.textContent =
        "FPS: 0";

    document.body.appendChild(
        fpsElement
    );

}


// ============================================
// FPS VARIABLES
// ============================================

let lastTime =
    performance.now();

let frameCount = 0;


// ============================================
// FPS LOOP
// ============================================

function updateFPS() {

    frameCount++;


    const now =
        performance.now();


    if (
        now - lastTime >= 1000
    ) {

        const fps =
            frameCount;


        if (fpsElement) {

            fpsElement.textContent =
                "FPS: " + fps;

        }


        frameCount = 0;

        lastTime =
            now;

    }


    requestAnimationFrame(
        updateFPS
    );

}


// ============================================
// START
// ============================================

updateFPS();

