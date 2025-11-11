export function isAdminLoggedIn() {
  return localStorage.getItem("isAdminLoggedIn") === "true";
}

export function requireAdminLogin() {
  if (!isAdminLoggedIn()) {
    window.location.href = "../account/login.html";
  }
}

export function logoutAdmin() {
  localStorage.removeItem("isAdminLoggedIn");
  localStorage.removeItem("adminName");
}
