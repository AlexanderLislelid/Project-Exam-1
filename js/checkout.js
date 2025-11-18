import {
  isNotEmpty,
  isValidName,
  isValidEmail,
  isValidPostalCode,
  isValidPhone,
  isValidExpiry,
  isValidCardNumber,
  isValidCVV,
  isValidFullName,
} from "./utils/validators.js";

const validationRules = {
  firstName: {
    validate: isValidName,
    message: "Please enter a valid first name",
  },
  lastName: {
    validate: isValidName,
    message: "Please enter a valid last name",
  },
  email: {
    validate: isValidEmail,
    message: "Please enter a valid email address",
  },
  address: {
    validate: isNotEmpty,
    message: "Address cannot be empty",
  },
  country: {
    validate: isNotEmpty,
    message: "Please select a country",
  },
  zip: {
    validate: isValidPostalCode,
    message: "Please enter a valid postal code",
  },
  phone: {
    validate: isValidPhone,
    message: "Please enter a valid phone number",
  },
  cardNumber: {
    validate: isValidCardNumber,
    message: "Invalid card number",
  },
  expiry: {
    validate: isValidExpiry,
    message: "Invalid expiry date",
  },
  cvv: {
    validate: isValidCVV,
    message: "Invalid CVV",
  },
  cardName: {
    validate: isValidFullName,
    message: "Please enter the full cardholder name",
  },
};

const checkoutForm = document.getElementById("checkoutForm");
const errorBox = document.getElementById("checkoutError");

function validateFormFields(formData) {
  let isFormValid = true;

  Object.entries(validationRules).forEach(([field, rule]) => {
    const value = formData.get(field);
    const isValid = rule.validate(value);

    const input = document.querySelector(`[name="${field}"]`);
    const errorMsg = input.parentElement.querySelector(".error-msg");

    if (!isValid) {
      isFormValid = false;
      errorMsg.textContent = rule.message;
      errorMsg.style.display = "block";
      input.classList.add("input-error");
    } else {
      errorMsg.textContent = "";
      errorMsg.style.display = "none";
      input.classList.remove("input-error");
    }
  });

  return isFormValid;
}
checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(checkoutForm);

  const isValid = validateFormFields(formData);

  if (!isValid) {
    // Skjema er ugyldig
    errorBox.style.display = "block"; // viss du har ein generell error-boks
    return; // stopp, ikkje gå til success
  }

  // Gyldig – skjul feil og gå vidare til success/melding/sending
  errorBox.style.display = "none";
  window.location.href = "success.html";
});
