const fullscreenBtn = document.getElementById("fullscreenBtn");

fullscreenBtn.addEventListener("click", () => {

    if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen()
            .catch(err => {
                console.log(err);
            });

        fullscreenBtn.innerHTML = "🗗 Exit Full Screen";

    } else {

        document.exitFullscreen();

        fullscreenBtn.innerHTML = "⛶ Full Screen";

    }

});

document.addEventListener("fullscreenchange", () => {

    if (!document.fullscreenElement) {

        fullscreenBtn.innerHTML = "⛶ Full Screen";

    }

});
