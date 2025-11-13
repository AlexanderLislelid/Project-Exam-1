import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../js/utils/cartfunctions.js";
import { showLoader, hideLoader } from "./utils/loader.js";

async function renderCart() {
  showLoader();

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
      qtyWrapper.className = "qty-wrapper";

      qty.textContent = item.quantity;

      increase.className = "fa-solid fa-plus";
      decrease.className = "fa-solid fa-minus";

      increase.addEventListener("click", () => {
        addToCart(item);
        item.quantity++;
        qty.textContent = item.quantity;
        totalItemPrice.textContent = `${(item.quantity * unitPrice).toFixed(
          2
        )} kr`;

        cartTotal += unitPrice;
        totalPrice.textContent = `Total: ${cartTotal.toFixed(2)} kr`;
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
          totalPrice.textContent = `Total: ${cartTotal.toFixed(2)} kr`;
        } else {
          cartTotal -= unitPrice;
          totalPrice.textContent = `Total: ${cartTotal.toFixed(2)} kr`;
          itemWrapper.remove();
        }
      });

      qtyWrapper.append(increase, qty, decrease);
      itemWrapper.append(title, totalItemPrice, qtyWrapper, image);
      cartWrapper.append(itemWrapper);
    });

    // element for total sum
    const totalPrice = document.createElement("p");
    totalPrice.id = "cart-total";
    totalPrice.className = "total-sum";
    totalPrice.textContent = `Total: ${cartTotal.toFixed(2)} kr`;

    const buttons = document.createElement("div");
    buttons.className = "cart-buttons";

    const chekoutBtn = document.createElement("a");
    chekoutBtn.textContent = "Checkout";
    chekoutBtn.href = "../checkout.html";
    chekoutBtn.className = "checkout-button";

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear Cart";
    clearBtn.className = "clear-button";

    if (cart.length < 1) {
      chekoutBtn.textContent = "Continue shopping";
      chekoutBtn.href = "index.html";
      clearBtn.style.display = "none";
    }

    buttons.append(chekoutBtn, clearBtn);
    cartWrapper.append(totalPrice, buttons);

    clearBtn.addEventListener("click", () => {
      clearCart();
      renderCart();
    });
  } catch (error) {
    console.error("Failed to render cart", error);
  } finally {
    hideLoader();
  }
}

renderCart();
