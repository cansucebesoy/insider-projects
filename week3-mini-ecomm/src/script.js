import { initializeSlider } from "./Slider.js";
import "./styles.css";
import $ from "jquery";
import "slick-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

$(document).ready(() => {
  initializeSlider();

  let allProducts = [];

  $.ajax({
    url: "https://fakestoreapi.com/products",
    method: "GET",
    success: (products) => {
      allProducts = products;
      displayProducts(products);
    },
    error: (error) => {
      console.error("Error fetching products:", error);
      $("#productList").html("<p>Ürünler yüklenirken bir hata oluştu.</p>");
    },
  });

  function displayProducts(products) {
    let productsHTML = "";

    $.each(products, (index, product) => {
      productsHTML += `
      <div class="product-card" data-id="${product.id}">
          <img src="${product.image}" alt="${product.title}" class="product-image">
          <div class="product-content">
              <h3 class="product-title">${product.title}</h3>
              <div class="product-price">${product.price} TL</div>
              <div class="product-actions">
                  <div class="product-actions-left">
                      <button class="btn btn-ghost favorite-btn"><i class="fas fa-heart"></i></button>
                      <button class="btn btn-primary cart-btn"><i class="fas fa-shopping-cart"></i></button>
                  </div>
                  <div class="product-actions-right">
                        <button class="btn btn-secondary details-btn" data-id="${product.id}"><i class="fas fa-eye"></i></button>
                  </div>
              </div>
          </div>
      </div>
  `;
    });

    $("#productList").html(productsHTML);

    $(".favorite-btn").on("click", function () {
      const productId = $(this).closest(".product-card").data("id");
      const product = allProducts.find((p) => p.id === productId);

      if (product) {
        addToFavorites(product);
      }
    });

    $(".details-btn").on("click", function () {
      const productId = $(this).closest(".product-card").data("id");
      showProductDetail(productId);
    });
  }

  function showProductDetail(productId) {
    const product = allProducts.find((p) => p.id === productId);

    if (product) {
      $("#modalProductTitle").text(product.title);
      $("#modalProductDescription").text(product.description);
      $("#modalProductImage").attr("src", product.image);
      $("#modalProductPrice").text(`${product.price} TL`);
      $("#modalProductCategory").text(product.category);

      const productModal = new bootstrap.Modal(
        document.getElementById("productDetailModal")
      );
      productModal.show();
    }
  }

  let favoriteProducts = JSON.parse(localStorage.getItem("favorites")) || [];

  function displayFavorites() {
    const favoriteList = $("#favorites");
    favoriteList.empty();

    if (favoriteProducts.length > 0) {
      favoriteProducts.forEach((product) => {
        favoriteList.append(`
          <li>
            <img src="${product.image}" alt="${product.title}">
            <span>${product.title}</span>
            <button class="remove-btn" data-id="${product.id}">Sil</button>
          </li>
        `);
      });
    } else {
      favoriteList.append("<li>Henüz favori ürün eklemediniz.</li>");
    }
  }

  function addToFavorites(product) {
    if (!favoriteProducts.some((p) => p.id === product.id)) {
      favoriteProducts.push(product);
      localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
      displayFavorites();
    }
  }

  $("#favoriteBtn").on("click", () => {
    $("#favoriteModal").show();
    displayFavorites();
  });

  $(".fav-close-btn").on("click", function () {
    $("#favoriteModal").hide();
  });

  $(document).on("click", ".remove-btn", function () {
    const productId = $(this).data("id");
    favoriteProducts = favoriteProducts.filter((p) => p.id !== productId);
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
    displayFavorites();
  });

  displayFavorites();

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Başlangıçtaki sepet verisi:", cart);

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
      const listItem = $(`
        <li class="cart-item">
          <img src="${item.image}" alt="${item.title}" class="cart-item-image" />
          <span class="cart-item-title">${item.title}</span>
          <span class="cart-item-price">${item.price}</span>
          <button class="remove-from-cart" data-index="${index}">Çıkar</button>
        </li>
      `);

      $("#cartList").append(listItem);
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
});
