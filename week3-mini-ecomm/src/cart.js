import $ from "jquery";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart = cart.filter((item) => item !== null && item !== undefined);

saveCart();

export function addToCart(product) {
  if (product) {
    cart.push(product);
    saveCart();
    updateCartCount();
  }
}

function updateCartCount() {
  if (cart.length > 0) {
    $("#cartCount").text(cart.length).show();
    console.log("Güncel sepet sayısı:", cart.length);
  } else {
    $("#cartCount").hide();
    console.log("Sepet boş, count gizlendi.");
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Sepet localStorage'a kaydedildi:", cart);
}

function displayCart() {
  $("#cartList").empty();

  if (cart.length === 0) {
    $("#cartList").append(
      "<div class='empty-cart-message'>Sepetiniz boş</div>"
    );
    return;
  }

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

$(document).on("click", "#cartButton", () => {
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

  addToCart(product);
  console.log("Ürün sepete eklendi:", product);
});

$(document).on("click", ".remove-from-cart", function () {
  const index = $(this).data("index");
  console.log("Sepetten çıkarılacak ürün indexi:", index);

  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    displayCart();
    console.log("Ürün sepetten çıkarıldı.");
  }
});

$("#clearCartBtn").on("click", () => {
  cart = [];
  saveCart();
  updateCartCount();
  displayCart();
  console.log("Sepet tamamen temizlendi.");
});

$("#cartCloseBtn").on("click", () => {
  console.log("Sepet modalı kapatıldı.");
  $("#cartModal").hide();
});

updateCartCount();

export { cart };
