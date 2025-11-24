const token = localStorage.getItem("accessToken");

if (!token) {
  window.location.href = "login.html";
}

const profileWrapper = document.getElementById("profile-info");

const user = JSON.parse(localStorage.getItem("user"));

console.log(user);

if (user) {
  const userName = document.createElement("h1");
  userName.textContent = `Hello ${user.name}`;
  profileWrapper.append(userName);
} else {
  console.error("User not found in localStorage");
}
