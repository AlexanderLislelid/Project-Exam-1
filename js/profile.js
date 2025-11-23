const token = localStorage.getItem("accessToken");

if (!token) {
  window.location.href = "login.html";
}

// const profileWrapper = (document.getElementById = "profile-info");

// const userName = document.createElement("h1");

// const userData = localStorage.getItem("user");
// let userNameText = "Unknown User";
// if (userData) {
//   try {
//     const userObj = JSON.parse(userData);
//     if (userObj && userObj.name) {
//       userNameText = userObj.name;
//     }
//   } catch (e) {
//     // handle JSON parse error, keep default
//   }
// }
// userName.textContent = userNameText;
profileWrapper.append(userName);
