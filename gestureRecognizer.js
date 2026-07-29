function isFingerOpen(tip, pip) {
  return tip.y < pip.y;
}

function recogniseGesture(landmarks) {
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  const indexPip = landmarks[6];
  const middleTip = landmarks[12];
  const middlePip = landmarks[10];
  const ringTip = landmarks[16];
  const ringPip = landmarks[14];
  const pinkyTip = landmarks[20];
  const pinkyPip = landmarks[18];

  const indexOpen = isFingerOpen(indexTip, indexPip);
  const middleOpen = isFingerOpen(middleTip, middlePip);
  const ringOpen = isFingerOpen(ringTip, ringPip);
  const pinkyOpen = isFingerOpen(pinkyTip, pinkyPip);

  if (indexOpen && middleOpen && ringOpen && pinkyOpen) {
    return "🖐️ Open Palm";
  }

  if (!indexOpen && !middleOpen && !ringOpen && !pinkyOpen) {
    return "✊ Fist";
  }

  if (indexOpen && middleOpen && !ringOpen && !pinkyOpen) {
    return "✌️ Peace";
  }

  return "Unknown";
}
