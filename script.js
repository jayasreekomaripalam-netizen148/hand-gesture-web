// =================================
// 1. HTML ELEMENT SELECTION
// =================================

const gestureText = document.getElementById("gesture");
const confidenceText = document.getElementById("confidence");

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");


// =================================
// 2. CAMERA START FUNCTION
// =================================

async function startCamera(){

    try{

        const stream = await navigator.mediaDevices.getUserMedia({

            video:true

        });


        video.srcObject = stream;


        video.onloadedmetadata = ()=>{

            video.play();

            detectHands();

        };


    }

    catch(error){

        gestureText.innerText =
        "Camera Permission Denied";

        console.error(error);

    }

}



// =================================
// 3. MEDIAPIPE HANDS SETUP
// =================================


const hands = new Hands({

    locateFile:(file)=>{

        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;

    }

});


hands.setOptions({

    maxNumHands:1,

    modelComplexity:1,

    minDetectionConfidence:0.7,

    minTrackingConfidence:0.7

});



// =================================
// 4. HAND RESULTS
// =================================


hands.onResults((results)=>{


    canvas.width = video.videoWidth;

    canvas.height = video.videoHeight;



    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );



    ctx.drawImage(

        results.image,

        0,

        0,

        canvas.width,

        canvas.height

    );




    if(results.multiHandLandmarks.length > 0){


        const landmarks =
        results.multiHandLandmarks[0];



        drawConnectors(

            ctx,

            landmarks,

            HAND_CONNECTIONS

        );


        drawLandmarks(

            ctx,

            landmarks

        );



        const result =
        recogniseGesture(landmarks);



        gestureText.innerText =
        result.name;



        confidenceText.innerText =
        result.confidence + "%";



        if(result.confidence > 0){

            speakGesture(result.name);

        }


    }

    else{


        gestureText.innerText =
        "No Hand Detected";


        confidenceText.innerText =
        "0%";


    }


});




// =================================
// 5. VOICE ANNOUNCEMENT
// =================================


let lastSpokenGesture = "";


function speakGesture(gesture){


    if(gesture === lastSpokenGesture){

        return;

    }


    lastSpokenGesture = gesture;



    const speech =
    new SpeechSynthesisUtterance(gesture);



    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;



    window.speechSynthesis.speak(speech);


}





// =================================
// 6. GESTURE RECOGNITION
// =================================


function recogniseGesture(landmarks){



function recogniseGesture(landmarks){


    let thumb =
    landmarks[4].y < landmarks[3].y;


    let index =
    landmarks[8].y < landmarks[6].y;


    let middle =
    landmarks[12].y < landmarks[10].y;


    let ring =
    landmarks[16].y < landmarks[14].y;


    let pinky =
    landmarks[20].y < landmarks[18].y;



    // 👍 Thumbs Up

    if(
        thumb &&
        !index &&
        !middle &&
        !ring &&
        !pinky
    ){

        return {
            name:"👍 Thumbs Up",
            confidence:95
        };

    }



    // ✋ Open Palm / Stop

    if(
        index &&
        middle &&
        ring &&
        pinky
    ){

        return {
            name:"✋ Stop / Open Palm",
            confidence:92
        };

    }



    // ✌️ Victory

    if(
        index &&
        middle &&
        !ring &&
        !pinky
    ){

        return {
            name:"✌️ Victory",
            confidence:90
        };

    }



    // ✊ Fist

    if(
        !index &&
        !middle &&
        !ring &&
        !pinky
    ){

        return {
            name:"✊ Fist",
            confidence:88
        };

    }



    // ☝️ Point Finger

    if(
        index &&
        !middle &&
        !ring &&
        !pinky
    ){

        return {
            name:"☝️ Pointing",
            confidence:87
        };

    }



    // 🤟 Rock Sign

    if(
        index &&
        pinky &&
        !middle &&
        !ring
    ){

        return {
            name:"🤟 Rock Sign",
            confidence:86
        };

    }



    // 👌 OK Sign

    let thumbIndexDistance =
    Math.sqrt(
        Math.pow(
            landmarks[4].x - landmarks[8].x,
            2
        )
        +
        Math.pow(
            landmarks[4].y - landmarks[8].y,
            2
        )
    );


    if(
        thumbIndexDistance < 0.05 &&
        middle &&
        ring &&
        pinky
    ){

        return {
            name:"👌 OK Sign",
            confidence:85
        };

    }



    // 🤙 Call Me

    if(
        thumb &&
        pinky &&
        !index &&
        !middle &&
        !ring
    ){

        return {
            name:"🤙 Call Me",
            confidence:85
        };

    }



    return {
        name:"Unknown",
        confidence:0
    };


}
// =================================
// 7. DETECT HANDS
// =================================


async function detectHands(){


    await hands.send({

        image:video

    });


    requestAnimationFrame(detectHands);


}




// =================================
// 8. START CAMERA
// =================================


startCamera();
