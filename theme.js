const themeButton = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
    themeButton.innerHTML = "🌞 Light";
} else {
    themeButton.innerHTML = "🌙 Dark";
}

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        localStorage.setItem("theme", "light");

        themeButton.innerHTML = "🌞 Light";

    } else {

        localStorage.setItem("theme", "dark");

        themeButton.innerHTML = "🌙 Dark";

    }

});
