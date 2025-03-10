import { addToFavorites } from "./favorites.js";
import { initializeFilters } from "./filters.js";

let allProducts = [];

export function fetchProducts() {
  $.ajax({
    url: "https://fakestoreapi.com/products",
    method: "GET",
    success: (products) => {
      allProducts = products;
      displayProducts(products);

      // Filtreleme özelliklerini başlat
      initializeFilters(products);

      // Filtreleme callback'ini tanımla
      window.displayFilteredProductsCallback = (filteredProducts) => {
        displayProducts(filteredProducts);
      };
    },
    error: (error) => {
      console.error("Ürünler yüklenirken hata:", error);
      $("#productList").html("<p>Ürünler yüklenirken bir hata oluştu.</p>");
    },
  });
}
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
