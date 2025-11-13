import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../js/utils/cartfunctions.js";
import { showLoader, hideLoader } from "./utils/loader.js";

async function renderCart() {
  let cart = await getCart();
  const cartWrapper = document.getElementById("cart-wrapper");

  cartWrapper.innerHTML = "";

  try {
    let cartTotal = 0; // total sum for heile carten

    cart.forEach((item) => {
      const itemWrapper = document.createElement("div");
      itemWrapper.className = "cart-item";

      const title = document.createElement("h2");
      title.textContent = item.title;
      title.className = "cart-item-title";

      const image = document.createElement("img");
      image.src = item.image.url;
      image.alt = item.image.alt;

      const price = document.createElement("p");
      const totalItemPrice = document.createElement("p");

      const unitPrice = item.discountedPrice ?? item.price;

      price.textContent = `${unitPrice.toFixed(2)} kr`;

      totalItemPrice.textContent = `${(item.quantity * unitPrice).toFixed(
        2
      )} kr`;

      cartTotal += item.quantity * unitPrice;

      // quantity
      const qtyWrapper = document.createElement("div");
      const increase = document.createElement("button");
      const qty = document.createElement("p");
      const decrease = document.createElement("button");

      qty.textContent = item.quantity;

      increase.textContent = "+";
      decrease.textContent = "-";

      increase.addEventListener("click", () => {
        addToCart(item);
        item.quantity++;
        qty.textContent = item.quantity;
        totalItemPrice.textContent = `${(item.quantity * unitPrice).toFixed(
          2
        )} kr`;

        cartTotal += unitPrice;
        totalElement.textContent = `Total: ${cartTotal.toFixed(2)} kr`;
      });

      decrease.addEventListener("click", () => {
        removeFromCart(item.id);

        if (item.quantity > 1) {
          item.quantity--;
          qty.textContent = item.quantity;
          totalItemPrice.textContent = `${(item.quantity * unitPrice).toFixed(
            2
          )} kr`;

          cartTotal -= unitPrice;
          totalElement.textContent = `Total: ${cartTotal.toFixed(2)} kr`;
        } else {
          cartTotal -= unitPrice;
          totalElement.textContent = `Total: ${cartTotal.toFixed(2)} kr`;
          itemWrapper.remove();
        }
      });

      qtyWrapper.append(increase, qty, decrease);
      itemWrapper.append(title, totalItemPrice, qtyWrapper, image);
      cartWrapper.append(itemWrapper);
    });

    // element for total sum
    const totalElement = document.createElement("p");
    totalElement.id = "cart-total";
    totalElement.textContent = `Total: ${cartTotal.toFixed(2)} kr`;

    const chekoutBtn = document.createElement("a");
    chekoutBtn.textContent = "Proceed to checkout";
    chekoutBtn.href = "../checkout.html";
    chekoutBtn.className = "checkout-button";

    cartWrapper.append(totalElement, chekoutBtn);
  } catch (error) {
    console.error("Failed to render cart", error);
  }
}

renderCart();
