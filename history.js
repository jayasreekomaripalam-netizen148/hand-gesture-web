const historyList = document.getElementById("history");

let gestureHistory = [];

function addGestureHistory(gestureName) {

    if (!gestureName) return;

    if (gestureHistory.length > 0 &&
        gestureHistory[gestureHistory.length - 1] === gestureName) {
        return;
    }

    gestureHistory.push(gestureName);

    if (gestureHistory.length > 30) {
        gestureHistory.shift();
    }

    historyList.innerHTML = "";

    [...gestureHistory].reverse().forEach((gesture) => {

        const item = document.createElement("li");

        const time = new Date().toLocaleTimeString();

        item.textContent = `${time} — ${gesture}`;

        historyList.appendChild(item);

    });

}

function clearGestureHistory() {

    gestureHistory = [];

    historyList.innerHTML = "";

}
