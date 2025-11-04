const api = "https://v2.api.noroff.dev/online-shop";

const productPage = document.querySelector(".products");
export async function fetchAllProducts() {
  try {
    const response = await fetch(api);
    const result = await response.json();
    const products = result.data;

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
      price.textContent = `${product.price} kr`;

      card.append(title, img, price);
      productPage.appendChild(card);

      console.log(img);
    });
  } catch (error) {
    console.log(error, "failed to fetch Products");
  }
}

export async function fetchAndRenderImages() {
  try {
    const response = await fetch(api);
    const result = await response.json();

    const images = result.data.slice(12, 15).map((item) => item.image.url);
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}
