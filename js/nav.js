function toggleNav() {
  const toggleBtn = document.getElementById("nav-toggle");
  const overlay = document.querySelector(".nav-overlay");

  if (!toggleBtn || !overlay) return;

  toggleBtn.addEventListener("click", () => {
    if (overlay.style.display === "flex") {
      overlay.style.display = "none";
      toggleBtn.classList.remove("fa-xmark");
      toggleBtn.classList.add("fa-bars");
    } else {
      overlay.style.display = "flex";
      toggleBtn.classList.remove("fa-bars");
      toggleBtn.classList.add("fa-xmark");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 650) overlay.style.display = "none";
    toggleBtn.classList.remove("fa-xmark");
    toggleBtn.classList.add("fa-bars");
  });
}

toggleNav();
