const form = document.getElementById("login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorBox = document.getElementById("error-msg");

// Admin user login
const adminEmail = "hardcoded@user.com";
const adminPassword = "1234";

function isAdminLoggedIn() {
  return localStorage.getItem("isAdminLoggedIn") === "true";
}

if (isAdminLoggedIn()) {
  window.location.href = "profile.html";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!email.value || !password.value) {
    showError("Please enter email and password.");
    return;
  }

  if (email.value === adminEmail && password.value === adminPassword) {
    localStorage.setItem("isAdminLoggedIn", "true");
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.textContent = "Logging in...";

    setTimeout(() => {
      window.location.href = "profile.html";
    }, 1500);
    return;
  }
  showError("Incorrect email or password.");
});

function showError(message) {
  errorBox.textContent = message;
  errorBox.style.display = "block";
}

[email, password].forEach((input) =>
  input.addEventListener("input", () => {
    errorBox.style.display = "none";
  })
);
