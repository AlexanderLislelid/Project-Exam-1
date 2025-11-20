import {
  isAdminLoggedIn,
  requireAdminLogin,
  logoutAdmin,
} from "../js/utils/auth.js";

const form = document.getElementById("login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorBox = document.getElementById("error-msg");

// enkel admin bruker
const ADMIN_EMAIL = "hardcoded@user.com";
const ADMIN_PASSWORD = "1234";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!email.value || !password.value) {
    showError("Please enter email and password.");
    return;
  }

  if (email.value === ADMIN_EMAIL && password.value === ADMIN_PASSWORD) {
    localStorage.setItem("isAdmin", "true"); // markér at admin er innlogga
    window.location.href = "profile.html";
    return;
  }
  showError("Incorrect email or password.");
});

function showError(message) {
  errorBox.textContent = message;
  errorBox.style.display = "block";
}

// optional: fjern feilmelding når brukar skriver
[email, password].forEach((input) =>
  input.addEventListener("input", () => {
    errorBox.style.display = "none";
  })
);
