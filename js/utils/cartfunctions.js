const CART_KEY = "cart";

// Lagre handlekurven
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Hent handlekurven fra localStorage
export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Legg til et produkt
export function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
}

// Fjern et produkt
export function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
}

// Tøm handlekurven
export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
