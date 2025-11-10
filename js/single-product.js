import { showLoader, hideLoader } from "../js/utils/loader.js";
async function renderSingleProduct() {
  const id = new URLSearchParams(window.location.search).get("id");
  showLoader();
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

    //reviews
    const reviewWrapper = document.getElementById("review-wrapper");

    if (product.reviews.length < 1) {
      reviewWrapper.innerHTML = "No reviews yet!";
    }
    product.reviews.forEach((reviewer) => {
      const reviewCard = document.createElement("div");
      reviewCard.className = "review-card";

      const starsWrapper = document.createElement("div");
      const rating = Math.round(reviewer.rating);
      for (let i = 0; i < 5; i++) {
        const star = document.createElement("i");
        if (i < rating) {
          star.className = "fa-solid fa-star";
        } else {
          star.className = "fa-regular fa-star";
        }
        starsWrapper.append(star);
      }

      const reviewerName = document.createElement("h3");
      reviewerName.textContent = reviewer.username;

      const review = document.createElement("p");
      review.textContent = reviewer.description;

      reviewCard.append(reviewerName, review, starsWrapper);
      reviewWrapper.append(reviewCard);
    });
  } catch (error) {
    console.log(error, "Could not Find product");
  } finally {
    hideLoader();
  }
}
renderSingleProduct();
