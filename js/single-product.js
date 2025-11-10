async function renderSingleProduct() {
  const id = new URLSearchParams(window.location.search).get("id");

  try {
    const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
    const result = await response.json();
    const product = result.data;

    console.log(product);

    const wrapper = document.getElementById("product-wrapper");
    const imageAndTitleWrapper = document.getElementById("title");
    const descriptionWrapper = document.getElementById("description");
    const descriptionText = document.getElementById("description-text");
    const descriptionPrice = document.getElementById("description-price");
    const descriptionRating = document.getElementById("description-rating");

    const title = document.createElement("h1");
    title.textContent = product.title;
    title.className = "single-product__title";

    const description = document.createElement("p");
    description.textContent = product.description;

    const image = document.createElement("img");
    image.src = product.image.url;
    image.alt = product.image.alt;

    const price = document.createElement("p");

    if (product.price === product.discountedPrice) {
      price.textContent = `${product.price} kr`;
    } else {
      price.textContent = `On sale: ${product.discountedPrice} kr`;
    }

    const rating = document.createElement("p");
    // rating.textContent = `Rating: ${product.rating}`;
    rating.innerHTML = `${product.rating} / 5 <i class="fa-solid fa-star"></i> `;

    const buyBtn = document.createElement("button");
    buyBtn.className = "buy-button";
    buyBtn.textContent = "Buy Now";

    wrapper.append(imageAndTitleWrapper, descriptionWrapper);

    imageAndTitleWrapper.append(title, image);
    descriptionWrapper.append(
      descriptionText,
      descriptionPrice,
      descriptionRating,
      buyBtn
    );

    descriptionText.append(description);
    descriptionPrice.append(price);
    descriptionRating.append(rating);
  } catch (error) {
    console.log(error, "Could not Find product");
  }
}
renderSingleProduct();
