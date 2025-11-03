import { fetchAllProducts } from "./api.js";

async function fetchAndRenderImages() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/online-shop");
    const result = await response.json();

    const images = result.data.slice(12, 15).map((item) => item.image.url);
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

async function createImageSlider() {
  const images = await fetchAndRenderImages();
  const slider = document.getElementById("slider");
  const controls = document.querySelector(".carousel-controls");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const buyBtn = document.querySelector(".buy-btn");

  controls.append(prevBtn, buyBtn, nextBtn);

  images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Product image";
    slider.appendChild(img);
  });

  buyBtn.addEventListener("click", () => {
    // TODO: Implement buy button functionality here
  });

  let currentIndex = 0;
  const total = images.length;

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % total;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + total) % total;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  });
}

createImageSlider();

fetchAllProducts();
