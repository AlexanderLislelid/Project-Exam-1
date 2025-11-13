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

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }
  saveCart(cart);
}

// Fjern et produkt
export function removeFromCart(productId) {
  const cart = getCart();

  const item = cart.find((i) => i.id === productId);
  if (!item) return;

  if (item.quantity > 1) {
    item.quantity -= 1;
    saveCart(cart);
  } else {
    const updated = cart.filter((i) => i.id !== productId);
    saveCart(updated);
  }
}

// Tøm handlekurven
export function clearCart() {
  localStorage.removeItem(shoppingCart);
}
