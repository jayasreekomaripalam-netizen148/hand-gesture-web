// Thumbs Up 👍
const thumbsUpGesture = new fp.GestureDescription("Thumbs Up");

thumbsUpGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);

thumbsUpGesture.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
thumbsUpGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
thumbsUpGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
thumbsUpGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

// Peace ✌️
const peaceGesture = new fp.GestureDescription("Peace");

peaceGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
peaceGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);

peaceGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
peaceGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

// Open Palm 🖐️
const palmGesture = new fp.GestureDescription("Open Palm");

Object.values(fp.Finger).forEach(finger => {
    palmGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
});

// Fist ✊
const fistGesture = new fp.GestureDescription("Fist");

Object.values(fp.Finger).forEach(finger => {
    fistGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
});

// Export all gestures
const knownGestures = [
    thumbsUpGesture,
    peaceGesture,
    palmGesture,
    fistGesture
];
