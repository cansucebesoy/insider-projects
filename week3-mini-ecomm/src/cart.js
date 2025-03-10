let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log("Başlangıçtaki sepet verisi:", cart);

export function addToCart(product) {
  cart.push(product);
  saveCart();
  updateCartCount();
}

function updateCartCount() {
  $("#cartCount").text(cart.length);
  console.log("Güncel sepet sayısı:", cart.length);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Sepet localStorage'a kaydedildi:", cart);
}

function displayCart() {
  $("#cartList").empty();

  cart.forEach((item, index) => {
    if (item && item.image && item.title && item.price) {
      const listItem = $(`
        <li class="cart-item">
          <img src="${item.image}" alt="${item.title}" class="cart-item-image" />
          <span class="cart-item-title">${item.title}</span>
          <span class="cart-item-price">${item.price}</span>
          <button class="remove-from-cart" data-index="${index}">Çıkar</button>
        </li>
      `);

      $("#cartList").append(listItem);
    } else {
      console.error("Geçersiz sepet öğesi:", item);
    }
  });
  console.log("Sepet içeriği görüntülendi:", cart);
}

$("#cartBtn").on("click", function () {
  console.log("Sepet modalı açıldı.");
  $("#cartModal").show();
  displayCart();
});

$(document).on("click", ".cart-btn", function () {
  const productCard = $(this).closest(".product-card");
  const product = {
    id: productCard.data("id"),
    image: productCard.find(".product-image").attr("src"),
    title: productCard.find(".product-title").text(),
    price: productCard.find(".product-price").text(),
  };

  cart.push(product);
  saveCart();
  updateCartCount();
  console.log("Ürün sepete eklendi:", product);
});

$(document).on("click", ".remove-from-cart", function () {
  const index = $(this).data("index");
  console.log("Sepetten çıkarılacak ürün indexi:", index);

  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  displayCart();
  console.log("Ürün sepetten çıkarıldı.");
});

$("#clearCartBtn").on("click", function () {
  cart = [];
  saveCart();
  updateCartCount();
  displayCart();
  console.log("Sepet tamamen temizlendi.");
});
$("#cartCloseBtn").on("click", function () {
  console.log("Sepet modalı kapatıldı.");
  $("#cartModal").hide();
});

updateCartCount();
