//add model variables 
let gestureModel = null;

const gestureLabels = [
    "Fist",
    "Open Palm",
    "Thumbs Up",
    "Victory",
    "Pointing",
    "OK Sign"
];
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
// load ai model

async function loadModel(){

    gestureModel = await tf.loadLayersModel(
        "model/model.json"
    );

    console.log("Gesture AI Model Loaded");

}


loadModel();

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

async function recogniseGesture(landmarks){


    if(!gestureModel){

        return {
            name:"Loading AI...",
            confidence:0
        };

    }



    let input = [];


    landmarks.forEach(point=>{

        input.push(point.x);
        input.push(point.y);
        input.push(point.z);

    });



    const tensor =
    tf.tensor([input]);


    const prediction =
    gestureModel.predict(tensor);



    const data =
    await prediction.data();



    const index =
    data.indexOf(Math.max(...data));



    return {

        name: gestureLabels[index],

        confidence:
        Math.round(data[index]*100)

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
//Register Service Worker

if("serviceWorker" in navigator){

    navigator.serviceWorker.register(
        "service-worker.js"
    )

    .then(()=>{

        console.log("PWA Ready");

    });

}
    // install logic
let deferredPrompt;


window.addEventListener(
"beforeinstallprompt",
(e)=>{

    e.preventDefault();

    deferredPrompt = e;

});



const installBtn = document.getElementById("installBtn");


if(installBtn){

    installBtn.onclick = async()=>{


        if(deferredPrompt){


            deferredPrompt.prompt();


            const result = await deferredPrompt.userChoice;


            console.log(result.outcome);


            deferredPrompt = null;


        }

    };

}
// =================================
// 8. START CAMERA
// =================================


startCamera();
