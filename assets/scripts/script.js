window.addEventListener("DOMContentLoaded", init);

function init() {
  const buttonChangeTheme = document.querySelector(".change-theme");
  const colors = {
    "black-theme": ["#FFFFFF", "#FFEB3B", "#121212"],
    "white-theme": ["#121212", "#9366D6", "#FFFFFF"] 
  }
  let isBlackTheme = true;

  buttonChangeTheme.addEventListener("click", () => {
    const key = isBlackTheme ? "white-theme" : "black-theme";

    document.querySelector(":root").style.setProperty("--primary-color", colors[key][0]);
    document.querySelector(":root").style.setProperty("--secondary-color", colors[key][1]);
    document.querySelector(":root").style.setProperty("--primary-background-color", colors[key][2]);

    document.querySelector(".change-theme-img").classList.toggle("change-theme-img--white");

    document.querySelector(".prev-button").classList.toggle("prev-button--black");
    document.querySelector(".next-button").classList.toggle("next-button--black");

    isBlackTheme = !isBlackTheme;
  });
}