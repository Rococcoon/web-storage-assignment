//@ts-check

/**
 * @type {HTMLElement}
 */
const htmlElement = document.documentElement;

/**
 * @type {string}
 */
const USER_THEME_KEY = "userTheme";

/**
 * @type {string | null}
 */
let userTheme = "default";

/**
 * @type {NodeListOf<HTMLInputElement>}
 */
const themeRadios = document.querySelectorAll('input[name="theme"]');

/**
 * @type {HTMLElement | null}
 */
const saveThemeBtn = document.getElementById("save-theme-btn");

/**
 * @type {HTMLElement | null}
 */
const clearThemeBtn = document.getElementById("clear-theme-btn");

/**
 * Add Event Listeners to buttons
 */
function addThemeEventListeners() {
  saveThemeBtn?.addEventListener("click", saveTheme);
  clearThemeBtn?.addEventListener("click", clearTheme);

  themeRadios.forEach((radio) => {
    console.log("adding theme radios");
    radio.addEventListener("click", handleThemeClick);
  });
}

/**
 * Clears and resets the theme to the default
 */
function clearTheme() {
  localStorage.setItem(USER_THEME_KEY, "default");
  userTheme = "default";
  setTheme();
}

/**
 * Get the user name from local storage or set it to "USER"
 */
function getTheme() {
  userTheme = localStorage.getItem(USER_THEME_KEY);
  if (userTheme === null) {
    userTheme = "default";
  }
}

/**
 *
 * @param {*} e
 */
function handleThemeClick(e) {
  userTheme = e.target.value;
  setTheme();
}

/**
 * Saves the name from the input field to localStorage
 */
function saveTheme() {
  if (userTheme) {
    localStorage.setItem(USER_THEME_KEY, userTheme);
  } else {
    console.warn("Error: theme not saved");
  }
}

/**
 * update the html data-theme attribute to the saved theme
 */
function setTheme() {
  if (typeof userTheme === "string") {
    htmlElement.dataset.theme = userTheme;
  }
  themeRadios.forEach((radio) => {
    if (radio.value === userTheme) {
      radio.checked = true;
    }
  });
}

/**
 * gets the current save name and updates dom elements to display it
 */
function updateTheme() {
  getTheme();
  setTheme();
}

/**
 * Main function to run after initialization
 */
function mainTheme() {
  console.log("DOM fully loaded and parsed. Initializing application.");
  addThemeEventListeners();
  updateTheme();
}

document.addEventListener("DOMContentLoaded", mainTheme);
