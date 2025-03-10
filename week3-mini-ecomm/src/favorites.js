let favoriteProducts = JSON.parse(localStorage.getItem("favorites")) || [];

export function addToFavorites(product) {
  if (
    product &&
    product.id &&
    !favoriteProducts.some((p) => p.id === product.id)
  ) {
    favoriteProducts.push(product);
    localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
    displayFavorites();
  }
}

function displayFavorites() {
  const favoriteList = $("#favorites").empty();
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

$(document).on("click", ".remove-btn", function () {
  const productId = $(this).data("id");
  favoriteProducts = favoriteProducts.filter((p) => p.id !== productId);
  localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
  displayFavorites();
});

$("#favoriteBtn").on("click", () => {
  $("#favoriteModal").show();
  displayFavorites();
});

$(".fav-close-btn").on("click", () => {
  $("#favoriteModal").hide();
});
