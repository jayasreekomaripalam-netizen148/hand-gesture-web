// Virtual Mouse Control

const cursor = document.createElement("div");

cursor.id = "virtualCursor";

cursor.style.position = "fixed";
cursor.style.width = "20px";
cursor.style.height = "20px";
cursor.style.borderRadius = "50%";
cursor.style.background = "red";
cursor.style.left = "50%";
cursor.style.top = "50%";
cursor.style.pointerEvents = "none";
cursor.style.zIndex = "99999";

document.body.appendChild(cursor);

function moveVirtualCursor(x, y) {

    const screenX = x * window.innerWidth;
    const screenY = y * window.innerHeight;

    cursor.style.left = screenX + "px";
    cursor.style.top = screenY + "px";

}
