const token = localStorage.getItem("accessToken");

if (!token) {
  window.location.href = "login.html";
}

const profileWrapper = document.getElementById("profile-info");

const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  const avatar = document.createElement("img");
  avatar.src = user.avatar.url;
  avatar.className = "profile-pic";
  avatar.alt = "Profile picture";

  const userName = document.createElement("h1");
  userName.textContent = `Hello ${user.name}`;
  userName.className = "profile-name";

  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Log out";
  logoutBtn.className = "logout-btn";

  logoutBtn.addEventListener("click", (e) => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");

    logoutBtn.textContent = "Logging out...";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  });

  profileWrapper.append(avatar, userName, logoutBtn);
} else {
  console.error("User not found in localStorage");
}
