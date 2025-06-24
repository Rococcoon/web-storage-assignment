//@ts-check

/**
 * @type {string}
 */
const USER_NAME_KEY = "userName";

/**
 * @type {number | null}
 */
let curTime = null;

/**
 * @type {string | null}
 */
let userName = "userName";

/**
 * @type {HTMLElement | null}
 */
const greetHeader = document.getElementById("greeting-header");

/**
 * @type {HTMLElement | null}
 */
const userMsg = document.getElementById("display-name");

/**
 * @type {HTMLElement | null}
 */
const saveNameBtn = document.getElementById("save-btn");

/**
 * @type {HTMLElement | null}
 */
const clearNameBtn = document.getElementById("clear-btn");

/**
 * @type {HTMLInputElement | null}
 */
const userNameInput = document.querySelector("#username");

/**
 * Add Event Listeners to buttons
 */
function addEventListeners() {
  saveNameBtn?.addEventListener("click", saveName);
  clearNameBtn?.addEventListener("click", clearName);
}

/**
 * Clears the name from local storage and the input value
 */
function clearName() {
  if (userNameInput) {
    localStorage.removeItem(USER_NAME_KEY);
    update();
    userNameInput.value = "";
  }
}

/**
 * Get the user name from local storage or set it to "USER"
 */
function getName() {
  userName = localStorage.getItem(USER_NAME_KEY);
  if (userName === null) {
    userName = "USER";
  }
}

/**
 * Get the current time
 */
function getTime() {
  const now = new Date();
  return now.getHours();
}

/**
 * Saves the name from the input field to localStorage
 */
function saveName() {
  if (userNameInput && userNameInput.value) {
    localStorage.setItem(USER_NAME_KEY, userNameInput.value);
    update();
    userNameInput.value = "";
  } else {
    console.warn("User name input not found or is empty.");
  }
}

/**
 * Displays a greeting based on the current hour of the day
 * @param {number} hour the current hour of the day
 * @returns {string}
 */
function getGreeting(hour) {
  let greeting;

  switch (true) {
    case hour >= 5 && hour < 12:
      greeting = "Good Morning";
      break;
    case hour >= 12 && hour < 18:
      greeting = "Good Afternoon";
      break;
    case hour >= 18 || hour < 5:
      greeting = "Good Evening";
      break;
    default:
      greeting = "Hello";
  }

  return greeting;
}

/**
 * gets the current save name and updates dom elements to display it
 */
function update() {
  getName();
  curTime = getTime();
  if (greetHeader != null && curTime != null) {
    greetHeader.textContent = `${getGreeting(curTime)}, ${userName}`;
  }
  if (userMsg) {
    userMsg.textContent = `So, your name is ${userName}?`;
  }
}

/**
 * Main function to run after initialization
 */
function main() {
  addEventListeners();
  update();
}

document.addEventListener("DOMContentLoaded", main);
