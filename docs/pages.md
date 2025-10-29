Pages & User Stories

Product Feed Page

GET /online-shop • Path: /index.html

Requirements:

    An interactive banner carousel showing the 3 latest products (with prev/next controls and looping).
    Each carousel item includes a button linking to the specific product page.
    A responsive thumbnail grid listing at least 12 latest products.
    Each product thumbnail is clickable and links to its product page.

Specific Product Page

GET /online-shop/<id> • Path: /product.html

    Show title, description, price, discounted price, rating, reviews, and tags (fetched from the API) in a responsive layout.
    Include a “share” icon that provides a shareable URL (query string or hash) containing the product ID.
    As an owner (when logged in), provide an Add to Cart button.

Account Login Page

POST /auth/login • Path: /account/login.html

    Validated login form that requests and saves a token to the browser.

Account Register Page

POST /auth/register • Path: /account/register.html

    Validated register form to create a new account (email and password).

Cart Page

Path: /cart.html

    View products in the cart and the total price.
    Adjust quantities, clear the cart, and proceed to checkout.

Checkout Page

Path: /checkout.html

    Form with various payment methods (does not need to be functional).
    Form for delivery address.

Success Page

Path: /success.html

    Display a success message after submitting payment and delivery address.
