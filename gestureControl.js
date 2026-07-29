let lastGesture = "";
let lastGestureTime = 0;

function performGestureAction(gesture) {

    const now = Date.now();

    // Prevent repeated actions
    if (gesture === lastGesture && now - lastGestureTime < 1000) {
        return;
    }

    lastGesture = gesture;
    lastGestureTime = now;

    switch (gesture) {

        case "👍 Thumbs Up":
            console.log("Start");
            document.body.style.border = "5px solid green";
            break;

        case "✊ Fist":
            console.log("Stop");
            document.body.style.border = "5px solid red";
            break;

        case "✌️ Peace":
            console.log("Next");
            alert("Next Action");
            break;

        case "🖐️ Open Palm":
            console.log("Reset");
            document.body.style.border = "none";
            break;

        default:
            break;
    }
}
