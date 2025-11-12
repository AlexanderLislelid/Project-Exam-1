const shoppingCart = "cart";

// Lagre handlekurven
function saveCart(cart) {
  localStorage.setItem(shoppingCart, JSON.stringify(cart));
}

// Hent handlekurven fra localStorage
export function getCart() {
  return JSON.parse(localStorage.getItem(shoppingCart)) || [];
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
  localStorage.removeItem(shoppingCart);
}
