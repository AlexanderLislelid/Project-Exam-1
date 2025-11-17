import {
  isNotEmpty,
  isValidName,
  isValidEmail,
  isValidPostalCode,
  isValidPhone,
  isValidExpiry,
  isValidCardNumber,
  isValidCVV,
} from "./utils/validators.js";

const checkoutForm = document.getElementById("checkoutForm");
const errorBox = document.getElementById("checkoutError");

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(checkoutForm);

  // Kjør validering
  const valid =
    isValidName(formData.get("firstName")) &&
    isValidName(formData.get("lastName")) &&
    isValidEmail(formData.get("email")) &&
    isNotEmpty(formData.get("address")) &&
    isNotEmpty(formData.get("country")) &&
    isValidPostalCode(formData.get("zip")) &&
    isValidPhone(formData.get("phone")) &&
    isValidCardNumber(formData.get("cardNumber")) &&
    isValidExpiry(formData.get("expiry")) &&
    isValidCVV(formData.get("cvv"));

  if (!valid) {
    errorBox.style.display = "block";
    return;
  }

  // Gyldig – skjul feil og gå vidare til success/melding/sending
  errorBox.style.display = "none";
  // remove the cl and return after testing
  //   console.log("success - ");
  //   return;
  window.location.href = "success.html";
});
