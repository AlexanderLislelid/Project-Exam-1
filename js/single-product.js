async function renderSingleProduct() {
  const id = new URLSearchParams(window.location.search).get("id");

  try {
    const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
    const product = await response.json();
    console.log(product);
  } catch (error) {
    console.log(error, "Could not Find product");
  }
}
renderSingleProduct();
