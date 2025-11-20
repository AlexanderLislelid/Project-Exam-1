const form = document.getElementById("login");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorBox = document.getElementById("error-msg");

// Noroff login-endpoint
const API_LOGIN_URL = "https://v2.api.noroff.dev/auth/login";

//- if userf is already logged in, navigate to profile
if (localStorage.getItem("accessToken")) {
  window.location.href = "profile.html";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showError("Please enter both email and password.");
    return;
  }

  try {
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Logging in...";

    const response = await fetch(API_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      const message =
        result.errors?.[0]?.message || "Login failed. Please try again.";
      throw new Error(message);
    }

    const data = result.data;
    const accessToken = data.accessToken;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(data));

    hideError();

    window.location.href = "/account/profile.html";
  } catch (error) {
    console.error(error);
    showError(error.message);
  } finally {
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = false;
    submitButton.textContent = "Log In";
  }
});

function showError(message) {
  errorBox.textContent = message;
  errorBox.style.display = "block";
}

function hideError() {
  errorBox.textContent = "";
  errorBox.style.display = "none";
}

[emailInput, passwordInput].forEach((input) => {
  input.addEventListener("input", hideError);
});
