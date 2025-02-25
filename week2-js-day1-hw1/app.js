let customer = {};
let cart = [];

function getCustomerInfo() {
  let name = prompt("Enter your name:");
  let age = prompt("Enter your age:");
  let job = prompt("Enter your job:");

  customer = { name, age, job };
  console.log("Customer Info: ", customer);
}

function addProduct() {
  let productName = prompt("Enter product name:");
  let price = parseFloat(prompt("Enter product price:"));

  if (!productName || isNaN(price)) {
    alert("Please enter a valid product name and price!");
    return;
  }

  cart.push({ productName, price });
  console.log(`${productName} added to the cart.`);
}

function showCart() {
  if (cart.length === 0) {
    console.log("Your cart is empty.");
    return;
  }

  console.log("Your Cart:", cart);
  let total = cart.reduce((acc, product) => acc + product.price, 0);
  console.log(`Total Price: ${total} TL`);
}

function removeProduct() {
  let productName = prompt("Enter the product name to remove:");

  let index = cart.findIndex((product) => product.productName == productName);
  if (index !== -1) {
    cart.splice(index, 1);
    console.log(`${productName} removed from the cart.`);
  } else {
    console.log("Product not found in the cart.");
  }
}
