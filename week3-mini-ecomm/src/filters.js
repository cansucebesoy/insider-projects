let filteredProducts = [];
let originalProducts = [];
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function initializeFilters(products) {
  console.log("Ürünler:", products);
  originalProducts = [...products];
  filteredProducts = [...products];
  const debouncedApplyFilters = debounce(applyFilters, 500);
  $("#searchButton").on("click", applyFilters);
  $("#searchInput").on("keyup", (e) => {
    if (e.key === "Enter") {
      applyFilters();
    } else {
      debouncedApplyFilters();
    }
  });

  $("#sortSelect").on("change", applyFilters);
  $("#filterButton").on("click", applyFilters);
  $("#resetButton").on("click", resetFilters);
}

export function applyFilters() {
  const searchTerm = $("#searchInput").val().toLowerCase();
  const sortOption = $("#sortSelect").val();

  console.log("Arama Terimi:", searchTerm);
  console.log("Sıralama Seçeneği:", sortOption);

  filteredProducts = originalProducts.filter((product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm);

    console.log("Ürün Eşleşme Durumu:", matchesSearch);
    return matchesSearch;
  });

  if (sortOption !== "default") {
    console.log("Sıralama Uygulandı:", sortOption);
    filteredProducts.sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }

  displayFilteredProducts(filteredProducts);
}

function resetFilters() {
  $("#searchInput").val("");
  $("#sortSelect").val("default");

  filteredProducts = [...originalProducts];
  displayFilteredProducts(filteredProducts);
}
function displayFilteredProducts(products) {
  if (window.displayFilteredProductsCallback) {
    window.displayFilteredProductsCallback(products);
  }
}
