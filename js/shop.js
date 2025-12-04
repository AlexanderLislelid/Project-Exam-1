import { fetchAllProducts } from "../js/product-feed.js";
import { showLoader, hideLoader } from "./utils/loader.js";

showLoader();

try {
  await fetchAllProducts();
} catch (error) {
  console.error("Something went wrong:", error);
} finally {
  hideLoader();
}

// will be updated with updated functions such as search and categories at a later date
