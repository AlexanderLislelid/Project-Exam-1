import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../js/utils/cartfunctions.js";
import { showLoader, hideLoader } from "./utils/loader.js";

async function renderCart() {
  let cart = await getCart();
  try {
    console.log(cart);
  } catch (error) {
    console.error("Failed to render cart", error);
  }
}
renderCart();
