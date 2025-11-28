import { showLoader, hideLoader } from "../js/utils/loader.js";
import { addToCart } from "../js/utils/cartfunctions.js";
import { isAdminLoggedIn } from "../js/utils/auth.js";

async function renderSingleProduct() {
  const id = new URLSearchParams(window.location.search).get("id");
  showLoader();
  try {
    const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
    const result = await response.json();
    const product = result.data;

    const wrapper = document.getElementById("product-wrapper");
    const imageAndTitleWrapper = document.getElementById("title");
    const descriptionWrapper = document.getElementById("description");
    const descriptionText = document.getElementById("description-text");
    const descriptionPrice = document.getElementById("description-price");
    const descriptionRating = document.getElementById("description-rating");
    const descriptionTags = document.getElementById("description-tags");

    if (Array.isArray(product.tags) && product.tags.length > 0) {
      const tagsWrapper = document.createElement("div");
      tagsWrapper.className = "tags-wrapper";

      product.tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.className = "tag";
        tagElement.textContent = tag;
        tagsWrapper.append(tagElement);
      });

      descriptionTags.append(tagsWrapper);
    } else {
      // valgfritt: skjul seksjonen om ingen tags
      descriptionTags.style.display = "none";
    }

    const title = document.createElement("h1");
    title.textContent = product.title;
    title.className = "single-product__title";

    const description = document.createElement("p");
    description.textContent = product.description;

    const image = document.createElement("img");
    image.src = product.image.url;
    image.alt = product.image.alt;
    image.className = "cart-image";

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

    //add product to cart/require token
    buyBtn.addEventListener("click", () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        addToCart(product);
        buyBtn.textContent = "Added!";

        // Create and show a toast notification
        const toast = document.createElement("div");
        toast.textContent = "Product added to cart";
        toast.className = "toast-message";
        document.body.appendChild(toast);
        setTimeout(() => {
          buyBtn.textContent = "Buy Now";
          toast.remove();
        }, 1500);
      } else {
        const toast = document.createElement("div");
        toast.textContent = "Please log in to purchase products!";
        toast.className = "toast-message";
        buyBtn.textContent = "Please log in";
        document.body.appendChild(toast);
        setTimeout(() => {
          buyBtn.textContent = "Buy Now";
          toast.remove();
        }, 3000);
      }
    });

    //share button
    const shareBtn = document.createElement("i");
    shareBtn.className = "fa-solid fa-share";
    shareBtn.setAttribute("aria-label", "Share this product");

    const shareData = {
      title: "Plethora online shop",
      text: "Check out this product",
      url: window.location.href,
    };

    //share if supported, otherwise copy link
    shareBtn.addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (error) {
          console.warn("Share canceled or failed:", error);
        }
      } else {
        try {
          await navigator.clipboard.writeText(shareData.url);
          alert("Link copied to clipboard!");
        } catch (err) {
          console.error("Clipboard copy failed:", err);
          alert("Sharing not supported on this device.");
        }
      }
    });

    //Adding elements to page
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
    descriptionRating.append(rating, shareBtn);

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
    console.error(error, "Could not Find product");
  } finally {
    hideLoader();
  }
}
renderSingleProduct();
