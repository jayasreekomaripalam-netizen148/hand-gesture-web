// ============================================
// HandPuzzle Pro
// Dark / Light Theme
// ============================================

const themeButton =
    document.getElementById("themeBtn");


// ============================================
// LOAD SAVED THEME
// ============================================

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "light") {

    document.body.classList.add("light");

} else {

    document.body.classList.remove("light");

}


// ============================================
// UPDATE BUTTON TEXT
// ============================================

function updateThemeButton() {

    if (!themeButton) {
        return;
    }

    if (
        document.body.classList.contains("light")
    ) {

        themeButton.textContent =
            "🌞 Light Mode";

    } else {

        themeButton.textContent =
            "🌙 Dark Mode";

    }

}


// Initial button state
updateThemeButton();


// ============================================
// THEME BUTTON
// ============================================

if (themeButton) {

    themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light"
            );


            if (
                document.body.classList.contains(
                    "light"
                )
            ) {

                localStorage.setItem(
                    "theme",
                    "light"
                );

            } else {

                localStorage.setItem(
                    "theme",
                    "dark"
                );

            }


            updateThemeButton();

        }
    );

}

