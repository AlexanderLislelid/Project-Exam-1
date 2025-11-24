import { showLoader, hideLoader } from "./utils/loader.js";

const api = "https://v2.api.noroff.dev/online-shop";

const productPage = document.querySelector(".products");
export async function fetchAllProducts() {
  showLoader();

  try {
    const response = await fetch(api);
    const result = await response.json();
    const products = result.data;

    productPage.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("a");
      const img = document.createElement("img");
      const title = document.createElement("p");
      const price = document.createElement("p");

      card.href = `product.html?id=${product.id}`;
      card.className = "products-card";
      img.src = product.image.url;
      img.className = "product-images";
      title.textContent = product.title;
      price.innerHTML = `<span class="price-amount">${product.price}</span><span class="price-currency"> kr</span>`;

      price.className = "product-price";
      if (product.price === product.discountedPrice) {
        price.textContent = `${product.price} kr`;
      } else {
        price.textContent = `On sale: ${product.discountedPrice} kr`;
      }
      title.className = "product-title";

      card.append(img, title, price);
      productPage.appendChild(card);
    });
  } catch (error) {
    console.log(error, "failed to fetch Products");
  } finally {
    hideLoader();
  }
}

export async function fetchAndRenderImages() {
  try {
    const response = await fetch(api);
    const result = await response.json();

    const products = result.data.slice(12, 15).map((product) => ({
      id: product.id,
      title: product.title,
      image: product.image?.url,
      alt: product.image?.alt || product.title || "Product image",
    }));

    return products;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

async function createImageSlider() {
  const products = await fetchAndRenderImages();
  const slider = document.getElementById("slider");
  const controls = document.querySelector(".carousel-controls");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const buyBtn = document.querySelector(".buy-btn");

  if (
    !slider ||
    !controls ||
    !prevBtn ||
    !nextBtn ||
    !buyBtn ||
    products.length === 0
  ) {
    return;
  }

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
