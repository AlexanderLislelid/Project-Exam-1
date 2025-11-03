const productPage = document.querySelector(".products");
export async function fetchAllProducts() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/online-shop");
    const result = await response.json();
    const products = result.data;

    products.forEach((product) => {
      const card = document.createElement("a");
      const img = document.createElement("img");
      const title = document.createElement("p");
      const price = document.createElement("p");

      card.href = `product.html?id=${encodeURIComponent(product.id)}`;
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
