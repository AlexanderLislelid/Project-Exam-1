import { fetchAllProducts, fetchAndRenderImages } from "./api.js";

async function createImageSlider() {
  const products = await fetchAndRenderImages();
  const slider = document.getElementById("slider");
  const controls = document.querySelector(".carousel-controls");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const buyBtn = document.querySelector(".buy-btn");

  controls.append(prevBtn, buyBtn, nextBtn);

  products.forEach((product) => {
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = "Product image";

    slider.appendChild(img);
  });

  function update() {
    const currentProduct = products[currentIndex];
    buyBtn.href = `product.html?id=${encodeURIComponent(currentProduct.id)}`;
    buyBtn.setAttribute("aria-label", `Buy ${currentProduct.title}`);
  }

  let currentIndex = 0;
  const total = products.length;

  function goToSlide(index) {
    currentIndex = (index + total) % total;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    update();
  }

  goToSlide(0);

  nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
  prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));

  setInterval(() => goToSlide(currentIndex + 1), 6000);
}

createImageSlider();

fetchAllProducts();
