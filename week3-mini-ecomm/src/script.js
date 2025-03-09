import { initializeSlider } from "./Slider.js";
import "./styles.css";
import $ from "jquery";
import "slick-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

$(document).ready(() => {
  initializeSlider();

  $.ajax({
    url: "https://fakestoreapi.com/products",
    method: "GET",
    success: (products) => {
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
                      <button class="btn btn-secondary details-btn"><i class="fas fa-eye"></i></button>
                  </div>
              </div>
          </div>
      </div>
  `;
    });

    $("#productList").html(productsHTML);

    $(".favorite-btn").on("click", function () {
      const productId = $(this).closest(".product-card").data("id");
      console.log("Favorilere eklendi:", productId);
    });

    $(".cart-btn").on("click", function () {
      const productId = $(this).closest(".product-card").data("id");
      console.log("Sepete eklendi:", productId);
    });

    $(".details-btn").on("click", function () {
      const productId = $(this).closest(".product-card").data("id");
      console.log("Ürün detayı görüntüleniyor:", productId);
    });
  }
});
